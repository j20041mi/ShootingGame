const World = require('./World.js');


module.exports = class Game {

    start(io) {

        const world = new World(io);
        let iTimeLast = Date.now();

        //クライアントからの送信にたいして反応するプログラム
        io.on('connection', (socket) => {
            console.log('connection');


            let jiki = null;

            //ゲーム接続時、自機を作成
            socket.on('enter-the-game', () => {
                console.log('enter-the-game : socket.id = %s', socket.id);
                jiki = world.createJiki();
            });

            //clientから送られてきたキー入力を自機オブジェクトに置くる
            socket.on('change-my-movement', (objMovement) => {
                if (!jiki) {
                    return;
                }
                jiki.objMovement = objMovement;

            });

            //接続解除時、
            socket.on('disconnect', () => {
                console.log('disconnect');
                if (!jiki) {
                    return;
                }
                //作った自機を消す
                world.destroyJiki(jiki);
                jiki = null;	// 自タンクの解放
            });

        });

        //一定間隔で実行するプログラム
        setInterval(() => {

            const iTimeCurrent = Date.now();
            const fDeltaTime = (iTimeCurrent - iTimeLast) * 0.001;	// 秒に変換
            iTimeLast = iTimeCurrent;

            const hrtime = process.hrtime();

            world.update(fDeltaTime);

            const hrtimeDiff = process.hrtime(hrtime);
            const iNanosecDiff = hrtimeDiff[0] * 1e9 + hrtimeDiff[1];

            io.emit('update', Array.from(world.setJiki), iNanosecDiff);

            
        },1000/ 30);
    }
}