//��ʂ�\������script
//

class Screen {

    constructor(socket, canvas) {
        this.socket = socket;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.aJiki = null;

        this.initSocket();

        //canvas�����ݒ�
        this.canvas.width = SharedSettings.FIELD_W;
        this.canvas.height = SharedSettings.FIELD_H;

        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }

    //�T�[�o���瑗�M���ꂽ����
    initSocket() {
        this.socket.on('connect', () => {
            this.socket.emit('enter-the-game');
        });

        this.socket.on('update', (aJiki) => {
            //console.log('Interval');
            this.aJiki = aJiki;

        });
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate();
        });
        //console.log('animate');
        this.render();
    }

    
    render() {
        //��ʃN���A
        this.context.clearRect(0, 0, canvas.width, canvas.height);

        //�\���̃e���v���Z�b�g
        this.context.save();
        this.context.font = RenderingSettings.PROCESSINGTIME_FONT;
        this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
        this.context.fillText("render", 50, 90);
        this.context.restore();

        if (null !== this.aJiki) {
            this.aJiki.forEach((jiki) => {
                this.context.save();
                this.context.font = RenderingSettings.PROCESSINGTIME_FONT;
                this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
                this.context.fillText(jiki.x+","+jiki.y, 50, 150);
                this.context.restore();

            });
        }
    }
}
