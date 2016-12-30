var mongoose = require('mongoose');
var Data = require('../models/data');
var fs = require('fs');

exports.getData = function(req, res) {
    console.log("ho richiesto i data ");
    var filter = {};
    try {
        console.log("nel try");
        console.log("1");
        if (req)
            filter = {
                'ateCod': 'UNITO',
                'tipoCorsoCod': req.corso.cod,
                'strCod': req.dipartimento.dipCod,
                'anno': req.anno
            };

        Data.find(filter).exec(function(err, resData) {
            if (err) {
                console.log("data 2");
                console.log(err);
                throw err;
            } else {
                console.log("data 3");
                if (resData) {
                    console.log("data non null");
                    //console.log(resData);
                } else {
                    console.log("data null");
                }
                console.log("stampati");
                var result = resData[0];
                //res.contentType(resData[0].data.contentType);
                //res.send(resData[0].data.data);
                if (result && result.rawJson) {
                    res.json(result);
                } else {
                    res.json(null);
                }
            }
        });
    } catch (err) {
        console.log("errore");
        console.log(err);
    }
};


exports.insertNew = function() {
    try {
        console.log("q");
        var file = new Data;
        console.log("w");
        file.ateCod = "UNITO";
        file.anno = "2016";
        file.tipoCorsoCod = "L";
        file.strCod = "BIO";
        var fileContent = fs.readFileSync(__dirname + "/../data/res.json", "utf8");
        file.rawJson = fileContent.toString();
        file.data.contentType = 'application/json';
        console.log("r");
        file.save(function(err, a) {
            console.log("t");
            if (err) console.log(err);
            console.log("y");
            console.error('saved img to mongo');
        });
    } catch (err) {
        console.log("errore");
        console.log(err);
    }
};
