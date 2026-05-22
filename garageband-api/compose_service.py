"""High-level compose helpers used by the HTTP API."""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from composer.midi_writer import write_midi
from composer.recipes import RECIPES, list_recipes, recipe_as_json, recipe_to_notes

API_ROOT = Path(__file__).resolve().parent
PROJECT_ROOT = API_ROOT.parent
STAGING = PROJECT_ROOT / "audio" / "staging"
AUDIO_DIR = PROJECT_ROOT / "audio"


def compose_track(
    track_id: str,
    *,
    bpm: int | None = None,
    bars: int | None = None,
) -> dict[str, Any]:
    if track_id not in RECIPES:
        raise KeyError(f"Unknown track: {track_id}")

    recipe = RECIPES[track_id]
    if bpm is not None or bars is not None:
        from dataclasses import replace

        recipe = replace(
            recipe,
            bpm=int(bpm) if bpm is not None else recipe.bpm,
            bars=int(bars) if bars is not None else recipe.bars,
        )

    notes = recipe_to_notes(recipe)
    STAGING.mkdir(parents=True, exist_ok=True)
    mid_path = STAGING / f"{track_id}.mid"
    write_midi(mid_path, notes=notes, bpm=recipe.bpm, track_name=recipe.title)

    meta = recipe_as_json(recipe)
    meta["midiPath"] = str(mid_path.resolve())
    meta["midiRelative"] = f"audio/staging/{track_id}.mid"
    meta["noteCount"] = len(notes)
    score_path = STAGING / f"{track_id}.score.json"
    score_path.write_text(json.dumps(meta, indent=2), encoding="utf-8")
    meta["scorePath"] = str(score_path)
    return meta


def compose_all() -> list[dict[str, Any]]:
    return [compose_track(tid) for tid in RECIPES]


def install_to_game(filename: str, source: Path | None = None) -> dict[str, str]:
    dest = AUDIO_DIR / filename
    if source and source.is_file():
        dest.write_bytes(source.read_bytes())
    else:
        staged = STAGING / filename
        if not staged.is_file():
            raise FileNotFoundError(f"No file at {source or staged}")
        dest.write_bytes(staged.read_bytes())
    return {"status": "installed", "path": str(dest.resolve())}
