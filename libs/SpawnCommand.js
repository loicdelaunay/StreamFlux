/**
 * Class command spawn
 * Manage process from nodeJS
 */
class CommandSpawn{
    constructor(){

    }
    
    launchRecorderProcess(recorder, file, done) {
        let ping = new global.module_streamlink(recorder.url); // Ping stream to retrieve infos
        ping.getQualities();
        ping.uid = recorder.uid;
        ping.on('quality', (qualities) => {

            // Test active attempt to start
            let isActive = false;
            global.listProcess.forEach(function (unProcess) {
                if (unProcess.uid === recorder.uid) {
                    isActive = true;
                }
            });
            if (isActive) return;
            let quality;

            switch (recorder.quality) {
                case "1":
                    quality = "worst"; // Bad quality
                    break;
                case "2":
                    quality = qualities[(qualities.length - 1) / 2]; // Middle quality
                    break;
                case "3":
                    quality = qualities[qualities.length - 2]; // "Not the the best" quality
                    break;
                case "4":
                    quality = "best"; // Best quality
                    break;
                case "audio":
                    quality = qualities[0]; // Audio Only or Worst possible
                    break;
                default:
            }

            let process = new global.module_streamlink(recorder.url).quality(quality).output(file).start();

            process.uid = recorder.uid; //UID of process = recorder UID
            process.size = "loading";
            process.speed = "loading ";
            process.time = "loading";
            process.state = "loading";

            //Catch Streamlink error
            process.on('err', (err) => {
                global.module_spawncommand.setState(process.uid, "Error", err);
                global.module_spawncommand.removeProcess(process.uid);
                global.module_webserver.processesUpdate();
            });

            //Catch Streamlink logs
            process.on('log', (data) => {
                global.module_logmanager.addLogStreamLink('Process ' + process.uid + ' : ' + data.toString());

                //Try to get infos from process
                let args = data.toString().split(' ');

                //Try to get infos from process
                if (args[2] !== undefined && args[3] !== undefined) {
                    process.size = args[2] + ' ' + args[3];
                    global.module_spawncommand.setState(process.uid, "Running", "Record in progress");
                }
                if (args[6] !== undefined && args[7] !== undefined) {
                    process.speed = args[6] + ' ' + args[7].slice(0, args[7].length - 1);
                }
                if (args[4] !== undefined) {
                    process.time = args[4].substr(1);
                }

                global.module_webserver.processesUpdate();
            });

            process.on('exit', (code) => {
                global.module_logmanager.addLog('Process ' + process.uid + ' stopped : ' + code.toString());
                global.module_webserver.processesUpdate();
            });
            return done(process, recorder);
        });
        return ping;
    }

    /** Find recorder object of process and set state */
    setState(UID,state,stateMessage){
        global.recorders.forEach(function (aRecorder) {
            if (aRecorder.uid = UID) {
                aRecorder.state = state;
                aRecorder.stateMessage = stateMessage;
                global.module_webserver.recordersUpdate();
            }
        });
    }

    /** Destroy process */
    removeProcess(UID){
        global.listProcess.forEach(function (unProcess, index) {
            if (unProcess.uid === UID) {
                global.listProcess.splice(index, 1);
            }
        });
    }
}

module.exports = new CommandSpawn();