$(document).ready(function() {

    $("#submit").click(function(event) {

        event.preventDefault();

        let artistinput = $("#inputartist");
        let uInput = artistinput.val();
        let predictUrl = artistinput.attr("response-url");
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