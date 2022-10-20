// ���W���[��
const GameObject = require( './GameObject.js' );

// �ݒ�
const SharedSettings = require( '../public/js/SharedSettings.js' );

// �ǃN���X
module.exports = class Wall extends GameObject
{
    // �R���X�g���N�^
    constructor()
    {
        this.w = 5;
        this.h = SharedSettings.FIELD_H;
        this.x = SharedSettings.FIELD_W / 2;
        this.y = 0;
    }
}