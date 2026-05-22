# Dream Maze — Original Music (GarageBand)

The game loads MP3 files from this folder. Placeholders can be generated with `scripts/build-dream-audio.py`; **final tracks should be your GarageBand exports**.

## Compose API (MIDI → GarageBand → game)

A local server writes **original MIDI sketches**, opens them in **GarageBand**, and can export MP3 into `audio/`.

```bash
./scripts/start-garageband-api.sh
```

Base URL: **http://127.0.0.1:8767**

### Workflow

```bash
# 1) Compose + open in GarageBand
curl -s -X POST http://127.0.0.1:8767/api/pipeline/compose-open \
  -H 'Content-Type: application/json' \
  -d '{"track":"music-garden"}' | jq .

# 2) In GarageBand: assign Software Instruments (Bell, Dreamy Pad, etc.), mix, loop

# 3) Export into the game
curl -s -X POST http://127.0.0.1:8767/api/garageband/export \
  -H 'Content-Type: application/json' \
  -d '{"track":"music-garden","installToGame":true}' | jq .
```

Or use **Settings → GarageBand API** in the web game (with the server running).

**Permissions:** System Settings → Privacy & Security → **Accessibility** → enable your terminal app for automated export.

Full API reference: `garageband-api/README.md`

### Helper scripts

```bash
./scripts/open-garageband-audio.sh   # Opens GarageBand + this folder
./scripts/compose-api.sh start     # Same as start-garageband-api.sh
python3 scripts/build-dream-audio.py # Synthetic placeholders (no GarageBand)
```

## Manual GarageBand export

1. **GarageBand** → New Project → Empty Project  
2. Tempo **84 BPM**, key **A minor** (garden) or **D minor** (nebula)  
3. **16–32 bar** seamless loop, Software Instruments  
4. **Share → Export Song to Disk → MP3**  
5. Save as the filename in the table below → drop in `audio/`  
6. Hard-refresh the browser  

## Track guide

| Export filename | Mood | GarageBand ideas |
|-----------------|------|------------------|
| `music-garden.mp3` | Purple moon garden, worlds 1–33 | Slow arpeggiated **Bell**, **Dreamy Pad**, soft **Kick** every 2 bars |
| `music-nebula.mp3` | Cool space halls, worlds 34–66 | **Cosmic Pad**, filtered **Pluck**, light **Shaker** |
| `music-atmosphere.mp3` | Deep dream hub, worlds 67–100 | Low **Warm Pad**, distant **Choir**, minimal percussion |
| `music-victory.mp3` | Level clear (5–8 sec, **no loop**) | Rising **Bell** + **Synth Brass** stab |
| `sfx-star.mp3` | Star collected | Short **Sparkle**, &lt; 0.3s |
| `sfx-gate.mp3` | Gate charge tick | Soft **Thump** or low **Whoosh** |
| `sfx-gate-ready.mp3` | Gate 100% | Bright **Chime** chord |
| `sfx-puddle.mp3` | Shadow puddle | Low **Wobble** |
| `sfx-pickup.mp3` | Generic pickup | Quick **Pop** |
| `sfx-near-star.mp3` | Star nearby | Quiet **Shimmer** |

## Mix tips

- Normalize peaks around **-3 dB**  
- Music loops **under 2 MB** each for fast PWA load  
- SFX **under 1 second** where possible  
- Export at **44.1 kHz**  

## Legal note

Music you compose in GarageBand on your Mac is **your original work** (Apple’s bundled loops are licensed for your projects; avoid third-party content you do not own).
