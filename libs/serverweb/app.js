var express = require('express');
const fs = require('fs');

const config = fs.read(__dirname + '/config/config.json');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.listen(config.server_port);