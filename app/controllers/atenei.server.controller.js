var mongoose = require('mongoose');
var Ateneo = require('../models/ateneo');
var TipoCorso = require('../models/tipocorso');

exports.getAteneo = function(cod, res) {
    console.log("ho richiesto l'ateneo " + cod);
    var ateneo = {};
    try {
        console.log("nel try");
        if (cod !== undefined && cod !== null)
            ateneo = {
                'cod': cod
            };
        console.log("1");
        Ateneo.find(ateneo).populate('tipiCorso').populate({
            path: 'parConfs.param',
            model: 'Paramconf'
        }).exec(function(err, ateneifoundpopulated) {
            if (err) {
                console.log("2");
                console.log(err);
                throw err;
            } else {
                console.log("3");
                var ateneofoundpopulated = ateneifoundpopulated[0];
                console.log(ateneofoundpopulated.toString());
                var firsttipocorso = ateneofoundpopulated.tipiCorso[0];
                //console.log(res.json(ateneifoundpopulated));
                res.json(ateneifoundpopulated);
            }
        });
    } catch (err) {
        console.log("errore");
        console.log(err);
    }
};
exports.postAteneo = function(req, res) {
    var ateneo = new Ateneo({
        cod: req.body.cod,
        des: req.body.des
    });
    ateneo.save(function(err, ateneoSaved) {
        if (err)
            throw err;
        console.log('Ateneo salvato:' + ateneoSaved + " " + ateneoSaved.created_at);
        res.json(ateneoSaved);
    });
};
