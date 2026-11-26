import type { MemberActivity, MemberBookmark, MemberFriendRequest, MemberProfile } from "./types";

export interface SupabaseErrorLike {
  message: string;
  code?: string;
}

export interface SupabaseResult<T> {
  data: T | null;
  error: SupabaseErrorLike | null;
}

export interface MemberDataClient {
  from(table: string): any;
  rpc(name: string, args: Record<string, unknown>): Promise<SupabaseResult<unknown>>;
}

function throwOnError(error: SupabaseErrorLike | null): void {
  if (error) throw new Error(error.message);
}

export async function fetchMemberProfile(client: MemberDataClient, userId: string): Promise<MemberProfile | null> {
  const result = await client.from("member_profiles")
    .select("user_id,display_name,avatar_url,bio,status,accent,updated_at")
    .eq("user_id", userId).maybeSingle() as SupabaseResult<MemberProfile>;
  throwOnError(result.error);
  return result.data;
}

export async function saveMemberProfile(client: MemberDataClient, profile: MemberProfile): Promise<void> {
  const result = await client.from("member_profiles").upsert({
    ...profile,
    updated_at: new Date().toISOString()
  }) as SupabaseResult<unknown>;
  throwOnError(result.error);
}

export async function fetchBookmarks(client: MemberDataClient, userId: string): Promise<MemberBookmark[]> {
  const result = await client.from("member_bookmarks")
    .select("user_id,app_id,position,created_at")
    .eq("user_id", userId).order("position") as SupabaseResult<MemberBookmark[]>;
  throwOnError(result.error);
  return result.data ?? [];
}

export async function fetchActivity(client: MemberDataClient, userId: string, limit = 8): Promise<MemberActivity[]> {
  const result = await client.from("member_activity")
    .select("event_type,detail,created_at")
    .eq("user_id", userId).order("created_at", { ascending: false }).limit(limit) as SupabaseResult<MemberActivity[]>;
  throwOnError(result.error);
  return result.data ?? [];
}

export async function fetchIncomingRequests(client: MemberDataClient, userId: string): Promise<MemberFriendRequest[]> {
  const result = await client.from("member_friend_requests")
    .select("id,sender_id,receiver_id,status,created_at,responded_at")
    .eq("receiver_id", userId).eq("status", "pending")
    .order("created_at", { ascending: false }) as SupabaseResult<MemberFriendRequest[]>;
  throwOnError(result.error);
  return result.data ?? [];
}

export async function sendFriendRequest(client: MemberDataClient, targetId: string): Promise<string> {
  const result = await client.rpc("member_send_friend_request", { target_id: targetId });
  throwOnError(result.error);
  return String(result.data ?? "sent");
}

export async function respondToFriendRequest(client: MemberDataClient, requestId: string, accept: boolean): Promise<boolean> {
  const result = await client.rpc("member_respond_friend_request", { request_id: requestId, accept });
  throwOnError(result.error);
  return Boolean(result.data);
}

export async function removeFriend(client: MemberDataClient, targetId: string): Promise<boolean> {
  const result = await client.rpc("member_remove_friend", { target_id: targetId });
  throwOnError(result.error);
  return Boolean(result.data);
}
