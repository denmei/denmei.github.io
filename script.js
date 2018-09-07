$(document).ready(function() {

    let artistLink = "https://ml-server-dm.herokuapp.com/music_recommender/api/artist_list";
    let recommenderLink = "https://ml-server-dm.herokuapp.com/music_recommender/api/artist_recommendation";

    // let artistLink = "http://127.0.0.1:8000/music_recommender/api/artist_list";
    // let recommenderLink = "http://127.0.0.1:8000/music_recommender/api/artist_recommendation";

    $.ajax({
            url: artistLink,
            // dataType: 'application/json',
            type: 'GET',
            contentType: 'application/json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function(response) {
                    let artists = [];
                    for (entry in response) {
                      artists.push(response[entry].name);
                    }
                    console.log(artists);

                    $("#inputartist").autocomplete({
                      source: artists
                    });
                },
            error: function(xhr, status, error) {
                    console.log("error in artists");
                }
         });

    $("#submit").click(function(event) {

        event.preventDefault();

        let artistinput = $("#inputartist");
        let uInput = artistinput.val();
        let predictUrl = recommenderLink;
        console.log("clicked");
        $.ajax({
                url: predictUrl,
                // dataType: 'application/json',
                type: 'POST',
                data: JSON.stringify({artist: uInput, number: 5}),
                contentType: 'application/json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                success: function(response) {
                        document.getElementById("recommendations-list").innerHTML = "";
                        let recommendations = response.recommendations;
                        for (let i in recommendations) {
                            let name = recommendations[i]['name'];
                            console.log(name);
                            let nameList = "<li class=\"list-group-item\">" + name + "</li>";
                            document.getElementById("recommendations-list").innerHTML += nameList;
                        }
                    },
                error: function(xhr, status, error) {
                        document.getElementById("recommendations-list").innerHTML = "";
                    }
             });
    });
});
