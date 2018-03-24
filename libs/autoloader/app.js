//Chargement du fichier de config
global.config = require(global.__root + '/config/config.json');

//Chargement du module de sous process
global.module_childprocess = require('child_process');

//Chargement du module de Cron
global.module_cron = require('cron').CronJob;

//Chargement du log manager
global.module_logmanager = require(global.__root + '/libs/log-manager/app');

//Chargement du module streamlink
global.module_streamlink = require(global.__root + '/libs/stream-link/app');

//Chargement du module record
global.module_record = require(global.__root + '/libs/record/app');

//Chagement du data manager
global.module_datamanager = require(global.__root + '/libs/data-manager/app');

//Chargement du serverweb
global.module_serverweb = require(global.__root + '/libs/server-web/app');