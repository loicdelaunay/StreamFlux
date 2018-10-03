module.exports = class Recorder{
    constructor(url,quality,folder,timeStart,timeEnd){
        this.url = url;
        this.quality = quality;
        this.folder = folder;
        this.startAt = timeStart;
        this.endAt = timeEnd;
        this.uid = Date.now();
        this.state = "none";
        this.stateMessage = "none";
    }
};