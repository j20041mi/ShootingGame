const SharedSetings = require('../public/js/SharedSettings.js'); 

//���@��G�A�ʂȂǂ̃I�u�W�F�N�g�̐e�N���X

module.exports = class GameObjects {
    constructor(snum, x, y, vx, vy) {
        this.snum = snum;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.kill = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > SharedSetings.FIELD_W << 8
            || this.y < 0 || this.y > SharedSetings.FIELD_H << 8) this.kill = true;
    }
}