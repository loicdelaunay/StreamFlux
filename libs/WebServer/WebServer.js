const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const https = require('https');
const http = require('http');
const webServerFolder = global.__root + '/libs/WebServer/';
const webServerViewsFolder = global.__root + '/libs/WebServer/assets/views/';
var defaultDownloadFolder = "";
var io;

var certificated = false;
try{
    var privateKey  = global.module_filesystem.readFileSync(global.__root+'/server.key', 'utf8');
    var certificate = global.module_filesystem.readFileSync(global.__root+'/server.crt', 'utf8');
    var credentials = {key: privateKey, cert: certificate};
    certificated = true;
}catch (e) {
    console.warn("[Web Server] : No valid certification files for https, need server.key & server.crt in app folder : " + e)
}

if(certificated){
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(global.config.server_port);
    io = require('socket.io').listen(httpsServer);
    console.log("[Web Server] : Running " + global.appInfo.appName + " https server on : " + global.config.server_port);

}else{
    var httpServer = http.createServer(app);
    httpServer.listen(global.config.server_port);
    io = require('socket.io').listen(httpServer);
    console.warn("[Web Server] : Please use https, some features can be broken, Running " + global.appInfo.appName + " http server on : " + global.config.server_port);

}

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

        app.post('/getVideos/', function (req, res) {
            let files = global.module_filesystem.readdirSync(global.__root + "\\libs\\WebServer\\assets\\data\\videos");
            res.json(files);
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

        //Page mediaplayer video player
        app.get('/videoplayer', function (req, res) {
            let video = req.query['video'];
            console.log("User playing video : " + video);
            res.render(webServerViewsFolder + 'videoplayer.ejs', {
                page: "videoplayer",
                videolink: "/videostream?video=" + video,
                appInfos: global.appInfo
            });
        });

        //Page mediaplayer video stream ( reading flux from media )
        app.get('/videostream', function (req, res) {
            let video = req.query['video'];
            let path = global.__root + "\\libs\\WebServer\\assets\\data\\videos\\" + video;
            let stat = global.module_filesystem.statSync(path)
            let fileSize = stat.size
            let range = req.headers.range
            if (range) {
                let parts = range.replace(/bytes=/, "").split("-")
                let start = parseInt(parts[0], 10)
                let end = parts[1]
                    ? parseInt(parts[1], 10)
                    : fileSize - 1
                let chunksize = (end - start) + 1
                let file = global.module_filesystem.createReadStream(path, {start, end})
                let head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(200, head)
                global.module_filesystem.createReadStream(path).pipe(res)
            }
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
