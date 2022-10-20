const Tama = require('./Tama.js');

const SharedSetings = require('../public/js/SharedSettings.js');

//���@�Ɋւ��鏈��

module.exports = class jiki {
    constructor(PlayerNum) {
        this.Players = true;
        if (!(PlayerNum % 2 == 0)) {       //��l�ڂ̃v���C���[�͍���ʂ�
            this.x = SharedSetings.FIELD_W / 4;
            this.y = 682;
        } else {                    //��l�ڂ͉E��ʂ�
            this.x = SharedSetings.FIELD_W / 4 * 3;
            this.y = 682;
        }
        this.iTimeLastShoot = 30;    //�Ō�ɋ���ł�������
        this.objMovement = {};      //���@�̓������󂯎��
    }

    update(fDeltaTime) {
        const x_old = this.x;
        const y_old = this.y;

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

        //�s�N�̈�ւ̐N���𔻒�
        if (this.y < 0 || this.y > SharedSetings.FIELD_H) {
            this.y = y_old;
        }
        if (this.x < 0 || this.x > SharedSetings.FIELD_W) {
            this.x = x_old;
        }
        if (SharedSetings.FIELD_W/2 - 10 < this.x && this.x < SharedSetings.FIELD_W/2 +10) {
            this.x = x_old;
        }

    }

    //�e�̏���(�쐬��)
    //�e��łĂ�Ԋu
    canShoot() {
        if (3.0 > Date.now() - this.iTimeLastShoot) {
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

        let x = this.x;
        let y = this.y;
        //console.log('y:' + y);
        const tama = new Tama(x, y, this);
        return tama;
    }
}