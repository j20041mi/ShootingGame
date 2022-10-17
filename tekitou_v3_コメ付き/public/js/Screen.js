//画面を表示するscript
//

class Screen {

    constructor(socket, canvas) {
        this.socket = socket;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.assets = new Assets();
 
        this.iProcessingTimeNanoSec = 0;
        this.aJiki = null;

        this.initSocket();

        //canvas初期設定
        this.canvas.width = SharedSettings.FIELD_W;
        this.canvas.height = SharedSettings.FIELD_H;

        //context 表示に必要な設定
        this.context.mozImageSmoothingEnabled = false;
        this.context.webkitImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;
    }

    //サーバから送信された処理
    initSocket() {
        //接続したとき「enter-the-game」と表示
        this.socket.on('connect', () => {
            //this.socket.emit('');
            this.socket.emit('enter-the-game');
        });
        
        //新しくなった自機の情報を受け取る。
        this.socket.on('update', (aJiki, iProcessingTimeNanoSec) => {
            this.aJiki = aJiki;
            this.iProcessingTimeNanoSec = iProcessingTimeNanoSec;
        });
    }

    //画面表示用無限ループ
    animate(iTimeCurrent) {
        requestAnimationFrame((iTimeCurrent) => {
            this.animate(iTimeCurrent);
        });
        //console.log('animate');
        this.render(iTimeCurrent);
    }
    

    //画面の表示はここから
    render(iTimeCurrent) {
        //画面クリア
        this.context.clearRect(0, 0, canvas.width, canvas.height);


        //表示のテンプレセット
        this.context.save();
        this.context.font = RenderingSettings.PROCESSINGTIME_FONT;
        this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
        this.context.fillText("render", 50, 90);
        this.context.restore();

        //自機の表示
        if (null !== this.aJiki) {
            const fTimeCurrentSec = iTimeCurrent * 0.001;
            this.aJiki.forEach((jiki) => {
                this.renderJiki(jiki);
            });
        }

        //画面の枠を作っている
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

    //自機を表示する処理
    renderJiki(jiki) {
        this.context.save();
        this.context.translate(jiki.x, jiki.y);

        this.context.save();
        this.context.drawImage(this.assets.imageItems,
            this.assets.arectJikiInItemsImage[0].sx, this.assets.arectJikiInItemsImage[0].sy,	// 描画元画像の右上座標
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
}
