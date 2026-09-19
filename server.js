const express = require("express");
const cors = require("cors");
const http = require("http");

const { createBareServer } = require("@nebula-services/bare-server-node");
const { scramjetPath } = require("@mercuryworkshop/scramjet/path");

const app = express();

app.use(
  cors({
    origin: "https://spydr-delta.vercel.app",
  })
);

// Serve Scramjet browser assets
app.use("/scramjet", express.static(scramjetPath));

// Create the Bare server used by Scramjet
const bare = createBareServer("/bare/");

// Health check
app.get("/", (req, res) => {
  res.send("Spydr Scramjet backend online");
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    scramjet: true,
    bare: true,
  });
});

// Create HTTP server
const server = http.createServer(async (req, res) => {
  try {
    // Let Bare handle Scramjet proxy requests
    if (bare.shouldRoute(req)) {
      await bare.routeRequest(req, res);
      return;
    }

    // Everything else goes through Express
    app(req, res);
  } catch (error) {
    console.error("Request error:", error);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.end("Internal server error");
    }
  }
});

// Handle WebSocket upgrades required by Bare
server.on("upgrade", async (req, socket, head) => {
  try {
    if (bare.shouldRoute(req)) {
      await bare.routeUpgrade(req, socket, head);
      return;
    }

    socket.destroy();
  } catch (error) {
    console.error("Upgrade error:", error);
    socket.destroy();
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Spydr Scramjet backend running on port ${PORT}`);
  console.log(`Scramjet assets: ${scramjetPath}`);
});


