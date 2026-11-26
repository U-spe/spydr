import type { MemberDashboardState, MemberPreferences } from "./types";

export type MemberStateListener = (state: Readonly<MemberDashboardState>, changedKey: keyof MemberDashboardState) => void;

export class MemberStateStore {
  private state: MemberDashboardState;
  private listeners = new Set<MemberStateListener>();

  constructor(initial: MemberDashboardState) {
    this.state = structuredClone(initial);
  }

  get snapshot(): Readonly<MemberDashboardState> {
    return this.state;
  }

  update<K extends keyof MemberDashboardState>(key: K, value: MemberDashboardState[K]): void {
    this.state = { ...this.state, [key]: value };
    for (const listener of this.listeners) listener(this.state, key);
  }

  updatePreferences(value: MemberPreferences): void {
    this.update("preferences", value);
  }

  subscribe(listener: MemberStateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  reset(initial: MemberDashboardState): void {
    this.state = structuredClone(initial);
    for (const listener of this.listeners) listener(this.state, "profile");
  }
}
