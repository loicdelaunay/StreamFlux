//Table management
var appProcess = new Vue({
    el: " #app-process",
    data: {
        processes: [],
    }
});

socket.on('processes', function (listProcessInfo) {
    appProcess.processes = listProcessInfo;
});