const path = require("path");
const express = require("express");
const morgan = require("morgan")

const app = express();
const public = route => path.join(__dirname, "public", route);
const port = 3000;

app
    .use(morgan("tiny"))
    .use("/home", express.static(public("index.html")))
    .use("/search", express.static(public("index.html")))
    .use("/search/foo", express.static(public("index.html")))
    .use("/search/bar", express.static(public("index.html")))
    .use("/list", express.static(public("index.html")))
    .use("/", express.static(public("")));

app.listen(port, () =>
    console.log(`Example app listening on port ${port}!`)
);

