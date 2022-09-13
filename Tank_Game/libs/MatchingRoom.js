var Game = require('./Game.js');

const MATCH_NUM = 2;

var MatchingRoom = function (server) {
    this.server = server;
    this.watingPlayer = [];
}

MatchingRoom.prototype.join = function (json, port, address) {
    //マッチング開始したユーザー返すユーザー情報
    var data = {};
    data['type'] = 'playerInfo';
    data['id'] = utils.getUniqueStr();
    data['name'] = json['name'];

    utils.sendJsonAndWriteLog(data, port, address, this.server);

    data['port'] = port.toString();
    data['address'] = address;

    this.waitingPlayer.push(data);

    if (this.waitingPlayer.length >= MATCH_NUM) {
        //マッチング成立
        for (var i = 0; i < MATCH_NUM; i++) {
            var otherIndex;
            if (i == 0) {
                otherIndex = 1;
            } else if (i == 1) {
                otherIndex = 0;
            }

            //成立したマッチング情報を送る
            var matchData = {};
            matchData['type'] = "success-match";
            matchData['rival'] = this.waitingPlayer[otherIndex];

            var own = this.waitingPlayer[i];
            utils.sendJsonAndWriteLog(matchData, own['port'], own['address'], this.server);
        }

        //マッチングが成立しなかった場合のタイムアウト処理を削除する
        if (this.waitingPlayerTimeOut)
            clearTimeout(this.waitingPlayerTimeOut);

        this.waitingPlayer = [];
    } else {
        // マッチング不成立（５秒後）
        //５秒以内にマッチングが成立しなかった場合に成立しなかった旨の情報を送信
        this.waitingPlayerTimeOut = setTimeout((d) => {
            if (this.waitingPlayer.length >= MATCH_NUM)
                return;

            //マッチング不成立情報
            var notMatch = {};
            notMatch['type'] = "not-match";
            notMatch['msg'] = "sorry not matching";
            utils.sendJsonAndWriteLog(notMatch, d['port'], d['address'], this.server);

            this.waitingPlayer.pop();
        }, 5000, data);
    }
}

module.exports = MatchingRoom;