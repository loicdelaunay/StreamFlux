//Chargement du fichier de config
global.config = require(global.__root + '/config/config.json');

//Chargement du module de sous process
global.module_childprocess = require('child_process');

//Chargement du module de Cron
global.module_cron = require('cron').CronJob;

//Chargement du log manager
global.module_logmanager = require(global.__root + '/libs/logmanager/app');

//Chargement du serverweb
global.module_serverweb = require(global.__root + '/libs/serverweb/app');