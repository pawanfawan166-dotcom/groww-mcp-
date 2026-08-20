# groww-mcp-

Python [Model Context Protocol](https://modelcontextprotocol.io/) server for the [Groww Trade API](https://groww.in/trade-api).

## Cursor mobile on Render

1. Push this repo to GitHub.
2. Create a Render Web Service from the repo. Start command:

```text
uvicorn main:app --host 0.0.0.0 --port $PORT
```

3. After deploy, paste this URL in Cursor (must end with `/sse`):

```text
https://YOUR-SERVICE.onrender.com/sse
```

Replace `YOUR-SERVICE` with your Render service name. Open `/health` in a browser first; it should return `"sse": "/sse"`.

## Requirements

- Python 3.10+
- Groww Trading API subscription for live data (optional for local mock mode)

## Setup

```bash
pip install -e ".[dev]"
```

## Run the MCP server

Stdio transport (Cursor desktop / Claude Desktop on a computer):

```bash
groww-mcp --transport stdio
```

SSE gateway (required for Cursor mobile and the Cursor web dashboard):

```bash
groww-mcp --transport sse --host 0.0.0.0 --port 8000
```

The public endpoint Cursor must use is `https://<your-host>/sse`. Health check: `https://<your-host>/health`.

Streamable HTTP transport (local development; not used by Cursor mobile):

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

Cursor mobile cannot run local `stdio` commands (`npx`, `python`, `groww-mcp`). It only accepts a remote HTTPS SSE URL, configured from the [Cursor dashboard](https://cursor.com/dashboard) rather than inside the phone app.

### 1. Deploy a public SSE gateway

Host this server on a machine with a public HTTPS URL. Docker:

```bash
docker build -t groww-mcp .
docker run --rm -p 8000:8000 \
  -e GROWW_MOCK_MODE=1 \
  groww-mcp
```

Replace mock mode with your Groww credentials for live trading data. Put HTTPS in front of port 8000 (Render, Fly.io, Railway, nginx, or a tunnel such as Cloudflare Tunnel / ngrok). Confirm `https://<your-host>/health` returns `"status": "ok"`.

### 2. Point Cursor at `/sse`

Set `GROWW_MCP_SSE_URL` to `https://<your-host>/sse`, then add this remote server in **Cursor Dashboard → Integrations & MCP** (or in `.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "groww-mcp": {
      "url": "https://<your-host>/sse"
    }
  }
}
```

Do not paste a GitHub repository URL or a JSON-RPC `/mcp` URL into the mobile config. The value must be the live SSE endpoint.

### Desktop stdio (computers only)

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
