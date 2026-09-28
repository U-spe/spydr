import os
from pathlib import Path

from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory
)

from flask_cors import CORS

from converter import (
    delete_video,
    download_video,
    extract_info,
    get_allowed_ids
)


BASE_DIR = Path(
    __file__
).resolve().parent

DIST_DIR = (
    BASE_DIR /
    "dist"
)

DIST_DIR.mkdir(
    parents=True,
    exist_ok=True
)


app = Flask(__name__)

CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)


@app.get("/")
def home():

    return jsonify({
        "service":
            "Spydr YT Player Research Server",

        "status":
            "online",

        "version":
            "1.0.0",

        "allowed_video_count":
            len(get_allowed_ids())
    })


@app.get("/health")
def health():

    return jsonify({
        "status":
            True,

        "service":
            "spydr-yt-player"
    })


@app.get("/api")
def api_video():

    video_id = (
        request.args
        .get(
            "vid",
            ""
        )
        .strip()
    )

    result = download_video(
        video_id
    )

    status_code = (
        200
        if result.get("status")
        else 400
    )

    return jsonify(
        result
    ), status_code


@app.get("/api/info")
def api_info():

    video_id = (
        request.args
        .get(
            "vid",
            ""
        )
        .strip()
    )

    result = extract_info(
        video_id
    )

    status_code = (
        200
        if result.get("status")
        else 400
    )

    return jsonify(
        result
    ), status_code


@app.delete("/api/video/<video_id>")
def api_delete(video_id):

    result = delete_video(
        video_id
    )

    return jsonify(
        result
    )


@app.get("/media/<path:filename>")
def media(filename):

    return send_from_directory(
        DIST_DIR,
        filename,

        conditional=True
    )


if __name__ == "__main__":

    port = int(
        os.environ.get(
            "PORT",
            "5050"
        )
    )

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
