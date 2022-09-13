// ���[���h�N���X
// �E�Q�[�����̊e��v�f��ێ�����
// �E�Q�[���ɕێ������
// �E�Q�[�����[���h�̍X�V������L����i�Q�[������v�����󂯁A�ێ�����e��v�f���X�V����j
// �E�Q�[�����̊e��v�f�̐����A�j����L����

const Tank = require('./Tank.js');

module.exports = class World
{
    // �R���X�g���N�^
    constructor( io )
    {
        this.io = io;   // socketIO
        this.setTank = new Set();       //�^���N���X�g
    }

    // �X�V����
    update( fDeltaTime )
    {
        // �I�u�W�F�N�g�̍��W�l�̍X�V
        this.updateObjects( fDeltaTime );

        // �Փ˃`�F�b�N
        this.checkCollisions();

        // �V���ȍs���i���ɁA�{�b�g�Ɋւ��鐶���⓮��
        this.doNewActions( fDeltaTime );
    }

    // �I�u�W�F�N�g�̍��W�l�̍X�V
    updateObjects(fDeltaTime) {

        //�^���N���Ƃ̏���
        this.setTank.forEach(
            (tank) => {
                tank.update(fDeltaTime);
            });
    }

    // �Փ˂̃`�F�b�N
    checkCollisions()
    {
    }

    // �V���ȍs��
    doNewActions( fDeltaTime )
    {
    }


    //�^���N�̐���
    createTank() {
        //�^���N�̐���
        const tank = new Tank();
        //�^���N���X�g�ւ̓o�^
        this.setTank.add(tank);

        return tank;
    }
    //�^���N�̔j��
    destroyTank(tank) {
        //�^���N���X�g����̍폜
        this.setTank.delete(tank);
    }
}