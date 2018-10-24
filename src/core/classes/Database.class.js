"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var firebase_1 = require("firebase");
var Database = /** @class */ (function () {
    function Database(config) {
        if (config === void 0) { config = null; }
        this._config = {
            apiKey: constants_1.firebaseAPIKey,
            authDomain: constants_1.firebaseAuthDomain,
            databaseURL: constants_1.firebaseURL
        };
        if (config) {
            this._config = config;
        }
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
    Database.prototype.init = function () {
        var app = firebase_1.initializeApp(this._config);
        this._database = app.database();
        firebase_1.auth(app).signInWithEmailAndPassword(constants_1.login, constants_1.password)
            .then(function (res) {
            console.log(res);
        });
        return this;
    };
    Database.prototype.get = function (route, callback, errorHandler) {
        return this._database.ref(route).on('value', callback);
    };
    return Database;
}());
exports.Database = Database;
