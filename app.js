
var express = require('express');


var app = express();


require('./middlewares')(app);


require('./routes')(app);


require('./handlers/Errors')(app);


module.exports = app;
