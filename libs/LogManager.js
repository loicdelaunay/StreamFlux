class LogManager{

    constructor(){
        this.log = [];
        this.log.streamLink = [];
        this.log.user = [];
        this.log.error = [];
    }



     addLog(msg){
        console.log(msg);
        this.log.push(msg);
        this.sendWebServerUpdate();
    }

    addLogUser(msg){
        console.log(msg);
        this.log.push(msg);
        this.log.user.push(msg);
        this.sendWebServerUpdate();
    }

    addLogStreamLink(msg){
        console.log(msg);
        this.log.push(msg);
        this.log.streamLink.push(msg);
        this.sendWebServerUpdate();
    }

    addLogError(msg){
        console.error(msg);
        this.log.push(msg);
        this.log.error.push(msg);
        this.sendWebServerUpdate();
    }

    sendWebServerUpdate(){
        try{
            global.module_webserver.logsUpdate();
        }catch (e) {
            return;
        }
    }
}

module.exports = new LogManager();
