const Jiki = require('./Jiki.js');

module.exports = class World {

    constructor(io) {
        this.io = io;
        this.setJiki = new Set();
    }

    createJiki() {
        const jiki = new Jiki();
        this.setJiki.add(jiki);
        console.log("create");
        return jiki;
    }

    destroyJiki(jiki) {
        this.setJiki.delete(jiki);
    }

    update() {
        this.updateObjects();
    }

    updateObjects() {
        this.setJiki.forEach((jiki) => {
            jiki.update();
        });
    }
}