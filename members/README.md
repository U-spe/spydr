# Spydr Members

The member area lives entirely under `/members`. It uses Spydr's existing global menu, theme engine, fonts, Remix Icons, and monochrome styling.

## Included

- Supabase email/password sign-up, sign-in, sign-out, password reset, and recovery-password update flow.
- Responsive member dashboard with a Vortex-style sidebar, top profile control, welcome panel, summary cards, pinned apps, friends panel, and activity.
- Editable display name, HTTPS avatar URL, short bio, status, and accent color.
- App search, category filters, pinned shortcuts, and local fallback storage.
- Member invite URLs, friend requests, request approval, friend removal, and friend list.
- First-visit walkthrough, compact layout, reduced motion, and account preferences.
- TypeScript member-domain types and normalization helpers under `src/`.
- Python catalog builder and structural validator under `tools/`.

## Supabase setup

The client uses the same Supabase project and public publishable key already used by Spydr chat. The key is intended for browser use; row-level security is the security boundary.

1. Open the Supabase SQL Editor for the Spydr project.
2. Run the complete contents of `members/supabase.sql`.
3. In Supabase Authentication, configure the site's allowed redirect URLs to include `https://YOUR-SPYDR-DOMAIN/members/` and your local development URL if used.
4. Confirm email delivery is configured. When email confirmation is enabled, new accounts must confirm their email before signing in.
5. Test with two separate member accounts before relying on friend requests.

The SQL creates the member profile, bookmarks, friendship, friend-request, and activity tables. Every table has RLS enabled. Profiles are visible to signed-in members; bookmarks and activity are owner-only; friend request and friendship access is restricted to the involved account. Friend mutations run through SECURITY DEFINER RPC functions that verify the authenticated user.

## Safe fallback behavior

Authentication works independently of the member tables. Until the SQL is applied, profile edits are saved to Supabase Auth user metadata, and bookmarks/activity fall back to this browser. The friends UI will show an actionable setup error in the console and remain empty; it does not fabricate people or counts.

Avatar URLs must use HTTPS. Member app routes are same-origin paths in `data/apps.json`. Do not put service-role keys in browser code.

## Python tools

Run from the repository root:

```bash
python members/tools/validate.py
python members/tools/build_catalog.py
```

The validator checks page anchors, app routes, and RLS coverage. The catalog builder emits a compact search index from the app manifest.
