from __future__ import annotations

import argparse
import asyncio
from typing import Any

from mcp.server import MCPServer

from groww_mcp.config import Settings
from groww_mcp.groww_client import GrowwClient

settings = Settings.from_env()
groww = GrowwClient(settings)
mcp = MCPServer(
    "groww-mcp",
    instructions=(
        "Tools for querying Groww portfolio data and market prices. "
        "Configure GROWW_ACCESS_TOKEN or TOTP credentials for live trading data."
    ),
)


@mcp.tool()
def groww_get_profile() -> dict[str, Any]:
    """Return the authenticated Groww user profile."""
    return groww.get_profile()


@mcp.tool()
def groww_get_holdings() -> dict[str, Any]:
    """Return the user's stock holdings from Groww."""
    return groww.get_holdings()


@mcp.tool()
def groww_get_ltp(trading_symbol: str, exchange: str = "NSE") -> dict[str, Any]:
    """Return the latest traded price for a symbol."""
    return groww.get_ltp(trading_symbol=trading_symbol, exchange=exchange)


@mcp.tool()
def groww_health_check() -> dict[str, Any]:
    """Verify the MCP server is running and report auth mode."""
    profile = groww.get_profile()
    return {
        "status": "ok",
        "mock_mode": groww.is_mock,
        "tools": ["groww_get_profile", "groww_get_holdings", "groww_get_ltp", "groww_health_check"],
        "profile_preview": profile.get("display_name") or profile.get("email") or "unknown",
    }


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run the Groww MCP server")
    parser.add_argument(
        "--transport",
        choices=("stdio", "streamable-http"),
        default="stdio",
        help="MCP transport to expose",
    )
    parser.add_argument("--host", default=settings.http_host)
    parser.add_argument("--port", type=int, default=settings.http_port)
    return parser


async def _run(transport: str, host: str, port: int) -> None:
    if transport == "stdio":
        await mcp.run_stdio_async()
        return

    import uvicorn

    app = mcp.streamable_http_app()
    config = uvicorn.Config(app, host=host, port=port, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


def main() -> None:
    args = build_parser().parse_args()
    asyncio.run(_run(args.transport, args.host, args.port))


if __name__ == "__main__":
    main()
