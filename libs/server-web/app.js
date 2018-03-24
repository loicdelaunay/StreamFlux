const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const serverWebFolder = global.__root + '/libs/server-web/';
const serverWebFolderViews = global.__root + '/libs/server-web/assets/views/';

//Configuration de express.js
app.use(express.static(global.__root + '/libs/server-web/assets/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** ROUTAGE DE BASE POST **/
app.post('/addRecord/',function(req,res){
    global.Records.push(new global.module_record(req.body.url,req.body.quality,req.body.folder));
    global.module_datamanager.saveRecords();
    res.json("ok");
});

/** ROUTAGE DE BASE **/
//Page accueil
app.get('/', function(req, res) {
    res.render(serverWebFolderViews + 'accueil.ejs',{page: "home"});
});

//Page records
app.get('/setRecords', function(req, res) {
    res.render(serverWebFolderViews + 'setRecords.ejs',{page: "setRecords",records: global.Records});
});

//Page settings
app.get('/settings', function(req, res) {
    res.render(serverWebFolderViews + 'settings.ejs',{page: "settings"});
});

//Page introuvable
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

//Ecoute sur le port
app.listen(global.config.server_port);