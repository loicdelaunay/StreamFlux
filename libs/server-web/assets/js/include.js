// Material Select Initialization
$(document).ready(function () {
    $('.mdb-select').material_select();
});

$('#start-time').pickatime({});
$('#end-time').pickatime({});

//Init MDB tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

//Toastr settings
toastr.options = {
    "closeButton": true, // true/false
    "debug": false, // true/false
    "newestOnTop": true, // true/false
    "progressBar": true, // true/false
    "positionClass": "toast-bottom-right", // toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300", // in milliseconds
    "hideDuration": "1000", // in milliseconds
    "timeOut": "5000", // in milliseconds
    "extendedTimeOut": "1000", // in milliseconds
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//Socket.io connection
const socket = io();