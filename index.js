const express = require("express");
const path = require('path');
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// ドキュメントルートの設定

app.use(express.static(path.join(__dirname, '/views')));

/*
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
*/

app.use("/js", express.static(__dirname + "/js/"));
app.use("/img", express.static(__dirname + "/img/"));

app.use(
    "/io",
    express.static(__dirname + "/node_modules/socket.io/client-dist/")
);

server.listen(3000, () => {
    console.log("Server started on port 3000");
});

const fs = require('fs');
const filePath = 'json/futsu_ga_ichiban.json';

const players = {};

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('ファイルの読み込みエラー:', err);
        return;
    }

    // 読み込まれたデータをJSONとしてパースします
    const jsonData = JSON.parse(data);

    // ここでjsonDataを使って必要な処理を行います

    io.on("connection", (socket) => {
        socket.emit("mapData", jsonData);

        const playerID = socket.id;
        socket.emit("assignPlayerId", playerID);
    });
});