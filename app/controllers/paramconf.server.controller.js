var mongoose = require('mongoose');
var Paramconf = require('../models/paramconf');

exports.getParamconf = function(cod, res) {
    console.log("getParamconf con cod " + cod);
    var paramconf = {};
    try {
        if (cod !== undefined && cod !== null)
            paramconf = {
                'cod': cod
            };
        Paramconf.find(paramconf).exec(function(err, paramconfs) {
            if (err) {
                handleError(res, err);
            } else {
                if (!paramconfs) {
                    return res.send(404);
                }
                res.json(paramconfs);
            }
        });
    } catch (err) {
        return handleError(res, err);
    }
};

exports.postParamconf = function(req, res) {
    try {
        console.log("Create ParamConf " + req.body);
        var paramconf = new Paramconf({
            cod: req.body.cod,
            des: req.body.des,
            attinenza: req.body.attinenza,
            default: req.body.default
        });
        paramconf.save(function(err, paramconfSaved) {
            if (err) {
                handleError(res, err);
            }
            console.log('paramconf salvato:' + paramconfSaved + " " + paramconfSaved.created_at);
            res.json(201, paramconfSaved);
        });
    } catch (err) {
        return handleError(res, err);
    }
};

exports.putParamconf = function(req, res) {
    try {
        console.log("Update ParamConf " + req.body);
        Paramconf.findById(req.body._id, function(err, paramconfound) {
            if (err) {
                res.status(500).send(err);
            } else {
                // Update each attribute with any possible attribute that may have been submitted in the body of the request
                // If that attribute isn't in the request body, default back to whatever it was before.
                if (!paramconfound) {
                    return res.send(404);
                }
                /*
                for (var id in req.body ){
                paramconfound[id]= req.body[id];
                }
                oppure:http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
                oppure:https://github.com/AJFunk/mean-tutorial/blob/master/server/api/game/game.controller.js
                */
                paramconfound.cod = req.body.cod || paramconfound.cod;
                paramconfound.des = req.body.des || paramconfound.des;
                paramconfound.attinenza = req.body.attinenza || paramconfound.attinenza;
                paramconfound.default = req.body.default || paramconfound.default;
                paramconfound.save(function(err, paramconfUpdated) {
                    if (err) {
                        handleError(res, err);
                    }
                    res.json(paramconfUpdated);
                });
            }
        });
    } catch (err) {
        return handleError(res, err);
    }
};

exports.deleteParamconf = function(cod, res) {
    console.log("Delete ParamConf " + cod);
    var paramConf = {};
    try {
        if (cod !== undefined && cod !== null)
            paramConf = {
                'cod': cod
            };
        Paramconf.remove(paramConf).exec(function(err, paramconfSaved) {
            if (err) {
                console.log(err);
                return handleError(res, err);
            } else {
                console.log('Eliminato');
                console.log('paramconf salvato:' + paramconfSaved + " " + paramconfSaved.created_at);
                res.json(204, paramconfSaved);

            }
        });
    } catch (err) {
        return handleError(res, err);
    }
};

function handleError(res, err) {
    console.log(err);
    return res.send(500, err);
}
