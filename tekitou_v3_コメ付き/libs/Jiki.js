const SharedSetings = require('../public/js/SharedSettings.js');

//���@�Ɋւ��鏈��

module.exports = class jiki {
    constructor(PlayerNum) {
        if (PlayerNum == 1) {       //��l�ڂ̃v���C���[�͍���ʂ�
            this.x = SharedSetings.FIELD_W / 4;
            this.y = SharedSetings.FIELD_H / 3 * 2;
        } else {                    //��l�ڂ͉E��ʂ�
            this.x = SharedSetings.FIELD_W / 4 * 3;
            this.y = SharedSetings.FIELD_H / 3 * 2;
        }

        this.iTimeLastShoot = 0;    //�Ō�ɋ���ł�������
        this.objMovement = {};      //���@�̓������󂯎��
    }

    update(fDeltaTime) {
        if (this.objMovement['forward']) {  //�O�i
            this.y -= 10; 
        }
        if (this.objMovement['back']) {     //���
            this.y += 10;
        }
        if (this.objMovement['left']) {     //��
            this.x -= 10;
        }
        if (this.objMovement['right']) {    //�E
            this.x += 10;
        }
    }

    //�e�̏���(�쐬��)
    //�e��łĂ�Ԋu
    canShoot() {
        if (3.0 > Date, now() - this.iTimeLastShoot) {
            return false;
        }
        return true;
    }
    //�e��ł�
    shoot() {
        if (!this.canShoot()) {
            return null;
        }

        this.iTimeLastShoot = Date.now();

        const x = this.x;
        const y = this.y;
        return new Tama(x, y, this);
    }
}