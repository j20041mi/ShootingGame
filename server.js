'use strict';

// ���W���[��
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const moment = require('moment');

// �I�u�W�F�N�g
const app = express();
const server = http.Server(app);
const io = socketIO(server);

// �萔
const PORT = process.env.PORT || 2000;

// �O���[�o���ϐ�
let iCountUser = 0; // ���[�U�[��

// �ڑ����̏���
io.on('connection', (socket) => {
    console.log('connection');

    // �ؒf���̏���
    socket.on('disconnect', () => {
        console.log('disconnect');
    });

    
});
// ���J�t�H���_�̎w��
app.use(express.static(__dirname + '/public'));

// �T�[�o�[�̋N��
server.listen(PORT, () => {
    console.log('server starts on port: %d', PORT);
});


