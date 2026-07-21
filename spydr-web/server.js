// hey devs looking at this project, i didn't feel like going through a scramjet/uv bare project at the moment. i will soon make a scramjet
// project with a scramjet proxy instead of using corrosion (which will take longer to start up) but dont worry, the proxy will still be live.

const express = require("express");
const Corrosion = require("./Corrosion/lib/server");

const app = express();

const proxy = new Corrosion({
    prefix: "/service/",
    codec: "xor",
});

proxy.bundleScripts();

console.log("Script exists:", !!proxy.script);
console.log("Script length:", proxy.script ? proxy.script.length : 0);

// serve the bundled Corrosion client
app.get("/service/index.js", (req, res) => {
    res.setHeader(
        "Content-Type",
        "application/javascript; charset=utf-8"
    );

    res.send(proxy.script);
});

// let Corrosion handle all /service/ requests
app.use((req, res, next) => {
    if (req.url.startsWith(proxy.prefix)) {
        return proxy.request(req, res);
    }

    next();
});

// health check
app.get("/", (req, res) => {
    res.send("Spydr Corrosion backend online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Spydr running on ${PORT}`);
});
