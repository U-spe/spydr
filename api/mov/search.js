"use strict";

const {
  HttpError,
  allowGET,
  positiveInteger,
  sendError,
  sendJSON,
  tmdb
} = require("../../lib/tmdb");

module.exports = async function search(request, response) {
  if (!allowGET(request, response)) return;

  try {
    const query = String(request.query?.q || "").trim();
    if (!query) throw new HttpError(400, "enter something to search");
    if (query.length > 100) throw new HttpError(400, "search is too long");

    const page = positiveInteger(request.query?.page, 1);
    const payload = await tmdb("/search/multi", {
      query,
      page,
      language: "en-US",
      include_adult: "false"
    });

    const results = (payload?.results || [])
      .filter(item => ["movie", "tv"].includes(item.media_type) && item.poster_path)
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

    sendJSON(response, 200, {
      page: payload?.page || page,
      total_pages: payload?.total_pages || 0,
      total_results: payload?.total_results || results.length,
      results
    }, 300);
  } catch (error) {
    sendError(response, error);
  }
};
