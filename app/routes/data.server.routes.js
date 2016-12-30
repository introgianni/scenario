var express = require('express');
var dataCtrl = require('../controllers/data.server.controller');
var router = express.Router();


router.param('id', function(req, res, next, id) {
    req.id = id;
    next();
});

router.get('/:id', function(req, res) {
    console.log("Servo la route data");
    var id = req.params.id;
    console.log("Filtro per id: " + id);
    dataCtrl.getParams(id, res);
});

router.post('/', function(req, res) {
    console.log("Servo la route post data");
    console.log(req.body);
    dataCtrl.getData(req.body, res);
    //dataCtrl.insertNew();
});


module.exports = router;
