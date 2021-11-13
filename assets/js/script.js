var results = $("#result");

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
    success: function (data) {
      // Randomize the array Index
      var randomIndex = Math.floor(Math.random() * data.businesses.length);
      console.log(data);
      DisplayData(data.businesses[randomIndex]);
    },
  });
}

function DisplayData(data) {
  results.html("");
  var latitude, longitude, url, rating;
  latitude = data.coordinates.latitude;
  longitude = data.coordinates.longitude;
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
    data.phone;
  results.append(nameEl, addressEl);
}
$("#search").on("click", yelpAPI);
