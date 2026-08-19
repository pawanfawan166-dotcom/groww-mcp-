#!/usr/bin/env bash
set -euo pipefail

export PATH="${HOME}/.local/bin:${PATH}"

# Ensure the editable package is importable after checkout.
if [[ ! -d /workspace/src/groww_mcp ]]; then
  echo "groww-mcp source tree missing" >&2
  exit 1
fi

python3 -m pip install --user -e ".[dev]" >/dev/null
