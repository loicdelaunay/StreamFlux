/**
 * SERVEUR AUTORECORD STREAM
 */

//Création du global root folder
global.__root = __dirname;
global.version = 0.1;

//Autoloader maison ... alors oui c'est fait maison heyyyy ça va changer peut etre mais j'aime bien comme ça :), jsp si c'est légal par contre comme la longueur de se commentaire d'ailleurs
require(__dirname + '/libs/autoloader/app');

//lien vers l'executable, actuellement que windows
global.streamlinkexec = "\"" + __dirname + "/libs/stream-link/win/streamlink.exe" + "\"";

global.module_logmanager.addLog("-*-*-*-*- Welcome to StreamingFlux :) -*-*-*-*-*-");
global.module_logmanager.addLog(" -* Program version : "+ global.version + " *- ");
global.module_logmanager.addLog(" -* NodeJS version : "+ global.process.version + " *- ");
global.module_logmanager.addLog(" -* Folder : "+ global.__root + " *- ");
global.module_logmanager.addLog(" -* OS : "+ global.module_os.type + "/" + global.module_os.platform + " *- ");
global.module_logmanager.addLog("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");