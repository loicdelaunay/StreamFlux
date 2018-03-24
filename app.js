/**
 * SERVEUR AUTORECORD STREAM
 */

//Création du global root folder
global.__root = __dirname;

//Autoloader maison ... alors oui c'est fait maison heyyyy ça va changer peut etre mais j'aime bien comme ça :), jsp si c'est légal par contre comme la longueur de se commentaire d'ailleurs
require(__dirname + '/libs/autoloader/app');

//lien vers l'executable, actuellement que windows
const streamlinkexec = __dirname + "/libs/streamlink/win/streamlink.exe";

global.module_logmanager.addLog("-*-*-*-*- StreamingFlux ON -*-*-*-*-*-");
