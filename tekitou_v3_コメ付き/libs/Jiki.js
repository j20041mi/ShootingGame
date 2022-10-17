const SharedSetings = require('../public/js/SharedSettings.js');

//自機に関する処理

module.exports = class jiki {
    constructor(PlayerNum) {
        if (PlayerNum == 1) {       //一人目のプレイヤーは左画面に
            this.x = SharedSetings.FIELD_W / 4;
            this.y = SharedSetings.FIELD_H / 3 * 2;
        } else {                    //二人目は右画面に
            this.x = SharedSetings.FIELD_W / 4 * 3;
            this.y = SharedSetings.FIELD_H / 3 * 2;
        }

        this.iTimeLastShoot = 0;    //最後に球を打った時間
        this.objMovement = {};      //自機の動きを受け取る
    }

    update(fDeltaTime) {
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
    }

    //弾の処理(作成中)
    //弾を打てる間隔
    canShoot() {
        if (3.0 > Date, now() - this.iTimeLastShoot) {
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

        const x = this.x;
        const y = this.y;
        return new Tama(x, y, this);
    }
}