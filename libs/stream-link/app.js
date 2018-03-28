class streamlink {
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

            })
        }, null, true);
    }

    /**
     * Lance le record d'un flux de stream
     *
     * @param unRecord
     */
    recordFlux(unRecord) {

        //File to save flux
        let fileToSave = unRecord.folder;
        let index = 0;

        //Try if a record file already exist
        if(this.recordExist(unRecord.folder)){
            //Saved file named blablablaTimestamp.mp4
            fileToSave = unRecord.folder.replace(/\.[^.$]+$/, '') + Date.now() + ".mp4";
        }

        //Execute stream link command in a child process contained in NodeJS
        global.listProcess.push(global.module_spawncommand.execStreamLink(
            global.streamlinkexec + ' ' + unRecord.url + ' ' + unRecord.quality + ' ' + '-o ' + fileToSave,
            unRecord.uid
        ));

        //Write process state in record
        index = global.listProcess.length-1;
        unRecord.state = global.listProcess[index].state;
        unRecord.stateMessage = global.listProcess[index].stateMessage;
    }

    /**
     * Try if recording is already running
     *
     * @param uid
     */
    isRecording(uid) {
        let find = false;
        global.listProcess.forEach(function (unProcess) {
            if (unProcess.uid === uid) {
                find = true;
            }
        });
        return find;
}

    /**
     * Try if file already exist
     *
     * @param folder
     * @returns {boolean}
     */
    recordExist(folder){
        return global.module_filesystem.existsSync(folder);
    }
}

module.exports = new streamlink();


//Flux de test
//recordFlux('twitch.tv/squeezielive', '480p', '-o ' + __dirname +'/record/test.fly');