/**
 * SERVEUR AUTORECORD STREAM
 */

//Chargement du module de sous process
const { exec } = require('child_process');
const defaults = {
    encoding: 'utf8',
    timeout: 0,
    killSignal: 'SIGTERM',
    cwd: null,
    env: null
};

//Chargement du module de cron
const Cron = require('cron').CronJob;

//Option
const creanauStart = 1;
const creanauEnd = 16;

//Tableau test
var test = ["test1","test2","test3"];
var listProcess = [];

//Cron de vérification
// new Cron('* * * * * *',function () {
//     console.log("test");
// },null,true);

//Lance un bash
function runFlux(){
//Execution d'un script avec controle de celui ci en async et promise
    exec('test.sh', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
}

runFlux();
runFlux();
runFlux();
runFlux();