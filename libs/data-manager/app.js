


//Records array
global.Records = [];

/**
 * Loading from disk records
 */
let dataRecordsPath = global.__root + "/data/records.json";

if(global.module_filesystem.existsSync(dataRecordsPath)){
    global.Records = JSON.parse(global.module_filesystem.readFileSync(dataRecordsPath,"utf8"));
}else{
    global.module_logmanager.addLog("No records saved list");
}

/**
 * Data manager
 * @class dataManager
 */
class dataManager{
    constructor(){
    }
    /**
     * Save Records on disk in Json file records.json
     */
    saveRecords(){
        global.module_filesystem.writeFileSync(dataRecordsPath,JSON.stringify(global.Records),function(err){
            if(err){
                global.module_logmanager.addLog("Error creation of records data file : " + err);
            }else{
                global.module_logmanager.addLog("Records list saved on disk");
            }
        })
    }

    /**
     * Remove record in list
     * @param uid : uid of record
     */
    removeRecords(uid){
        global.Records = [];
    }
}

module.exports = new dataManager();