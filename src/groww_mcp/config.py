from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    """Runtime configuration loaded from environment variables."""

    mock_mode: bool
    api_key: str | None
    api_secret: str | None
    totp_secret: str | None
    access_token: str | None
    http_host: str
    http_port: int

    @classmethod
    def from_env(cls) -> Settings:
        mock_mode = os.getenv("GROWW_MOCK_MODE", "").lower() in {"1", "true", "yes"}
        return cls(
            mock_mode=mock_mode or not cls._has_live_credentials(),
            api_key=os.getenv("GROWW_API_KEY"),
            api_secret=os.getenv("GROWW_API_SECRET"),
            totp_secret=os.getenv("GROWW_TOTP_SECRET"),
            access_token=os.getenv("GROWW_ACCESS_TOKEN"),
            http_host=os.getenv("GROWW_MCP_HOST", "0.0.0.0"),
            http_port=int(os.getenv("GROWW_MCP_PORT", "8000")),
        )

    @staticmethod
    def _has_live_credentials() -> bool:
        if os.getenv("GROWW_ACCESS_TOKEN"):
            return True
        if os.getenv("GROWW_API_KEY") and os.getenv("GROWW_TOTP_SECRET"):
            return True
        return bool(os.getenv("GROWW_API_KEY") and os.getenv("GROWW_API_SECRET"))
