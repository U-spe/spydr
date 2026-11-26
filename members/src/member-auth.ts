export interface AuthUser {
  id: string;
  email?: string;
  created_at: string;
  user_metadata: Record<string, unknown>;
}

export interface AuthError {
  message: string;
}

export interface MemberAuthClient {
  auth: {
    signInWithPassword(input: { email: string; password: string }): Promise<{ data: { user: AuthUser | null }; error: AuthError | null }>;
    signUp(input: { email: string; password: string; options: { data: Record<string, unknown> } }): Promise<{ data: { user: AuthUser | null; session: unknown }; error: AuthError | null }>;
    signOut(): Promise<{ error: AuthError | null }>;
    resetPasswordForEmail(email: string, options: { redirectTo: string }): Promise<{ error: AuthError | null }>;
    updateUser(input: { password?: string; data?: Record<string, unknown> }): Promise<{ data: { user: AuthUser | null }; error: AuthError | null }>;
  };
}

function assertNoError(error: AuthError | null): void {
  if (error) throw new Error(error.message);
}

export async function signInMember(client: MemberAuthClient, email: string, password: string): Promise<AuthUser> {
  const result = await client.auth.signInWithPassword({ email, password });
  assertNoError(result.error);
  if (!result.data.user) throw new Error("Sign-in did not return a member account.");
  return result.data.user;
}

export async function createMemberAccount(client: MemberAuthClient, email: string, password: string, displayName: string): Promise<AuthUser | null> {
  const result = await client.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName.trim().slice(0, 28) || email.split("@")[0] } }
  });
  assertNoError(result.error);
  return result.data.user;
}

export async function sendMemberPasswordReset(client: MemberAuthClient, email: string, redirectTo: string): Promise<void> {
  const result = await client.auth.resetPasswordForEmail(email, { redirectTo });
  assertNoError(result.error);
}

export async function updateMemberPassword(client: MemberAuthClient, password: string): Promise<AuthUser | null> {
  if (password.length < 8) throw new Error("Password must contain at least 8 characters.");
  const result = await client.auth.updateUser({ password });
  assertNoError(result.error);
  return result.data.user;
}

export async function signOutMember(client: MemberAuthClient): Promise<void> {
  const result = await client.auth.signOut();
  assertNoError(result.error);
}
