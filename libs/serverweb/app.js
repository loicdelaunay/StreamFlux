const express = require('express');
const app = express();
const serverwebfolder = global.__root + '/libs/serverweb/';

//Utilise asset comme ressource static
app.use('/assets',express.static('public'));

//Page accueil
app.get('/', function(req, res) {
    res.render(serverwebfolder + 'assets/views/accueil.ejs');
});

//Page introuvable
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

//Ecoute sur le port
app.listen(global.config.server_port);