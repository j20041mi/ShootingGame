const GameObject = require('./GameObjects.js');

const SharedSettings = require('../public/js/SharedSettings.js');

//çÏê¨íÜ

module.exports = class Tama {
    constructor(x,y, jiki) {
        this.y = y
        this.x = x;
        this.vx = 10000;
        this.vy = 10000;

        this.reverse = false;
        

        this.fSpeed = 50;
        this.jiki = jiki;
        this.flag;
    }

    update() {
        if (this.y < 0) {
            this.reverse = true;
            this.x = SharedSettings.FIELD_W - this.x;
            this.y = 1;
        }

        if (this.reverse == true) {
            this.y += this.fSpeed;
        } else {
            this.y -= this.fSpeed;
        }

        let bCollision = false;
        if (this.y >= SharedSettings.FIELD_H) {
            bCollision = true;
        }
        //console.log('x:' + this.x + ' y:' + this.y);

        

        
        

        

        return bCollision;
    }

}