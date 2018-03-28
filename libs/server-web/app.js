const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const serverWebFolder = global.__root + '/libs/server-web/';
const serverWebFolderViews = global.__root + '/libs/server-web/assets/views/';
var default_download_forder = "";

//Set download default folder with config file
if(global.config.default_folder === "default"){
    default_download_forder = global.__root + '\\data\\record\\'
}else{
    default_download_forder = global.config.default_folder
}

//Configuration de express.js
app.use(express.static(global.__root + '/libs/server-web/assets/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** ROUTAGE DE BASE POST **/
app.post('/addRecord/',function(req,res){
    global.records.push(new global.class_record(req.body.url,req.body.quality,req.body.folder,req.body.startAt,req.body.endAt));
    global.module_datamanager.saveRecords();
    res.json("ok");
});

app.post('/removeRecord/',function(req,res){
    global.module_datamanager.removeRecords(req.body.uid);
    res.json("ok");
});

/** ROUTAGE DE BASE **/
//Page accueil
app.get('/', function(req, res) {
    res.render(serverWebFolderViews + 'accueil.ejs',{page: "home"});
});

//Page process
app.get('/process', function(req, res) {
    res.render(serverWebFolderViews + 'process.ejs',{
        page: "process",
        process: global.listProcess
    });
});

//Page records
app.get('/record-schedule', function(req, res) {
    res.render(serverWebFolderViews + 'record-schedule.ejs',{
        page: "record-schedule",
        records: global.records,
        defaultFolder : default_download_forder,
    });
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