var express = require('express');
var ateneicrtl = require('../controllers/atenei.server.controller');
var router = express.Router();


router.param('cod', function(req, res, next, cod) {
    req.cod = cod;
    next();
});

//getAll
router.get('/', function(req, res) {
    var listaAtenei = ateneicrtl.getAteneo(null, res);
});
//getOne
router.get('/:cod', function(req, res) {
    console.log("Servo la route cod ateneo");
    var codAteneo = req.params.cod;
    var listaAtenei = ateneicrtl.getAteneo(codAteneo, res);
});
//post an Ateneo
router.post('/', function(req, res) {
    console.log("Servo la route post ateneo");
    ateneicrtl.postAteneo(req, res);
});

module.exports = router;
