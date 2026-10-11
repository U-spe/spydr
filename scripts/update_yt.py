
import json
import os
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

API_KEY = os.environ.get("YOUTUBE_API_KEY")
REGION_CODE = "US"
MAX_VIDEOS = 10_000

REPO_DIR = Path(__file__).resolve().parent.parent
OUTPUT_FILE = REPO_DIR / "assets" / "json" / "yt.json"


def fetch_all_popular_videos():
    if not API_KEY:
        raise ValueError("YOUTUBE_API_KEY is missing.")

    videos = []
    next_page_token = None

    while len(videos) < MAX_VIDEOS:
        params = {
            "part": "snippet,statistics",
            "chart": "mostPopular",
            "maxResults": 50,
            "regionCode": REGION_CODE,
            "key": API_KEY,
        }

        if next_page_token:
            params["pageToken"] = next_page_token

        url = (
            "https://www.googleapis.com/youtube/v3/videos?"
            + urlencode(params)
        )

        request = Request(
            url,
            headers={"User-Agent": "Spydr-YouTube-Updater/1.0"},
        )

        with urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))

        for item in data.get("items", []):
            snippet = item.get("snippet", {})
            stats = item.get("statistics", {})

            videos.append({
                "id": item["id"],
                "url": f"https://www.youtube.com/watch?v={item['id']}",
                "title": snippet.get("title", ""),
                "channelTitle": snippet.get("channelTitle", ""),
                "publishedAt": snippet.get("publishedAt", ""),
                "description": snippet.get("description", ""),
                "thumbnail": (
                    snippet.get("thumbnails", {})
                    .get("high", {})
                    .get("url", "")
                ),
                "views": stats.get("viewCount", "0"),
                "likes": stats.get("likeCount", "0"),
            })

            if len(videos) >= MAX_VIDEOS:
                break

        next_page_token = data.get("nextPageToken")

        if not next_page_token:
            break

    if not videos:
        raise RuntimeError(
            "YouTube returned no videos. Existing yt.json was preserved."
        )

    return videos


def load_existing_videos():
    if not OUTPUT_FILE.exists():
        return []

    with OUTPUT_FILE.open("r", encoding="utf-8") as file:
        existing = json.load(file)

    if not isinstance(existing, list):
        raise ValueError(
            "Existing yt.json is not a JSON list. "
            "Refusing to overwrite it."
        )

    for video in existing:
        if not isinstance(video, dict) or not video.get("id"):
            raise ValueError(
                "Existing yt.json contains an invalid video entry. "
                "Refusing to overwrite it."
            )

    return existing


def merge_videos(fresh_videos, existing_videos):
    merged = []
    seen_ids = set()

    # Today's entries come first and refresh older metadata.
    for video in fresh_videos + existing_videos:
        video_id = video.get("id")

        if not video_id or video_id in seen_ids:
            continue

        seen_ids.add(video_id)
        merged.append(video)

        if len(merged) >= MAX_VIDEOS:
            break

    return merged


def main():
    # Fetch first. If fetching fails, don't touch the saved JSON.
    fresh_videos = fetch_all_popular_videos()
    existing_videos = load_existing_videos()
    merged_videos = merge_videos(fresh_videos, existing_videos)

    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)

    with OUTPUT_FILE.open("w", encoding="utf-8") as file:
        json.dump(merged_videos, file, indent=2, ensure_ascii=False)
        file.write("\n")

    print(
        f"Merged {len(fresh_videos)} current popular videos with "
        f"{len(existing_videos)} saved videos; "
        f"yt.json now contains {len(merged_videos)} unique videos."
    )


if __name__ == "__main__":
    main()
