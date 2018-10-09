//When user add recorder
$("#btn-post").click(function () {
    let url = $("#url").val();
    let quality = $("#quality").val();
    let folder = $("#folder").val() + $("#filename").val() + ".mp4";
    let startAt = $("#start-time").val();
    let endAt = $("#end-time").val();
    let startAnytime = $("#start-anytime").is(':checked');
  
    //control data
    if(url === ""){
        toastr['error']('please add a valid url!');
    }

    else if(quality === "" || quality === "Quality"){
        toastr['error']('please add a valid quality!');
    }

    else if(folder === ""){
        toastr['error']('please add a valid folder!');
    }

    else if (startAt === endAt && !startAnytime) {
        toastr['error']('Please use Anytime checkbox instead of the same start and end time');
    }

    else if (startAt === "" && !startAnytime){
        toastr['error']('please add a valid start hour!');
    }

    else if (endAt === "" && !startAnytime){
        toastr['error']('please add a valid end hour!');
    }

    else{
        $.ajax({
                url: "/addRecorder/",
                type: "POST",
                dataType: "Json",
                data: {
                    url: url,
                    folder: folder,
                    quality: quality,
                    startAt: startAt,
                    endAt: endAt,
                    startAnytime: startAnytime
                },
                error: function (data) {
                    toastr['error']('error in saved ! : ' + data.responseText);
                },

                success: function (data) {
                    toastr['success']('recorder saved and ready !');
                }
            }
        )
    }
});

//Table management
var appRecorder = new Vue({
    el: " #app-recorder",
    data: {
        recorders: [],
    },
    methods: {
        removeRecorder(UID) {
            $.ajax({
                url: "/removeRecorder/",
                type: "POST",
                dataType: "Json",
                data: {
                    UID: UID,
                },
                error: function (data) {
                    toastr['error']('error in deleting ! : ' + data.statusText);
                },
                success: function (data) {
                    toastr['success']('recorder setting deleted !');
                }
            })
        }
    }
});

socket.on('recorders', function (recorders) {
    appRecorder.recorders = recorders;
});