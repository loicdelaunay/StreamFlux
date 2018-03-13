const express = require('express');
const fs = require('fs');

const config = require(__basedir + '/config/config.json');

const app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes à l\'accueil');
});

app.listen(config.server_port);