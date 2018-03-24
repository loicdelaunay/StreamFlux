


//Tableau des records
global.Records = [];

//Temp test
global.Records.push(new global.module_record("https://www.twitch.tv/armatvhs","480p",global.__root+"/record/test.avi"));
global.Records.push(new global.module_record("https://www.twitch.tv/squeezie","720p",global.__root+"/record/test2.avi"));
global.Records.push(new global.module_record("https://www.twitch.tv/dream","480p",global.__root+"/record/test3.avi"));

class dataManager{
    constructor(){
        this.dataRecordsPath = global.__root + "/data/records.json";

        if(global.module_filesystem.existsSync(this.dataRecordsPath)){
            global.module_filesystem.readFileSync(this.dataRecordsPath,function (err,data) {
                if(err){
                    global.module_logmanager.addLog("Error when read data of Records");
                }else{
                    var yolo = JSON.parse(data);
                    global.module_logmanager.addLog("Records list loaded");
                }
            })
        }else{
            global.module_logmanager.addLog("No records saved list");
        }
    }
    saveRecords(){
        global.module_filesystem.writeFileSync(this.dataRecordsPath,JSON.stringify(global.Records),function(err){
            if(err){
                global.module_logmanager.addLog("Error creation of records data file : " + err);
            }else{
                global.module_logmanager.addLog("Records list saved on disk");
            }
        })
    }
}

module.exports = new dataManager();