const Jiki = require('./Jiki.js');
const Teki = require('./Teki.js');


const SharedSettings = require('../public/js/SharedSettings.js')

module.exports = class World {

    constructor(io) {
        this.io = io;
        this.setJiki = new Set();   //���@���Ǘ�����z��
        this.setTama = new Set();   //�e���Ǘ�����z��(�쐬��)


    }

    //jiki�֘A
    //���@����邽�߂̏������Ăяo��
    createJiki(PlayerNum) {
        if (PlayerNum <= 2) {
            const jiki = new Jiki(PlayerNum);
            this.setJiki.add(jiki);
            //console.log("create");
            return jiki;
        }
    }
    //���@����������
    destroyJiki(jiki) {
        this.setJiki.delete(jiki);

    }

    //teki�֘A(�쐬�ۗ���)
    //�G�����
    createTeki() {
        const teki = new Teki(1, 0, 0, 1, 1);
        this.setTeki.add(teki);

    }
    //�Gobj�̏���
    destroyTeki() {
    }

    //Tama�֘A
    //�e�̐���
    createTama(jiki) {
        //console.log('tama');
        const tama = jiki.shoot();
        if (tama) {
            this.setTama.add(tama);
        }
    }
    //�e�̏���
    destroyTama(tama) {
        this.setTama.delete(tama);
    }


    //�Q�[���S�̂�ʂ������[�v����
    update(fDeltaTime) {
        //���@�̍X�V
        this.setJiki.forEach((jiki) => {
            jiki.update(fDeltaTime);
        });

        const rectTamaField = {     //�e�̏���(�쐬��)
            fLeft: 0 + SharedSettings.BULLET_WIDTH * 0.5,
            fBottom: 0 + SharedSettings.BULLET_HEIGHT * 0.5,
            fRight: SharedSettings.FIELD_W - SharedSettings.BULLET_W * 0.5,
            fTop: SharedSettings.FIELD_H - SharedSettings.BULLET_H * 0.5
        }

        this.setTama.forEach((tama) => {
            const bDisappear = tama.update();
            if (bDisappear) {
                this.destroyTama(tama);
            }


        });
    }

    //�ΐ풆�p�̃��[�v����
    gameUpdate() {
        this.fin = false;
        //�e�̓����蔻��
        this.setJiki.forEach((jiki) => {
            this.setTama.forEach((tama) => {
                if (tama.x > jiki.x - SharedSettings.JIKI_W * 0.5 && tama.y > jiki.y - SharedSettings.JIKI_H * 0.5 &&
                    tama.x < jiki.x + SharedSettings.JIKI_W && tama.y < jiki.y + SharedSettings.JIKI_H) {
                    this.destroyTama(tama);
                    console.log('hit!');
                    this.setJiki.forEach((jiki) => {
                        console.log(jiki.hp);
                    });
                    jiki.hp -= 1;
                }

            });

            //��������
            if (jiki.hp <= 0) {
                jiki.Lose = true;
                //this.fin =  true;
            }
        });

        //return this.fin;


        

    }
}