"""GarageBand bridge: open MIDI/projects and export via UI automation."""

from __future__ import annotations

import subprocess
import time
from pathlib import Path


GARAGEBAND_APP = "/Applications/GarageBand.app"
PROCESS_NAME = "GarageBand"


def garageband_installed() -> bool:
    return Path(GARAGEBAND_APP).exists()


def run_applescript(script: str, timeout: int = 120) -> str:
    result = subprocess.run(
        ["osascript", "-e", script],
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "AppleScript failed")
    return result.stdout.strip()


def open_in_garageband(path: Path) -> None:
    if not garageband_installed():
        raise RuntimeError("GarageBand is not installed at /Applications/GarageBand.app")
    path = path.resolve()
    if not path.exists():
        raise FileNotFoundError(path)
    run_applescript(
        f'''
        tell application "GarageBand"
            activate
            open POSIX file "{path}"
        end tell
        '''
    )
    time.sleep(2.5)


def activate_garageband() -> None:
    run_applescript('tell application "GarageBand" to activate')
    time.sleep(0.8)


def export_song_to_disk(
    *,
    export_name: str,
    output_dir: Path,
    format_label: str = "MP3",
) -> Path:
    """
    Drives Share → Export Song to Disk via Accessibility.
    Requires Automation permission for Terminal/Python → GarageBand.
    """
    if not garageband_installed():
        raise RuntimeError("GarageBand is not installed")

    output_dir = output_dir.resolve()
    output_dir.mkdir(parents=True, exist_ok=True)
    safe_name = export_name.replace('"', "'")
    safe_dir = str(output_dir).replace('"', "'")
    format_label = format_label.upper()

    script = f'''
    tell application "GarageBand" to activate
    delay 1.2
    tell application "System Events"
        tell process "{PROCESS_NAME}"
            set frontmost to true
            try
                click menu item "Export Song to Disk…" of menu "Song" of menu item "Song" of menu "Share" of menu bar 1
            on error
                try
                    click menu item "Export Song to Disk" of menu "Song" of menu item "Song" of menu "Share" of menu bar 1
                on error
                    click menu item "Export Song to Disk…" of menu 1 of menu item "Export Song to Disk…" of menu "File" of menu bar 1
                end try
            end try
            delay 1.5
            set exportSheet to window 1 whose name contains "Export"
            tell exportSheet
                try
                    set value of text field 1 to "{safe_name}"
                end try
                try
                    click radio button "{format_label}" of group 1
                on error
                    try
                        click radio button "{format_label}"
                    end try
                end try
                delay 0.4
                click button "Export"
            end tell
            delay 1.2
            try
                set savePanel to sheet 1 of window 1
                tell savePanel
                    keystroke "g" using {{command down, shift down}}
                    delay 0.6
                    keystroke "{safe_dir}"
                    keystroke return
                    delay 0.5
                    keystroke return
                end tell
            on error
                keystroke return
            end try
            delay 2
        end tell
    end tell
    return "ok"
    '''

    run_applescript(script, timeout=180)
    time.sleep(1.5)

    candidates = list(output_dir.glob(f"{export_name}*"))
    mp3 = output_dir / f"{export_name}.mp3"
    if mp3.exists():
        return mp3
    if candidates:
        return max(candidates, key=lambda p: p.stat().st_mtime)
    raise FileNotFoundError(
        f"Export finished but no file found in {output_dir}. "
        "Complete the save dialog manually or grant Accessibility permission."
    )


def new_empty_project() -> None:
    """Opens GarageBand with a fresh empty project (user may need to confirm template)."""
    if not garageband_installed():
        raise RuntimeError("GarageBand is not installed")
    run_applescript(
        '''
        tell application "GarageBand"
            activate
            try
                close every document saving no
            end try
        end tell
        delay 0.5
        tell application "System Events"
            tell process "GarageBand"
                try
                    click button "Empty Project" of window 1
                on error
                    -- Project chooser already dismissed or different UI version
                end try
            end tell
        end tell
        '''
    )
    time.sleep(2)
