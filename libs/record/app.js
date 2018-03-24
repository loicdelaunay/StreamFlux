//Tableau test
global.listRecords = [];

global.listRecords.push(new global.module_record("https://www.twitch.tv/armatvhs","480p",global.__root+"/record/test.avi"));
global.listRecords.push(new global.module_record("https://www.twitch.tv/squeezie","720p",global.__root+"/record/test2.avi"));
global.listRecords.push(new global.module_record("https://www.twitch.tv/dream","480p",global.__root+"/record/test3.avi"));


module.exports = class app{
    constructor(url,quality,folder){
        this.url = url;
        this.quality = quality;
        this.folder = folder;
    }
};