const Jiki = require('./Jiki.js');
const Teki = require('./Teki.js');


const SharedSettings = require('../public/js/SharedSettings.js')

module.exports = class World {

    constructor(io) {
        this.io = io;
        this.setJiki = new Set();   //自機を管理する配列
        this.setTama = new Set();   //弾を管理する配列(作成中)
 
        //壁の生成
        

    }

    //jiki関連
    //自機を作るための処理を呼び出す
    createJiki(PlayerNum) {
        if (PlayerNum <= 2) {
            const jiki = new Jiki(PlayerNum);
            this.setJiki.add(jiki);
            //console.log("create");
            return jiki;
        }
    }
    //自機を消去する
    destroyJiki(jiki) {
        this.setJiki.delete(jiki);  

    }

    //teki関連(作成保留中)
    //敵を作る
    createTeki() {
        const teki = new Teki(1, 0, 0, 1, 1);
        this.setTeki.add(teki);
        
    }
    //敵objの消去
    destroyTeki() {
    }

    //Tama関連
    //弾の生成
    createTama(jiki) {
        //console.log('tama');
        const tama = jiki.shoot();
        if (tama) {
            this.setTama.add(tama);
        }
    }
    //弾の消去
    destroyTama(tama) {
        this.setTama.delete(tama);
    }


    //ゲーム全体を通したループ処理
    update(fDeltaTime) {
        //自機の更新
        this.setJiki.forEach((jiki) => {
            jiki.update(fDeltaTime);
        });

        const rectTamaField = {     //弾の処理(作成中)
            fLeft: 0 + SharedSettings.BULLET_WIDTH * 0.5,
            fBottom: 0 + SharedSettings.BULLET_HEIGHT * 0.5,
            fRight: SharedSettings.FIELD_W - SharedSettings.BULLET_W * 0.5,
            fTop: SharedSettings.FIELD_H - SharedSettings.BULLET_H * 0.5
        }

        this.setTama.forEach((tama) => {
            const bDisappear = tama.update();
            if (bDisappear) {
                this.destroyTama(tama);
            }
            
            
        });
    }

    //対戦中用のループ処理
    gameUpdate() {
        //this.setTeki.forEach((teki) => {
        //    teki.update();
        //});


        //弾の当たり判定


        //勝利判定
        

    }
}