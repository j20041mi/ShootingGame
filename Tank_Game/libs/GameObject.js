// �Q�[���I�u�W�F�N�g�N���X
// �E�^���N�A�ǁA�e�ۂ̐e�N���X
module.exports = class GameObject {
    // �R���X�g���N�^
    constructor(fWidth, fHeight, fX, fY, fAngle) {
        this.fWidth = fWidth;	// ��
        this.fHeight = fHeight;	// ����
        this.fX = fX;	// �ʒu(X)
        this.fY = fY;	// �ʒu(Y)
        this.fAngle = fAngle;	// �����i+x���̕�����0�B+y���̕�����PI/2�j

        this.fX = fX;
        this.fY = fY;
    }

    toJSON() {
        return {
            fX: this.fX,
            fY: this.fY,
            fAngle: this.fAngle
        };
    }
};