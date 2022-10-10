const SharedSetings = require('../public/js/SharedSettings.js');

module.exports = class jiki {
    constructor() {
        this.x = SharedSetings.FIELD_W / 2;
        this.y = SharedSetings.FIELD_H / 2;

        this.objMovement = {};
    }

    update(fDeltaTime) {
        if (this.objMovement['forward']) {
            this.y -= 10; 
        }
        if (this.objMovement['back']) {
            this.y += 10;
        }
        if (this.objMovement['left']) {
            this.x -= 10;
        }
        if (this.objMovement['right']) {
            this.x += 10;
        }
    }
}