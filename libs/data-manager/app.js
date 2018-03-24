//Tableau des records
global.Records = [];

//Temp test
global.Records.push(new global.module_record("https://www.twitch.tv/armatvhs","480p",global.__root+"/record/test.avi"));
global.Records.push(new global.module_record("https://www.twitch.tv/squeezie","720p",global.__root+"/record/test2.avi"));
global.Records.push(new global.module_record("https://www.twitch.tv/dream","480p",global.__root+"/record/test3.avi"));

class dataManager{
    constructor(){

    }
}

module.exports = new dataManager();