const GameObjects = require('./GameObjects.js');

const SharedSettings = require('../public/js/SharedSettings.js');

//çÏê¨íÜ

module.export = class Tama extends GameObject{
    constructor(x, y, jiki){
        this.snum = 0;
        this.vx = 5;
        this.vy = 5;
        super(x, y);

        this.fSpeed = 0;
        this, jiki = jiki;
        this.flag;
    }

    update() {
        this.x -= fSpeed;


    }

}