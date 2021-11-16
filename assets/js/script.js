var results = $("#result");
let map;

function yelpAPI() {
    var location = document.querySelector("#locationInput").value;
    var apiURL =
        "https://uatapi.smartechc.com/api/test/yelpsearch?term=restaurants&radius=500&location=" +
        location +
        "&open_now=true&limit=50";
    $.ajax({
        type: "GET",
        url: apiURL,
        dataType: "json",
        success: function(data) {
            // Randomize the array Index
            var randomIndex = Math.floor(Math.random() * data.businesses.length);
            console.log(data);
            DisplayData(data.businesses[randomIndex]);
        },
    });
}

function DisplayData(data) {
    results.html("");
    var url, rating;
    initMap(data.coordinates.latitude, data.coordinates.longitude);
    url = data.url;
    rating = data.rating;
    var nameEl = document.createElement("a");
    nameEl.href = url;
    nameEl.target = "_blank";
    nameEl.textContent = data.name;
    var addressEl = document.createElement("address");
    addressEl.innerHTML =
        data.location.address1 +
        " </br>" +
        data.location.city +
        ", " +
        data.location.state +
        " " +
        data.location.zip_code +
        " " +
        data.location.country +
        " </br>P:" +
        data.phone.replace('+', '');
    var categoryEl = document.createElement("p");
    var categoryStr = "";
    for (x in data.categories) {
        categoryStr += data.categories[x].title + "/";
    }
    categoryEl.textContent = "Category: " + categoryStr.slice(0, -1);
    results.append(nameEl, addressEl, categoryEl);
}

function initMap(lat, long) {
    console.log(lat, long)
    var options = {
        center: {
            lat: lat,
            lng: long
        },
        zoom: 15
    }
    map = new google.maps.Map(document.getElementById("map"), options);
    const marker = new google.maps.Marker({
        position: {
            lat: lat,
            lng: long
        },
        map: map
    })
}
$("#search").on("click", yelpAPI);