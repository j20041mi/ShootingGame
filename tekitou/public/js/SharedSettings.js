class SharedSettings {
    static get FIELD_W() { return 524.0; }
    static get FIELD_H() { return 524.0; }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {   // サーバー処理（Node.js処理）用の記述
    module.exports = SharedSettings;
}