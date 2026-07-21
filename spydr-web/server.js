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

// serve the bundled client FIRST
app.get("/service/index.js", (req, res) => {
    res.type("application/javascript");
    res.send(proxy.script);
});

// then let corrosion handle everything else
app.use((req, res, next) => {
    if (req.url.startsWith(proxy.prefix)) {
        return proxy.request(req, res);
    }

    next();
});

app.get("/", (req, res) => {
    res.send("Spydr Corrosion backend online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Spydr running on ${PORT}`);
});
