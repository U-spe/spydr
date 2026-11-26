export type MemberStatus = "online" | "away" | "busy" | "invisible";

export interface MemberProfile {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  bio: string;
  status: MemberStatus;
  accent: string;
  updated_at?: string;
}

export interface MemberPreferences {
  compact: boolean;
  reduceMotion: boolean;
  accent: string;
}

export interface MemberApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "core" | "social";
  href: string;
}

export interface MemberBookmark {
  user_id: string;
  app_id: string;
  position: number;
  created_at?: string;
}

export interface MemberFriendship {
  user_id: string;
  friend_id: string;
  created_at: string;
}

export interface MemberFriendRequest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: "pending" | "accepted" | "declined";
  created_at: string;
  responded_at: string | null;
}

export interface MemberActivity {
  id?: string;
  user_id?: string;
  event_type: string;
  detail: string;
  created_at: string;
}

export interface MemberDashboardState {
  profile: MemberProfile | null;
  bookmarks: string[];
  friends: MemberProfile[];
  requests: MemberFriendRequest[];
  activity: MemberActivity[];
  preferences: MemberPreferences;
}
