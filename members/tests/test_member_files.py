#!/usr/bin/env python3
"""Lightweight regression checks for the static member dashboard."""

import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class MemberFilesTests(unittest.TestCase):
    def test_catalog_routes_are_local(self):
        payload = json.loads((ROOT / "data" / "apps.json").read_text(encoding="utf-8"))
        ids = [app["id"] for app in payload["apps"]]
        self.assertEqual(len(ids), len(set(ids)))
        for app in payload["apps"]:
            self.assertTrue(app["href"].startswith("/"))
            self.assertFalse(app["href"].startswith("//"))

    def test_sensitive_tables_enable_rls(self):
        sql = (ROOT / "supabase.sql").read_text(encoding="utf-8").lower()
        for table in ("member_profiles", "member_bookmarks", "member_friend_requests", "member_friendships", "member_activity"):
            self.assertIn(f"alter table public.{table} enable row level security", sql)

    def test_runtime_does_not_contain_service_role_key(self):
        runtime = (ROOT / "js" / "global.js").read_text(encoding="utf-8").lower()
        self.assertNotIn("service_role", runtime)
        self.assertIn("signInWithPassword", runtime)
        self.assertIn("resetPasswordForEmail", runtime)

    def test_avatar_urls_require_https(self):
        runtime = (ROOT / "js" / "member-core.js").read_text(encoding="utf-8")
        self.assertIn('parsed.protocol !== "https:"', runtime)

    def test_all_member_views_are_present(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        for page in ("dashboard", "apps", "friends", "profile", "settings"):
            self.assertRegex(html, rf'data-view="{page}"')

    def test_auth_recovery_form_exists(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('id="recovery-form"', html)


if __name__ == "__main__":
    unittest.main()
