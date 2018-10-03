class Streamlink {
    constructor() {

        global.listProcess = [];

        //Cron who verify process running
        new global.module_cron('* * * * * *', function () {
            //Create hour.now
            let date = new Date();
            let hourNow = global.module_moment(date).format('HH:mm');

            //Try each record for finding recording set
            global.records.forEach(function (unRecord) {

                //If record need to be recording by time planning
                if (unRecord.startAt < hourNow && unRecord.endAt > hourNow) {

                    //Try if record is already recording
                    if (!global.module_streamlink.isRecording(unRecord.uid)) {

                        global.module_streamlink.recordFlux(unRecord);
                    }
                }

            });

        }, null, true);
    }

    /** Lance le record d'un flux de stream */
    recordFlux(unRecord) {

        //File to save flux
        let fileToSave = unRecord.folder;
        let index = 0;

        //Try if a record file already exist
        if(this.recordExist(unRecord.folder)){
            //Saved file named blablablaTimestamp.mp4
            fileToSave = unRecord.folder.replace(/\.[^.$]+$/, '') + Date.now() + ".mp4";
        }

        //get position of the process
        let indexProcess = global.listProcess.length;

        //Execute stream link command in a child process contained in NodeJS
        global.listProcess.push(global.module_spawncommand.execStreamLink(
            global.streamlinkexec + ' ' + unRecord.url + ' ' + unRecord.quality + ' ' + '-o ' + fileToSave,
            unRecord.uid
        ));

        //Add informations in process
        global.listProcess[indexProcess].url = unRecord.url;
        global.listProcess[indexProcess].quality = unRecord.quality;
        global.listProcess[indexProcess].startAt = unRecord.startAt;
        global.listProcess[indexProcess].endAt = unRecord.endAt;
        global.listProcess[indexProcess].state = unRecord.state;
        global.listProcess[indexProcess].stateMessage = unRecord.stateMessage;
        global.listProcess[indexProcess].folder = unRecord.folder;

        //Write process state in record
        index = global.listProcess.length-1;
        unRecord.state = global.listProcess[index].state;
        unRecord.stateMessage = global.listProcess[index].stateMessage;
    }

    /** Try if recording is already running */
    isRecording(uid) {
        let find = false;
        global.listProcess.forEach(function (unProcess) {
            if (unProcess.uid === uid) {
                find = true;
            }
        });
        return find;
}

    /** Try if file already exist */
    recordExist(folder){
        return global.module_filesystem.existsSync(folder);
    }
}

module.exports = new Streamlink();