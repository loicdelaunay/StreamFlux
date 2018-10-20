global.__root = __dirname;

// Generating a global variable with app infos
global.appInfo = [];
global.appInfo.appName = "NameToBeDefined";
global.appInfo.appVersion = 0.1;

//Autoloader
require(__dirname + '/libs/Autoloader');

//Env variable for Streamlink command
global.streamlinkexec = "streamlink";

global.module_logmanager.addLog("-*-*-*-*- Welcome to [NameToBeDefined] -*-*-*-*-*-");
global.module_logmanager.addLog(" -* Program version : "+ global.appInfo.appVersion + " *- ");
global.module_logmanager.addLog(" -* NodeJS version : "+ global.process.version + " *- ");
global.module_logmanager.addLog(" -* Folder : "+ global.__root + " *- ");
global.module_logmanager.addLog(" -* OS : "+ global.module_os.type + "/" + global.module_os.platform + " *- ");
global.module_logmanager.addLog("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");