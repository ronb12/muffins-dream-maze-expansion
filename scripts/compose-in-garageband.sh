#!/bin/bash
# Compose a Dream Maze track and open it in GarageBand via the local API.
# Usage: ./scripts/compose-in-garageband.sh music-garden
set -euo pipefail
TRACK="${1:-music-garden}"
API="http://127.0.0.1:8767"
if ! curl -sf "$API/api/health" >/dev/null; then
  echo "Start the API first: ./scripts/start-garageband-api.sh"
  exit 1
fi
curl -s -X POST "$API/api/pipeline/compose-open" \
  -H 'Content-Type: application/json' \
  -d "{\"track\":\"$TRACK\"}" | python3 -m json.tool
echo ""
echo "GarageBand should open with $TRACK.mid — assign instruments, then export:"
echo "  curl -X POST $API/api/garageband/export -H 'Content-Type: application/json' -d '{\"track\":\"$TRACK\",\"installToGame\":true}'"
