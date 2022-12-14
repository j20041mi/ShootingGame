'use strict';

// モジュール
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

// オブジェクト
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// 定数
const PORT = process.env.PORT || 2000;

// グローバル変数
let iCountUser = 0; // ユーザー数

// 接続時の処理
io.on('connection', (socket) => {
    console.log('connection');

    // 切断時の処理
    socket.on('disconnect', () => {
        console.log('disconnect');
    });

    
});
// 公開フォルダの指定
app.use(express.static(__dirname + '/public'));

// サーバーの起動
server.listen(PORT, () => {
    console.log('server starts on port: %d', PORT);
});


