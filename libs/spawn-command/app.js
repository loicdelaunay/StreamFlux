/**
 * Class process manager
 */
class commandSpawn{
    constructor(){

    }

    exec(command,uid){
        let process = global.module_childprocess.exec(command);

        process.uid = uid; //Uid of process = record uid
        process.size = "loading ...";
        process.speed = "loading ...";
        process.time = "loading ...";

        process.stdout.on('data', (data) => {
            global.module_logmanager.addLog('Sub-Process log -> ' + process.uid + ' : ' + data.toString())

            //Try to get size
            let test = data.toString().split(' ')
        });

        process.stderr.on('data', (data) => {
            global.module_logmanager.addLog('Sub-Process error -> ' + process.uid + ' : ' + data.toString())

            //Try to get infos from process
            let args = data.toString().split(' ');

            if(args[2] !== undefined && args[3] !== undefined){
                process.size = args[2] + ' ' + args[3];
            }
            if(args[6] !== undefined && args[7] !== undefined){
                process.speed = args[6] + ' ' + args[7].slice(0,args[7].length-1);
            }
            if(args[4] !== undefined ){
                process.time = args[4].substr(1);
            }
        });

        process.on('exit', (code) => {
            global.module_logmanager.addLog('Sub-Process exit -> ' + process.uid + ' : ' + code.toString())
        });
        return process;
    }
}

module.exports = new commandSpawn();