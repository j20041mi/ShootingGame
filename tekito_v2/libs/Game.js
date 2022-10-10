const World = require('./World.js');


module.exports = class Game {

    start(io) {

        const world = new World(io);
        let iTimeLast = Date.now();

        //�N���C�A���g����̑��M�ɂ������Ĕ�������v���O����
        io.on('connection', (socket) => {
            console.log('connection');


            let jiki = null;

            //�Q�[���ڑ����A���@���쐬
            socket.on('enter-the-game', () => {
                console.log('enter-the-game : socket.id = %s', socket.id);
                jiki = world.createJiki();
            });

            //client���瑗���Ă����L�[���͂����@�I�u�W�F�N�g�ɒu����
            socket.on('change-my-movement', (objMovement) => {
                if (!jiki) {
                    return;
                }
                jiki.objMovement = objMovement;

            });

            //�ڑ��������A
            socket.on('disconnect', () => {
                console.log('disconnect');
                if (!jiki) {
                    return;
                }
                //��������@������
                world.destroyJiki(jiki);
                jiki = null;	// ���^���N�̉��
            });

        });

        //���Ԋu�Ŏ��s����v���O����
        setInterval(() => {

            const iTimeCurrent = Date.now();
            const fDeltaTime = (iTimeCurrent - iTimeLast) * 0.001;	// �b�ɕϊ�
            iTimeLast = iTimeCurrent;

            const hrtime = process.hrtime();

            world.update(fDeltaTime);

            const hrtimeDiff = process.hrtime(hrtime);
            const iNanosecDiff = hrtimeDiff[0] * 1e9 + hrtimeDiff[1];

            io.emit('update', Array.from(world.setJiki), iNanosecDiff);

            
        },1000/ 30);
    }
}