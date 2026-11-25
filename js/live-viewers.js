import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://bxsiniqhswmiokqshcgi.supabase.co",
  "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd"
);

export function startLiveViewers() {
  const output = document.querySelector("#home-viewers span");
  const presenceKey = crypto.randomUUID
    ? crypto.randomUUID()
    : `tab-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const channel = supabase.channel("spydr-live-viewers", {
    config: { presence: { key: presenceKey } }
  });

  const updateCount = () => {
    const state = channel.presenceState();
    const count = Object.values(state).reduce((total, entries) => total + entries.length, 0);
    if (output) output.textContent = `${count} online`;
  };

  channel
    .on("presence", { event: "sync" }, updateCount)
    .on("presence", { event: "join" }, updateCount)
    .on("presence", { event: "leave" }, updateCount)
    .subscribe(async status => {
      if (status === "SUBSCRIBED") {
        await channel.track({ online_at: new Date().toISOString() });
        updateCount();
      }
    });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      channel.track({ online_at: new Date().toISOString() });
    } else {
      channel.untrack();
    }
  });

  window.addEventListener("pagehide", () => {
    channel.untrack();
  }, { once: true });
}