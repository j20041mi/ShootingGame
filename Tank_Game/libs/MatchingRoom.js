var Game = require('./Game.js');

const MATCH_NUM = 2;

var MatchingRoom = function (server) {
    this.server = server;
    this.watingPlayer = [];
}

MatchingRoom.prototype.join = function (json, port, address) {
    //�}�b�`���O�J�n�������[�U�[�Ԃ����[�U�[���
    var data = {};
    data['type'] = 'playerInfo';
    data['id'] = utils.getUniqueStr();
    data['name'] = json['name'];

    utils.sendJsonAndWriteLog(data, port, address, this.server);

    data['port'] = port.toString();
    data['address'] = address;

    this.waitingPlayer.push(data);

    if (this.waitingPlayer.length >= MATCH_NUM) {
        //�}�b�`���O����
        for (var i = 0; i < MATCH_NUM; i++) {
            var otherIndex;
            if (i == 0) {
                otherIndex = 1;
            } else if (i == 1) {
                otherIndex = 0;
            }

            //���������}�b�`���O���𑗂�
            var matchData = {};
            matchData['type'] = "success-match";
            matchData['rival'] = this.waitingPlayer[otherIndex];

            var own = this.waitingPlayer[i];
            utils.sendJsonAndWriteLog(matchData, own['port'], own['address'], this.server);
        }

        //�}�b�`���O���������Ȃ������ꍇ�̃^�C���A�E�g�������폜����
        if (this.waitingPlayerTimeOut)
            clearTimeout(this.waitingPlayerTimeOut);

        this.waitingPlayer = [];
    } else {
        // �}�b�`���O�s�����i�T�b��j
        //�T�b�ȓ��Ƀ}�b�`���O���������Ȃ������ꍇ�ɐ������Ȃ������|�̏��𑗐M
        this.waitingPlayerTimeOut = setTimeout((d) => {
            if (this.waitingPlayer.length >= MATCH_NUM)
                return;

            //�}�b�`���O�s�������
            var notMatch = {};
            notMatch['type'] = "not-match";
            notMatch['msg'] = "sorry not matching";
            utils.sendJsonAndWriteLog(notMatch, d['port'], d['address'], this.server);

            this.waitingPlayer.pop();
        }, 5000, data);
    }
}

module.exports = MatchingRoom;