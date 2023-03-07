var restaurantData = $("#restaurant-data");
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
				categories: randomBusiness.categories,
			};
			tempObj = businessData;
			DisplayData(businessData);
		})
		.catch((err) => console.error(err));
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

function DisplayData(businessData) {
	let { businessLocation, name, address, rating, price, url, categories } =
		businessData;
	restaurantData.html("");

	initMap(businessLocation);

	let restDataEl = document.createElement("article");
	restDataEl.className = "box result-spot pb-2";

	let nameEl = document.createElement("a");
	nameEl.href = url;
	nameEl.target = "_blank";
	nameEl.textContent = name;
	nameEl.className = "subtitle block";
	console.log(nameEl);

	// create element for address
	var addressEl = document.createElement("address");
	addressEl.innerHTML = address[0] + " </br>" + address[1];
	addressEl.className = "content pt-4";
	console.log(addressEl);

	// create element for categories
	var categoryStr = "";
	var categoryEl = document.createElement("p");
	categoryEl.className = "content";
	for (x in categories) {
		if (x < 2) {
			categoryStr += categories[x].title + " · ";
		} else {
			categoryStr += categories[x].title;
		}
	}
	categoryEl.textContent = "Category: " + categoryStr.slice(0, -1);

	// create element for price
	var priceEl = document.createElement("p");
	priceEl.className = "content";
	if (price === null || price === "" || price === undefined) {
		priceEl.textContent = "Price: Not Available";
	} else {
		priceEl.textContent = "Price: " + price;
	}

	// add in a favorite button
	var favoriteButtonEl = document.createElement("button");
	favoriteButtonEl.id = "favorite";
	favoriteButtonEl.className = "button is-warning is-outlined";
	favoriteButtonEl.innerHTML =
		"<spas class='far fa-star mr-2'></span>Save for later";

	// append the results of yelp search
	restaurantData.append(restDataEl);
	restDataEl.append(nameEl, addressEl, categoryEl, priceEl, favoriteButtonEl);
}

// init a google map to put in the above function
function initMap(businessLocation) {
	map = new google.maps.Map(document.getElementById("map"), {
		center: businessLocation,
		zoom: 18,
	});

	// append map instance to map id on page
	$("#map").addClass("box");

	// put a marker on the map
	const marker = new google.maps.Marker({
		position: businessLocation,
		map: map,
	});
}

// Save Button Function
function saveFavorite() {
	favorite.push(tempObj);
	// console.log(favorite);
	saveLocalstorage();
}

getStorage();
$("#search").on("click", yelpAPI);
$(document).on("click", "#favorite", saveFavorite);
