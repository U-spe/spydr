import type { MemberPreferences } from "./types";
import { safeAccent } from "./member-core";

export const DEFAULT_MEMBER_PREFERENCES: Readonly<MemberPreferences> = Object.freeze({
  compact: false,
  reduceMotion: false,
  accent: "#d7d8dc"
});

export function resolveMemberPreferences(metadata: unknown, local: unknown): MemberPreferences {
  const remote = metadata && typeof metadata === "object" ? metadata as Partial<MemberPreferences> : {};
  const device = local && typeof local === "object" ? local as Partial<MemberPreferences> : {};
  const source = { ...device, ...remote };
  return {
    compact: Boolean(source.compact),
    reduceMotion: Boolean(source.reduceMotion),
    accent: safeAccent(source.accent || DEFAULT_MEMBER_PREFERENCES.accent)
  };
}

export function memberPreferencesMetadata(preferences: MemberPreferences): Record<string, unknown> {
  return {
    compact: Boolean(preferences.compact),
    reduceMotion: Boolean(preferences.reduceMotion),
    accent: safeAccent(preferences.accent)
  };
}
