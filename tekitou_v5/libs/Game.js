const World = require('./World.js');


module.exports = class Game {

    start(io) {

        const world = new World(io);
        let iTimeLast = Date.now(); //経過時間を受け取る(現段階では使われていない)
        let PlayerNum = 0;          //プレイヤー人数
        let wait = false;           //マッチング中の待機状態の判定
        

        //クライアントからの送信にたいして反応するプログラム達
        io.on('connection', (socket) => {
            console.log('connection');


            let jiki = null;

            //ゲーム接続時、自機を作成
            socket.on('enter-the-game', () => {
                console.log('enter-the-game : socket.id = %s', socket.id);
                PlayerNum += 1;
                ///io.emit('PlayerNum', PlayerNum);
                //console.log("PrayerNum : "+PlayerNum);
                jiki = world.createJiki(PlayerNum); //World.jsのcreateJikiを呼びだす

                //start判定
                if (world.setJiki.size >= 2) {      //自機の数が2を越えたら待機状態を解除
                    wait = true;
                } 
            });

            //clientから送られてきたキー入力をjiki.jsに送る
            socket.on('change-my-movement', (objMovement) => {
                if (!jiki) {
                    return;
                }
                jiki.objMovement = objMovement;

            });

            //球を打つ
            socket.on('shoot', () => {
                if (!jiki) {
                    return;
                }
                //console.log('shoot');
                world.createTama(jiki);
            });

            //こんてにゅー
            socket.on('replay', () => {

            });

            //接続解除時、
            socket.on('disconnect', () => {
                console.log('disconnect');
                PlayerNum -= 1;
                if (!jiki) {
                    return;
                }
                //作った自機を消す
                world.destroyJiki(jiki);
                jiki = null;	// 自タンクの解放
            });

        });

        //一定間隔で実行するプログラム
        const Interval = setInterval(() => {

            const iTimeCurrent = Date.now();
            const fDeltaTime = (iTimeCurrent - iTimeLast) * 0.001;	// 秒に変換
            iTimeLast = iTimeCurrent;

            const hrtime = process.hrtime();

            world.update(fDeltaTime);

            const hrtimeDiff = process.hrtime(hrtime);
            const iNanosecDiff = hrtimeDiff[0] * 1e9 + hrtimeDiff[1];

            //画面の更新指令をclientへ
            io.emit('update', Array.from(world.setTama), Array.from(world.setJiki), iNanosecDiff);

            //ゲーム本体用の処理部分(待機状態では動かないようにしている)
            if (wait) {
                //console.log('start : ' + world.setJiki.size);

                world.gameUpdate()
                    

                if (world.setJiki.size < 2) {      //自機の数が2未満になったら待機状態に戻る
                    wait = false;
                }
            } 
        },1000/ 30);
    }
}