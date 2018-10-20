//Table management
var appLogs = new Vue({
    el: " #app-logs",
    data: {
        logsAll: [],
        logsUser: [],
        logsStreamLink: [],
        logsError: [],
        autoScroll: false
    },
    methods: {
        logGetDate(log) {
            return log.substring(1, 19);
        },
        logGetMessage(log) {
            return log.substring(20);
        },
    }
});

socket.on('logsAll', function (logs) {
    appLogs.logsAll = logs;


    if (appLogs.autoScroll) {
        var elem = document.getElementById('panel-all-autoscroll');
        elem.scrollTop = elem.scrollHeight;
    }
});
socket.on('logsUser', function (logs) {
    appLogs.logsUser = logs;


    if (appLogs.autoScroll) {
        var elem = document.getElementById('panel-user-autoscroll');
        elem.scrollTop = elem.scrollHeight;
    }
});
socket.on('logsStreamLink', function (logs) {
    appLogs.logsStreamLink = logs;


    if (appLogs.autoScroll) {
        var elem = document.getElementById('panel-streamlink-autoscroll');
        elem.scrollTop = elem.scrollHeight;
    }
});
socket.on('logsError', function (logs) {
    appLogs.logsError = logs;


    if (appLogs.autoScroll) {
        var elem = document.getElementById('panel-error-autoscroll');
        elem.scrollTop = elem.scrollHeight;
    }
});