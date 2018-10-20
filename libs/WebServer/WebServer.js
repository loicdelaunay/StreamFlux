const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const webServerFolder = global.__root + '/libs/WebServer/';
const webServerViewsFolder = global.__root + '/libs/WebServer/assets/views/';
var defaultDownloadFolder = "";

//Set download default folder with config file
if (global.config.default_folder === "default") {
    defaultDownloadFolder = global.__root + '\\data\\records\\';
} else {
    defaultDownloadFolder = global.config.default_folder;
}

class WebServer {
    constructor() {

        //Configuration de express.js
        app.use(express.static(global.__root + '/libs/WebServer/assets/'));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

        /** ROUTAGE DE BASE POST **/
        app.post('/addRecorder/', function (req, res) {
            global.recorders.push(new global.class_recorder(req.body.url, req.body.quality, req.body.folder, req.body.startAt, req.body.endAt, req.body.startAnytime));
            global.module_datamanager.saveRecorders();
            io.emit('recorders', global.recorders);
            res.json("ok");
        });

        app.post('/removeRecorder/', function (req, res) {
            global.module_datamanager.removeRecorders(req.body.uid);
            io.emit('recorders', global.recorders);
            res.json("ok");
        });

        /** ROUTAGE DE BASE **/
        //Page accueil
        app.get('/', function (req, res) {
            res.render(webServerViewsFolder + 'accueil.ejs', {
                page: "home",
                appInfos: global.appInfo
            });
        });

        //Page process
        app.get('/processes', function (req, res) {
            res.render(webServerViewsFolder + 'process.ejs', {
                page: "processes",
                appInfos: global.appInfo
            });
        });

        //Page mediaplayer
        app.get('/mediaplayer', function (req, res) {
            res.render(webServerViewsFolder + 'mediaplayer.ejs', {
                page: "mediaplayer",
                appInfos: global.appInfo
            });
        });

        //Page logs
        app.get('/logs', function (req, res) {
            res.render(webServerViewsFolder + 'logs.ejs', {
                page: "logs",
                appInfos: global.appInfo
            });
        });

        //Page recorders
        app.get('/recorders', function (req, res) {
            res.render(webServerViewsFolder + 'recorders.ejs', {
                page: "recorders",
                defaultFolder: defaultDownloadFolder,
                appInfos: global.appInfo
            });
        });

        //Page settings
        app.get('/settings', function (req, res) {
            res.render(webServerViewsFolder + 'settings.ejs', {
                page: "settings",
                appInfos: global.appInfo
            });
        });

        //Page introuvable
        app.use(function (req, res, next) {
            res.setHeader('Content-Type', 'text/plain');
            res.status(404).send('Page introuvable !');
        });

        //Ecoute sur le port
        http.listen(global.config.server_port, function () {
            global.module_logmanager.addLog('listening on *:' + global.config.server_port);
        });

        //Gestion de socket.io
        io.on('connection', function (socket) {
            global.module_logmanager.addLogUser('User connected');
            global.module_webserver.recordersUpdate();
            socket.on('disconnect', function () {
                global.module_logmanager.addLogUser('User disconnected');
            });
        });

    }

    recordersUpdate() {
        io.emit('recorders', global.recorders);
    }

    logsUpdate() {
        io.emit('logsAll', global.module_logmanager.log);
        io.emit('logsUser', global.module_logmanager.log.user);
        io.emit('logsStreamLink', global.module_logmanager.log.streamLink);
        io.emit('logsError', global.module_logmanager.log.error);
    }

    processesUpdate() {
        let listProcessInfo = [];
        global.listProcess.forEach(function (unProcess) {
            let processInfo = {
                size: unProcess.size,
                speed: unProcess.speed,
                time: unProcess.time,
                url: unProcess.url,
                UID: unProcess.uid,
                startAt: unProcess.startAt,
                endAt: unProcess.endAt,
                state: unProcess.state,
                stateMessage: unProcess.stateMessage,
                folder: unProcess.folder,
                quality: unProcess.quality
            };
            listProcessInfo.push(processInfo);

        });
        io.emit('processes', listProcessInfo);
    }
}

module.exports = new WebServer();
