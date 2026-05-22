# GarageBand Compose API

Local HTTP API that **composes original MIDI** for Muffin's Dream Maze and **opens it in GarageBand** on your Mac.

Apple does not expose a note-level REST API for GarageBand. This server:

1. **Composes** chord sketches from Python recipes → `.mid` in `audio/staging/`
2. **Opens** MIDI in GarageBand (`open` + AppleScript)
3. **Exports** MP3 via Accessibility automation (Share → Export Song to Disk)

You finish the sound in GarageBand (instruments, mix), then export into `audio/` for the game.

## Requirements

- macOS + **GarageBand** (`/Applications/GarageBand.app`)
- Python 3 (stdlib only)
- **Accessibility** for your terminal app (export automation):  
  System Settings → Privacy & Security → Accessibility → enable Terminal or Cursor

## Start

```bash
cd muffins-dream-maze-expansion
./garageband-api/scripts/start-api.sh
# or: python3 garageband-api/server.py
```

Base URL: **http://127.0.0.1:8767**

## Endpoints

| Method | Path | Body | Description |
|--------|------|------|-------------|
| GET | `/api/health` | — | GarageBand installed, paths |
| GET | `/api/recipes` | — | All track recipes |
| POST | `/api/compose` | `{ "track": "music-garden", "openInGarageBand": true }` | Write MIDI |
| POST | `/api/compose/all` | `{ "openInGarageBand": false }` | All tracks |
| POST | `/api/pipeline/compose-open` | `{ "track": "music-garden" }` | Compose + open GB |
| POST | `/api/garageband/open` | `{ "track": "music-garden" }` | Open MIDI in GB |
| POST | `/api/garageband/export` | `{ "track": "music-garden", "installToGame": true }` | Export MP3 → `audio/` |
| POST | `/api/garageband/activate` | — | Focus GarageBand |
| POST | `/api/garageband/new` | — | New empty project |

## Workflow

```bash
# 1) Compose + open in GarageBand
curl -s -X POST http://127.0.0.1:8767/api/pipeline/compose-open \
  -H 'Content-Type: application/json' \
  -d '{"track":"music-garden"}' | jq .

# 2) In GarageBand: assign Dreamy Pad / Bell, mix, optional drums

# 3) Export into the game
curl -s -X POST http://127.0.0.1:8767/api/garageband/export \
  -H 'Content-Type: application/json' \
  -d '{"track":"music-garden","installToGame":true}' | jq .
```

## In-game UI

**Settings → GarageBand API** (when the server is running):

- **Compose in GarageBand** — runs the pipeline for the selected recipe
- **Export MP3** — automates export after you mix in GarageBand

## Track IDs

| ID | Game file |
|----|-----------|
| `music-garden` | `audio/music-garden.mp3` |
| `music-nebula` | `audio/music-nebula.mp3` |
| `music-atmosphere` | `audio/music-atmosphere.mp3` |
| `music-victory` | `audio/music-victory.mp3` |
| `sfx-star` | `audio/sfx-star.mp3` |
| `sfx-gate` | `audio/sfx-gate.mp3` |
| `sfx-gate-ready` | `audio/sfx-gate-ready.mp3` |
| `sfx-puddle` | `audio/sfx-puddle.mp3` |
| `sfx-pickup` | `audio/sfx-pickup.mp3` |
| `sfx-near-star` | `audio/sfx-near-star.mp3` |

## GarageBand tips

- Tempo/key come from the recipe (`composer/recipes.py`).
- Use **Software Instrument** tracks for imported MIDI.
- Loop music 16–32 bars; keep SFX under 1 second.
- See `audio/GARAGEBAND.md` for instrument ideas.

## Project layout

```
garageband-api/
  server.py           # HTTP API
  compose_service.py  # compose + install helpers
  composer/           # MIDI writer + recipes
  bridge/             # GarageBand AppleScript + UI export
  scripts/start-api.sh
```
