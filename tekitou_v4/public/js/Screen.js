//��ʂ�\������script
//

class Screen {

    constructor(socket, canvas) {
        this.socket = socket;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.assets = new Assets();
 
        this.iProcessingTimeNanoSec = 0;
        this.aJiki = null;
        this.aTama = null;

        this.initSocket();

        //canvas�����ݒ�
        this.canvas.width = SharedSettings.FIELD_W;
        this.canvas.height = SharedSettings.FIELD_H;

        //context �\���ɕK�v�Ȑݒ�
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }

    //�T�[�o���瑗�M���ꂽ����
    initSocket() {
        //�ڑ������Ƃ��uenter-the-game�v�ƕ\��
        this.socket.on('connect', () => {
            //this.socket.emit('');
            this.socket.emit('enter-the-game');
        });
        
        //�V�����Ȃ������@�̏����󂯎��B
        this.socket.on('update', (aTama ,aJiki, iProcessingTimeNanoSec) => {
            this.aJiki = aJiki;
            this.aTama = aTama;
            this.iProcessingTimeNanoSec = iProcessingTimeNanoSec;
            console.log(aTama);
        });
    }

    //��ʕ\���p�������[�v
    animate(iTimeCurrent) {
        requestAnimationFrame((iTimeCurrent) => {
            this.animate(iTimeCurrent);
        });
        //console.log('animate');
        this.render(iTimeCurrent);
    }
    

    //��ʂ̕\���͂�������
    render(iTimeCurrent) {
        //��ʃN���A
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        //���@�̕\��
        if (null !== this.aJiki) {
            const fTimeCurrentSec = iTimeCurrent * 0.001;
            this.aJiki.forEach((jiki) => {
                this.renderJiki(jiki);
            });
        }

        //�e�̕\��
        if (null !== this.aTama) {
            this.aTama.forEach((tama) => {
                this.renderTama(tama);
            });
        }

        //��ʂ̘g������Ă���
        this.context.save();
        this.context.strokeStyle = 'blue';
        this.context.lineWidth = 5;
        this.context.strokeRect(0, 0, canvas.width, canvas.height);
        this.context.strokeRect(SharedSettings.FIELD_W / 2, 0, SharedSettings.FIELD_W / 2, SharedSettings.FIELD_H);
        this.context.restore();

        /*
        this.context.save();
        this.context.moveTo(SharedSettings.FIELD_W / 2, 0);
        this.context.lineTo(SharedSettings.FIELD_W / 2, SharedSettings.FIELD_H);
        this.context.rect(0, 0, 1024, 1024);
        this.context.strokeStyle = "black";
        this.context.lineWidth = 25;
        
        this.context.restore();*/
    }

    //���@��\�����鏈��
    renderJiki(jiki) {
        this.context.save();
        this.context.translate(jiki.x, jiki.y);

        this.context.save();
        this.context.drawImage(this.assets.imageItems,
            this.assets.arectJikiInItemsImage[0].sx, this.assets.arectJikiInItemsImage[0].sy,	// �`�挳�摜�̉E����W
            this.assets.arectJikiInItemsImage[0].sw, this.assets.arectJikiInItemsImage[0].sh,
            -SharedSettings.JIKI_W * 0.5,
            -SharedSettings.JIKI_H * 0.5,
            SharedSettings.JIKI_W,
            SharedSettings.JIKI_H   
        );
        this.context.restore();

        /*this.context.font = RenderingSettings.PROCESSINGTIME_FONT;
        this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
        this.context.fillText("you", -SharedSettings.JIKI_W * 0.5+15,
            -SharedSettings.JIKI_H * 0.5+100);*/

        this.context.restore();
    }

    renderTama(tama) {
        this.context.save();

        this.context.translate(tama.x, tama.y);

        this.context.drawImage(this.assets.imageItems,
            this.assets.arectJikiInItemsImage[1].sx, this.assets.arectJikiInItemsImage[1].sy,	// �`�挳�摜�̉E����W
            this.assets.arectJikiInItemsImage[1].sw, this.assets.arectJikiInItemsImage[1].sh,	// �`�挳�摜�̑傫��
            -SharedSettings.BULLET_WIDTH * 0.5,	// �摜��̈�̉E����W�i�̈撆�S���A���_�ɂȂ�悤�Ɏw�肷��j
            -SharedSettings.BULLET_HEIGHT * 0.5,	// �摜��̈�̉E����W�i�̈撆�S���A���_�ɂȂ�悤�Ɏw�肷��j
            SharedSettings.BULLET_WIDTH,	// �`���̈�̑傫��
            SharedSettings.BULLET_HEIGHT);	// �`���̈�̑傫��

        this.context.restore();
        this.context.restore();
    }
}
