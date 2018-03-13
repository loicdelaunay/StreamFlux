/**
 * SERVEUR AUTORECORD STREAM
 */

//Chargement du module de sous process
const { exec } = require('child_process');

//Chargement du module de cron
const Cron = require('cron').CronJob;

//Options
const creanauStart = 1;
const creanauEnd = 16;
const streamlinkexec = "C:/Users/Dream/Desktop/Projets/SARS---Serveur-auto-record-stream/lib/Streamlink/bin/streamlink.exe";

//Tableau test
var test = ["test1","test2","test3"];
var listeProcess = [];

//Cron de vérification
new Cron('* * * * * 1',function () {
    console.log("test");
},null,true);

//Lance un bash
function runFlux(url,quality,file){
//Execution d'un script avec controle de celui ci en async et promise
    listeProcess.push(
        exec(streamlinkexec + ' ' + url + ' ' + quality + ' ' + file, function(error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }))
}


runFlux('twitch.tv/ltzonda','720p','-o C:/Users/Dream/Desktop/Test/test.flv');