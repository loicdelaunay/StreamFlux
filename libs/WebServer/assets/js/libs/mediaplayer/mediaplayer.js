version = 0.1;

console.log("Media player v"+ version +" loaded welcome :)")

//Table management
var appPlayer = new Vue({
    el: " #app-player",
    data: {
        videos: [],
    },
    methods: {
        getVideos() {
            $.ajax({
                url: "/getVideos/",
                type: "POST",
                dataType: "Json",
                error: function (data) {
                    toastr['error']("error can't get videos ! : " + data.statusText);
                },
                success: function (data) {
                    appPlayer.videos = data;
                }
            })
        }
    },

    mounted: function(){
        this.getVideos();
    }
});
