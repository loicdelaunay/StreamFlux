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
     * @param url
     * @param quality
     * @param file
     */
    recordFlux(unRecord) {
        //Execution du script et execution dans un children
        global.listProcess.push(global.module_spawncommand.exec(
            global.streamlinkexec + ' ' + unRecord.url + ' ' + unRecord.quality + ' ' + '-o ' + unRecord.folder,
            unRecord.uid
        ));

        //Ecrit l'url et l'uid du live dans le process
        global.listProcess[global.listProcess.length - 1].url = unRecord.url;
        global.listProcess[global.listProcess.length - 1].uid = unRecord.uid;
    }

    /**
     * Try if recording is running
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
}

module.exports = new streamlink();


//Flux de test
//recordFlux('twitch.tv/squeezielive', '480p', '-o ' + __dirname +'/record/test.fly');