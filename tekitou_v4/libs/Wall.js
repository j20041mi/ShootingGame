// モジュール
const GameObject = require( './GameObject.js' );

// 設定
const SharedSettings = require( '../public/js/SharedSettings.js' );

// 壁クラス
module.exports = class Wall extends GameObject
{
    // コンストラクタ
    constructor()
    {
        this.w = 5;
        this.h = SharedSettings.FIELD_H;
        this.x = SharedSettings.FIELD_W / 2;
        this.y = 0;
    }
}