
import json
import os
import re
import time
from pathlib import Path
from urllib.request import Request, urlopen

import yt_dlp


BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"
LOG_DIR = BASE_DIR / "logs"

DIST_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)

VIDEO_ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")

YT_JSON_URL = os.environ.get(
    "YT_JSON_URL",
    "https://raw.githubusercontent.com/U-spe/spydr/main/assets/json/yt.json",
).strip()

CACHE_SECONDS = max(
    0,
    int(os.environ.get("YT_JSON_CACHE_SECONDS", "60")),
)

_allowlist_cache = {
    "expires_at": 0.0,
    "ids": set(),
}


def get_server_url():
    return os.environ.get(
        "YT_MEDIA_SERVER_URL",
        "http://127.0.0.1:5050",
    ).rstrip("/")


def parse_video_ids(data):
    if isinstance(data, dict):
        for key in ("videos", "items", "data"):
            if isinstance(data.get(key), list):
                data = data[key]
                break

    if not isinstance(data, list):
        raise ValueError("yt.json must contain a list.")

    ids = set()

    for item in data:
        if isinstance(item, str):
            video_id = item.strip()
        elif isinstance(item, dict):
            video_id = str(item.get("id") or "").strip()
        else:
            continue

        if VIDEO_ID_RE.fullmatch(video_id):
            ids.add(video_id)

    if not ids:
        raise ValueError("yt.json contains no valid video IDs.")

    return ids


def fetch_video_ids():
    request = Request(
        YT_JSON_URL,
        headers={"User-Agent": "Spydr-Media-Server/1.0"},
    )

    with urlopen(request, timeout=15) as response:
        data = json.loads(response.read().decode("utf-8"))

    return parse_video_ids(data)


def get_allowed_ids():
    now = time.monotonic()

    if now < _allowlist_cache["expires_at"]:
        return set(_allowlist_cache["ids"])

    try:
        ids = fetch_video_ids()

    except Exception as error:
        print("yt.json fetch failed:", error)

        # Use a previously loaded list if GitHub temporarily fails.
        if _allowlist_cache["ids"]:
            _allowlist_cache["expires_at"] = (
                now + CACHE_SECONDS
            )
            return set(_allowlist_cache["ids"])

        raise RuntimeError(
            "Cannot load authorized video IDs from yt.json."
        ) from error

    _allowlist_cache["ids"] = ids
    _allowlist_cache["expires_at"] = now + CACHE_SECONDS

    return set(ids)


def valid_video_id(video_id):
    return bool(
        VIDEO_ID_RE.fullmatch(str(video_id or ""))
    )


def video_allowed(video_id):
    try:
        return video_id in get_allowed_ids()
    except Exception as error:
        print("Allowlist error:", error)
        return False


def get_video_path(video_id):
    return DIST_DIR / f"{video_id}.mp4"


def public_video_url(video_id):
    return f"{get_server_url()}/media/{video_id}.mp4"


def log_event(data):
    event = {
        "timestamp": int(time.time()),
        **data,
    }

    path = LOG_DIR / "events.jsonl"

    with path.open("a", encoding="utf-8") as handle:
        handle.write(
            json.dumps(event, ensure_ascii=False) + "\n"
        )


def download_video(video_id):
    if not valid_video_id(video_id):
        return {
            "status": False,
            "error": "Invalid video ID.",
        }

    if not video_allowed(video_id):
        log_event({
            "video_id": video_id,
            "event": "blocked",
            "reason": "not_in_yt_json_or_list_unavailable",
        })

        return {
            "status": False,
            "error": (
                "Video is not listed in yt.json, "
                "or the list could not be loaded."
            ),
        }

    destination = get_video_path(video_id)

    if destination.exists():
        return {
            "status": True,
            "cached": True,
            "url": public_video_url(video_id),
        }

    source_url = (
        f"https://www.youtube.com/watch?v={video_id}"
    )

    options = {
        "format": (
            "bestvideo[ext=mp4]+bestaudio[ext=m4a]"
            "/best[ext=mp4][vcodec!=none][acodec!=none]"
        ),
        "merge_output_format": "mp4",
        "outtmpl": str(DIST_DIR / "%(id)s.%(ext)s"),
        "noplaylist": True,
        "quiet": True,
        "no_warnings": True,
        "overwrites": False,
    }

    try:
        with yt_dlp.YoutubeDL(options) as ydl:
            info = ydl.extract_info(
                source_url,
                download=True,
            )

        if not destination.exists():
            candidate = next(
                (
                    path
                    for path in DIST_DIR.glob(f"{video_id}.*")
                    if path.suffix.lower() == ".mp4"
                ),
                None,
            )

            if candidate and candidate != destination:
                candidate.replace(destination)

        if not destination.exists():
            return {
                "status": False,
                "error": "MP4 output was not created.",
            }

        size = destination.stat().st_size

        result = {
            "status": True,
            "cached": False,
            "url": public_video_url(video_id),
            "video_id": video_id,
            "title": info.get("title"),
            "uploader": info.get("uploader"),
            "duration": info.get("duration"),
            "thumbnail": info.get("thumbnail"),
            "size": size,
            "format": "mp4",
        }

        log_event({
            "video_id": video_id,
            "event": "prepared",
            "size": size,
            "title": info.get("title"),
        })

        return result

    except Exception as error:
        print("Converter error:", error)

        log_event({
            "video_id": video_id,
            "event": "error",
            "error": str(error),
        })

        return {
            "status": False,
            "error": str(error),
        }
