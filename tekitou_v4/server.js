'use strict';

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const Game = require('./libs/Game.js')


const app = express();
const server = http.Server(app);
const io = socketIO(server);

const PORT = process.env.PORT || 2020;

const game = new Game();
game.start(io);

app.use(express.static(__dirname + '/public'));

server.listen(PORT, () => {
    console.log('server start on port: %d', PORT);
});