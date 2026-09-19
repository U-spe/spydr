"use strict";

const {
  allowGET,
  mediaId,
  mediaType,
  sendError,
  sendJSON,
  tmdb
} = require("../../lib/tmdb");

module.exports = async function details(request, response) {
  if (!allowGET(request, response)) return;

  try {
    const type = mediaType(request.query?.type);
    const id = mediaId(request.query?.id);
    const payload = await tmdb(`/${type}/${id}`, {
      language: "en-US",
      append_to_response: "videos,credits,similar,external_ids"
    });

    sendJSON(response, 200, { ...payload, media_type: type }, 1800);
  } catch (error) {
    sendError(response, error);
  }
};
