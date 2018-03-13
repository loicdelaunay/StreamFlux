/**
 * SERVEUR AUTORECORD STREAM
 */

//Chargement du module de sous process
const {exec} = require('child_process');

//Chargement du module de cron
const Cron = require('cron').CronJob;

//Options
const creanauStart = 1;
const creanauEnd = 16;
const streamlinkexec = __dirname + "/libs/streamlink/win/streamlink.exe";

//Tableau test
var test = ["test1", "test2", "test3"];
//Liste des process
var listeProcess = [];

//Cron de vérification
// new Cron('* * * * * 1', function () {
//     console.log("test");
// }, null, true);

/**
 * Lance un process streamlink de record
 * @param url url du stream à récupérer
 * @param quality qualité du stream
 * @param file nom du fichier de sortie
 */
function runFlux(url, quality, file) {
//Execution du script et execution dans un children
    listeProcess.push(
        exec(streamlinkexec + ' ' + url + ' ' + quality + ' ' + file, function (error, stdout, stderr) {
            if (error) {
                console.log('Erreur: ' + error);
                return
            }
            console.log(stdout);
        }));
    //Ecrit l'url du live dans le process
    listeProcess[listeProcess.length - 1].name = url;
}

//Flux de test
runFlux('twitch.tv/squeezielive', '480p', '-o ' + __dirname +'/record/test.fly');