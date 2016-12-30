var mongoose = require('mongoose');
//var obj = require("./data/res.json");
var fs = require("fs");
var content;
console.log("\n *START* \n" + __dirname);
try {
    console.log("leggo il file");
    //    content = fs.readFileSync(__dirname + "/../data/res.json", "utf8");

    fs.readFile(__dirname + "/../data/res.json", "utf8", function(err, data) {
        if (err) throw err;
        content = data.toString();
    });



} catch (err) {
    console.log("errore");
    console.log(err);
}
console.log("\n *EXIT* \n");

exports.getData = function(cod, res) {
    console.log("nel common controller");
    console.log(JSON.parse(content));
    res.json(content);
};
