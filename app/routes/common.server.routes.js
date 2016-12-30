var express = require('express');
var commonCtrl = require('../controllers/common.server.controller');
var commonRoutes = express.Router();
//var obj = require("./data/res.json");

//getData
commonRoutes.get('/api/data', function(req, res) {
    console.log("Richiedo i dati");
    console.log(__dirname);
    commonCtrl.getData(req, res);
});

//DEFAULT STATIC

/*
commonRoutes.get('/', function(req, res) {
    console.log("Servo la route generica");
    res.sendfile('./public/index.html'); // load our public/index.html file
});
*/

commonRoutes.post('/api/data', function(req, res) {
    console.log("Post del form");
    commonCtrl.getData(req, res);
});


module.exports = commonRoutes;
