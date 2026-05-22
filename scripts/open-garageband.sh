#!/bin/bash
# Opens GarageBand and shows export filenames for Muffin's Maze Adventure.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO="$ROOT/audio"

if [[ ! -d "/Applications/GarageBand.app" ]]; then
  echo "GarageBand is not installed. Install it from the Mac App Store, then run this again."
  exit 1
fi

open -a "GarageBand"
osascript <<'APPLESCRIPT'
display dialog "Compose original loops for Muffin's Maze Adventure.

Export MP3s into the game's audio/ folder with these exact names:

• music-garden.mp3 (worlds 1–33)
• music-nebula.mp3 (worlds 34–66)
• music-atmosphere.mp3 (menu / late worlds)
• music-victory.mp3 (level clear sting)
• sfx-star, sfx-gate, sfx-gate-ready, sfx-puddle, sfx-pickup, sfx-near-star

See audio/GARAGEBAND.md for BPM, keys, and mood notes." buttons {"OK"} default button "OK" with title "Dream Maze — GarageBand"
APPLESCRIPT

echo ""
echo "Audio folder: $AUDIO"
echo "Full guide:   $AUDIO/GARAGEBAND.md"
open "$AUDIO"
