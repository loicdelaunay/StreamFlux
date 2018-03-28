//When user add record
$("#btn-post").click(function () {
    let url = $("#url").val();
    let quality = $("#quality").val();
    let folder = $("#folder").val() + $("#filename").val() + ".mp4";
    let startAt = $("#start-time").val();
    let endAt = $("#end-time").val();

    $.ajax({
            url: "/addRecord/",
            type: "POST",
            dataType: "Json",
            data: {
                url: url,
                folder: folder,
                quality: quality,
                startAt: startAt,
                endAt: endAt,
            },
            error: function (data) {
                toastr['error']('error in saved ! : ' + data.responseText);
            },

            success: function (data) {
                toastr['success']('record saved and ready !');
            }
        }
    )
});

//Table management
var appRecord = new Vue({
    el: " #app-record",
    data: {
        records: [],
    },
    methods: {
      removeRecord(uid){
          $.ajax({
              url: "/removeRecord/",
              type: "POST",
              dataType: "Json",
              data: {
                  uid: uid,
              },
              error: function (data) {
                  toastr['error']('error in deleting ! : ' + data.statusText);
              },
              success: function (data) {
                  toastr['success']('record setting deleted !');
              }
          })
      }
    }
});

socket.on('records', function (records) {
    console.log(records);
    appRecord.records = records;
});