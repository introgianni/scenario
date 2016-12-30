var express = require('express');
var paramconfCtrl = require('../controllers/paramconf.server.controller');
var router = express.Router();

router.param('cod', function(req, res, next, cod) {
    req.cod = cod;
    next();
});

//getAll
router.get('/', function(req, res) {
    var listaParConf = paramconfCtrl.getParamconf(null, res);
});

//getOne
router.get('/:cod', function(req, res) {
    console.log("Servo la route GET Paramconf");
    var parCod = req.params.cod;
    console.log("Filtro per par cod: " + parCod);
    var listaParConf = paramconfCtrl.getParamconf(parCod, res);
});
//getOne
router.delete('/:cod', function(req, res) {
    console.log("Servo la route DELETE cod Paramconf");
    var codParamconf = req.params.cod;
    var paramconf = paramconfCtrl.deleteParamconf(codParamconf, res);
});

router.post('/', function(req, res) {
    console.log("Servo la route POST Paramconf");
    paramconfCtrl.postParamconf(req, res);
});

router.put('/', function(req, res) {
    console.log("Servo la route PUT Paramconf");
    paramconfCtrl.putParamconf(req, res);
});

module.exports = router;
