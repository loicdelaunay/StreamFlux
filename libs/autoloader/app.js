//Chargement du log manager
global.module_logmanager = require(global.__root + '/libs/log-manager/app');

global.module_logmanager.addLog(" -* Program version : "+ global.version + " *- ");
global.module_logmanager.addLog(" -* NodeJS version : "+ global.process.version + " *- ");
global.module_logmanager.addLog(" -* Folder : "+ global.__root + " *- ");
global.module_logmanager.addLog(" -* OS : "+ global.os.platform + " *- ");

/**
 * Chargement des modules
 */
global.module_logmanager.addLog("-*-*- Loading modules -*-*-\n\n");

//Chargement du fichier de config
global.config = require(global.__root + '/config/config.json');
global.module_logmanager.addLog("- config ok");

//Chagement file system
global.module_filesystem = require('fs');
global.module_logmanager.addLog("- fs ok");

//Chargement du module de sous process
global.module_childprocess = require('child_process');
global.module_logmanager.addLog("- child_process ok");

//Chargement du module de Cron
global.module_cron = require('cron').CronJob;
global.module_logmanager.addLog("- cron ok");

//Chargement du module streamlink
global.module_streamlink = require(global.__root + '/libs/stream-link/app');
global.module_logmanager.addLog("- streamlink ok");

//Chargement du module record
global.module_record = require(global.__root + '/libs/record/app');
global.module_logmanager.addLog("- record class ok");

//Chagement du data manager
global.module_datamanager = require(global.__root + '/libs/data-manager/app');
global.module_logmanager.addLog("- datamanager ok");

//Chargement du serverweb
global.module_serverweb = require(global.__root + '/libs/server-web/app');
global.module_logmanager.addLog("- serverweb ok");

global.module_logmanager.addLog("\n-*-*- Loading finished -*-*-\n\n");