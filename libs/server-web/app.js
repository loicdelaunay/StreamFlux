const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const serverWebFolder = global.__root + '/libs/server-web/';
const serverWebFolderViews = global.__root + '/libs/server-web/assets/views/';
var default_download_folder = "";
//Set download default folder with config file
if (global.config.default_folder === "default") {
    default_download_folder = global.__root + '\\data\\record\\'
} else {
    default_download_folder = global.config.default_folder
}

class serverWeb {
    constructor() {

        //Configuration de express.js
        app.use(express.static(global.__root + '/libs/server-web/assets/'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        /** ROUTAGE DE BASE POST **/
        app.post('/addRecord/', function (req, res) {
            global.records.push(new global.class_record(req.body.url, req.body.quality, req.body.folder, req.body.startAt, req.body.endAt));
            global.module_datamanager.saveRecords();
            io.emit('records', global.records);
            res.json("ok");
        });

        app.post('/removeRecord/', function (req, res) {
            global.module_datamanager.removeRecords(req.body.uid);
            io.emit('records', global.records);
            res.json("ok");
        });

        /** ROUTAGE DE BASE **/
        //Page accueil
        app.get('/', function (req, res) {
            res.render(serverWebFolderViews + 'accueil.ejs', {page: "home"});
        });

        //Page process
        app.get('/processes', function (req, res) {
            res.render(serverWebFolderViews + 'process.ejs', {
                page: "processes"
            });
        });

        //Page records
        app.get('/record-schedule', function (req, res) {
            res.render(serverWebFolderViews + 'record-schedule.ejs', {
                page: "record-schedule",
                defaultFolder: default_download_folder,
            });
        });

        //Page settings
        app.get('/settings', function (req, res) {
            res.render(serverWebFolderViews + 'settings.ejs', {page: "settings"});
        });

        //Page introuvable
        app.use(function (req, res, next) {
            res.setHeader('Content-Type', 'text/plain');
            res.status(404).send('Page introuvable !');
        });

        //Ecoute sur le port
        http.listen(global.config.server_port, function () {
            console.log('listening on *:' + global.config.server_port);
        });

        //Gestion de socket.io
        io.on('connection', function (socket) {
            console.log('User connected');
            global.module_serverweb.recordsUpdate();
            socket.on('disconnect', function () {
                console.log('User disconnected');
            });
        });

    }
    recordsUpdate(){
        io.emit('records',global.records);
    }

    processesUpdate(){
        let listProcessInfo = [];
        global.listProcess.forEach(function(unProcess){
            let processInfo = {
                size:    unProcess.size,
                speed:    unProcess.speed,
                time:    unProcess.time,
                url:    unProcess.url
            };
            listProcessInfo.push(processInfo);

        });
        io.emit('processes',listProcessInfo);
    }
}

module.exports = new serverWeb();
