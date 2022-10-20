const SharedSetings = require('../public/js/SharedSettings.js');
const GameObjects = require('./GameObjects.js');

//ì¬•Û—¯’†

module.exports = class jiki extends GameObjects {
    constructor(snum, x, y, vx, vy) {
        super(snum, x, y, vx, vy);
        this.flag = false;
    }

    update() {
        super.update();

        if (this.flag && this.vy > 800) this.vy += 30
        console.log('x:' +this.x +"y:"+this.y);
    }
}