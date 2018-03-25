/**
 * Class process manager
 */
class commandSpawn{
    constructor(){

    }

    exec(command){
        let process = global.module_childprocess.exec(command);

        process.stdout.on('data', (data) => {
            global.module_logmanager.addLog('Sub-Process log : ' + data.toString())
        });

        process.stderr.on('data', (data) => {
            global.module_logmanager.addLog('Sub-Process error : ' + data.toString())
        });

        process.on('exit', (code) => {
            global.module_logmanager.addLog('Sub-Process exit :  ' + code.toString())
        });
        return process;
    }
}

module.exports = new commandSpawn();