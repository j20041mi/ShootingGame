//ƒ‚ƒWƒ…[ƒ‹
const World = require('./World.js');

//İ’è
const GameSettings = require('./GameSettings.js');


module.exports = class Game {

    start(io) {
        const world = new World(io);
        let iTimeLast = Date.now();

    }

}