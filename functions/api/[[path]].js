import venomous from "../../api/venomous.js";
import youtubeSearch from "../../api/youtube-search.js";
import youtubeVideo from "../../api/youtube-video.js";
import movHome from "../../api/mov/home.js";
import movSearch from "../../api/mov/search.js";
import movDetails from "../../api/mov/details.js";
import movProviders from "../../api/mov/providers.js";
import movTrailer from "../../api/mov/trailer.js";
import { runNodeHandler } from "../_lib/node-adapter.js";

const handlers = new Map([
  ["/api/venomous", venomous],
  ["/api/youtube-search", youtubeSearch],
  ["/api/youtube-video", youtubeVideo],
  ["/api/mov/home", movHome],
  ["/api/mov/search", movSearch],
  ["/api/mov/details", movDetails],
  ["/api/mov/providers", movProviders],
  ["/api/mov/trailer", movTrailer]
]);

export async function onRequest(context) {
  const pathname = new URL(context.request.url).pathname.replace(/\/$/, "");
  const handler = handlers.get(pathname);
  if (!handler) {
    return Response.json({ error: "API endpoint not found." }, { status: 404 });
  }
  return runNodeHandler(handler, context.request);
}
