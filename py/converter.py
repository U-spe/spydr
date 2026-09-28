import json
import os
import re
import time
from pathlib import Path

import yt_dlp


BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"
LOG_DIR = BASE_DIR / "logs"

DIST_DIR.mkdir(parents=True, exist_ok=True)
LOG_DIR.mkdir(parents=True, exist_ok=True)

SERVER_URL = os.environ.get(
    "YT_MEDIA_SERVER_URL",
    "http://127.0.0.1:5050"
).rstrip("/")

VIDEO_ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")


def get_allowed_ids():
    raw = os.environ.get(
        "YT_TEST_VIDEO_IDS",
        ""
    )

    return {
        item.strip()
        for item in raw.split(",")
        if item.strip()
    }


def is_allowed_video(video_id):
    return video_id in get_allowed_ids()


def validate_video_id(video_id):
    if not video_id:
        return False

    return bool(
        VIDEO_ID_RE.fullmatch(
            str(video_id)
        )
    )


def get_video_path(video_id):
    return DIST_DIR / f"{video_id}.mp4"


def get_video(video_id):
    path = get_video_path(video_id)

    if not path.exists():
        return None

    return (
        f"{SERVER_URL}/media/"
        f"{video_id}.mp4"
    )


def write_log(record):
    log_file = (
        LOG_DIR /
        "converter-events.jsonl"
    )

    with log_file.open(
        "a",
        encoding="utf-8"
    ) as handle:

        handle.write(
            json.dumps(
                record,
                ensure_ascii=False
            )
        )

        handle.write("\n")


def make_result(
    *,
    video_id,
    success,
    error=None,
    **extra
):
    result = {
        "timestamp": int(time.time()),
        "video_id": video_id,
        "status": success
    }

    if error:
        result["error"] = error

    result.update(extra)

    write_log(result)

    return result


def extract_info(video_id):
    """
    Read metadata/formats without downloading.
    """

    if not validate_video_id(video_id):

        return make_result(
            video_id=video_id,
            success=False,
            error="Invalid video id"
        )

    if not is_allowed_video(video_id):

        return make_result(
            video_id=video_id,
            success=False,
            error="Video is not in the authorized test allowlist"
        )

    url = (
        "https://www.youtube.com/watch?v="
        + video_id
    )

    options = {
        "quiet": True,
        "no_warnings": True,
        "skip_download": True
    }

    try:

        with yt_dlp.YoutubeDL(
            options
        ) as ydl:

            info = ydl.extract_info(
                url,
                download=False
            )

        formats = []

        for fmt in info.get(
            "formats",
            []
        ):

            formats.append({
                "format_id":
                    fmt.get("format_id"),

                "extension":
                    fmt.get("ext"),

                "resolution":
                    fmt.get("resolution"),

                "width":
                    fmt.get("width"),

                "height":
                    fmt.get("height"),

                "fps":
                    fmt.get("fps"),

                "video_codec":
                    fmt.get("vcodec"),

                "audio_codec":
                    fmt.get("acodec"),

                "protocol":
                    fmt.get("protocol"),

                "filesize":
                    fmt.get("filesize")
                    or
                    fmt.get(
                        "filesize_approx"
                    )
            })

        return make_result(
            video_id=video_id,
            success=True,

            title=
                info.get("title"),

            uploader=
                info.get("uploader"),

            duration=
                info.get("duration"),

            thumbnail=
                info.get("thumbnail"),

            formats=formats
        )

    except Exception as error:

        return make_result(
            video_id=video_id,
            success=False,
            error=str(error)
        )


def download_video(video_id):
    """
    Download an authorized test video.

    First preference:
      progressive MP4 with audio+video

    Fallback:
      MP4 video + M4A audio merged by ffmpeg
      into an MP4 container.
    """

    if not validate_video_id(video_id):

        return make_result(
            video_id=video_id,
            success=False,
            error="Invalid video id"
        )

    if not is_allowed_video(video_id):

        return make_result(
            video_id=video_id,
            success=False,
            error="Video is not in the authorized test allowlist"
        )

    existing = get_video(video_id)

    if existing:

        return make_result(
            video_id=video_id,
            success=True,
            cached=True,
            url=existing
        )

    source_url = (
        "https://www.youtube.com/watch?v="
        + video_id
    )

    output_template = str(
        DIST_DIR /
        "%(id)s.%(ext)s"
    )

    options = {

        /*
        Progressive MP4 is preferred because
        it already contains audio + video.

        If unavailable, yt-dlp may choose
        separate video/audio tracks which
        ffmpeg merges afterward.
        */

        "format":
            (
                "best[ext=mp4]"
                "[vcodec!=none]"
                "[acodec!=none]"
                "/"
                "bestvideo[ext=mp4]"
                "+bestaudio[ext=m4a]"
            ),

        "merge_output_format":
            "mp4",

        "outtmpl":
            output_template,

        "quiet":
            True,

        "no_warnings":
            True,

        "noplaylist":
            True,

        "overwrites":
            True
    }

    try:

        with yt_dlp.YoutubeDL(
            options
        ) as ydl:

            info = ydl.extract_info(
                source_url,
                download=True
            )

        path = get_video_path(
            video_id
        )

        if not path.exists():

            possible_files = list(
                DIST_DIR.glob(
                    f"{video_id}.*"
                )
            )

            if possible_files:

                produced = possible_files[0]

                if (
                    produced.suffix.lower()
                    == ".mp4"
                ):

                    produced.rename(path)

        if not path.exists():

            return make_result(
                video_id=video_id,
                success=False,
                error=(
                    "Download completed but "
                    "MP4 output was not found"
                )
            )

        size = path.stat().st_size

        public_url = (
            f"{SERVER_URL}/media/"
            f"{video_id}.mp4"
        )

        return make_result(
            video_id=video_id,
            success=True,
            cached=False,

            url=public_url,

            title=
                info.get("title"),

            uploader=
                info.get("uploader"),

            thumbnail=
                info.get("thumbnail"),

            duration=
                info.get("duration"),

            size=size,

            extension="mp4"
        )

    except Exception as error:

        return make_result(
            video_id=video_id,
            success=False,
            error=str(error)
        )


def delete_video(video_id):

    if not validate_video_id(
        video_id
    ):

        return {
            "status": False,
            "error": "Invalid video id"
        }

    path = get_video_path(
        video_id
    )

    if not path.exists():

        return {
            "status": False,
            "error": "Video not found"
        }

    path.unlink()

    write_log({
        "timestamp":
            int(time.time()),

        "video_id":
            video_id,

        "event":
            "delete"
    })

    return {
        "status": True
    }
