// hey devs looking at this project, i didn't feel like going through a scramjet/uv bare project at the moment.
// i will soon make a scramjet project with a scramjet proxy instead of using corrosion.

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

/*
 * serve the bundled Corrosion client
 */

app.get("/service/index.js", (req, res) => {
    res.setHeader(
        "Content-Type",
        "application/javascript; charset=utf-8"
    );

    res.send(proxy.script);
});

/*
 * encode a normal URL into Corrosion's URL format
 *
 * Example:
 *
 * https://example.com
 *
 * becomes something like:
 *
 * hvtrs8%2F-wuw%2Cexample%2Ccom
 */

app.get("/service/encode", (req, res) => {
    const target = req.query.url;

    if (!target) {
        return res.status(400).json({
            error: "Missing URL"
        });
    }

    try {
        const encoded = proxy.url.encode(target);

        res.json({
            target,
            encoded
        });

    } catch (error) {
        console.error("Encoding error:", error);

        res.status(500).json({
            error: "Failed to encode URL"
        });
    }
});

/*
 * let Corrosion handle encoded proxy requests
 */

app.use((req, res, next) => {
    if (req.url.startsWith(proxy.prefix)) {
        console.log("Corrosion request:", req.url);

        return proxy.request(req, res);
    }

    next();
});

/*
 * health check
 */

app.get("/", (req, res) => {
    res.send("Spydr Corrosion backend online");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Spydr running on ${PORT}`);
});
