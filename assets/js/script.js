var results = $("#result");
var favorite = [];
var tempObj;
let map;

// Call Yelp API
function yelpAPI() {
	var userLocation = document.querySelector("#locationInput").value;

	axios
		.get("https://it-servers-us-well.herokuapp.com/businesses/search", {
			params: {
				location: userLocation,
			},
		})
		.then((response) => {
			let businesses = response.data;
			let randomBusiness =
				businesses[Math.floor(Math.random() * businesses.length)];
			let businessLocation = {
				lat: randomBusiness.coordinates.latitude,
				long: randomBusiness.coordinates.longitude,
			};
			console.log(randomBusiness);
			console.log(businessLocation);
		})
		.catch((err) => console.error("html", err));
}

// Save to local storage favorites
function saveLocalstorage() {
	localStorage.setItem("favorite", JSON.stringify(favorite));
}

// Get from Local Storages
function getStorage() {
	var storeItem = localStorage.getItem("favorite");
	storeItem = JSON.parse(storeItem);
	for (item in storeItem) {
		favorite.push(storeItem[item]);
	}
}

// Output the data 
function DisplayData(data) {
	results.html("");
	var url, rating;
	initMap(data.coordinates.latitude, data.coordinates.longitude);
	url = data.url;
	rating = data.rating;
	var resultTileEl = document.createElement("article");
	resultTileEl.className = "box result-spot pb-2";
	var nameEl = document.createElement("a");
	nameEl.href = url;
	nameEl.target = "_blank";
	nameEl.textContent = data.name;
	nameEl.className = "subtitle block";
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
		data.phone.replace("+", "");
	addressEl.className = "content pt-4";
	var categoryStr = "";
	var categoryEl = document.createElement("p");
	for (x in data.categories) {
		categoryStr += data.categories[x].title + "/";
	}
	categoryEl.textContent = "Category: " + categoryStr.slice(0, -1);
	categoryEl.className = "content";
	var moneyEl = document.createElement("p");
	moneyEl.className = "content";
	if (data.price === null || data.price === "" || data.price === undefined) {
		moneyEl.textContent = "Price: Not Available";
	} else {
		moneyEl.textContent = "Price: " + data.price;
	}
	var favoriteButtonEl = document.createElement("button");
	favoriteButtonEl.id = "favorite";
	favoriteButtonEl.className = "button is-warning is-outlined";
	favoriteButtonEl.innerHTML =
		"<spas class='far fa-star mr-2'></span>Save for later";
	results.append(resultTileEl);
	resultTileEl.append(nameEl, addressEl, categoryEl, moneyEl, favoriteButtonEl);
}

// GOogle Map API Function
function initMap(lat, long) {
    // google object for latitude and longitude
    var options = {
            center: {
                lat: lat,
                lng: long
            },
            zoom: 18
        }
        // Store the map back to the index.html with id="map"
    map = new google.maps.Map(document.getElementById("map"), options);
    $("#map").addClass("box");
    // Create a marker on Google Maps
    const marker = new google.maps.Marker({
        position: {
            lat: lat,
            lng: long
        },
        map: map
    })
}

// Save Button Function
function saveFavorite() {
    console.log("in this save FunctioN");
    // Push the tempObj into the Favorite's Array
    favorite.push(tempObj);
    console.log(favorite);
    // Call save function to save to local storage
    saveLocalstorage();
}

getStorage();
$("#search").on("click", yelpAPI);
$(document).on("click", "#favorite", saveFavorite);
