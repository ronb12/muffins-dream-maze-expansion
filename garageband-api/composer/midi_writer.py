"""Minimal Standard MIDI File writer (stdlib only)."""

from __future__ import annotations

import struct
from pathlib import Path
from typing import Iterable


def _vlq(value: int) -> bytes:
    buffer = value & 0x7F
    out = []
    while (value := value >> 7) > 0:
        buffer <<= 8
        buffer |= ((value & 0x7F) | 0x80)
        out.insert(0, buffer & 0xFF)
    out.append(buffer & 0x7F)
    return bytes(out)


def _meta_tempo(bpm: int) -> bytes:
    us_per_quarter = int(60_000_000 / max(1, bpm))
    return b"\xFF\x51\x03" + struct.pack(">I", us_per_quarter)[1:]


def _meta_track_name(name: str) -> bytes:
    data = name.encode("utf-8", errors="replace")[:127]
    return b"\xFF\x03" + bytes([len(data)]) + data


def _meta_end() -> bytes:
    return b"\xFF\x2F\x00"


def _note_events(
    notes: Iterable[tuple[int, int, int, int]],
    ticks_per_beat: int,
) -> bytes:
    """
    notes: (midi_pitch, start_tick, duration_ticks, velocity)
    Emits note on/off pairs sorted by time.
    """
    events: list[tuple[int, bytes]] = []
    for pitch, start, duration, velocity in notes:
        events.append((start, bytes([0x90, pitch & 0x7F, velocity & 0x7F])))
        events.append((start + duration, bytes([0x80, pitch & 0x7F, 0x40])))
    events.sort(key=lambda item: item[0])

    out = bytearray()
    last_tick = 0
    for tick, payload in events:
        delta = tick - last_tick
        out.extend(_vlq(max(0, delta)))
        out.extend(payload)
        last_tick = tick
    out.extend(_vlq(0))
    out.extend(_meta_end())
    return bytes(out)


def write_midi(
    path: Path,
    *,
    notes: Iterable[tuple[int, int, int, int]],
    bpm: int = 84,
    track_name: str = "Dream Maze",
    ticks_per_beat: int = 480,
) -> Path:
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)

    track_data = bytearray()
    track_data.extend(_meta_track_name(track_name))
    track_data.extend(_meta_tempo(bpm))
    track_data.extend(_note_events(notes, ticks_per_beat))

    track_chunk = b"MTrk" + struct.pack(">I", len(track_data)) + bytes(track_data)
    header = b"MThd" + struct.pack(">IHHH", 6, 0, 1, ticks_per_beat)
    body = header + track_chunk

    path.write_bytes(body)
    return path
