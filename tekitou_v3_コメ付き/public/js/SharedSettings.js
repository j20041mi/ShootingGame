//�T�[�o�ƃN���C�A���g�����Ŏg���ݒ�
class SharedSettings {
    static get FIELD_W() { return 1024.0; }
    static get FIELD_H() { return 1024.0; }

    static get JIKI_W() {return 80.0 };
    static get JIKI_H() { return 80.0 };


}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {   // �T�[�o�[�����iNode.js�����j�p�̋L�q
    module.exports = SharedSettings;
}