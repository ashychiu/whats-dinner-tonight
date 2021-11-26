const RECIPE_API_URL = "https://api.spoonacular.com/recipes/findByIngredients";
const RECIPE_API_KEY = "29b6685456e446c5a96ec3af10753892";
let ingredients = "chicken";
let numOfRecipes = "10";

// https://api.spoonacular.com/recipes/findByIngredients?apiKey=29b6685456e446c5a96ec3af10753892&ingredients=eggs&number=2

const recipesByIngr = axios
  .get(
    `${RECIPE_API_URL}?apiKey=${RECIPE_API_KEY}&ingredients=${ingredients}&number=${numOfRecipes}`
  )
  .then((response) => {
    console.log(response);
    const recipes = response.data;
    recipes.forEach((recipe) => {
      const recipeContainer = document.querySelector(".recipe___container");
      const recipeImage = document.createElement("img");
      recipeImage.classList.add("recipe-image");
      recipeImage.src = recipe.image;
      recipeImage.alt = recipe.title;
      recipeContainer.appendChild(recipeImage);

      const recipeTitle = document.createElement("h4");
      recipeTitle.innerText = recipe.title;
      recipeContainer.appendChild(recipeTitle);
    });
  });

/**
 * Makes an axios.get request to get a list of favourite articles from the favourites API.
 * Manipulates the DOM to display favourites, or a message to the user if no favourites are available.
 */
// const renderFavourites = () => {
//   axios
//     .get(`${RECIPE_API_URL}/favourites?api_key=${RECIPE_API_KEY}`)
//     .then((response) => {
//       const favourites = response.data;

//       // 10) If there are no favourites yet, add a message to this box letting the user know there are no favourites.
//       if (!favourites[0]) {
//         const noFavourites = document.createElement("strong");
//         noFavourites.innerText = "No favourites yet!";
//         favouritesContainer.appendChild(noFavourites);
//       } else {
//         favourites.forEach((favourite) => {
//           const articleLink = document.createElement("a");
//           articleLink.classList.add("fave-item");
//           articleLink.href = favourite.url;

//           const faveImage = document.createElement("img");
//           faveImage.classList.add("fave-image");
//           faveImage.src = favourite.image;
//           faveImage.alt = favourite.title;
//           articleLink.appendChild(faveImage);

//           const faveTitle = document.createElement("h4");
//           faveTitle.innerText = favourite.title;
//           articleLink.appendChild(faveTitle);

//           favouritesContainer.appendChild(articleLink);
//         });
//       }
//     })
//     .catch(console.log);
// };

// /**
//  * Makes an axios.get request to the News API to gather a list of top headlines for Canada.
//  * Manipulates the DOM to display the first 20 articles.
//  */
// // Make a request to get Canada's top headlines and output the success or failure response to the console.  How can we output the array of articles to the console from the response?
// const myNewsArticles = axios
//   .get(`${NEWS_API_URL}/top-headlines?country=ca&apiKey=${NEWS_API_KEY}`)
//   .then((response) => {
//     // 4) Use an array method to loop through the articles from the response data in exercise 2.
//     response.data.articles.forEach((article) => {
//       // 5) Populate .news-container__list div :
//       // with an article card containing the article titles
//       // like button for each article via DOM manipulation.
//       const articleElement = document.createElement("h3");
//       articleElement.classList.add("article");
//       articleElement.innerText = article.title;
//       newsContainer.appendChild(articleElement);

//       const likeButton = document.createElement("button");
//       likeButton.classList.add("like-button");
//       likeButton.innerText = "❤️";
//       articleElement.appendChild(likeButton);

//       // 6) Add an event listener to the like button
//       likeButton.addEventListener("click", () => {
//         console.log("Clicked! Yay!");
//         // that **posts** your liked article to the favourites API.
//         axios
//           .post(`${FAVE_API_URL}/favourites?api_key=${FAVE_API_KEY}`, {
//             title: article.title,
//             url: article.url,
//             image: article.urlToImage,
//           })
//           .then((response) => {
//             // After posting to the favourites API, render the .fave-container__list with :
//             // div with the article image
//             // link to each article via DOM manipulation.

//             // 9) Is the favourites list repeating itself each time you like an article? Clear the container before adding new favourited articles.
//             favouritesContainer.innerHTML = "";
//             // Another way without resetting the innerHTML? Take a look at the element.remove() method

//             renderFavourites();
//           })
//           .catch((error) => console.log(error));
//       });
//     });
//   })
//   .catch((error) => console.log(error));

// // 10) What happens when you refresh your page? Ensure any articles you already liked are loaded when the page loads.
// renderFavourites();

// // 3) Create a variable and store the previous get request. What value is given when you output the variable using console.log?
// console.log(myNewsArticles);
