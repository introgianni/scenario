var mongoose = require('mongoose');

//var dburl = 'mongodb://localhost/scenariodb';
//var dburl = 'mongodb://dido_app:black-RUSSIAN@cint01.private.cineca.it:9001,cint02.private.cineca.it:9001/DIDO_DEV?replicaSet=cintrs'; 
var dburl = 'mongodb://admin:secret@172.30.197.158:27017/scenariodb';
console.log('before creating connection');
mongoose.connect(dburl);

mongoose.set('debug', true);
console.log('created connection');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});
db.on('connected', function() {
    console.log('Mongoose default connection open to ' + dburl);
});

// When the connection is disconnected
db.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    db.close(function() {
        console.log('EVENTO SIGINT: Mongoose default connection disconnected through app termination');
    });
    process.exit();
});
process.on('exit', function() {
    db.close(function() {
        console.log('EVENTO exit Mongoose default connection disconnected through app termination');
    });
});
////////FIne gestione chiusura connessione


db.once('open', function() {

});

module.exports = db;
