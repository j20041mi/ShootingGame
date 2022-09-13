 //���W���[��
const World = require('./World.js');

let Player_num = 0;

// �ݒ�
const GameSettings = require('./GameSettings.js');

// �Q�[���N���X
// �E���[���h��ێ�����
// �E�ʐM������L����
// �E�����I������L����
module.exports = class Game {
    // �n��
    start(io) {
        // �ϐ�
        const world = new World(io); // setInterval()���ł̎Q�Ƃ�����̂ŁA�X�R�[�v�𔲂��Ă��A������������i�K�[�x�b�W�R���N�V��������Ȃ��j�B
        let iTimeLast = Date.now(); // setInterval()���ł̎Q�Ƃ�����̂ŁA�X�R�[�v�𔲂��Ă��A������������i�K�[�x�b�W�R���N�V��������Ȃ��j�B

        // �ڑ����̏���
        // �E�T�[�o�[�ƃN���C�A���g�̐ڑ����m������ƁA
        // �@�T�[�o�[�ŁA'connection'�C�x���g
        // �@�N���C�A���g�ŁA'connect'�C�x���g����������
        io.on(
            'connection',
            (socket) => {

                if (Player_num <= 1) {
                    Player_num = Player_num +1;

                    console.log('connection : socket.id = %s', socket.id);
                    let tank = null;	// �R�l�N�V�������Ƃ̃^���N�I�u�W�F�N�g�B�C�x���g���܂����Ŏg�p�����B

                    // �Q�[���J�n���̏����̎w��
                    // �E�N���C�A���g���̐ڑ��m�����́usocket.emit( 'enter-the-game' );�v�ɑ΂��鏈��
                    socket.on('enter-the-game',
                        () => {	// ���^���N�̍쐬
                            console.log('enter-the-game : socket.id = %s', socket.id);
                            tank = world.createTank();
                        });

                    // �ړ��R�}���h�̏����̎w��
                    // �E�N���C�A���g���̃L�[���͎��́usocket.emit( 'change-my-movement', objMovement );�v�ɑ΂��鏈��
                    socket.on('change-my-movement',
                        (objMovement) => {
                            //console.log( 'change-my-movement : socket.id = %s', socket.id );
                            if (!tank) {
                                return;
                            }
                            tank.objMovement = objMovement;	// ����
                        });

                    // �ؒf���̏����̎w��
                    // �E�N���C�A���g���ؒf������A�T�[�o�[���ł�'disconnect'�C�x���g����������
                    socket.on('disconnect',
                        () => {
                            console.log('disconnect : socket.id = %s', socket.id);
                            if (!tank) {
                                return;
                            }
                            world.destroyTank(tank);
                            tank = null;	// ���^���N�̉��
                        });

                }
            });

        // �����I�����i1�b�Ԃ�FRAMERATE��̏ꍇ�Adelay�́A1000[ms]/FRAMERATE[��]�j
        setInterval(
            () => {
                // �o�ߎ��Ԃ̎Z�o
                const iTimeCurrent = Date.now();    // �~���b�P�ʂŎ擾
                const fDeltaTime = (iTimeCurrent - iTimeLast) * 0.001;	// �b�ɕϊ�
                iTimeLast = iTimeCurrent;
                //console.log( 'DeltaTime = %f[s]', fDeltaTime );

                // �������Ԍv���p
                const hrtime = process.hrtime();  // �i�m�b�P�ʂŎ擾

                // �Q�[�����[���h�̍X�V
                world.update(fDeltaTime);

                const hrtimeDiff = process.hrtime(hrtime);
                const iNanosecDiff = hrtimeDiff[0] * 1e9 + hrtimeDiff[1];

                // �ŐV�󋵂��N���C�A���g�ɑ��M
                io.emit('update',
                    Array.from(world.setTank),  // Set�I�u�W�F�N�g�͑���M�s�iSet��JSON�ϊ�������`������H�j�B�z��ɂ��đ��M����B
                    iNanosecDiff);	// ���M
            },
            1000 / GameSettings.FRAMERATE);	// �P�ʂ�[ms]�B1000[ms] / FRAMERATE[��]
    }
}