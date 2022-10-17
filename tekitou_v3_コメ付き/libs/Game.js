const World = require('./World.js');


module.exports = class Game {

    start(io) {

        const world = new World(io);
        let iTimeLast = Date.now(); //�o�ߎ��Ԃ��󂯎��(���i�K�ł͎g���Ă��Ȃ�)
        let PlayerNum = 0;          //�v���C���[�l��
        let wait = false;           //�}�b�`���O���̑ҋ@��Ԃ̔���

        //�N���C�A���g����̑��M�ɂ������Ĕ�������v���O�����B
        io.on('connection', (socket) => {
            console.log('connection');


            let jiki = null;

            //�Q�[���ڑ����A���@���쐬
            socket.on('enter-the-game', () => {
                console.log('enter-the-game : socket.id = %s', socket.id);
                PlayerNum += 1;
                //console.log("PrayerNum : "+PlayerNum);
                jiki = world.createJiki(PlayerNum); //World.js��createJiki���Ăт���
                if (world.setJiki.size >= 2) {      //���@�̐���2���z������ҋ@��Ԃ�����
                    wait = true;
                } 
            });

            //����ł�
            socket.on('shoot', () => {
                if (!jiki) {
                    return;
                }
                console.log('shoot');
            });

            //client���瑗���Ă����L�[���͂�jiki.js�ɑ���
            socket.on('change-my-movement', (objMovement) => {
                if (!jiki) {
                    return;
                }
                jiki.objMovement = objMovement;

            });

            //�ڑ��������A
            socket.on('disconnect', () => {
                console.log('disconnect');
                PlayerNum -= 1;
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

            //��ʂ̍X�V�w�߂�client��
            io.emit('update', Array.from(world.setJiki), iNanosecDiff);

            //�Q�[���{�̗p�̏�������(�ҋ@��Ԃł͓����Ȃ��悤�ɂ��Ă���)
            if (wait) {
                //console.log('start : ' + world.setJiki.size);

                world.gameUpdate();

                if (world.setJiki.size < 2) {      //���@�̐���2�����ɂȂ�����ҋ@��Ԃɖ߂�
                    wait = false;
                }
            } 
        },1000/ 30);
    }
}