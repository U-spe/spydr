#!/usr/bin/env python3
"""Validate and produce a compact, sorted app search index."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "apps.json"
OUTPUT = ROOT / "data" / "search-index.json"


def main() -> None:
    payload = json.loads(SOURCE.read_text(encoding="utf-8"))
    apps = payload.get("apps", [])
    normalized = []
    seen = set()
    for app in apps:
        app_id = str(app["id"]).strip()
        if not app_id or app_id in seen:
            raise ValueError(f"duplicate or empty app id: {app_id!r}")
        seen.add(app_id)
        normalized.append({
            "id": app_id,
            "name": str(app["name"]).strip(),
            "terms": " ".join((str(app["name"]), str(app.get("description", "")), str(app.get("category", "")))).lower(),
            "href": str(app["href"]),
        })
    OUTPUT.write_text(json.dumps({"version": 1, "apps": normalized}, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(normalized)} member app search entries to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
