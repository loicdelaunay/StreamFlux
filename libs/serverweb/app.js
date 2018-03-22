const express = require('express');
const app = express();
const serverWebFolder = global.__root + '/libs/serverweb/';
const serverWebFolderViews = global.__root + '/libs/serverweb/assets/views/';

//Utilise asset comme ressource static
app.use(express.static(global.__root + '/libs/serverweb/assets/'));

//Page accueil
app.get('/', function(req, res) {
    res.render(serverWebFolderViews + 'accueil.ejs',{page: "home"});
});

//Page accueil
app.get('/setRecords', function(req, res) {
    res.render(serverWebFolderViews + 'setRecords.ejs',{page: "setRecords"});
});

//Page introuvable
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

//Ecoute sur le port
app.listen(global.config.server_port);