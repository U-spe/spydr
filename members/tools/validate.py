#!/usr/bin/env python3
"""Static checks for the Spydr Members area. Run: python members/tools/validate.py"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = (
    ROOT / "index.html",
    ROOT / "css" / "dashboard.css",
    ROOT / "js" / "global.js",
    ROOT / "js" / "globalmenu.js",
    ROOT / "data" / "apps.json",
    ROOT / "supabase.sql",
)
REQUIRED_IDS = {
    "auth-gate", "member-app", "member-sidebar", "member-nav",
    "view-dashboard", "view-apps", "view-friends", "view-profile", "view-settings",
    "auth-form", "profile-form", "friend-add-form", "app-library-grid",
}


def fail(message: str) -> None:
    print("FAIL:", message)
    raise SystemExit(1)


def main() -> None:
    for path in REQUIRED_FILES:
        if not path.is_file():
            fail(f"missing required file: {path.relative_to(ROOT)}")

    html = (ROOT / "index.html").read_text(encoding="utf-8")
    ids = set(re.findall(r'\bid=["\']([^"\']+)["\']', html))
    missing = sorted(REQUIRED_IDS - ids)
    if missing:
        fail("missing page anchors: " + ", ".join(missing))

    catalog = json.loads((ROOT / "data" / "apps.json").read_text(encoding="utf-8"))
    apps = catalog.get("apps", [])
    if not apps:
        fail("app catalog is empty")
    seen = set()
    for app in apps:
        if app.get("id") in seen:
            fail("duplicate app id: " + str(app.get("id")))
        seen.add(app.get("id"))
        href = app.get("href", "")
        if not href.startswith("/") or href.startswith("//"):
            fail("app route must be a same-origin absolute path: " + str(href))

    sql = (ROOT / "supabase.sql").read_text(encoding="utf-8").lower()
    for table in ("member_profiles", "member_bookmarks", "member_friendships", "member_friend_requests", "member_activity"):
        if f"create table if not exists public.{table}" not in sql:
            fail("SQL setup is missing table: " + table)
        if f"alter table public.{table} enable row level security" not in sql:
            fail("RLS is not enabled for: " + table)

    js = (ROOT / "js" / "global.js").read_text(encoding="utf-8")
    for token in ("signInWithPassword", "signUp", "member_send_friend_request", "member_respond_friend_request", "updateUser"):
        if token not in js:
            fail("member runtime is missing expected feature: " + token)

    print(f"OK: {len(apps)} apps, {len(REQUIRED_IDS)} UI anchors, 5 RLS tables.")
    print("Members files are structurally ready. Apply members/supabase.sql to enable synced social data.")


if __name__ == "__main__":
    main()
