// �Q�[���̐ݒ�N���X
// ���T�[�o�[�ƃN���C�A���g�ŋ��ʂ̐ݒ�́A�N���C�A���g������Q�Ƃł���悤�ɁA
//   public/js / SharedSettings.js�ɂĐݒ肷��B
module.exports = class GameSettings
{
    // �Q�[���S��
    static get FRAMERATE() { return 30; }   // �t���[�����[�g�i�P�b������̃t���[�����j

    // �^���N
    static get TANK_SPEED() { return 150.0; }	// ���x[m/s]�B1frame������5�i�� => 1/30[s] ��5�i�� => 1[s]��150�i�ށB
    static get TANK_ROTATION_SPEED() { return 3.0; }// ��]���x[rad/s]�B1frame������0.1�i�� => 1/30[s] ��0.1�i�� => 1[s]��3[rad]�i�ށB
}
