/**
 * Class process manager
 */
class commandSpawn{
    constructor(){

    }

    /**
     * Launch process in background
     *
     * @param command
     * @returns {process}
     */
    exec(command){
        let process = global.module_childprocess.exec(command);

        process.stdout.on('data', (data) => {
            global.module_logmanager.addLog('Sub-Process log -> ' + process.uid + ' : ' + data.toString())
        });

        process.stderr.on('data', (data) => {
            global.module_logmanager.addLog('Sub-Process error -> ' + process.uid + ' : ' + data.toString())
        });

        process.on('exit', (code) => {
            global.module_logmanager.addLog('Sub-Process exit -> ' + process.uid + ' : ' + code.toString())
        });
        return process;
    }

    /**
     * Launch process for streamlink in background
     *
     * @param command command to launch in subprocess
     * @param uid uid of record linked in process
     * @returns {process}
     */
    execStreamLink(command,uid){
        let process = global.module_childprocess.exec(command);

        process.uid = uid; //Uid of process = record uid
        process.size = "loading ...";
        process.speed = "loading ...";
        process.time = "loading ...";
        process.state = "loading";

        //Catch process logs
        process.consoleLog = function consoleLog(data){
            global.module_logmanager.addLog('Process ' + process.uid + ' : ' + data.toString());

            //Try to get infos from process
            let args = data.toString().split(' ');

            //Catch process error
            if(args[0] !== undefined && args[0] === "error:"){
                global.module_spawncommand.setState(process.uid,"error",data);
                global.module_spawncommand.removeProcess(process.uid);
            }

            //Try to get infos from process
            if(args[2] !== undefined && args[3] !== undefined){
                process.size = args[2] + ' ' + args[3];
                global.module_spawncommand.setState(process.uid,"running","process is actually recording")
            }
            if(args[6] !== undefined && args[7] !== undefined){
                process.speed = args[6] + ' ' + args[7].slice(0,args[7].length-1);
            }
            if(args[4] !== undefined ){
                process.time = args[4].substr(1);
            }
            if (args[1] === "Available" && args[2] === "streams:") {      //Catch available stream qualities
                let qualities = data.toString().substring(0, (args[0].length + args[1].length) - 1);
                qualities = qualities.split(',');
                qualities.forEach(function(quality){
                    quality.replace(/ *\([^)]*\) */g, "");
                });
            }

            global.module_serverweb.processesUpdate();
        };

        //Catch process logs
        process.stdout.on('data', (data) => {
            process.consoleLog(data);
        });
        process.stderr.on('data', (data) => {
            process.consoleLog(data);
        });

        process.on('exit', (code) => {
            global.module_logmanager.addLog('Process ' + process.uid + ' exited : ' + code.toString());
            global.module_serverweb.processesUpdate();
        });

        return process;
    }

    /**
     * Find record object of process and set state
     *
     * @param uid uid of record to find
     * @param state
     * @param stateMessage
     */
    setState(uid,state,stateMessage){
        global.records.forEach(function(unRecord){
            if(unRecord.uid = uid){
                unRecord.state = state;
                unRecord.stateMessage = stateMessage;
                global.module_serverweb.recordsUpdate();
            }
        })
    }

    /**
     * Destroy process
     */
    removeProcess(uid){
        global.listProcess.forEach(function (unProcess,index){
            if(unProcess.uid === uid){
                global.listProcess.splice(index,1);
            }
        })
    }
}

module.exports = new commandSpawn();