// �T�[�o�[�X�N���v�g�ƃN���C�A���g�ŋ��ʂ̐ݒ�N���X
class SharedSettings
{
    // �t�B�[���h�T�C�Y
    // ���w�i�^�C���摜�̃g���������������̂��߁A
    // �@�uFIELD_WIDTH�́AFIELDTILE_WIDTH�̒萔�{�v�uFIELD_HEIGHT�́AFIELDTILE_HEIGHT�̒萔�{�v�ɂ���K�v����B
    static get FIELD_WIDTH() { return 1024.0; }
    static get FIELD_HEIGHT() { return 1024.0; }

    // �^���N
    static get TANK_WIDTH() { return 80.0; }
    static get TANK_HEIGHT() { return 80.0; }
}

if( typeof module !== 'undefined' && typeof module.exports !== 'undefined' )
{   // �T�[�o�[�����iNode.js�����j�p�̋L�q
    module.exports = SharedSettings;
}