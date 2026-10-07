const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// Serve the entire Spydr project as static files
app.use(
  express.static(ROOT, {
    extensions: ["html"]
  })
);

// Open index.html at /
app.get("/", (req, res) => {
  res.sendFile(path.join(ROOT, "index.html"));
});

// Simple 404
app.use((req, res) => {
  res.status(404).send("404 - Page not found");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("");
  console.log("============================");
  console.log("       SPYDR IS ONLINE");
  console.log("============================");
  console.log("");
  console.log(`Home:      http://localhost:${PORT}`);
  console.log(`YT Player: http://localhost:${PORT}/yt-player.html`);
  console.log("");
});
