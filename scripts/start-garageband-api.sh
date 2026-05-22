#!/bin/bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT/garageband-api"
echo "Starting GarageBand Compose API on http://127.0.0.1:8767"
exec python3 server.py
