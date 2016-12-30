var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ateneicrtl = require('./app/config/db');
var winston = require('./app/logger/logger');
var ateneiRoutes = require('./app/routes/atenei.server.routes');
var parconfRoutes = require('./app/routes/paramconf.server.routes');
var dataRoutes = require('./app/routes/data.server.routes');
var commonRoutes = require('./app/routes/common.server.routes');

winston.handleExceptions();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

var port = process.env.PORT || 1337;
app.listen(port || 1377);
console.log("Configurazione delle route");
app.use('/api/atenei', ateneiRoutes);
app.use('/api/paramconfs', parconfRoutes);
app.use('/data', dataRoutes);
app.use('/', commonRoutes);
console.log("Magic on port " + port);
