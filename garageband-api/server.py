#!/usr/bin/env python3
"""
GarageBand Compose API — local HTTP server for Dream Maze audio.

  python3 garageband-api/server.py
  curl http://127.0.0.1:8767/api/health
"""

from __future__ import annotations

import json
import sys
import traceback
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

API_ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(API_ROOT))

from bridge.garageband_bridge import (  # noqa: E402
    activate_garageband,
    export_song_to_disk,
    garageband_installed,
    new_empty_project,
    open_in_garageband,
)
from compose_service import AUDIO_DIR, STAGING, compose_all, compose_track, install_to_game  # noqa: E402
from composer.recipes import RECIPES, list_recipes  # noqa: E402

HOST = "127.0.0.1"
PORT = 8767


def _json_response(handler: BaseHTTPRequestHandler, status: int, payload: dict) -> None:
    body = json.dumps(payload, indent=2).encode("utf-8")
    handler.send_response(status)
    handler.send_header("Content-Type", "application/json")
    handler.send_header("Access-Control-Allow-Origin", "*")
    handler.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    handler.send_header("Access-Control-Allow-Headers", "Content-Type")
    handler.send_header("Content-Length", str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


def _read_json(handler: BaseHTTPRequestHandler) -> dict:
    length = int(handler.headers.get("Content-Length", 0))
    if length <= 0:
        return {}
    return json.loads(handler.rfile.read(length).decode("utf-8"))


class GarageBandAPIHandler(BaseHTTPRequestHandler):
    server_version = "GarageBandComposeAPI/1.0"

    def log_message(self, fmt: str, *args) -> None:
        print(f"[api] {fmt % args}")

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:
        try:
            path = urlparse(self.path).path
            if path in ("/", "/api"):
                _json_response(
                    self,
                    200,
                    {
                        "name": "GarageBand Compose API",
                        "version": "1.0",
                        "docs": "garageband-api/README.md",
                        "endpoints": [
                            "GET /api/health",
                            "GET /api/recipes",
                            "POST /api/compose",
                            "POST /api/compose/all",
                            "POST /api/garageband/open",
                            "POST /api/garageband/activate",
                            "POST /api/garageband/new",
                            "POST /api/garageband/export",
                            "POST /api/pipeline/compose-open",
                        ],
                    },
                )
                return
            if path == "/api/health":
                _json_response(
                    self,
                    200,
                    {
                        "ok": True,
                        "garageBandInstalled": garageband_installed(),
                        "stagingDir": str(STAGING.resolve()),
                        "audioDir": str(AUDIO_DIR.resolve()),
                    },
                )
                return
            if path == "/api/recipes":
                _json_response(self, 200, {"tracks": list_recipes()})
                return
            _json_response(self, 404, {"error": "Not found", "path": path})
        except Exception as exc:
            _json_response(self, 500, {"error": str(exc), "trace": traceback.format_exc()})

    def do_POST(self) -> None:
        try:
            path = urlparse(self.path).path
            body = _read_json(self)

            if path == "/api/compose":
                track = body.get("track") or body.get("trackId")
                if not track:
                    _json_response(self, 400, {"error": "Missing track or trackId"})
                    return
                meta = compose_track(track, bpm=body.get("bpm"), bars=body.get("bars"))
                result = {"ok": True, "composed": meta}
                if body.get("openInGarageBand", False):
                    open_in_garageband(Path(meta["midiPath"]))
                    result["garageBand"] = {"ok": True, "opened": meta["midiPath"]}
                _json_response(self, 200, result)
                return

            if path == "/api/compose/all":
                composed = compose_all()
                if body.get("openInGarageBand"):
                    for item in composed:
                        open_in_garageband(Path(item["midiPath"]))
                _json_response(self, 200, {"ok": True, "count": len(composed), "composed": composed})
                return

            if path == "/api/garageband/activate":
                activate_garageband()
                _json_response(self, 200, {"ok": True, "message": "GarageBand activated"})
                return

            if path == "/api/garageband/new":
                new_empty_project()
                _json_response(self, 200, {"ok": True, "message": "New GarageBand project requested"})
                return

            if path == "/api/garageband/open":
                track = body.get("track")
                midi_path = body.get("midiPath")
                if track and not midi_path:
                    meta = compose_track(track)
                    midi_path = meta["midiPath"]
                if not midi_path:
                    _json_response(self, 400, {"error": "Provide track or midiPath"})
                    return
                open_in_garageband(Path(midi_path))
                _json_response(self, 200, {"ok": True, "opened": str(Path(midi_path).resolve())})
                return

            if path == "/api/garageband/export":
                track = body.get("track")
                recipe = RECIPES.get(track) if track else None
                filename = body.get("filename") or (recipe.output_filename if recipe else None)
                if not filename:
                    _json_response(self, 400, {"error": "Provide track or filename"})
                    return
                export_name = Path(filename).stem
                out_dir = Path(body.get("outputDir", AUDIO_DIR))
                try:
                    exported = export_song_to_disk(
                        export_name=export_name,
                        output_dir=out_dir,
                        format_label=body.get("format", "MP3"),
                    )
                    result = {"ok": True, "exported": str(exported)}
                    if body.get("installToGame", True):
                        result["install"] = install_to_game(filename, exported)
                    _json_response(self, 200, result)
                except Exception as exc:
                    _json_response(
                        self,
                        200,
                        {
                            "ok": False,
                            "error": str(exc),
                            "hint": "Grant Accessibility to your terminal app, or export manually in GarageBand.",
                            "manualSteps": [
                                "Share → Export Song to Disk",
                                f"Save as {filename} in {out_dir}",
                            ],
                        },
                    )
                return

            if path == "/api/pipeline/compose-open":
                track = body.get("track")
                if not track:
                    _json_response(self, 400, {"error": "Missing track"})
                    return
                meta = compose_track(track, bpm=body.get("bpm"), bars=body.get("bars"))
                gb = {"ok": True}
                try:
                    open_in_garageband(Path(meta["midiPath"]))
                    gb["opened"] = meta["midiPath"]
                except Exception as exc:
                    gb = {"ok": False, "error": str(exc)}
                _json_response(
                    self,
                    200,
                    {
                        "ok": True,
                        "composed": meta,
                        "garageBand": gb,
                        "nextSteps": [
                            "In GarageBand: assign Software Instruments to MIDI regions",
                            "Mix and add optional drums",
                            f'POST /api/garageband/export with {{"track":"{track}","installToGame":true}}',
                        ],
                    },
                )
                return

            _json_response(self, 404, {"error": "Not found", "path": path})
        except FileNotFoundError as exc:
            _json_response(self, 404, {"error": str(exc)})
        except KeyError as exc:
            _json_response(self, 400, {"error": str(exc)})
        except Exception as exc:
            _json_response(self, 500, {"error": str(exc), "trace": traceback.format_exc()})


def main() -> None:
    STAGING.mkdir(parents=True, exist_ok=True)
    httpd = ThreadingHTTPServer((HOST, PORT), GarageBandAPIHandler)
    print(f"GarageBand Compose API → http://{HOST}:{PORT}")
    print("Accessibility required for export automation (System Settings → Privacy).")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
