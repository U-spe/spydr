import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://bxsiniqhswmiokqshcgi.supabase.co";
const SUPABASE_KEY = "sb_publishable_UHN349V0ftl3nJVle0za2Q_oWeHWMvd";

// One client per browser module graph, shared by Spydr features.
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
