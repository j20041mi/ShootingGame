'use stract'

const socket = io.connect();

const canvas = document.querySelector('#canvas');

const screen = new Screen(socket, canvas);

screen.animate();

socket.on('connect', () => {
    console.log('connect-client');
});

$(window).on('beforeunload', (event) => {
    socket.disconnect();
});


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
    }
});