var appendFavorites = document.getElementById("favorites");

function getData() {
    var pastSearch = localStorage.getItem("favorite");
    pastSearch = JSON.parse(pastSearch);

    for (i in pastSearch) {
        favorites(pastSearch[i]);
    }
}

getData();

function favorites(search) {
    var parentDiv = document.createElement("div");
    parentDiv.classList = "tile is-parent is-3 fav-spot";
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
    button.classList = "button is-danger is-inverted";
    button.innerHTML =
        "<span class='fas fa-trash-alt mr-2'></span>Remove from favorites";
    article.appendChild(button);
}