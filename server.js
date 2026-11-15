const express = require("express");
const http = require("http");
const path = require("path");
const { pathToFileURL } = require("url");

const app = express();
const server = http.createServer(app);

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const WEB_ROOT = path.join(ROOT, "web");
const WEB_PUBLIC = path.join(WEB_ROOT, "public");

async function start() {
  // Load Scramjet's runtime packages from the ESM module inside /web.
  const { wisp, logging, scramjetPath, libcurlPath, baremuxPath } =
    await import(pathToFileURL(path.join(WEB_ROOT, "runtime.js")).href);

  logging.set_level(logging.NONE);
  Object.assign(wisp.options, {
    allow_udp_streams: false,
    hostname_blacklist: [/example\\.com/],
    dns_servers: ["1.1.1.3", "1.0.0.3"]
  });

  // Scramjet's browser app and runtime assets live under /web/.
  app.use((req, res, next) => {
    if (req.path === "/web" || req.path.startsWith("/web/")) {
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    }
    next();
  });

  app.use("/web/scram", express.static(scramjetPath));
  app.use("/web/libcurl", express.static(libcurlPath));
  app.use("/web/baremux", express.static(baremuxPath));
  app.use("/web", express.static(WEB_PUBLIC, { extensions: ["html"] }));

  // Do not expose /web's source, package files, or configuration through static hosting.
  app.use((req, res, next) => {
    if (req.path === "/web" || req.path.startsWith("/web/")) return next();
    return express.static(ROOT, { extensions: ["html"] })(req, res, next);
  });

  app.get("/", (req, res) => res.sendFile(path.join(ROOT, "index.html")));
  app.use((req, res) => res.status(404).send("404 - Page not found"));

  // Wisp upgrades share Spydr's public HTTP port.
  server.on("upgrade", (req, socket, head) => {
    if (req.url && req.url.startsWith("/web/wisp/")) {
      wisp.routeRequest(req, socket, head);
      return;
    }
    socket.destroy();
  });

  server.listen(PORT, "0.0.0.0", () => {
    console.log("");
    console.log("============================");
    console.log("       SPYDR IS ONLINE");
    console.log("============================");
    console.log("");
    console.log(`Home:      http://localhost:${PORT}`);
    console.log(`Search:    http://localhost:${PORT}/search.html`);
    console.log(`Scramjet:  http://localhost:${PORT}/web/`);
    console.log("");
  });
}

start().catch((error) => {
  console.error("Failed to start Spydr with Scramjet:", error);
  process.exit(1);
});
