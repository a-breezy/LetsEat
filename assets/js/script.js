var results = $("#result");
var favorite = [];
var tempObj;
let map;

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
			let businessData = {
				businessLocation: {
					lat: randomBusiness.coordinates.latitude,
					lng: randomBusiness.coordinates.longitude,
				},
				name: randomBusiness.name,
				address: [
					randomBusiness.location.display_address[0],
					randomBusiness.location.display_address[1],
				],
				price: randomBusiness.price,
				rating: randomBusiness.rating,
				url: randomBusiness.url,
			};
			console.log(randomBusiness);
			console.log(businessData);

			// display map here
			DisplayData(businessData);
			// initMap(businessLocation);
		})
		.catch((err) => console.error("html", err));
}

function saveLocalstorage() {
	localStorage.setItem("favorite", JSON.stringify(favorite));
}

function getStorage() {
	var storeItem = localStorage.getItem("favorite");
	storeItem = JSON.parse(storeItem);
	for (item in storeItem) {
		favorite.push(storeItem[item]);
	}
}

function DisplayData(businessData) {
	console.log("here");
	let { businessLocation, name, address, rating, url } = buisnessData;
	results.html("");

	console.log(
		"coordinates",
		businessLocation,
		"name",
		name,
		"address",
		address,
		"rating",
		rating,
		"url",
		url
	);
	// use data from yelp to create map
	initMap(businessLocation.latitude, businessLocation.longitude);

	// set url and rating to data from yelp
	// var url, rating;
	// url = data.url;
	// rating = data.rating;

	var resultTileEl = document.createElement("article");
	resultTileEl.className = "box result-spot pb-2";

	// create element and append data from yelp to it
	var nameEl = document.createElement("a");
	nameEl.href = url;
	nameEl.target = "_blank";
	// nameEl.textContent = data.name;
	nameEl.className = "subtitle block";

	// create element to house address info
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

	// create element to house categories
	var categoryStr = "";
	var categoryEl = document.createElement("p");
	for (x in data.categories) {
		categoryStr += data.categories[x].title + "/";
	}
	categoryEl.textContent = "Category: " + categoryStr.slice(0, -1);
	categoryEl.className = "content";

	// create element to house price of resto
	var moneyEl = document.createElement("p");
	moneyEl.className = "content";
	if (data.price === null || data.price === "" || data.price === undefined) {
		moneyEl.textContent = "Price: Not Available";
	} else {
		moneyEl.textContent = "Price: " + data.price;
	}

	// add in a favorite button
	var favoriteButtonEl = document.createElement("button");
	favoriteButtonEl.id = "favorite";
	favoriteButtonEl.className = "button is-warning is-outlined";
	favoriteButtonEl.innerHTML =
		"<spas class='far fa-star mr-2'></span>Save for later";

	// append the results of yelp search
	// then append above data to that container
	results.append(resultTileEl);
	resultTileEl.append(nameEl, addressEl, categoryEl, moneyEl, favoriteButtonEl);
}

// init a google map to put in the above function
function initMap(businessLocation) {
	var options = {
		center: businessLocation,
		zoom: 18,
	};

	// create new Map instance
	map = new google.maps.Map(document.getElementById("map"), options);

	// not sure what this does, but I think it's some sort of jquery
	$("#map").addClass("box");

	// put a marker on the map
	const marker = new google.maps.Marker({
		position: businessLocation,
		map: map,
	});
}

function saveFavorite() {
	favorite.push(tempObj);
	console.log(favorite);
	saveLocalstorage();
}

getStorage();
$("#search").on("click", yelpAPI);
$(document).on("click", "#favorite", saveFavorite);
