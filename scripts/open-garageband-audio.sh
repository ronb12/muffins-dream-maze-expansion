#!/bin/bash
# Opens GarageBand + the audio export folder for Dream Maze original music.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO="$ROOT/audio"

mkdir -p "$AUDIO"

if [[ -d "/Applications/GarageBand.app" ]]; then
  open -a "GarageBand"
  osascript <<'APPLESCRIPT' 2>/dev/null || true
tell application "GarageBand"
  activate
end tell
display notification "Export MP3s into the audio folder when done." with title "Dream Maze Music" subtitle "See audio/GARAGEBAND.md"
APPLESCRIPT
else
  echo "GarageBand is not installed. Install from the Mac App Store, or use:"
  echo "  python3 scripts/build-dream-audio.py"
fi

open "$AUDIO"
echo ""
echo "Dream Maze audio folder:"
echo "  $AUDIO"
echo ""
echo "Compose original loops in GarageBand, then export these filenames:"
echo "  music-garden.mp3  music-nebula.mp3  music-atmosphere.mp3  music-victory.mp3"
echo "  sfx-star.mp3  sfx-gate.mp3  sfx-gate-ready.mp3  sfx-puddle.mp3  sfx-pickup.mp3  sfx-near-star.mp3"
echo ""
echo "Full guide: audio/GARAGEBAND.md"
