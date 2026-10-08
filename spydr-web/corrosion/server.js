"use strict";

const http = require("http");

const PORT = Number(process.env.PORT || 6761);
const HOST = "0.0.0.0";

let Corrosion;
let proxy;
let proxyReady = false;

/* =========================
   RESPONSE HELPERS
========================= */

function sendJSON(response, status, data) {
    response.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store"
    });

    response.end(JSON.stringify(data));
}

/* =========================
   HTTP SERVER
   STARTS BEFORE CORROSION
========================= */

const server = http.createServer((request, response) => {
    const parsedURL = new URL(
        request.url,
        `http://${request.headers.host || "localhost"}`
    );

    const pathname = parsedURL.pathname;

    /* Health check */
    if (pathname === "/health") {
        return sendJSON(response, 200, {
            status: "ok",
            service: "corrosion",
            ready: proxyReady,
            port: PORT
        });
    }

    /* Root endpoint */
    if (pathname === "/") {
        return sendJSON(response, 200, {
            service: "spydr-corrosion",
            status: "online",
            ready: proxyReady,
            health: "/health",
            prefix: "/service/"
        });
    }

    /* Wait for Corrosion to initialize */
    if (!proxyReady || !proxy) {
        return sendJSON(response, 503, {
            error: "Corrosion is initializing",
            ready: false
        });
    }

    /* Corrosion browser bundle */
    if (
        pathname === "/service/index.js" ||
        pathname === "/service/bundle.js"
    ) {
        response.writeHead(200, {
            "Content-Type": "application/javascript; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache"
        });

        return response.end(proxy.script);
    }

    /* URL encoding endpoint */
    if (pathname === "/service/encode") {
        const target = parsedURL.searchParams.get("url");

        if (!target) {
            return sendJSON(response, 400, {
                error: "Missing url parameter"
            });
        }

        let targetURL;

        try {
            targetURL = new URL(target);
        } catch {
            return sendJSON(response, 400, {
                error: "Invalid URL"
            });
        }

        if (
            targetURL.protocol !== "http:" &&
            targetURL.protocol !== "https:"
        ) {
            return sendJSON(response, 400, {
                error: "Only HTTP and HTTPS URLs are supported"
            });
        }

        try {
            const encoded = proxy.url.codec.encode(targetURL);

            return sendJSON(response, 200, {
                encoded
            });
        } catch (error) {
            console.error("[Corrosion] Encode error:", error);

            return sendJSON(response, 500, {
                error: "Failed to encode URL"
            });
        }
    }

    /* Proxy requests */
    if (pathname.startsWith(proxy.prefix)) {
        try {
            return proxy.request(request, response);
        } catch (error) {
            console.error("[Corrosion] Request error:", error);

            if (!response.headersSent) {
                return sendJSON(response, 502, {
                    error: "Proxy request failed"
                });
            }

            response.destroy(error);
        }

        return;
    }

    /* Unknown route */
    sendJSON(response, 404, {
        error: "Route not found",
        path: pathname
    });
});

/* =========================
   WEBSOCKET SUPPORT
========================= */

server.on("upgrade", (request, socket, head) => {
    if (!proxyReady || !proxy) {
        socket.write(
            "HTTP/1.1 503 Service Unavailable\r\n" +
            "Connection: close\r\n\r\n"
        );

        return socket.destroy();
    }

    try {
        proxy.upgrade(request, socket, head);
    } catch (error) {
        console.error("[Corrosion] WebSocket error:", error);
        socket.destroy();
    }
});

/* =========================
   ERROR HANDLING
========================= */

server.on("error", (error) => {
    console.error("[Server] Fatal server error:", error);

    if (error.code === "EADDRINUSE") {
        console.error(`[Server] Port ${PORT} is already in use.`);
    }

    process.exitCode = 1;
});

/* =========================
   START LISTENING FIRST
========================= */

server.listen(PORT, HOST, () => {
    console.log("================================");
    console.log("       SPYDR CORROSION");
    console.log("================================");
    console.log(`[Server] Listening on ${HOST}:${PORT}`);
    console.log(`[Server] Health: /health`);
    console.log("[Server] Initializing Corrosion...");

    /* Initialize AFTER the port is open */
    setImmediate(() => {
        try {
            Corrosion = require("./");

            proxy = new Corrosion({
                codec: "xor",
                prefix: "/service/",
                ws: true
            });

            proxyReady = true;

            console.log("[Corrosion] Initialized successfully.");
            console.log("[Corrosion] Proxy prefix: /service/");
        } catch (error) {
            proxyReady = false;

            console.error(
                "[Corrosion] Initialization failed:",
                error
            );
        }
    });
});

/* =========================
   GRACEFUL SHUTDOWN
========================= */

function shutdown(signal) {
    console.log(`[Server] ${signal} received. Shutting down...`);

    server.close((error) => {
        if (error) {
            console.error("[Server] Shutdown error:", error);
            process.exit(1);
        }

        console.log("[Server] Closed successfully.");
        process.exit(0);
    });

    setTimeout(() => {
        console.error("[Server] Forced shutdown.");
        process.exit(1);
    }, 10000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
