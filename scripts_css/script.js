$(document).ready(function () {

    $('#location').focus();
    /* Enable the button only if a text is entered */
    $('#location').keyup(function (key) {
        if ($(this).val() === "") {
            $('#check').prop('disabled', true);
        } else {
            $('#check').prop('disabled', false);
        }
    });
})


function buttonClicked() {
    localStorage.clear();
    sessionStorage.clear();
    var location = "";
    location = document.getElementById('location').value;

    populate_data(location);
}

function populate_data(location) {
    $.ajax({
        //The URL to process the request
        url: 'http://api.openweathermap.org/data/2.5/forecast?zip=' + location,
        type: 'GET',
        data: {
            APPID: 'b3558e27667781d8a69d5c1397276ad8'
        },
    }).done(function (data) {
        var obj = Object.entries(data)
        console.log(obj)
        let locDetails = obj[4];
        let weatherDetails = obj[3];
        sessionStorage.setItem("count", obj[2][1])
        sessionStorage.setItem("location", JSON.stringify(locDetails));
        sessionStorage.setItem("weather", JSON.stringify(weatherDetails));
        window.location.href = "weather_list.html";
    }).fail(function (error) {
        alert("City not found")
    })
}