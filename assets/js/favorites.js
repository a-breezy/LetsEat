var favoriteArr = [];
var appendFavorites = document.getElementById("favorites");

// Get Data from Local storage
function getData() {
    var pastSearch = localStorage.getItem("favorite");
    pastSearch = JSON.parse(pastSearch);

    for (i in pastSearch) {
        favoriteArr.push(pastSearch[i]);
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
        search.location.display_address[0] +
        "<br/>" +
        search.location.display_address[1];
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
    var index = $(this).attr("data-index");
    console.log(index);
    favoriteArr.splice(index, 1);
    console.log(favoriteArr);
    localStorage.setItem("favorite", JSON.stringify(favoriteArr));
    location.reload();
})