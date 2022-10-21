'use stract'

const socket = io.connect();

const canvas = document.querySelector('#canvas');

const screen = new Screen(socket, canvas);

screen.animate(0);  //画面表示ループを呼び出す

//接続したとき
socket.on('connect', () => {
    console.log('connect-client');
});

//接続が外れたとき
$(window).on('beforeunload', (event) => {
    socket.disconnect();
});


//キー入力を受け取る
let objMovement = {};
$(document).on('keydown keyup', (event) => {
    const KeyToCommand = {
        'ArrowUp': 'forward',
        'ArrowDown': 'back',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
    };
    const command = KeyToCommand[event.key];
    {
        if (event.type === 'keydown') {
            objMovement[command] = true;
        }
        else // if( event.type === 'keyup' )
        {
            objMovement[command] = false;
        }
        //サーバー(Game.js:14)に送信"change-my-movement"の名でobjMovementを送信
        socket.emit('change-my-movement', objMovement);

        //Spaceの入力を送信する(弾を打つため)
        if (' ' === event.key && 'keydown' === event.type) {
            socket.emit('shoot');
        }

    
        if ('Enter' === event.key && 'keydown' === event.type) {
            
            socket.emit('replay');

        }
        
    }
});