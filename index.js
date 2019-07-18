"use strict";
exports.__esModule = true;
//const express = require("express");
var express_1 = require("express");
var path = require("path");
var app = express_1["default"]();
// Serve static files from the React app
app.use(express_1["default"].static(path.join(__dirname, "client/build")));
// Put all API endpoints under '/api'
app.get("/api/user", function (req, res) {
    var obj = { hello: "world" };
    // Return them as json
    res.json(obj);
    console.log("Sent object");
});
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
var port = process.env.PORT || 5000;
app.listen(port);
console.log("Password generator listening on " + port);
