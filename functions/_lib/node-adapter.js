export async function runNodeHandler(handler, request) {
  const url = new URL(request.url);
  let body;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const raw = await request.text();
    if (raw) {
      try { body = JSON.parse(raw); } catch { body = raw; }
    }
  }
  const req = {
    method: request.method,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries()),
    query: Object.fromEntries(url.searchParams.entries()),
    body,
    socket: { remoteAddress: request.headers.get("CF-Connecting-IP") || "unknown" }
  };
  const headers = new Headers();
  let statusCode = 200;
  let responseBody = "";
  const res = {
    get statusCode() { return statusCode; },
    set statusCode(value) { statusCode = Number(value) || 200; },
    setHeader(name, value) { headers.set(name, String(value)); },
    status(code) { statusCode = Number(code) || 200; return this; },
    json(payload) {
      if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json; charset=utf-8");
      responseBody = JSON.stringify(payload);
      return this;
    },
    end(value = "") { responseBody = value == null ? "" : String(value); return this; }
  };
  await handler(req, res);
  if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(responseBody, { status: statusCode, headers });
}
