//�T�[�o�ƃN���C�A���g�����Ŏg���ݒ�
class SharedSettings {
    static get FIELD_W() { return 1024.0; }
    static get FIELD_H() { return 1024.0; }

    static get JIKI_W() {return 80.0 };
    static get JIKI_H() { return 80.0 };

    // �e��
    static get BULLET_WIDTH() { return 20.0; }
    static get BULLET_HEIGHT() { return 20.0; }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {   // �T�[�o�[�����iNode.js�����j�p�̋L�q
    module.exports = SharedSettings;
}