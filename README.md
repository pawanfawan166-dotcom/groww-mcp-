# groww-mcp-

Python [Model Context Protocol](https://modelcontextprotocol.io/) server for the [Groww Trade API](https://groww.in/trade-api).

## Requirements

- Python 3.10+
- Groww Trading API subscription for live data (optional for local mock mode)

## Setup

```bash
pip install -e ".[dev]"
```

## Run the MCP server

Stdio transport (for Cursor / Claude Desktop):

```bash
groww-mcp --transport stdio
```

Streamable HTTP transport (for local development):

```bash
groww-mcp --transport streamable-http --host 0.0.0.0 --port 8000
```

## Authentication

The server uses mock responses when Groww credentials are not configured.

For live data, set one of:

- `GROWW_ACCESS_TOKEN`
- `GROWW_API_KEY` + `GROWW_TOTP_SECRET` (TOTP flow)
- `GROWW_API_KEY` + `GROWW_API_SECRET` (approval flow)

Force mock mode with `GROWW_MOCK_MODE=1`.

## Tools

| Tool | Description |
| --- | --- |
| `groww_health_check` | Server status and auth mode |
| `groww_get_profile` | Groww user profile |
| `groww_get_holdings` | Portfolio holdings |
| `groww_get_ltp` | Latest traded price for a symbol |

## Development

```bash
pytest
ruff check .
```

## Cursor MCP configuration

Project MCP config lives in `.cursor/mcp.json` and installs `indian-market-mcp` during Cloud Agent setup.

```json
{
  "mcpServers": {
    "indian-market": {
      "command": "uvx",
      "args": ["--with", "mcp<2", "indian-market-mcp"]
    },
    "groww-mcp": {
      "command": "groww-mcp",
      "args": ["--transport", "stdio"],
      "env": {
        "GROWW_ACCESS_TOKEN": "${env:GROWW_ACCESS_TOKEN}"
      }
    }
  }
}
```

For live Groww data, set `GROWW_ACCESS_TOKEN` in Cursor secrets. For local mock mode, set `GROWW_MOCK_MODE=1` instead.

After changing MCP config, restart the Cloud Agent or reload MCP from Cursor **Customize**.
