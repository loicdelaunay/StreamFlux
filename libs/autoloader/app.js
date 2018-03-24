//Chargement du log manager
global.module_logmanager = require(global.__root + '/libs/log-manager/app');

/**
 * Chargement des modules
 */
global.module_logmanager.addLog("-*-*- Loading -*-*-");

//Chargement du fichier de config
global.config = require(global.__root + '/config/config.json');
global.module_logmanager.addLog("- Config file -> ok");

//Chagement file system
global.module_filesystem = require('fs');
global.module_logmanager.addLog("- Module FileSystem -> ok");

//Chargement du module de sous process
global.module_childprocess = require('child_process');
global.module_logmanager.addLog("- Module Child Process -> ok");

//Chargement du module de Cron
global.module_cron = require('cron').CronJob;
global.module_logmanager.addLog("- Module Cron -> ok");

//Chargement du module streamlink
global.module_streamlink = require(global.__root + '/libs/stream-link/app');
global.module_logmanager.addLog("- Libs & Module Streamlink -> ok");

//Chargement du module record
global.module_record = require(global.__root + '/libs/record/app');
global.module_logmanager.addLog("- Class Record -> ok");

//Chagement du data manager
global.module_datamanager = require(global.__root + '/libs/data-manager/app');
global.module_logmanager.addLog("- Module Datamanager -> ok");

//Chargement du serverweb
global.module_serverweb = require(global.__root + '/libs/server-web/app');
global.module_logmanager.addLog("- Module Server Web -> ok");

//Chagement file system
global.module_os = require('os');
global.module_logmanager.addLog("-  Module OS -> ok");

global.module_logmanager.addLog("-*-*- Loading finished -*-*-\n\n");