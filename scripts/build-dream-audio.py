#!/usr/bin/env python3
"""Generate original dream-maze audio assets (replace anytime with GarageBand exports)."""

import math
import struct
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / "audio"
SAMPLE_RATE = 44100


def write_wav(path: Path, samples):
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "w") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(SAMPLE_RATE)
        frames = b"".join(
            struct.pack("<h", max(-32767, min(32767, int(sample * 32767)))) for sample in samples
        )
        handle.writeframes(frames)


def to_mp3(wav_path: Path, mp3_path: Path):
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-i",
            str(wav_path),
            "-codec:a",
            "libmp3lame",
            "-qscale:a",
            "4",
            str(mp3_path),
        ],
        check=True,
        capture_output=True,
    )


def envelope(length, attack=0.02, release=0.08):
    attack_samples = int(attack * SAMPLE_RATE)
    release_samples = int(release * SAMPLE_RATE)
    env = [1.0] * length
    for i in range(min(attack_samples, length)):
        env[i] *= i / max(1, attack_samples)
    for i in range(min(release_samples, length)):
        env[length - 1 - i] *= i / max(1, release_samples)
    return env


def simple_reverb(samples, delay_ms=90, mix=0.22):
    delay = int(SAMPLE_RATE * delay_ms / 1000)
    out = list(samples)
    for i in range(delay, len(out)):
        out[i] += samples[i - delay] * mix
        if i >= delay * 2:
            out[i] += samples[i - delay * 2] * mix * 0.45
    peak = max(abs(v) for v in out) or 1.0
    return [v / peak * 0.9 for v in out]


def render_pad_loop(seconds=24.0, root_hz=110.0, progression=None):
    if progression is None:
        progression = [0, 5, 7, 4]
    beat = 2.4
    total = int(seconds * SAMPLE_RATE)
    out = [0.0] * total
    semitone = lambda n: root_hz * (2 ** (n / 12))

    t = 0
    step = 0
    while t < total:
        chord = progression[step % len(progression)]
        freqs = [semitone(chord), semitone(chord + 4), semitone(chord + 7), semitone(chord + 12)]
        chunk = int(beat * SAMPLE_RATE)
        env = envelope(min(chunk, total - t), 0.35, 0.55)
        for i in range(min(chunk, total - t)):
            phase_t = (t + i) / SAMPLE_RATE
            sample = 0.0
            for idx, freq in enumerate(freqs):
                sample += math.sin(2 * math.pi * freq * phase_t) * (0.11 - idx * 0.015)
            sample += math.sin(2 * math.pi * freq * 0.5 * phase_t) * 0.04
            out[t + i] += sample * env[i] * 0.55
        t += chunk
        step += 1

    # Soft shimmer
    for i in range(total):
        shimmer = math.sin(2 * math.pi * 0.25 * (i / SAMPLE_RATE)) * 0.03
        out[i] = max(-1.0, min(1.0, out[i] + shimmer))

    peak = max(abs(v) for v in out) or 1.0
    return simple_reverb([v / peak * 0.82 for v in out])


def render_sfx(seconds=0.35, freqs=None, slide=0.0):
    freqs = freqs or [520, 780]
    total = int(seconds * SAMPLE_RATE)
    out = []
    env = envelope(total, 0.01, 0.12)
    for i in range(total):
        t = i / SAMPLE_RATE
        f = freqs[0] + (freqs[1] - freqs[0]) * (t / seconds) * slide
        sample = math.sin(2 * math.pi * f * t) * env[i]
        sample += math.sin(2 * math.pi * f * 2 * t) * env[i] * 0.2
        out.append(sample * 0.5)
    peak = max(abs(v) for v in out) or 1.0
    return [v / peak * 0.9 for v in out]


def main():
    victory = render_sfx(0.55, [392, 523.25], slide=0.35)
    victory += [0.0] * int(0.08 * SAMPLE_RATE)
    victory += render_sfx(0.75, [659.25, 880.0], slide=0.15)

    tracks = {
        "music-atmosphere": render_pad_loop(32.0, 98.0, [0, 4, 7, 3]),
        "music-garden": render_pad_loop(32.0, 110.0, [0, 5, 9, 7]),
        "music-nebula": render_pad_loop(32.0, 92.0, [0, 3, 7, 10]),
        "music-victory": victory,
        "sfx-star": render_sfx(0.22, [660, 990]),
        "sfx-gate": render_sfx(0.55, [220, 440]),
        "sfx-gate-ready": render_sfx(0.8, [330, 523.25, 659.25]),
        "sfx-puddle": render_sfx(0.28, [180, 120]),
        "sfx-pickup": render_sfx(0.16, [740, 880]),
        "sfx-near-star": render_sfx(0.12, [520, 620]),
    }

    print("Building dream audio...")
    for name, samples in tracks.items():
        wav_path = AUDIO / f"{name}.wav"
        mp3_path = AUDIO / f"{name}.mp3"
        write_wav(wav_path, samples)
        to_mp3(wav_path, mp3_path)
        print(f"  {mp3_path.name}")

    readme = AUDIO / "GARAGEBAND.md"
    readme.write_text(
        """# Dream Maze Audio (original)

MP3s in this folder power **Start Music**, zone themes, and SFX in the browser game.

Current files were built by `scripts/build-dream-audio.py` (original synthesized loops).
**Replace them with your GarageBand exports** for the final soundtrack.

## Quick GarageBand recipe

Run from the project folder:

```bash
./scripts/open-garageband.sh
```

### Track specs

| File | BPM | Key | Mood | Length |
|------|-----|-----|------|--------|
| `music-garden.mp3` | 82 | A minor | Soft purple dream, music box + pad | 32-bar loop |
| `music-nebula.mp3` | 88 | D minor | Cooler cosmic hall | 32-bar loop |
| `music-atmosphere.mp3` | 76 | F major | Deep menu / late worlds | 32-bar loop |
| `music-victory.mp3` | — | C major | 2–3s rising sting (not a loop) | ~3 seconds |

**SFX** (short, no loop): sparkle (`sfx-star`), gate tick (`sfx-gate`), gate ready (`sfx-gate-ready`), puddle (`sfx-puddle`), pickup (`sfx-pickup`), near-star shimmer (`sfx-near-star`).

### Export steps

1. **GarageBand → New Project → Software Instrument** @ 44.1 kHz.
2. Use **Dreamy/Arpeggiator** patches, light reverb, no heavy drums.
3. For loops: enable cycle region, bounce 8–32 bars seamlessly.
4. **Share → Export Song to Disk → MP3** (or AAC → convert with Music app).
5. Name exactly as in the table and drop into this `audio/` folder.
6. Hard-refresh the game (Shift+Reload). PWA cache updates on next visit.

### Rebuild placeholders

```bash
python3 scripts/build-dream-audio.py
```
""",
        encoding="utf-8",
    )
    print("Done.")


if __name__ == "__main__":
    main()
