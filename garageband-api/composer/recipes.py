"""Dream Maze composition recipes → MIDI note data for GarageBand import."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class Recipe:
    id: str
    title: str
    bpm: int
    bars: int
    key_root: int  # MIDI note number for root (C4=60)
    program: int  # General MIDI program (for reference in GB)
    mood: str
    output_filename: str
    chord_degrees: tuple[int, ...]
    arpeggio: bool = True
    bass: bool = True


RECIPES: dict[str, Recipe] = {
    "music-garden": Recipe(
        id="music-garden",
        title="Moon Garden Loop",
        bpm=84,
        bars=16,
        key_root=57,  # A3
        program=88,
        mood="purple moon garden",
        output_filename="music-garden.mp3",
        chord_degrees=(0, 5, 9, 7),
        arpeggio=True,
        bass=True,
    ),
    "music-nebula": Recipe(
        id="music-nebula",
        title="Nebula Hall Loop",
        bpm=92,
        bars=16,
        key_root=50,  # D3
        program=88,
        mood="cool space halls",
        output_filename="music-nebula.mp3",
        chord_degrees=(0, 3, 7, 10),
        arpeggio=True,
        bass=True,
    ),
    "music-atmosphere": Recipe(
        id="music-atmosphere",
        title="Deep Dream Atmosphere",
        bpm=72,
        bars=24,
        key_root=46,  # A#2 / Bb2 area
        program=89,
        mood="deep dream hub",
        output_filename="music-atmosphere.mp3",
        chord_degrees=(0, 4, 7, 3),
        arpeggio=True,
        bass=True,
    ),
    "music-victory": Recipe(
        id="music-victory",
        title="Victory Sting",
        bpm=100,
        bars=4,
        key_root=60,
        program=80,
        mood="level clear fanfare",
        output_filename="music-victory.mp3",
        chord_degrees=(0, 4, 7, 12),
        arpeggio=False,
        bass=False,
    ),
    "sfx-star": Recipe(
        id="sfx-star",
        title="Star Collect",
        bpm=120,
        bars=1,
        key_root=72,
        program=81,
        mood="sparkle",
        output_filename="sfx-star.mp3",
        chord_degrees=(0, 4, 7),
        arpeggio=False,
        bass=False,
    ),
    "sfx-gate": Recipe(
        id="sfx-gate",
        title="Gate Tick",
        bpm=90,
        bars=1,
        key_root=48,
        program=32,
        mood="gate pulse",
        output_filename="sfx-gate.mp3",
        chord_degrees=(0, 7),
        arpeggio=False,
        bass=True,
    ),
    "sfx-gate-ready": Recipe(
        id="sfx-gate-ready",
        title="Gate Ready",
        bpm=96,
        bars=2,
        key_root=55,
        program=46,
        mood="bright chime",
        output_filename="sfx-gate-ready.mp3",
        chord_degrees=(0, 4, 7, 11),
        arpeggio=False,
        bass=False,
    ),
    "sfx-puddle": Recipe(
        id="sfx-puddle",
        title="Shadow Puddle",
        bpm=80,
        bars=1,
        key_root=40,
        program=38,
        mood="dull wobble",
        output_filename="sfx-puddle.mp3",
        chord_degrees=(0, 3),
        arpeggio=False,
        bass=True,
    ),
    "sfx-pickup": Recipe(
        id="sfx-pickup",
        title="Pickup Pop",
        bpm=110,
        bars=1,
        key_root=67,
        program=81,
        mood="quick pop",
        output_filename="sfx-pickup.mp3",
        chord_degrees=(0, 7),
        arpeggio=False,
        bass=False,
    ),
    "sfx-near-star": Recipe(
        id="sfx-near-star",
        title="Near Star Shimmer",
        bpm=100,
        bars=1,
        key_root=64,
        program=81,
        mood="quiet shimmer",
        output_filename="sfx-near-star.mp3",
        chord_degrees=(0, 4),
        arpeggio=True,
        bass=False,
    ),
}


def semitone(root: int, degree: int) -> int:
    return root + degree


def recipe_to_notes(recipe: Recipe, ticks_per_beat: int = 480) -> list[tuple[int, int, int, int]]:
    notes: list[tuple[int, int, int, int]] = []
    beats_per_bar = 4
    total_beats = recipe.bars * beats_per_bar

    for bar in range(recipe.bars):
        degree = recipe.chord_degrees[bar % len(recipe.chord_degrees)]
        root = semitone(recipe.key_root, degree)
        bar_start = bar * beats_per_bar * ticks_per_beat

        if recipe.bass and beats_per_bar >= 4:
            notes.append((root - 12, bar_start, ticks_per_beat * 2, 72))
            notes.append((root - 12, bar_start + ticks_per_beat * 2, ticks_per_beat * 2, 68))

        chord = [root, root + 4, root + 7]
        if recipe.id == "music-victory" or recipe.id.startswith("sfx-"):
            chord = [root, root + 4, root + 7, root + 12]

        hold = int(ticks_per_beat * (3.5 if recipe.bars > 2 else 1.2))
        for pitch in chord:
            notes.append((pitch, bar_start, hold, 58 if recipe.id.startswith("sfx-") else 52))

        if recipe.arpeggio:
            step = ticks_per_beat // 2
            for beat in range(beats_per_bar):
                for idx, pitch in enumerate(chord):
                    start = bar_start + beat * ticks_per_beat + idx * step
                    notes.append((pitch + 12, start, step, 44))

    if recipe.id.startswith("sfx-"):
        return notes[:12]

    return notes


def recipe_as_json(recipe: Recipe) -> dict[str, Any]:
    return {
        "id": recipe.id,
        "title": recipe.title,
        "bpm": recipe.bpm,
        "bars": recipe.bars,
        "mood": recipe.mood,
        "outputFilename": recipe.output_filename,
        "garageBandHints": {
            "tempo": recipe.bpm,
            "suggestedInstruments": [
                "Dreamy Pad",
                "Bell",
                "Soft Piano",
                "Electric Bass",
            ],
            "program": recipe.program,
        },
    }


def list_recipes() -> list[dict[str, Any]]:
    return [recipe_as_json(r) for r in RECIPES.values()]
