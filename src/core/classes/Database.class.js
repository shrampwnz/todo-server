"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("firebase");
var firebase_config_1 = require("../../configs/firebase.config");
var Database = /** @class */ (function () {
    function Database(_config) {
        if (_config === void 0) { _config = firebase_config_1.firebaseConfig; }
        this._config = _config;
        this.init();
    }
    Object.defineProperty(Database.prototype, "config", {
        set: function (config) {
            if (config) {
                this._config = config;
            }
        },
        enumerable: true,
        configurable: true
    });
    Database.prototype.get = function (route) {
        return this._database.ref(route);
    };
    Database.prototype.init = function () {
        var app = firebase_1.initializeApp(this._config);
        this._database = app.database();
        firebase_1.auth(app).signInWithEmailAndPassword(firebase_config_1.login, firebase_config_1.password)
            .then(function (res) {
            console.log(res);
        });
        return this;
    };
    return Database;
}());
exports.Database = Database;
