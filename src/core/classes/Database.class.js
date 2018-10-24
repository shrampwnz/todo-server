"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_1 = require("firebase");
var firebase_config_1 = require("../../configs/firebase.config");
var Database = /** @class */ (function () {
    function Database(_config) {
        if (_config === void 0) { _config = firebase_config_1.firebaseConfig; }
        this._config = _config;
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
    Database.prototype.ref = function (path) {
        return this._database.ref(path);
    };
    Database.prototype.set = function (path, body) {
        return this.ref(path).set(body);
    };
    Database.prototype.signIn = function (login, password) {
        var app = firebase_1.initializeApp(this._config);
        this._database = app.database();
        return firebase_1.auth(app).signInWithEmailAndPassword(login, password);
    };
    return Database;
}());
exports.Database = Database;
