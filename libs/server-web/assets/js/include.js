// Material Select Initialization
$(document).ready(function() {
    $('.mdb-select').material_select();
});

$('#start-time').pickatime({});
$('#end-time').pickatime({});

//Init MDB tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

//Socket.io connection
var socket = io();