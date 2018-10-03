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
        this.sendServerWebUpdate();
    }

    addLogUser(msg){
        console.log(msg);
        this.log.push(msg);
        this.log.user.push(msg);
        this.sendServerWebUpdate();
    }

    addLogStreamLink(msg){
        console.log(msg);
        this.log.push(msg);
        this.log.streamLink.push(msg);
        this.sendServerWebUpdate();
    }

    addLogError(msg){
        console.error(msg);
        this.log.push(msg);
        this.log.error.push(msg);
        this.sendServerWebUpdate();
    }

    sendServerWebUpdate(){
        try{
            global.module_serverweb.logsUpdate();
        }catch (e) {
            return;
        }
    }
}

module.exports = new LogManager();
