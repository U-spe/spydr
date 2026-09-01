"use strict";

const {
  allowGET,
  mediaId,
  mediaType,
  sendError,
  sendJSON,
  tmdb
} = require("../../lib/tmdb");

module.exports = async function providers(request, response) {
  if (!allowGET(request, response)) return;

  try {
    const type = mediaType(request.query?.type);
    const id = mediaId(request.query?.id);
    const payload = await tmdb(`/${type}/${id}/watch/providers`);

    sendJSON(response, 200, payload || { results: {} }, 3600);
  } catch (error) {
    sendError(response, error);
  }
};
