"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var express = require("express");
var Database_class_1 = require("./core/classes/Database.class");
var app = express();
var database = new Database_class_1.Database().init();
app.get('/info', function (request, response) {
    database.get('info', function (snapshot) {
        response.end(JSON.stringify(snapshot.val()));
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });
});
app.listen(constants_1.PORT, function () {
    console.log("Server running at " + constants_1.PORT);
});
