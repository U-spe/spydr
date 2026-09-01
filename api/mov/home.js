"use strict";

const { allowGET, sendError, sendJSON, tmdb } = require("../../lib/tmdb");

function tag(items, type) {
  return (items || []).map(item => ({ ...item, media_type: item.media_type || type }));
}

module.exports = async function home(request, response) {
  if (!allowGET(request, response)) return;

  try {
    const requests = [
      { title: "trending now", type: null, promise: tmdb("/trending/all/day", { language: "en-US" }) },
      { title: "popular movies", type: "movie", promise: tmdb("/movie/popular", { language: "en-US", page: 1 }) },
      { title: "popular shows", type: "tv", promise: tmdb("/tv/popular", { language: "en-US", page: 1 }) },
      { title: "top rated movies", type: "movie", promise: tmdb("/movie/top_rated", { language: "en-US", page: 1 }) },
      { title: "top rated shows", type: "tv", promise: tmdb("/tv/top_rated", { language: "en-US", page: 1 }) }
    ];

    const settled = await Promise.allSettled(requests.map(item => item.promise));
    const sections = settled.flatMap((result, index) => {
      if (result.status !== "fulfilled") return [];

      const config = requests[index];
      const results = tag(result.value?.results, config.type)
        .filter(item => ["movie", "tv"].includes(item.media_type) && item.poster_path)
        .slice(0, 18);

      return results.length ? [{ title: config.title, items: results }] : [];
    });

    if (!sections.length) {
      const firstFailure = settled.find(result => result.status === "rejected");
      throw firstFailure?.reason || new Error("no movie categories loaded");
    }

    const hero = sections
      .flatMap(section => section.items)
      .find(item => item.backdrop_path && item.overview) || sections[0].items[0];

    sendJSON(response, 200, { hero, sections }, 900);
  } catch (error) {
    sendError(response, error);
  }
};
