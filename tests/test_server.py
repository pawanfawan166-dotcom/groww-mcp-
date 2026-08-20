import asyncio
import json
import socket
from contextlib import closing
from urllib.request import urlopen

import pytest
import uvicorn
from mcp import Client
from mcp.client.session import ClientSession
from mcp.client.sse import sse_client

from groww_mcp.config import Settings
from groww_mcp.groww_client import GrowwClient
from groww_mcp.server import build_parser, build_sse_gateway_app, mcp


def _free_port() -> int:
    with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


async def _wait_for_port(port: int) -> None:
    while True:
        try:
            with closing(socket.create_connection(("127.0.0.1", port), timeout=0.2)):
                return
        except OSError:
            await asyncio.sleep(0.05)


def _read_json(url: str) -> dict:
    with urlopen(url) as response:
        assert response.status == 200
        return json.loads(response.read().decode())


def test_settings_default_to_mock_without_credentials(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("GROWW_ACCESS_TOKEN", raising=False)
    monkeypatch.delenv("GROWW_API_KEY", raising=False)
    monkeypatch.delenv("GROWW_API_SECRET", raising=False)
    monkeypatch.delenv("GROWW_TOTP_SECRET", raising=False)
    monkeypatch.delenv("TOTP_SECRET", raising=False)
    monkeypatch.delenv("GROWW_CREDENTIALS", raising=False)
    monkeypatch.delenv("GROWW_MOCK_MODE", raising=False)

    settings = Settings.from_env()
    assert settings.mock_mode is True


def test_cli_exposes_sse_transport() -> None:
    parser = build_parser()
    args = parser.parse_args(["--transport", "sse", "--host", "0.0.0.0", "--port", "9000"])
    assert args.transport == "sse"
    assert args.host == "0.0.0.0"
    assert args.port == 9000


def test_mock_holdings_returns_sample_portfolio() -> None:
    client = GrowwClient(
        Settings(
            mock_mode=True,
            api_key=None,
            api_secret=None,
            totp_secret=None,
            access_token=None,
            http_host="127.0.0.1",
            http_port=8000,
        )
    )
    holdings = client.get_holdings()
    assert holdings["mode"] == "mock"
    assert len(holdings["holdings"]) >= 1


@pytest.mark.asyncio
async def test_mcp_tools_via_server_api() -> None:
    tools = await mcp.list_tools()
    tool_names = {tool.name for tool in tools}
    assert "groww_health_check" in tool_names

    health = await mcp.call_tool("groww_health_check", {})
    assert health.structured_content["status"] == "ok"
    assert health.structured_content["mock_mode"] is True

    holdings = await mcp.call_tool("groww_get_holdings", {})
    assert holdings.structured_content["mode"] == "mock"


@pytest.mark.asyncio
async def test_sse_gateway_health_endpoint() -> None:
    port = _free_port()
    app = build_sse_gateway_app(host="127.0.0.1")
    config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="warning")
    server = uvicorn.Server(config)
    server_task = asyncio.create_task(server.serve())

    try:
        await asyncio.wait_for(_wait_for_port(port), timeout=5)
        payload = await asyncio.to_thread(_read_json, f"http://127.0.0.1:{port}/health")
        assert payload["status"] == "ok"
        assert payload["sse_url"] == "/sse"
    finally:
        server.should_exit = True
        await server_task


@pytest.mark.asyncio
async def test_mcp_tools_over_sse() -> None:
    port = _free_port()
    app = build_sse_gateway_app(host="127.0.0.1")
    config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="warning")
    server = uvicorn.Server(config)
    server_task = asyncio.create_task(server.serve())

    try:
        await asyncio.wait_for(_wait_for_port(port), timeout=5)
        async with (
            sse_client(f"http://127.0.0.1:{port}/sse") as (read, write),
            ClientSession(read, write) as session,
        ):
            await session.initialize()
            tools_result = await session.list_tools()
            tool_names = {tool.name for tool in tools_result.tools}
            assert "groww_health_check" in tool_names

            result = await session.call_tool("groww_health_check", {})
            payload = getattr(result, "structuredContent", None) or getattr(
                result, "structured_content", None
            )
            if not payload:
                text = "".join(block.text for block in result.content if hasattr(block, "text"))
                payload = json.loads(text)
            assert payload["status"] == "ok"
            assert payload["mock_mode"] is True
    finally:
        server.should_exit = True
        await server_task


@pytest.mark.asyncio
async def test_mcp_tools_over_streamable_http() -> None:
    port = _free_port()
    server_task = asyncio.create_task(mcp.run_streamable_http_async(host="127.0.0.1", port=port))

    try:
        await asyncio.sleep(0.5)
        async with Client(f"http://127.0.0.1:{port}/mcp") as client:
            tools_result = await client.list_tools()
            tool_names = {tool.name for tool in tools_result.tools}
            assert "groww_get_ltp" in tool_names

            result = await client.call_tool("groww_get_ltp", {"trading_symbol": "RELIANCE"})
            assert result.structured_content["trading_symbol"] == "RELIANCE"
    finally:
        server_task.cancel()
        with pytest.raises(asyncio.CancelledError):
            await server_task
