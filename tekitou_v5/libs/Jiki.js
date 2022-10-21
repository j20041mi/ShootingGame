const Tama = require('./Tama.js');

const SharedSetings = require('../public/js/SharedSettings.js');

//自機に関する処理

module.exports = class jiki {
    constructor(PlayerNum) {
        this.Players = true;
        if (PlayerNum <=1) {       //一人目のプレイヤーは左画面に
            this.x = SharedSetings.FIELD_W / 4;
            this.y = 682;
        } else {                    //二人目は右画面に
            this.x = SharedSetings.FIELD_W / 4 * 3;
            this.y = 682;
        }

        this.hp = 5;
        this.Lose = false;
        this.iTimeLastShoot = 30;    //最後に球を打った時間
        this.objMovement = {};      //自機の動きを受け取る
    }

    update(fDeltaTime) {
        const x_old = this.x;
        const y_old = this.y;

        if (this.objMovement['forward']) {  //前進
            this.y -= 10; 
        }
        if (this.objMovement['back']) {     //後退
            this.y += 10;
        }
        if (this.objMovement['left']) {     //左
            this.x -= 10;
        }
        if (this.objMovement['right']) {    //右
            this.x += 10;
        }

        //不可侵領域への侵入を判定
        if (this.y < 0 || this.y > SharedSetings.FIELD_H) {
            this.y = y_old;
        }
        if (this.x < 0 || this.x > SharedSetings.FIELD_W) {
            this.x = x_old;
        }
        if (SharedSetings.FIELD_W/2 - 10 < this.x && this.x < SharedSetings.FIELD_W/2 +10) {
            this.x = x_old;
        }

    }

    //弾の処理(作成中)
    //弾を打てる間隔
    canShoot() {
        if (3.0 > Date.now() - this.iTimeLastShoot) {
            return false;
        }
        return true;
    }
    //弾を打つ
    shoot() {
        if (!this.canShoot()) {
            return null;
        }

        this.iTimeLastShoot = Date.now();

        let x = this.x;
        let y = this.y;
        //console.log('y:' + y);
        const tama = new Tama(x, y, this);
        return tama;
    }
}