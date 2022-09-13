// ���W���[��
const GameObject = require('./GameObject.js');

// �ݒ�
const SharedSettings = require('../public/js/SharedSettings');
const GameSettings = require('./GameSettings.js');

// �^���N�N���X
module.exports = class Tank extends GameObject {
    // �R���X�g���N�^
    constructor() {
        // �e�N���X�̃R���X�g���N�^�Ăяo��
        super(SharedSettings.TANK_WIDTH, SharedSettings.TANK_HEIGHT, 0.0, 0.0, Math.random() * 2 * Math.PI);

        this.objMovement = {};	// ����
        this.fSpeed = GameSettings.TANK_SPEED;    // ���x[m/s]�B1frame������5�i�� => 1/30[s] ��5�i�� => 1[s]��150�i�ށB
        this.fRotationSpeed = GameSettings.TANK_ROTATION_SPEED;    // ��]���x[rad/s]�B1frame������0.1�i�� => 1/30[s] ��0.1�i�� => 1[s]��3[rad]�i�ށB

        // �����ʒu
        this.fX = Math.random() * (SharedSettings.FIELD_WIDTH - SharedSettings.TANK_WIDTH);
        this.fY = Math.random() * (SharedSettings.FIELD_HEIGHT - SharedSettings.TANK_HEIGHT);
    }

    // �X�V
    update(fDeltaTime) {
        // ����ɏ]���āA�^���N�̏�Ԃ��X�V
        if (this.objMovement['forward']) {	// �O�i
            const fDistance = this.fSpeed * fDeltaTime;
            //console.log( 'forward' );
            this.fX += fDistance * Math.cos(this.fAngle);
            this.fY += fDistance * Math.sin(this.fAngle);
        }
        if (this.objMovement['back']) {	// ��i
            const fDistance = this.fSpeed * fDeltaTime;
            //console.log( 'back' );
            this.fX -= fDistance * Math.cos(this.fAngle);
            this.fY -= fDistance * Math.sin(this.fAngle);
        }

        if (this.objMovement['left']) {	// ���]��
            //console.log( 'left' );
            // X�����E�����AY�����u��v�����̐��E�ł́A����]�́A�p�x�����������
            // X�����E�����AY�����u���v�����̐��E�ł́A����]�́A�p�x���������
            //this.fAngle += this.fRotationSpeed * fDeltaTime;  // Y�����u��v�����p�iWebGL�L�����o�X�ւ̕`��p�j
            this.fAngle -= this.fRotationSpeed * fDeltaTime;  // Y�����u���v�����p�i2D�L�����o�X�ւ̕`��p�j
        }
        if (this.objMovement['right']) {	// �E�]��
            //console.log( 'right' );
            // X�����E�����AY�����u��v�����̐��E�ł́A�E��]�́A�p�x���������
            // X�����E�����AY�����u���v�����̐��E�ł́A�E��]�́A�p�x�����������
            //this.fAngle -= this.fRotationSpeed * fDeltaTime;  // Y�����u��v�����p�iWebGL�L�����o�X�ւ̕`��p�j
            this.fAngle += this.fRotationSpeed * fDeltaTime;  // Y�����u���v�����p�i2D�L�����o�X�ւ̕`��p�j
        }
    }
}