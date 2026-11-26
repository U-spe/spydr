import type { MemberProfile, MemberStatus, MemberPreferences } from "./types";

export const MEMBER_STATUSES: readonly MemberStatus[] = ["online", "away", "busy", "invisible"];

export function isValidUUID(value: unknown): value is string {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || "").trim());
}

export function safeAvatarUrl(value: unknown): string {
  try {
    const parsed = new URL(String(value || "").trim());
    return parsed.protocol === "https:" ? parsed.href : "";
  } catch {
    return "";
  }
}

export function safeAccent(value: unknown): string {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? String(value) : "#d7d8dc";
}

export function initials(value: unknown): string {
  const parts = String(value || "Member").trim().split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map(part => part.charAt(0).toUpperCase()).join("") || "M";
}

export function relativeTime(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "just now";
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return Math.floor(seconds / 60) + "m ago";
  if (seconds < 86400) return Math.floor(seconds / 3600) + "h ago";
  if (seconds < 604800) return Math.floor(seconds / 86400) + "d ago";
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function memberSince(value: string | Date): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "today";
  const days = Math.max(0, Math.floor((Date.now() - date.getTime()) / 86400000));
  if (days < 1) return "today";
  if (days < 30) return days + "d";
  if (days < 365) return Math.floor(days / 30) + "mo";
  return Math.floor(days / 365) + "yr";
}

export function normalizeMemberProfile(input: Partial<MemberProfile>, fallbackName: string): MemberProfile {
  const status = MEMBER_STATUSES.includes(input.status as MemberStatus) ? input.status as MemberStatus : "online";
  return {
    user_id: String(input.user_id || ""),
    display_name: String(input.display_name || fallbackName).trim().slice(0, 28) || "Member",
    avatar_url: safeAvatarUrl(input.avatar_url),
    bio: String(input.bio || "").slice(0, 180),
    status,
    accent: safeAccent(input.accent),
    updated_at: input.updated_at
  };
}

export function normalizePreferences(input: Partial<MemberPreferences> = {}): MemberPreferences {
  return {
    compact: Boolean(input.compact),
    reduceMotion: Boolean(input.reduceMotion),
    accent: safeAccent(input.accent)
  };
}
