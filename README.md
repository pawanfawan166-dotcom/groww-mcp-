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

```json
{
  "mcpServers": {
    "groww-mcp": {
      "command": "groww-mcp",
      "args": ["--transport", "stdio"],
      "env": {
        "GROWW_MOCK_MODE": "1"
      }
    }
  }
}
```

Replace mock mode with your Groww credentials for live trading data.
