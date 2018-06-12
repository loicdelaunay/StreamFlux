/**
 *
 */
class logManager{

    constructor(){
        this.log = [];
        this.log.streamLink = [];
        this.log.user = [];
        this.log.error = [];
    }



     addLog(msg){
        console.log(this.logFormat(msg));
        this.log.push(this.logFormat(msg));
        this.sendServerWebUpdate(this.logFormat(msg));
    }

    addLogUser(msg){
        console.log(this.logFormat(msg));
        this.log.push(this.logFormat(msg));
        this.log.user.push(this.logFormat(msg));
        this.sendServerWebUpdate();
    }

    addLogStreamLink(msg){
        console.log(this.logFormat(msg));
        this.log.push(this.logFormat(msg));
        this.log.streamLink.push(this.logFormat(msg));
        this.sendServerWebUpdate();
    }

    addLogError(msg){
        console.error(this.logFormat(msg));
        this.log.push(this.logFormat(msg));
        this.log.error.push(this.logFormat(msg));
        this.sendServerWebUpdate();
    }

    sendServerWebUpdate(){
        try{
            global.module_serverweb.logsUpdate();
        }catch (e) {
            return
        }
    }

    logFormat(msg){
        return "<" + this.getDate() + "> " + msg;
    }

    getDate(){
        let d = new Date(Date.now()).toLocaleString();
        return d;
    }
}

module.exports = new logManager();
