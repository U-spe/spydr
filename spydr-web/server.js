const { createBareServer } = require("@tomphttp/bare-server-node");
const express = require("express");

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

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/sp1dr.html");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Spydr running on port ${port}`);
});
