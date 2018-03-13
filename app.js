/**
 * SERVEUR AUTORECORD STREAM
 */

//Chargement du module de sous process
const {exec} = require('child_process');

//Chemin d'accès nodeJs
var path = require('path');
var appDir = path.dirname(require.main.filename);

//Chargement du module de cron
const Cron = require('cron').CronJob;

//Options
const creanauStart = 1;
const creanauEnd = 16;
const streamlinkexec = appDir + "/libs/streamlink/bin/streamlink.exe";

//Tableau test
var test = ["test1", "test2", "test3"];
//Liste des process
var listeProcess = [];

//Cron de vérification
// new Cron('* * * * * 1', function () {
//     console.log("test");
// }, null, true);

//Lance un bash
function runFlux(url, quality, file) {
//Execution du script et execution dans un children
    listeProcess.push(
        exec(streamlinkexec + ' ' + url + ' ' + quality + ' ' + file, function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }));
    //Ecrit l'url du live dans le process
    listeProcess[listeProcess.length - 1].name = url;
}


runFlux('twitch.tv/squeezielive', '480p', '-o ' + appDir +'/record/test.fly');