//サーバとクライアント両方で使う設定
class SharedSettings {
    static get FIELD_W() { return 1024.0; }
    static get FIELD_H() { return 1024.0; }

    static get JIKI_W() {return 80.0 };
    static get JIKI_H() { return 80.0 };


}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {   // サーバー処理（Node.js処理）用の記述
    module.exports = SharedSettings;
}