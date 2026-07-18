const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use("/scram", express.static(path.join(__dirname, "scram")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "sp1dr.html"));
});

app.listen(PORT, () => {
    console.log(`spydr running on http://localhost:${PORT}`);
});
