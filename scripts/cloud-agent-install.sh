#!/usr/bin/env bash
set -euo pipefail

cd /workspace

export PATH="${HOME}/.local/bin:${PATH}"

python3 -m pip install --user --upgrade pip
python3 -m pip install --user -e ".[dev]"
python3 -m pip install --user uv

export PATH="${HOME}/.local/bin:${PATH}"
uv tool install --with 'mcp<2' indian-market-mcp
