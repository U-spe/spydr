const express = require("express");
const path = require("path");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();

const bare = createBareServer("/bare/");

app.use(express.static("public"));

app.use((req, res, next) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        next();
    }
});

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sp1dr.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`spydr running on ${PORT}`);
});

app.use(express.static("public"));

app.use((req, res, next) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else 
