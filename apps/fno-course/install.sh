#!/usr/bin/env bash
# F&O Course App — local install & run script
set -e
cd "$(dirname "$0")"
PORT="${1:-8081}"

echo "============================================"
echo "  F&O Master Course — Install & Run"
echo "============================================"
echo ""
echo "App folder: $(pwd)"
echo ""
echo "Starting server on port $PORT..."
echo ""
echo "  📲 Phone lo install cheyadaniki:"
echo "  1. Phone & computer same WiFi lo undali"
echo "  2. Phone browser lo open cheyandi:"
echo ""
IP=$(hostname -I 2>/dev/null | awk '{print $1}')
if [ -n "$IP" ]; then
  echo "     http://$IP:$PORT"
fi
echo "     http://localhost:$PORT"
echo ""
echo "  3. Android: Menu → Install app / Add to Home screen"
echo "  4. iPhone: Share → Add to Home Screen"
echo ""
echo "Press Ctrl+C to stop server"
echo "============================================"
echo ""

python3 -m http.server "$PORT"
