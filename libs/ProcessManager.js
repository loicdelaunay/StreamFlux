class ProcessManager {
    constructor() {

        global.listProcess = [];

        new global.module_cron('* * * * * *', function () { //Global CRON Job to start recording process

            let date = new Date();
            let hourNow = global.module_moment(date).format('HH:mm');

            global.recorders.forEach(function (aRecorder) {
                if (!global.module_processmanager.isRecordering(aRecorder.uid)) { // Time Checker
                    if (aRecorder.startAnytime === "true") {
                        global.module_processmanager.startRecord(aRecorder);
                    }
                    else {
                        if (aRecorder.startAt < hourNow && aRecorder.endAt > hourNow) { // Ex ; StartAt 1PM, EndAt 9PM, NowIs 8PM
                            global.module_processmanager.startRecord(aRecorder);
                        }
                        else if (aRecorder.startAt > aRecorder.endAt && aRecorder.startAt < hourNow) { // Ex ; StartAt 9PM, EndAt 3AM, NowIs 11PM
                            global.module_processmanager.startRecord(aRecorder);
                        }
                        else if (aRecorder.startAt > aRecorder.endAt && aRecorder.endAt > hourNow) { // Ex ; StartAt 9PM, EndAt 3AM, NowIs 1PM
                            global.module_processmanager.startRecord(aRecorder);
                        }
                    }
                }
            });

        }, null, true);
    }

    startRecord(aRecorder) {

        let fileToSave = aRecorder.folder;
        let index = 0;

        if(this.recorderExist(aRecorder.folder)){
            fileToSave = aRecorder.folder.replace(/\.[^.$]+$/, '') + Date.now() + ".mp4";
        }

        let process = global.module_spawncommand.launchRecorderProcess(aRecorder, fileToSave, (Callback, Recorder) => { //Async process starter

            let indexProcess = global.listProcess.length;
            global.listProcess.push(Callback);  
            global.listProcess[indexProcess].url = Callback.url;
            global.listProcess[indexProcess].quality = Callback.quality;
            global.listProcess[indexProcess].startAt = Callback.startAt;
            global.listProcess[indexProcess].endAt = Callback.endAt;
            global.listProcess[indexProcess].state = Callback.state;
            global.listProcess[indexProcess].stateMessage = Callback.stateMessage;
            global.listProcess[indexProcess].folder = Callback.folder;
            index = global.listProcess.length - 1;

        });
    }

    isRecordering(UID) {
        let find = false;
        global.listProcess.forEach(function (unProcess) {
            if (unProcess.uid === UID) {
                find = true;
            }
        });
        return find;
}

    recorderExist(folder){
        return global.module_filesystem.existsSync(folder);
    }
}

module.exports = new ProcessManager();