import os
from pathlib import Path

from dotenv import load_dotenv

from flask import (
    Flask,
    jsonify,
    request,
    send_from_directory
)

from flask_cors import CORS

from converter import (
    download_video
)


BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
)

ROOT_DIR = (
    BASE_DIR.parent
)

DIST_DIR = (
    BASE_DIR /
    "dist"
)


load_dotenv(
    ROOT_DIR /
    ".env.local"
)


app = Flask(
    __name__
)


CORS(
    app,
    resources={
        r"/*": {
            "origins": "*"
        }
    }
)


@app.get("/")
def root():
    return jsonify({
        "status":
            True,

        "service":
            "spydr-media",

        "port":
            int(
                os.environ.get(
                    "MEDIA_PORT",
                    "5050"
                )
            )
    })


@app.get("/health")
def health():
    return jsonify({
        "status":
            True,

        "service":
            "spydr-media"
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


    result = (
        download_video(
            video_id
        )
    )


    if result.get(
        "status"
    ):
        return jsonify(
            result
        ), 200


    return jsonify(
        result
    ), 400


@app.get("/media/<path:filename>")
def media(
    filename
):

    return send_from_directory(
        DIST_DIR,
        filename,
        conditional=True
    )


if __name__ == "__main__":

    port = int(
        os.environ.get(
            "MEDIA_PORT",
            "5050"
        )
    )


    app.run(
        host="127.0.0.1",
        port=port,
        debug=False
    )
