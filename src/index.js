"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var express = require("express");
var Database_class_1 = require("./core/classes/Database.class");
var bodyParser = require("body-parser");
var app = express();
var database = new Database_class_1.Database();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/users', function (request, response) {
    database.ref('users').on('value', function (snapshot) {
        response.end(JSON.stringify(snapshot.val()));
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
});
app.post('/login', function (request, response) {
    var _a = request.body, login = _a.login, password = _a.password;
    database.signIn(login, password)
        .then(function () { return response.send({ message: 'Success' }); }, function (e) { return response.send(e); });
});
app.listen(constants_1.PORT, function () {
    console.log("Server running at " + constants_1.PORT);
});
