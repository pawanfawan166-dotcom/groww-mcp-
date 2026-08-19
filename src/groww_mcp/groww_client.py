from __future__ import annotations

from typing import Any

from groww_mcp.config import Settings


class GrowwClient:
    """Thin wrapper around growwapi with mock responses for local development."""

    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._client: Any | None = None

    @property
    def is_mock(self) -> bool:
        return self.settings.mock_mode

    def _ensure_client(self) -> Any:
        if self._client is not None:
            return self._client

        if self.settings.mock_mode:
            raise RuntimeError("Live Groww client requested while mock mode is enabled")

        from growwapi import GrowwAPI

        if self.settings.access_token:
            token = self.settings.access_token
        elif self.settings.api_key and self.settings.totp_secret:
            import pyotp
            from growwapi import GrowwAPI as GrowwAuth

            totp = pyotp.TOTP(self.settings.totp_secret).now()
            token = GrowwAuth.get_access_token(api_key=self.settings.api_key, totp=totp)
        elif self.settings.api_key and self.settings.api_secret:
            from growwapi import GrowwAPI as GrowwAuth

            token = GrowwAuth.get_access_token(
                api_key=self.settings.api_key,
                secret=self.settings.api_secret,
            )
        else:
            raise RuntimeError(
                "Missing Groww credentials. Set GROWW_ACCESS_TOKEN or API key credentials."
            )

        self._client = GrowwAPI(token)
        return self._client

    def get_profile(self) -> dict[str, Any]:
        if self.is_mock:
            return {
                "mode": "mock",
                "display_name": "Demo Groww User",
                "email": "demo@groww-mcp.local",
                "note": "Set GROWW_ACCESS_TOKEN or TOTP credentials for live data.",
            }

        client = self._ensure_client()
        return client.get_user_profile()

    def get_holdings(self) -> dict[str, Any]:
        if self.is_mock:
            return {
                "mode": "mock",
                "holdings": [
                    {
                        "trading_symbol": "RELIANCE",
                        "quantity": 10,
                        "average_price": 2450.5,
                        "current_value": 25100.0,
                    },
                    {
                        "trading_symbol": "INFY",
                        "quantity": 25,
                        "average_price": 1520.0,
                        "current_value": 39500.0,
                    },
                ],
            }

        client = self._ensure_client()
        return client.get_holdings_for_user(timeout=5)

    def get_ltp(self, trading_symbol: str, exchange: str = "NSE") -> dict[str, Any]:
        if self.is_mock:
            return {
                "mode": "mock",
                "trading_symbol": trading_symbol.upper(),
                "exchange": exchange.upper(),
                "ltp": 1234.56,
            }

        client = self._ensure_client()
        return client.get_ltp(
            segment=client.SEGMENT_CASH,
            exchange_symbols=[f"{exchange.upper()}_{trading_symbol.upper()}"],
        )
