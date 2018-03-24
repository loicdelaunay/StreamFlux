$(document).ready(function(){

    $("#btn-post").click(function(){
        let url = $("#url").val();
        let quality = $("#quality").val();
        let folder = $("#folder").val();

        $.ajax({
                url: "/addRecord/",
                type: "POST",
                dataType: "Json",
                data: {
                    url: url,
                    folder: folder,
                    quality: quality,
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