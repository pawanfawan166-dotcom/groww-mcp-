import pytest
from fastapi.testclient import TestClient

from main import app, mcp


def test_fastapi_health_and_sse_route() -> None:
    with TestClient(app) as client:
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json()["sse"] == "/sse"


@pytest.mark.asyncio
async def test_mcp_tools_registered() -> None:
    tools = await mcp.list_tools()
    names = {tool.name for tool in tools}
    assert "groww_health_check" in names
    assert "groww_place_order" in names
