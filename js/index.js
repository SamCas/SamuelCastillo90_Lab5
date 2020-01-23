$(document).ready(function () {
    $('.videoForm').submit(function (e) {
        e.preventDefault();
        getVideos($('#videoKey').val());
    });
    $('#btnPrev').hide();
    $('#btnNext').hide();
});

function getVideos(videKey) {
    $('#btnPrev').show();
    $('#btnNext').show();
    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyATyK6y71e2cKIqlC0h1tCmAweiItdpGH0&q=" + videKey + "&part=snippet&maxResults=10&type=video",
        success: function (response) {
            console.log(response.nextPageToken,response.prevPageToken);
            displayVideos(response,);
        }
    });
}

function displayVideos({items, nextPageToken, prevPageToken}) {

    $.each(items, function (indexInArray, video) {
        $('.videoList').append(
            '<div class"video">' +
            '<li><a href="https://www.youtube.com/watch?v=' + video.id.videoId + '">' + video.snippet.title + '</a></li>' +
            '<img src="' + video.snippet.thumbnails.medium.url + '">' +
            '</div>'
        );
    });

    $('#btnNext').on('click', function () {
        if(nextPageToken == undefined || nextPageToken == null){
            console.log('nextToken vacio');
        }else{
            getVideosWithToken(nextPageToken);
        }   
    });

    $('#btnPrev').on('click', function () {
        if(prevPageToken == undefined || prevPageToken == null){
            console.log('PrevToken vacio');
        }else{
            getVideosWithToken(prevPageToken);
        }        
    });
}

function getVideosWithToken(pageToken) {
    
    $('.videoList').empty();

    $.ajax({
        type: "GET",
        url: "https://www.googleapis.com/youtube/v3/search?key=AIzaSyATyK6y71e2cKIqlC0h1tCmAweiItdpGH0&pageToken="+pageToken+"&part=snippet&maxResults=10&type=video",
        success: function (response) {
            console.log(response.nextPageToken,response.prevPageToken);
            displayVideos(response);
        }
    });
}