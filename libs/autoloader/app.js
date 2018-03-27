//Loading log manager in first
global.module_logmanager = require(global.__root + '/libs/log-manager/app');

/**
 * Loading modules
 */
global.module_logmanager.addLog("-*-*- Loading -*-*-");

global.config = require(global.__root + '/config/config.json');
global.module_logmanager.addLog("- Config file -> ok");

global.module_filesystem = require('fs');
global.module_logmanager.addLog("- Module FileSystem -> ok");

global.module_path = require('path');
global.module_logmanager.addLog("- Module Path -> ok");

global.module_childprocess = require('child_process');
global.module_logmanager.addLog("- Module Child Process -> ok");

global.module_spawncommand = require(global.__root + '/libs/spawn-command/app');
global.module_logmanager.addLog("- Libs Spawn Command -> ok");

global.module_cron = require('cron').CronJob;
global.module_logmanager.addLog("- Module Cron -> ok");

global.module_streamlink = require(global.__root + '/libs/stream-link/app');
global.module_logmanager.addLog("- Libs & Module Streamlink -> ok");

global.module_record = require(global.__root + '/libs/record/app');
global.module_logmanager.addLog("- Class Record -> ok");

global.module_datamanager = require(global.__root + '/libs/data-manager/app');
global.module_logmanager.addLog("- Module Datamanager -> ok");

global.module_serverweb = require(global.__root + '/libs/server-web/app');
global.module_logmanager.addLog("- Module Server Web -> ok");

global.module_os = require('os');
global.module_logmanager.addLog("-  Module OS -> ok");

global.module_moment = require('moment');
global.module_logmanager.addLog("-  Module Moment.js -> ok");

global.module_logmanager.addLog("-*-*- Loading finished -*-*-\n\n");