import type { MemberApp } from "./types";

export type AppFilter = "all" | "saved" | "core" | "social";

export function normalizeAppCatalog(input: unknown): MemberApp[] {
  if (!Array.isArray(input)) return [];
  const ids = new Set<string>();
  return input.flatMap((candidate): MemberApp[] => {
    if (!candidate || typeof candidate !== "object") return [];
    const app = candidate as Partial<MemberApp>;
    const id = String(app.id ?? "").trim();
    const href = String(app.href ?? "").trim();
    if (!id || ids.has(id) || !href.startsWith("/") || href.startsWith("//")) return [];
    if (!["core", "social"].includes(String(app.category))) return [];
    ids.add(id);
    return [{
      id,
      name: String(app.name ?? id).slice(0, 48),
      description: String(app.description ?? "").slice(0, 100),
      icon: String(app.icon ?? "ri-apps-2-line"),
      category: app.category as MemberApp["category"],
      href
    }];
  });
}

export function filterMemberApps(apps: MemberApp[], query: string, filter: AppFilter, savedIds: ReadonlySet<string>): MemberApp[] {
  const normalized = query.trim().toLowerCase();
  return apps.filter(app => {
    const matchesSearch = [app.name, app.description, app.category].join(" ").toLowerCase().includes(normalized);
    const matchesFilter = filter === "all"
      || (filter === "saved" && savedIds.has(app.id))
      || app.category === filter;
    return matchesSearch && matchesFilter;
  });
}

export function sortPinnedApps(apps: MemberApp[], savedIds: ReadonlySet<string>): MemberApp[] {
  return apps.filter(app => savedIds.has(app.id));
}
