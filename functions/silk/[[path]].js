const PREFIX = "/silk";

function cleanHeaders(source) {
  const headers = new Headers(source);
  for (const name of [
    "connection", "keep-alive", "proxy-authenticate", "proxy-authorization",
    "te", "trailer", "transfer-encoding", "upgrade", "content-length",
    "content-encoding", "host"
  ]) headers.delete(name);
  return headers;
}

function rewriteTarget(value, upstream) {
  if (!value) return value;
  try {
    const url = new URL(value, upstream);
    if (url.origin !== upstream.origin) return value;
    return PREFIX + url.pathname + url.search + url.hash;
  } catch {
    return value;
  }
}

export async function onRequest(context) {
  const configured = context.env.SILK_UPSTREAM_URL;
  if (!configured) {
    return new Response("Silk+ is not configured. Add SILK_UPSTREAM_URL to your Cloudflare Pages environment variables.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
    });
  }

  let upstream;
  try {
    upstream = new URL(configured);
    if (!["http:", "https:"].includes(upstream.protocol)) throw new Error("Invalid protocol");
  } catch {
    return new Response("SILK_UPSTREAM_URL must be a valid http or https URL.", { status: 500 });
  }

  const incoming = new URL(context.request.url);
  const suffix = incoming.pathname.slice(PREFIX.length).replace(/^\//, "");
  const basePath = upstream.pathname.endsWith("/") ? upstream.pathname : upstream.pathname + "/";
  const target = new URL(basePath + suffix, upstream.origin);
  target.search = incoming.search;

  const requestHeaders = new Headers(context.request.headers);
  requestHeaders.set("x-forwarded-host", incoming.host);
  requestHeaders.set("x-forwarded-proto", incoming.protocol.slice(0, -1));
  requestHeaders.delete("host");
  requestHeaders.delete("content-length");

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(new Request(target, {
      method: context.request.method,
      headers: requestHeaders,
      body: ["GET", "HEAD"].includes(context.request.method) ? undefined : context.request.body,
      redirect: "manual"
    }));
  } catch {
    return new Response("Silk+ upstream could not be reached.", { status: 502 });
  }

  const headers = cleanHeaders(upstreamResponse.headers);
  headers.set("x-robots-tag", "noindex");
  headers.delete("content-security-policy");
  headers.delete("content-security-policy-report-only");
  headers.delete("x-frame-options");

  const location = headers.get("location");
  if (location) headers.set("location", rewriteTarget(location, upstream));

  const contentType = headers.get("content-type") || "";
  let body = upstreamResponse.body;

  if (/text\/html/i.test(contentType)) {
    const rewriter = new HTMLRewriter();
    for (const selector of ["a[href]", "link[href]", "script[src]", "img[src]", "iframe[src]", "source[src]", "form[action]", "video[poster]"]) {
      const attribute = selector.match(/\[(.+?)\]/)?.[1];
      rewriter.on(selector, {
        element(element) {
          const value = element.getAttribute(attribute);
          if (value) element.setAttribute(attribute, rewriteTarget(value, upstream));
        }
      });
    }
    body = rewriter.transform(new Response(body, { headers })).body;
  } else if (/text\/css/i.test(contentType)) {
    const css = await upstreamResponse.text();
    const rewritten = css.split(upstream.origin).join(PREFIX);
    headers.delete("content-length");
    body = rewritten;
  }

  return new Response(body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers
  });
}
