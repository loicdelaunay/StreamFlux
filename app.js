/**
 * SERVEUR AUTORECORD STREAM
 */

//Création du global root folder
global.__root = __dirname;

//Autoloader maison ... alors oui c'est fait maison heyyyy ça va changer peut etre mais j'aime bien comme ça :), jsp si c'est légal par contre comme la longueur de se commentaire d'ailleurs
require(__dirname + '/libs/autoloader/app');

//lien vers l'executable, actuellement que windows
const streamlinkexec = __dirname + "/libs/streamlink/win/streamlink.exe";

//Tableau test
var test = ["test1", "test2", "test3"];

//Liste des process
var listProcess = [];

global.module_logmanager.addLog("-*-*-*-*- StreamingFlux ON -*-*-*-*-*-");

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
function recordFlux(url, quality, file) {
//Execution du script et execution dans un children
    listProcess.push(
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
//recordFlux('twitch.tv/squeezielive', '480p', '-o ' + __dirname +'/record/test.fly');