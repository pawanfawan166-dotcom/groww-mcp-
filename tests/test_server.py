import asyncio
import socket
from contextlib import closing

import pytest
from mcp import Client

from groww_mcp.config import Settings
from groww_mcp.groww_client import GrowwClient
from groww_mcp.server import mcp


def _free_port() -> int:
    with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def test_settings_default_to_mock_without_credentials(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("GROWW_ACCESS_TOKEN", raising=False)
    monkeypatch.delenv("GROWW_API_KEY", raising=False)
    monkeypatch.delenv("GROWW_API_SECRET", raising=False)
    monkeypatch.delenv("GROWW_TOTP_SECRET", raising=False)
    monkeypatch.delenv("GROWW_MOCK_MODE", raising=False)

    settings = Settings.from_env()
    assert settings.mock_mode is True


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
