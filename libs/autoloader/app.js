//Chargement du fichier de config
global.config = require(global.__root + '/config/config.json');

//Chargement du module de sous process
global.module_childprocess = require('child_process');

//Chargement du module de Cron
global.module_cron = require('cron').CronJob;

//Chargement du log manager
global.module_logmanager = require(global.__root + '/libs/logmanager/app');

//Chargement du module streamlink
global.module_record = require(global.__root + '/libs/streamlink/app');

//Chargement du module record
global.module_record = require(global.__root + '/libs/record/app');

//Tableau test
global.listRecords = [];

global.listRecords.push(new global.module_record("https://www.twitch.tv/armatvhs","480p",global.__root+"/record/test.avi"));
global.listRecords.push(new global.module_record("https://www.twitch.tv/squeezie","720p",global.__root+"/record/test2.avi"));
global.listRecords.push(new global.module_record("https://www.twitch.tv/dream","480p",global.__root+"/record/test3.avi"));

//Chargement du serverweb
global.module_serverweb = require(global.__root + '/libs/serverweb/app');