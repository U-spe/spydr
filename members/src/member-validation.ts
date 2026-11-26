import type { MemberStatus, MemberProfile, MemberPreferences } from "./types";

export const MEMBER_STATUS_VALUES: readonly MemberStatus[] = ["online", "away", "busy", "invisible"];

export interface ValidationResult<T> {
  valid: boolean;
  value: T;
  message: string;
}

export function validateDisplayName(input: unknown): ValidationResult<string> {
  const value = String(input ?? "").trim();
  if (!value) return { valid: false, value: "", message: "Display name is required." };
  if (value.length > 28) return { valid: false, value: value.slice(0, 28), message: "Display names can be up to 28 characters." };
  return { valid: true, value, message: "" };
}

export function validateAvatarUrl(input: unknown): ValidationResult<string> {
  const value = String(input ?? "").trim();
  if (!value) return { valid: true, value: "", message: "" };
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return { valid: false, value: "", message: "Avatar images must use HTTPS." };
    return { valid: true, value: url.href, message: "" };
  } catch {
    return { valid: false, value: "", message: "Enter a valid image URL." };
  }
}

export function validateMemberStatus(input: unknown): MemberStatus {
  return MEMBER_STATUS_VALUES.includes(input as MemberStatus) ? input as MemberStatus : "online";
}

export function validateMemberId(input: unknown): string | null {
  const value = String(input ?? "").trim();
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value) ? value : null;
}

export function sanitizeProfile(input: Partial<MemberProfile>, fallbackName: string): MemberProfile {
  const name = String(input.display_name ?? fallbackName).trim().slice(0, 28) || "Member";
  let avatar: string | null = null;
  try {
    const parsed = new URL(String(input.avatar_url ?? ""));
    if (parsed.protocol === "https:") avatar = parsed.href;
  } catch { /* Keep the avatar empty when the URL is malformed. */ }
  return {
    user_id: String(input.user_id ?? ""),
    display_name: name,
    avatar_url: avatar,
    bio: String(input.bio ?? "").slice(0, 180),
    status: validateMemberStatus(input.status),
    accent: /^#[0-9a-f]{6}$/i.test(String(input.accent ?? "")) ? String(input.accent) : "#d7d8dc",
    updated_at: input.updated_at
  };
}

export function sanitizePreferences(input: Partial<MemberPreferences>): MemberPreferences {
  return {
    compact: Boolean(input.compact),
    reduceMotion: Boolean(input.reduceMotion),
    accent: /^#[0-9a-f]{6}$/i.test(String(input.accent ?? "")) ? String(input.accent) : "#d7d8dc"
  };
}
