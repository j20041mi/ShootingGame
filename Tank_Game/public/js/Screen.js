// �X�N���[���N���X
class Screen {
    // �R���X�g���N�^
    constructor(socket, canvas) {
        this.socket = socket;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.assets = new Assets();
        this.iProcessingTimeNanoSec = 0;

        this.iProcessingTimeNanoSec = 0;
        this.aTank = null;


        // �L�����o�X�̏�����
        this.canvas.width = SharedSettings.FIELD_WIDTH;
        this.canvas.height = SharedSettings.FIELD_HEIGHT;

        // �\�P�b�g�̏�����
        this.initSocket();

        // �R���e�L�X�g�̏�����
        // �A���`�G�C���A�X�̗}�~�i�摜���ڂ₯��̖̂h�~�j�ȉ��S�s
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }

    // �\�P�b�g�̏�����
    initSocket() {
        // �ڑ��m�����̏���
        // �E�T�[�o�[�ƃN���C�A���g�̐ڑ����m������ƁA
        // �@�T�[�o�[�ŁA'connection'�C�x���g
        // �@�N���C�A���g�ŁA'connect'�C�x���g����������
        this.socket.on(
            'connect',
            () => {
                console.log('connect : socket.id = %s', socket.id);
                // �T�[�o�[��'enter-the-game'�𑗐M
                this.socket.emit('enter-the-game');
            });

        // �T�[�o�[����̏�Ԓʒm�ɑ΂��鏈��
        // �E�T�[�o�[���̎����I�����́uio.sockets.emit( 'update', �E�E�E );�v�ɑ΂��鏈��
        this.socket.on(
            'update',
            (aTank, iProcessingTimeNanoSec) => {
                this.aTank = aTank;
                this.iProcessingTimeNanoSec = iProcessingTimeNanoSec;
            });
    }

    // �A�j���[�V�����i�������[�v�����j
    animate(iTimeCurrent) {
        requestAnimationFrame(
            (iTimeCurrent) => {
                this.animate(iTimeCurrent);
            });
        this.render(iTimeCurrent);
    }

    // �`��Banimate���疳���ɌĂяo�����
    render(iTimeCurrent) {
        //console.log( 'render' );

        // �L�����o�X�̃N���A
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        // �L�����o�X�̓h��Ԃ�
        this.renderField();

        // �^���N�̕`��
        if (null !== this.aTank) {
            const fTimeCurrentSec = iTimeCurrent * 0.001; // iTimeCurrent�́A�~���b�B�b�ɕϊ��B
            const iIndexFrame = parseInt(fTimeCurrentSec / 0.2) % 2;  // �t���[���ԍ�
            this.aTank.forEach(
                (tank) => {
                    this.renderTank(tank, iIndexFrame);
                });
        }

        // �L�����o�X�̘g�̕`��
        this.context.save();
        this.context.strokeStyle = RenderingSettings.FIELD_LINECOLOR;
        this.context.lineWidth = RenderingSettings.FIELD_LINEWIDTH;
        this.context.strokeRect(0, 0, canvas.width, canvas.height);
        this.context.restore();

        // ��ʉE��ɃT�[�o�[�������ԕ\��
        this.context.save();
        this.context.font = RenderingSettings.PROCESSINGTIME_FONT;
        this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
        this.context.fillText((this.iProcessingTimeNanoSec * 1e-9).toFixed(9) + ' [s]',
            this.canvas.width - 30 * 10,
            40);
        this.context.restore();
    }

    renderField() {
        this.context.save();

        let iCountX = parseInt(SharedSettings.FIELD_WIDTH / RenderingSettings.FIELDTILE_WIDTH);
        let iCountY = parseInt(SharedSettings.FIELD_HEIGHT / RenderingSettings.FIELDTILE_HEIGHT);
        for (let iIndexY = 0; iIndexY < iCountY; iIndexY++) {
            for (let iIndexX = 0; iIndexX < iCountX; iIndexX++) {
                this.context.drawImage(this.assets.imageField,
                    this.assets.rectFieldInFieldImage.sx, this.assets.rectFieldInFieldImage.sy,	// �`�挳�摜�̉E����W
                    this.assets.rectFieldInFieldImage.sw, this.assets.rectFieldInFieldImage.sh,	// �`�挳�摜�̑傫��
                    iIndexX * RenderingSettings.FIELDTILE_WIDTH,// �摜��̈�̉E����W�i�̈撆�S���A���_�ɂȂ�悤�Ɏw�肷��j
                    iIndexY * RenderingSettings.FIELDTILE_HEIGHT,// �摜��̈�̉E����W�i�̈撆�S���A���_�ɂȂ�悤�Ɏw�肷��j
                    RenderingSettings.FIELDTILE_WIDTH,	// �`���̈�̑傫��
                    RenderingSettings.FIELDTILE_HEIGHT);	// �`���̈�̑傫��
            }
        }

        this.context.restore();
    }

    renderTank(tank, iIndexFrame) {
        this.context.save();

        // �^���N�̍��W�l�Ɉړ�
        this.context.translate(tank.fX, tank.fY);

        // �摜�`��
        this.context.save();
        this.context.rotate(tank.fAngle);
        this.context.drawImage(this.assets.imageItems,
            this.assets.arectTankInItemsImage[iIndexFrame].sx, this.assets.arectTankInItemsImage[iIndexFrame].sy,	// �`�挳�摜�̉E����W
            this.assets.arectTankInItemsImage[iIndexFrame].sw, this.assets.arectTankInItemsImage[iIndexFrame].sh,	// �`�挳�摜�̑傫��
            -SharedSettings.TANK_WIDTH * 0.5,	// �摜��̈�̉E����W�i�̈撆�S���A���_�ɂȂ�悤�Ɏw�肷��j
            -SharedSettings.TANK_HEIGHT * 0.5,	// �摜��̈�̉E����W�i�̈撆�S���A���_�ɂȂ�悤�Ɏw�肷��j
            SharedSettings.TANK_WIDTH,	// �`���̈�̑傫��
            SharedSettings.TANK_HEIGHT);	// �`���̈�̑傫��
        this.context.restore();

        this.context.restore();
    }
}
