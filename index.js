var express = require("express");
const fs = require("fs");
var app = express();
var http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 7000;

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/view/index.html");
});
app.get("/img", (req, res) => {
  fs.readFile("./rico.png", (err, data) => {
    res.type("png");
    res.send(data);
  });
});

http.listen(PORT, function () {
  console.log("server listening. Port:" + PORT);
});

io.on("connection", function (socket) {
  socket.on("obj", function (val) {
    io.emit("obj", val);
  });
});
io.on("connection", function (socket) {
  socket.on("x", function (val1) {
    io.emit("x", val1);
  });
});
io.on("connection", function (socket) {
  socket.on("y", function (val2) {
    io.emit("y", val2);
  });
});
