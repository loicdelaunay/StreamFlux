/**
 * Data manager
 * @class dataManager
 */
class DataManager{
    constructor() {

        // records array
        global.records = [];

        /** Loading from disk records */
        this.dataRecordsPath = global.__root + "/data/records.json";

        if(global.module_filesystem.existsSync(this.dataRecordsPath)){
            global.records = JSON.parse(global.module_filesystem.readFileSync(this.dataRecordsPath,"utf8"));
        }else{
            global.module_logmanager.addLog("No records saved list");
        }
    }

    /** Save records on disk in Json file records.json */
    saveRecords(){
        global.module_filesystem.writeFileSync(this.dataRecordsPath,JSON.stringify(global.records),function(err){
            if(err){
                global.module_logmanager.addLog("Error creation of records data file : " + err);
            }else{
                global.module_logmanager.addLog("records list saved on disk");
            }
        })
    }

    /** Remove record in list */
    removeRecords(uid){
        global.records.forEach(function(unRecord,index){
            if(unRecord.uid.toString() === uid.toString()){
                global.records.splice(index,1);
                global.module_datamanager.saveRecords();
            }
        });
    }
}

module.exports = new DataManager();