"use strict";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

function getToken() {
  return process.env.TMDB_TOKEN || process.env.NEXT_PUBLIC_TMDB_TOKEN || "";
}

function positiveInteger(value, fallback = 1, maximum = 500) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return Math.min(parsed, maximum);
}

function mediaType(value) {
  if (value !== "movie" && value !== "tv") {
    throw new HttpError(400, "type must be movie or tv");
  }
  return value;
}

function mediaId(value) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new HttpError(400, "a valid media id is required");
  }
  return parsed;
}

async function tmdb(path, parameters = {}) {
  const token = getToken();
  if (!token) {
    throw new HttpError(503, "TMDB_TOKEN is not configured in Vercel");
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(parameters)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(12_000)
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // The public API occasionally returns a non-JSON gateway response.
  }

  if (!response.ok) {
    const status = response.status === 404 ? 404 : 502;
    const message = response.status === 404
      ? "movie or TV show not found"
      : payload?.status_message || "TMDB request failed";
    throw new HttpError(status, message);
  }

  return payload;
}

function sendJSON(response, status, payload, cacheSeconds = 0) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("X-Content-Type-Options", "nosniff");

  if (cacheSeconds > 0) {
    response.setHeader(
      "Cache-Control",
      `public, s-maxage=${cacheSeconds}, stale-while-revalidate=${cacheSeconds * 2}`
    );
  } else {
    response.setHeader("Cache-Control", "no-store");
  }

  response.end(JSON.stringify(payload));
}

function allowGET(request, response) {
  if (request.method === "GET") return true;
  response.setHeader("Allow", "GET");
  sendJSON(response, 405, { error: "method not allowed" });
  return false;
}

function sendError(response, error) {
  console.error("spydr mov api:", error);

  if (error?.name === "TimeoutError" || error?.name === "AbortError") {
    sendJSON(response, 504, { error: "movie service timed out" });
    return;
  }

  const status = error instanceof HttpError ? error.status : 500;
  const message = error instanceof HttpError ? error.message : "movie service failed";
  sendJSON(response, status, { error: message });
}

module.exports = {
  HttpError,
  allowGET,
  mediaId,
  mediaType,
  positiveInteger,
  sendError,
  sendJSON,
  tmdb
};
