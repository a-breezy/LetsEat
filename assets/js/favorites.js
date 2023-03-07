var favoriteArr = [];
var appendFavorites = document.getElementById("favorites");

// Get Data from Local storage
function getData() {
    // Get Item from local storage
    var pastSearch = localStorage.getItem("favorite");
    // Json parse the data
    pastSearch = JSON.parse(pastSearch);
    // Pass each data in the array into the for loop
    for (i in pastSearch) {
        // Push it back to the global array
        favoriteArr.push(pastSearch[i]);
        // Call the favorites function to generate Cards
        favorites(pastSearch[i], i);
    }
}

// Add all items store in local storage to favorites.html
function favorites(search, index) {
    var parentDiv = document.createElement("div");
    parentDiv.classList = "tile is-parent is-3 fav-spot m-3";
    appendFavorites.appendChild(parentDiv);

    var article = document.createElement("article");
    article.classList = "tile is-child box";
    parentDiv.appendChild(article);

    var heading = document.createElement("h3");
    heading.classList = "subtitle";
    heading.textContent = search.name;
    article.appendChild(heading);

    var paragraph = document.createElement("p");
    paragraph.classList = "content";
    paragraph.innerHTML =
        search.address[0] +
        "<br/>" +
        search.address[1];
    article.appendChild(paragraph);

    var button = document.createElement("button");
    button.setAttribute("data-index", index);
    button.classList = "button is-danger is-inverted";
    button.innerHTML =
        "<span class='fas fa-trash-alt mr-2'></span>Remove from favorites";
    article.appendChild(button);
}

getData();
// Remove Button Function
$(document).on("click", ".button", function() {
    // select index of button clicked
    var index = $(this).attr("data-index");
    console.log(index);
    // deleted it from the global array favoriteArr
    favoriteArr.splice(index, 1);
    console.log(favoriteArr);
    // save it back to local storage the favoriteArr
    localStorage.setItem("favorite", JSON.stringify(favoriteArr));
    // Reload the page
    location.reload();
})