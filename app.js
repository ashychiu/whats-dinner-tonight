const searchbar = document.getElementById("searchform");
const sticky = searchbar.offsetTop;

window.onscroll = () => {
  if (window.pageYOffset >= sticky + 600) {
    searchbar.classList.add("sticky");
  } else {
    searchbar.classList.remove("sticky");
  }
};

const RECIPE_API_URL = "https://api.edamam.com/api/recipes/v2";
const RECIPE_API_ID = "3f0cd962";
const RECIPE_API_KEY = "ece4a6f9c51a3f87d1225fd520a22345";

const recipeContainer = document.querySelector(".recipe__container");

const form = document.getElementById("searchform");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const recipesByIngr = axios
    .get(
      `https://api.edamam.com/api/recipes/v2?type=public&q=${event.target.searchbar.value}&app_id=${RECIPE_API_ID}&app_key=${RECIPE_API_KEY}&random=true`
    )
    .then((response) => {
      console.log(response.data);
      if (response.data.hits.length === 0) {
        recipeContainer.innerHTML = "";
        recipeNotFound();
      } else if (response.data.hits) {
        recipeContainer.innerHTML = "";

        const sectionTitle = document.createElement("h2");
        sectionTitle.classList.add("recipe__section-title");
        sectionTitle.setAttribute("id", "recipe-results");
        sectionTitle.innerText = "Curated For You";
        recipeContainer.appendChild(sectionTitle);

        const searchTerms = document.createElement("p");
        searchTerms.classList.add("recipe__searchterms");
        searchTerms.innerText = `Showing recipes with "${event.target.searchbar.value}"`;
        recipeContainer.appendChild(searchTerms);

        const recipeList = document.createElement("div");
        recipeList.classList.add("recipe__list");
        recipeContainer.appendChild(recipeList);

        displayRecipes(response.data.hits);
        document.querySelector(".recipe__container").scrollIntoView({
          behavior: "smooth",
        });
      }
      // event.target.reset();
    });
});

function recipeNotFound() {
  const recipeList = document.createElement("div");
  recipeList.classList.add("recipe__list");
  recipeContainer.appendChild(recipeList);
  const recipeNotFound = document.createElement("h2");
  recipeNotFound.classList.add("recipe__not-found");
  recipeNotFound.innerText = "Oops! There is no match. Please try again.";
  recipeList.appendChild(recipeNotFound);
}

function displayRecipes(responseData) {
  responseData.forEach((recipe) => {
    let recipeList = document.querySelector(".recipe__list");
    const recipeCard = document.createElement("article");
    recipeCard.classList.add("recipe__card");
    recipeList.appendChild(recipeCard);

    const recipeLink = document.createElement("a");
    recipeLink.href = recipe.recipe.url;
    recipeLink.target = "_blank";
    recipeCard.appendChild(recipeLink);

    const recipeImage = document.createElement("img");
    recipeImage.classList.add("recipe__image");
    recipeImage.src = recipe.recipe.image;
    recipeImage.alt = recipe.recipe.label;
    recipeLink.appendChild(recipeImage);

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("recipe__card-container");
    recipeLink.appendChild(cardContainer);

    const recipeTitle = document.createElement("h4");
    recipeTitle.classList.add("recipe__title");
    recipeTitle.innerText = recipe.recipe.label;
    cardContainer.appendChild(recipeTitle);
  });
}
