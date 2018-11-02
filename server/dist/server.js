'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var PORT = 3000;
var api = require('./routes/api');
var app = express();

app.use(bodyParser.json());
app.use('/api', api);

app.get('/', function (req, res) {
    res.send('Hello from server');
});

app.listen(PORT, function () {
    console.log('Server running on port: ' + PORT);
});