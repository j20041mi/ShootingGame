const SharedSetings = require('../public/js/SharedSettings.js');

module.exports = class jiki {
    constructor() {
        this.x = SharedSetings.FIELD_W / 2;
        this.y = SharedSetings.FIELD_H / 2;

        this.objMovement = {};
    }

    update() {
        if (this.objMovement['forward']) {
            this.x += 1; 
        }
        if (this.objMovement['back']) {
            this.x -= 1;
        }
        if (this.objMovement['left']) {
            this.y -= 1;
        }
        if (this.objMovement['right']) {
            this.y += 1;
        }
    }
}