"use strict";

const {
  allowGET,
  mediaId,
  mediaType,
  sendError,
  sendJSON,
  tmdb
} = require("../../lib/tmdb");

function trailerScore(video) {
  let score = 0;
  if (video.site === "YouTube") score += 20;
  if (video.type === "Trailer") score += 10;
  if (video.official) score += 5;
  if (/official trailer/i.test(video.name || "")) score += 3;
  return score;
}

module.exports = async function trailer(request, response) {
  if (!allowGET(request, response)) return;

  try {
    const type = mediaType(request.query?.type);
    const id = mediaId(request.query?.id);
    const payload = await tmdb(`/${type}/${id}/videos`, { language: "en-US" });
    const trailer = (payload?.results || [])
      .filter(video => video.site === "YouTube" && video.key)
      .sort((a, b) => trailerScore(b) - trailerScore(a))[0] || null;

    sendJSON(response, 200, trailer
      ? { key: trailer.key, name: trailer.name, official: Boolean(trailer.official) }
      : { key: null }, 3600);
  } catch (error) {
    sendError(response, error);
  }
};
