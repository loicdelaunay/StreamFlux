$(document).ready(function(){

    $("#btn-post").click(function(){
        let url = $("#url").val();
        let quality = $("#quality").val();
        let folder = $("#folder").val();
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
                success: function (data) {
                    console.log(data);
                },

                error: function (data) {
                    console.log("ERREUR : " + data.message);
                },

                complete: function (data) {
                    console.log("Transaction complete");
                    toastr['success']('record saved and ready !');
                }
            }
        )
    })
});