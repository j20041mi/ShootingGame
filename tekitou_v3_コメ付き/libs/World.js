const Jiki = require('./Jiki.js');
const Teki = require('./Teki.js');

module.exports = class World {

    constructor(io) {
        this.io = io;
        this.setJiki = new Set();   //���@���Ǘ�����z��
        this.setTama = new Set();   //�e���Ǘ�����z��(�쐬��)
    }

    //jiki�֘A
    //���@����邽�߂̏������Ăяo��
    createJiki(PlayerNum) {
        if (PlayerNum <= 2) {
            const jiki = new Jiki(PlayerNum);
            this.setJiki.add(jiki);
            console.log("create");
            return jiki;
        }
    }
    //���@����������
    destroyJiki(jiki) {
        this.setJiki.delete(jiki);  

    }

    //teki�֘A(�쐬�ۗ���)
    //�G�����
    createTeki() {
        const teki = new Teki(1, 0, 0, 1, 1);
        this.setTeki.add(teki);
        
    }
    //�Gobj�̏���
    destroyTeki() {

    }

    //�Q�[���S�̂�ʂ������[�v����
    update(fDeltaTime) {
        //���@�̍X�V
        this.setJiki.forEach((jiki) => {
            jiki.update(fDeltaTime);
        });

        const rectTamaField = {     //�e�̏���(�쐬��)
            fLeft: 0 + SharedSettings.BULLET_WIDTH * 0.5,
            fBottom: 0 + SharedSettings.BULLET_HEIGHT * 0.5,
            fRight: SharedSettings.FIELD_W - SharedSettings.BULLET_W * 0.5,
            fTop: SharedSettings.FIELD_H - SharedSettings.BULLET_H * 0.5
        }
    }

    //�ΐ풆�p�̃��[�v����
    gameUpdate() {
        this.setTeki.forEach((teki) => {
            teki.update();
        });

    }
}