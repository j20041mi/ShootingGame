'use strict';	// ���i���[�h�Ƃ���

// �I�u�W�F�N�g
const socket = io.connect();	// �N���C�A���g����T�[�o�[�ւ̐ڑ��v��

// �L�����o�X
const canvas = document.querySelector('#canvas-2d');

// �L�����o�X�I�u�W�F�N�g
const screen = new Screen(socket, canvas);

// �L�����o�X�̕`��J�n
screen.animate(0);

// �y�[�W��unload����鎞�i���鎞�A�ēǂݍ��ݎ��A�ʃy�[�W�ֈړ����j�́A�ʐM��ؒf����
$(window).on(
    'beforeunload',
    (event) => {
        socket.disconnect();
    });


// �L�[�̓��́i�L�[�_�E���A�L�[�A�b�v�j�̏���
let objMovement = {};	// ����
$( document ).on(
    'keydown keyup',
    ( event ) =>
    {
        const KeyToCommand = {
            'ArrowUp': 'forward',
            'ArrowDown': 'back',
            'ArrowLeft': 'left',
            'ArrowRight': 'right',
        };
        const command = KeyToCommand[event.key];
        if( command )
        {
            if( event.type === 'keydown' )
            {
                objMovement[command] = true;
            }
            else // if( event.type === 'keyup' )
            {
                objMovement[command] = false;
            }
            // �T�[�o�[�� �C�x���g��'change-my-movement'�ƁAobjMovement�I�u�W�F�N�g�𑗐M
            socket.emit( 'change-my-movement', objMovement );
        }
    } );
