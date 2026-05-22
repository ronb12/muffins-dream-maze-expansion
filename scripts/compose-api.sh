#!/bin/bash
set -euo pipefail
API="${DREAM_MAZE_API:-http://127.0.0.1:8767}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CMD="${1:-health}"
shift || true

case "$CMD" in
  health) curl -s "$API/api/health" | python3 -m json.tool ;;
  recipes) curl -s "$API/api/recipes" | python3 -m json.tool ;;
  compose)
    TRACK="${1:?track id}"
    curl -s -X POST "$API/api/compose" -H "Content-Type: application/json" \
      -d "{\"track\":\"$TRACK\",\"openInGarageBand\":true}" | python3 -m json.tool
    ;;
  compose-all)
    curl -s -X POST "$API/api/compose/all" -H "Content-Type: application/json" \
      -d '{"openInGarageBand":false}' | python3 -m json.tool
    ;;
  export)
    NAME="${1:?basename}"
    FMT="${2:-mp3}"
    curl -s -X POST "$API/api/garageband/export" -H "Content-Type: application/json" \
      -d "{\"filename\":\"$NAME\",\"format\":\"$FMT\"}" | python3 -m json.tool
    ;;
  start) exec python3 "$ROOT/garageband-api/server.py" ;;
  *) echo "Usage: $0 {health|recipes|compose|compose-all|export|start}"; exit 1 ;;
esac
