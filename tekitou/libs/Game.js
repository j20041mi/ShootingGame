const World = require('./World.js');


module.exports = class Game {

    start(io) {

        const world = new World(io);

        //クライアントからの送信にたいして反応するプログラム
        io.on('connection', (socket) => {
            console.log('connection');


            let jiki = null;
            let mymove = null;

            socket.on('enter-the-game', () => {
                console.log('enter-the-game : socket.id = %s', socket.id);
                jiki = world.createJiki();
            });

            socket.on('change-my-movement', (objMovement) => {
                /*
                if (objMovement['forward']) {
                    console.log(jiki.x);
                }
                if (objMovement['back']) {
                    console.log(jiki.x);
                }
                if (objMovement['left']) {
                    console.log('left');
                }
                if (objMovement['right']) {
                    console.log('light');
                }
                */
                
                console.log('change-the-movement');
                if (!jiki) {
                    return;
                }
                jiki.objMovement = objMovement;

            });

            socket.on('disconnect', () => {
                console.log('disconnect');
                if (!jiki) {
                    return;
                }
                world.destroyJiki(jiki);
                jiki = null;	// 自タンクの解放
            });

        });

        //一定間隔で実行するプログラム
        setInterval(() => {
            world.update();

            io.emit('update', Array.from(world.setJiki));


        });
    }
}