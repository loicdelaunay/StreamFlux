/** Loading log manager in first */

global.module_logmanager = require(global.__root + '/libs/LogManager');

/** Loading modules */

global.config = require(global.__root + '/config/config.json');
global.module_logmanager.addLog("- Config file loaded");

global.module_filesystem = require('fs');
global.module_logmanager.addLog("- FileSystem Module loaded");

global.module_path = require('path');
global.module_logmanager.addLog("- Path Module loaded");

global.module_childprocess = require('child_process');
global.module_logmanager.addLog("- Child Process Module loaded");

global.module_spawncommand = require(global.__root + '/libs/SpawnCommand');
global.module_logmanager.addLog("- Spawn Command Module loaded");

global.module_cron = require('cron').CronJob;
global.module_logmanager.addLog("-  Cron Module loaded");

global.module_streamlink = require(global.__root + '/libs/Streamlink/Streamlink');
global.module_logmanager.addLog("- Streamlink Module loaded");

global.class_record = require(global.__root + '/libs/Record');
global.module_logmanager.addLog("- Recorder Class loaded");

global.module_datamanager = require(global.__root + '/libs/DataManager');
global.module_logmanager.addLog("- Datamanager Module loaded");

global.module_serverweb = require(global.__root + '/libs/WebServer/WebServer');
global.module_logmanager.addLog("- Web Server Module loaded");

global.module_os = require('os');
global.module_logmanager.addLog("- OS Module loaded");

global.module_moment = require('moment');
global.module_logmanager.addLog("- Moment.js Module loaded");

global.module_logmanager.addLog("-*-*- Loading finished -*-*-\n\n");