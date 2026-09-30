import json
import os
import re
import time
from pathlib import Path

import yt_dlp


BASE_DIR = Path(__file__).resolve().parent

DIST_DIR = BASE_DIR / "dist"
LOG_DIR = BASE_DIR / "logs"

DIST_DIR.mkdir(
    parents=True,
    exist_ok=True
)

LOG_DIR.mkdir(
    parents=True,
    exist_ok=True
)


VIDEO_ID_RE = re.compile(
    r"^[A-Za-z0-9_-]{11}$"
)


def get_server_url():
    return os.environ.get(
        "YT_MEDIA_SERVER_URL",
        "http://127.0.0.1:5050"
    ).rstrip("/")


def get_allowed_ids():

    raw = os.environ.get(
        "YT_TEST_VIDEO_IDS",
        ""
    )

    return {
        value.strip()
        for value
        in raw.split(",")
        if value.strip()
    }


def valid_video_id(
    video_id
):

    return bool(
        VIDEO_ID_RE.fullmatch(
            str(video_id or "")
        )
    )


def video_allowed(
    video_id
):

    return (
        video_id
        in get_allowed_ids()
    )


def get_video_path(
    video_id
):

    return (
        DIST_DIR /
        f"{video_id}.mp4"
    )


def public_video_url(
    video_id
):

    return (
        f"{get_server_url()}"
        f"/media/"
        f"{video_id}.mp4"
    )


def log_event(
    data
):

    data = {
        "timestamp":
            int(time.time()),
        **data
    }

    path = (
        LOG_DIR /
        "events.jsonl"
    )

    with path.open(
        "a",
        encoding="utf-8"
    ) as handle:

        handle.write(
            json.dumps(
                data,
                ensure_ascii=False
            )
        )

        handle.write(
            "\n"
        )


def download_video(
    video_id
):

    if not valid_video_id(
        video_id
    ):

        return {
            "status": False,
            "error":
                "Invalid video id."
        }


    if not video_allowed(
        video_id
    ):

        log_event({
            "video_id":
                video_id,

            "event":
                "blocked",

            "reason":
                "not_allowlisted"
        })

        return {
            "status": False,
            "error":
                "Video is not in the authorized test allowlist."
        }


    destination =
        get_video_path(
            video_id
        )


    if destination.exists():

        return {
            "status": True,
            "cached": True,
            "url":
                public_video_url(
                    video_id
                )
        }


    source_url = (
        "https://www.youtube.com/watch?v="
        + video_id
    )


    output_template = str(
        DIST_DIR /
        "%(id)s.%(ext)s"
    )


    options = {

        "format":
            (
                "bestvideo[ext=mp4]"
                "+bestaudio[ext=m4a]"
                "/"
                "best[ext=mp4]"
                "[vcodec!=none]"
                "[acodec!=none]"
            ),

        "merge_output_format":
            "mp4",

        "outtmpl":
            output_template,

        "noplaylist":
            True,

        "quiet":
            True,

        "no_warnings":
            True,

        "overwrites":
            False
    }


    try:

        with yt_dlp.YoutubeDL(
            options
        ) as ydl:

            info =
                ydl.extract_info(
                    source_url,
                    download=True
                )


        if not destination.exists():

            candidates = list(
                DIST_DIR.glob(
                    f"{video_id}.*"
                )
            )


            mp4_candidate = next(
                (
                    item
                    for item
                    in candidates
                    if item.suffix.lower()
                    == ".mp4"
                ),
                None
            )


            if mp4_candidate:

                if (
                    mp4_candidate
                    != destination
                ):

                    mp4_candidate.replace(
                        destination
                    )


        if not destination.exists():

            return {
                "status": False,
                "error":
                    "MP4 output was not created."
            }


        size =
            destination.stat().st_size


        result = {

            "status":
                True,

            "cached":
                False,

            "url":
                public_video_url(
                    video_id
                ),

            "video_id":
                video_id,

            "title":
                info.get(
                    "title"
                ),

            "uploader":
                info.get(
                    "uploader"
                ),

            "duration":
                info.get(
                    "duration"
                ),

            "thumbnail":
                info.get(
                    "thumbnail"
                ),

            "size":
                size,

            "format":
                "mp4"
        }


        log_event({
            "video_id":
                video_id,

            "event":
                "prepared",

            "size":
                size,

            "title":
                info.get(
                    "title"
                )
        })


        return result


    except Exception as error:

        print(
            "converter error:",
            error
        )


        log_event({
            "video_id":
                video_id,

            "event":
                "error",

            "error":
                str(error)
        })


        return {
            "status": False,
            "error":
                str(error)
        }
