/**
 * Data manager
 * @class dataManager
 */
class DataManager{
    constructor() {

        // recorders array
        global.recorders = [];

        /** Loading from disk recorders */
        this.dataRecordersPath = global.__root + "/data/recorders.json";

        if(global.module_filesystem.existsSync(this.dataRecordersPath)){
            global.recorders = JSON.parse(global.module_filesystem.readFileSync(this.dataRecordersPath,"utf8"));
        }else{
            global.module_logmanager.addLog("No recorders saved list");
        }
    }

    /** Save recorders on disk in Json file recorders.json */
    saveRecorders(){
        global.module_filesystem.writeFileSync(this.dataRecordersPath,JSON.stringify(global.recorders),function(err){
            if(err){
                global.module_logmanager.addLog("Error creation of recorders data file : " + err);
            }else{
                global.module_logmanager.addLog("recorders list saved on disk");
            }
        })
    }

    /** Remove recorder in list */
    removeRecorders(UID){
        global.recorders.forEach(function(aRecorder,index){
            if(aRecorder.uid.toString() === UID.toString()){
                global.recorders.splice(index,1);
                global.module_datamanager.saveRecorders();
            }
        });
    }
}

module.exports = new DataManager();