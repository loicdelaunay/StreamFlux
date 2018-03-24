module.exports = class streamlink{
    constructor(){
        this.listProcess = [];
    }

    recordFlux(url, quality, file) {
        //Execution du script et execution dans un children
        listProcess.push(
            exec(streamlinkexec + ' ' + url + ' ' + quality + ' ' + file, function (error, stdout, stderr) {
                if (error) {
                    console.log('Erreur: ' + error);
                    return
                }
                console.log(stdout);
            }));
        //Ecrit l'url du live dans le process
        listeProcess[listeProcess.length - 1].name = url;
    }
}

//Cron de vérification
// new Cron('* * * * * 1', function () {
//     console.log("test");
// }, null, true);

/**
 * Lance un process streamlink de record
 * @param url url du stream à récupérer
 * @param quality qualité du stream
 * @param file nom du fichier de sortie
 */


//Flux de test
//recordFlux('twitch.tv/squeezielive', '480p', '-o ' + __dirname +'/record/test.fly');