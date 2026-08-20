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
        totp_secret = os.getenv("TOTP_SECRET") or os.getenv("GROWW_TOTP_SECRET")
        api_key = os.getenv("GROWW_API_KEY")
        api_secret = os.getenv("GROWW_API_SECRET")
        access_token = os.getenv("GROWW_ACCESS_TOKEN")
        credentials = os.getenv("GROWW_CREDENTIALS")
        if credentials and not api_key:
            stripped = credentials.strip()
            if stripped.startswith("{"):
                import json

                payload = json.loads(stripped)
                api_key = payload.get("api_key") or api_key
                api_secret = payload.get("api_secret") or api_secret
                access_token = payload.get("access_token") or access_token
                totp_secret = payload.get("totp_secret") or totp_secret
            else:
                api_key = stripped
        return cls(
            mock_mode=mock_mode or not cls._has_live_credentials(),
            api_key=api_key,
            api_secret=api_secret,
            totp_secret=totp_secret,
            access_token=access_token,
            http_host=os.getenv("GROWW_MCP_HOST", "0.0.0.0"),
            http_port=int(os.getenv("GROWW_MCP_PORT", "8000")),
        )

    @staticmethod
    def _has_live_credentials() -> bool:
        if os.getenv("GROWW_ACCESS_TOKEN"):
            return True
        totp = os.getenv("TOTP_SECRET") or os.getenv("GROWW_TOTP_SECRET")
        if os.getenv("GROWW_API_KEY") and totp:
            return True
        if os.getenv("GROWW_CREDENTIALS") and totp:
            return True
        return bool(os.getenv("GROWW_API_KEY") and os.getenv("GROWW_API_SECRET"))
