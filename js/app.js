// all var we need to use
    // Var for search form
        const searchForm = document.querySelector(".form-recepie");
        const searchMenu = document.querySelector(".form-menu");
        const searchProduct = document.querySelector(".form-product");
        const searchAll = document.querySelector(".form-all");

        const searchResultDiv = document.querySelector(".search-result");
        const searchMenuDiv = document.querySelector(".search__menu");
        const searchMealPlanDiv = document.querySelector(".search__meal--Planning");
        const searchProductDiv = document.querySelector(".search__Product");
        const container = document.querySelector(".container");
        let searchQuery = "";

    // Var for apiKey 
        const APP_key = "b6286b6343554db89ae9ae19844617d9";
        // api principale : b6286b6343554db89ae9ae19844617d9 ? 
        // api de secours : 13125e464c8f47ab9bea32a4fe1d1622  
        // api de secours 2 : 299e404860104f9c805f8d6cdc846cfd 
        // api de secours 3 : c52b2184f3fb4f2eb110466fd53e4cef 
        // api de secours 4 : 8b813b787f2d4e17a260ee1d23e108ab done
        // api de secours 5 : 89c5d1d7071445d7bca7fbc1038c2adc
        // api de secours 6 : 8bf194bc8d30453f92e027b8ea8cb07e

// all seach Form 

function AllSearchFroms() {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        searchQuery = e.target.querySelector("input").value
        fetchAPI()
        document.querySelector(".randomCards").style.display = "none"
        document.querySelector(".search__menu").style.display = "none"
        document.querySelector(".search__meal--Planning").style.display = "none"
        document.querySelector(".search__Product").style.display = "none"
    });
    
    searchMenu.addEventListener("submit", (e) => {
        e.preventDefault();
        searchQuery = e.target.querySelector("input").value
        Menu()
        document.querySelector(".randomCards").style.display = "none"
        document.querySelector(".search__meal--Planning").style.display = "none"
        document.querySelector(".search__Product").style.display = "none"
    });
    
    searchProduct.addEventListener("submit", (e) => {
        e.preventDefault();
        searchQuery = e.target.querySelector("input").value
        Product()
        document.querySelector(".randomCards").style.display = "none"
        document.querySelector(".search-result").style.display = "none"
        document.querySelector(".search__menu").style.display = "none"
        document.querySelector(".search__meal--Planning").style.display = "none"
        
        
    });
    
    searchAll.addEventListener("submit", (e) => {
        e.preventDefault();
        searchQuery = e.target.querySelector("input").value
        Allproducts()
        document.querySelector(".randomCards").style.display = "none"
        document.querySelector(".search-result").style.display = "none"
        document.querySelector(".search__menu").style.display = "none"
        document.querySelector(".search__meal--Planning").style.display = "none"
        document.querySelector(".search__Product").style.display = "none"
    });
    
}
AllSearchFroms()

// this function is called to generate recepie according to the search query 

async function fetchAPI() {
    
    const SearchURL = `https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${APP_key}`
    const response = await fetch(SearchURL)
    const data = await response.json()

    searchResultDiv.innerHTML = ""
    data.results.forEach((Searchrecipe) => {
        const recipeDiv = document.createElement("div")
        recipeDiv.classList.add("recipe")
        recipeDiv.innerHTML = `
        <div class="title">
                <img src="${Searchrecipe.image}" alt="${Searchrecipe.title}">
                <h3>${Searchrecipe.title}</h3>
            </div>
            <div class="recipe-info">
                
                <div class="descriptions">
                    
                </div>
                <span><input data-id="${Searchrecipe.id}" type="button" class="btn-readMore" value="ReadMore"></span>
            </div>
        `;
        searchResultDiv.appendChild(recipeDiv)
        Readmore()
    });
}

async function Menu() {
    const menuUrl = `https://api.spoonacular.com/food/menuItems/search?query=${searchQuery}&apiKey=${APP_key}`
    const response = await fetch(menuUrl)
    const data = await response.json()
    searchMenuDiv.innerHTML = ""
    data.menuItems.forEach((menu) => {

        const menuDiv = document.createElement("div")
        menuDiv.classList.add("menu")
        menuDiv.innerHTML = `
            <div class="Menu__title">
                <img src="${menu.image}" alt="${menu.title}">
                <h3>${menu.title}</h3>
            </div>
            <div class="menu__info">
                <div class="descriptions">
                    <p>${menu.restaurantChain}</p>
                </div>
            </div>
        `;
        searchMenuDiv.appendChild(menuDiv)
    });
}

function Mealplaning() {
    const Mealplaning = document.querySelector(".search__mealPlanning")
    Mealplaning.addEventListener("click", () => {
        const MealUrl = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${APP_key}`
        fetch(MealUrl)
        .then(response => response.json())
        .then(data => {
            searchMealPlanDiv.innerHTML = ""
            data.meals.forEach((meal) => {
                const mealDiv = document.createElement("div")
                mealDiv.classList.add("meal")
                mealDiv.innerHTML = `
                    <div class="Meal__Description">
                        <h3>${meal.title}</h3>
                        <p><a href="${meal.sourceUrl}">${meal.sourceUrl}</a></p>
                        <p>${meal.readyInMinutes} Min</p>
                    </div>
                `;
                searchMealPlanDiv.appendChild(mealDiv)
            });
        })
    })
}
Mealplaning()

function Product(){
    const ProductUrl = `https://api.spoonacular.com/food/products/search?query=${searchQuery}&apiKey=${APP_key}`
    fetch(ProductUrl)
    .then(response => response.json())
    .then(data => {
        searchProductDiv.innerHTML = ""
        data.products.forEach((product) => {
            console.log(product)
            const productDiv = document.createElement("div")
            productDiv.classList.add("product")
            productDiv.innerHTML = `
                <div class="Product__title">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                </div>
                <span><input data-id="${product.id}" type="button" class="btn-readMore" value="ReadMore"></span>
            `;
            searchProductDiv.appendChild(productDiv)
            ProductAllInfo()
        });
    })
}

function ProductAllInfo(){
    document.querySelectorAll(".btn-readMore").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const ProductAllInfo = `https://api.spoonacular.com/food/products/${+ e.target.dataset.id}?apiKey=${APP_key}`
            fetch(ProductAllInfo)
            .then(response => response.json())
            .then(data => {
                const readmoreCards = document.querySelector('.readmoreCards')
                    readmoreCards.innerHTML = "";
                    const recipeDiv = document.createElement("div");
                    readmoreCards.appendChild(recipeDiv);
                    recipeDiv.classList.add("global-recipe");
                    recipeDiv.innerHTML = `
                    <div class="close" id="close__btn"> x </div>
                    <div class="title__Readmore">
                        <img src="${data.image}" alt="${data.title}">
                        <h3>${data.title}</h3>
                    </div>

                    <div class="readMore__description">
                        <p>Cuisines type : ${data.cuisines}</p>
                        <p>Dish Type : ${data.dishTypes}</p>
                        <p>Health Score : ${data.healthScore}</p>
                        <p>Price Per Serving : ${data.pricePerServing} $</p>
                        <p>Spoonacular Score : ${data.spoonacularScore} %</p>
                        <p>Ready In Minutes : ${data.readyInMinutes} Min</p>
                        <p>Servings : ${data.servings}</p>
                        <p>Source Url : <a href="${data.sourceUrl}">${data.sourceUrl}</a></p>
                    </div>

                    <div class="readMore__Sumery">
                        <h3>Summary</h3>
                        <p>${data.summary}</p>
                    </div>

                    <div class="readMore__ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="readMore__instructions">
                        <h3>Instructions</h3>
                        <p>${data.instructions}</p>
                    </div>
                    <div class="readMore__Wine">
                        <h3>Wine Pairung</h3>
                        <p>${data.winePairing.pairedWines}</p>

                    </div>
                    `
                    readmoreCards.appendChild(recipeDiv);
                    
                    // function closeBtn(){
                    //     const closeBtn = document.querySelector("#close__btn")
                    //     closeBtn.addEventListener("click", () => {
                    //         document.querySelector(".info__content").style.display = "none";
                    //         document.querySelector(".info__content").classList.remove("info__content--translate"); 
                    //     })
                    // }
                    closeBtn()
                })

            // style display
            // if (document.querySelector(".info__content").style.display == "none") {
            //     document.querySelector(".info__content").style.display = "block";
            //     document.querySelector(".info__content").classList.add("info__content--translate");         

            // }else if (document.querySelector(".info__content").style.display == "block") {
            //     document.querySelector(".info__content").style.display = "block";
            //     document.querySelector(".info__content").classList.add("info__content--translate"); 

            // }else {
            //     document.querySelector(".info__content").style.display = "none";
            //     document.querySelector(".info__content").classList.remove("info__content--translate");  

            // }

        })
    })
}

// aisle: null
// badges: Array(12)
// 0: "msg_free"
// 1: "egg_free"
// 2: "peanut_free"
// 3: "vegetarian"
// 4: "no_artificial_flavors"
// 5: "sugar_free"
// 6: "nut_free"
// 7: "no_artificial_ingredients"
// 8: "vegan"
// 9: "dairy_free"
// 10: "gluten_free"
// 11: "soy_free"
// length: 12
// [[Prototype]]: Array(0)
// brand: "Mountain Dew"
// breadcrumbs: Array(3)
// 0: "pop"
// 1: "drink"
// 2: "menu item type"
// length: 3
// [[Prototype]]: Array(0)
// description: "&lt;li&gt;Cranberry Pomegranate&lt;/li&gt; &lt;li&gt;96 Fluid Ounce&lt;/li&gt;"
// generatedText: "Are you trying to decide on a soda? Here's some information to help you decide whether Mtn Dew Merry Mash-Up Soda Cranberry Pomegranate Flavor 16 Fl Oz 6 Count Bottle is the right product for you. This product has 14 ingredients (in our experience: the fewer ingredients, the better!) According to our research, this product contains no ingredients that you should avoid. This product is also cheap. It usually costs around 30 cents, depending on the store and your location."
// id: 554989
// image: "https://spoonacular.com/productImages/554989-312x231.jpeg"
// imageType: "jpeg"
// images: Array(3)
// 0: "https://spoonacular.com/productImages/554989-90x90.jpeg"
// 1: "https://spoonacular.com/productImages/554989-312x231.jpeg"
// 2: "https://spoonacular.com/productImages/554989-636x393.jpeg"
// length: 3
// [[Prototype]]: Array(0)
// importantBadges: Array(6)
// 0: "no_artificial_flavors"
// 1: "no_artificial_ingredients"
// 2: "gluten_free"
// 3: "nut_free"
// 4: "peanut_free"
// 5: "vegetarian"
// length: 6
// [[Prototype]]: Array(0)
// ingredientCount: 14
// ingredientList: "CARBONATED WATER, HIGH FRUCTOSE CORN SYRUP, CITRIC ACID, NATURAL FLAVOR, SODIUM BENZOATE (PRESERVES FRESHNESS), CAFFEINE, GUM ARABIC, SODIUM CITRATE, CALCIUM DISODIUM EDTA (TO PROTECT FLAVOR), RED 40, GLYCEROL ESTER OF ROSIN, SUCROSE ACETATE ISOBUTYRATE, BLUE 1"
// ingredients: Array(25)
// 0: {name: 'menu item type', safety_level: null, description: null}
// 1: {name: 'artificial food coloring', safety_level: 'controversial', description: null}
// 2: {name: 'water', safety_level: null, description: null}
// 3: {name: 'drink', safety_level: null, description: null}
// 4: {name: 'refined sweetener', safety_level: null, description: null}
// 5: {name: 'additive', safety_level: null, description: null}
// 6: {name: 'added sugar', safety_level: null, description: null}
// 7: {name: 'artificial ingredient', safety_level: null, description: null}
// 8: {name: 'sweetener', safety_level: null, description: null}
// 9: {name: 'corn syrup', safety_level: null, description: null}
// 10: {name: 'food color', safety_level: 'controversial', description: 'Color additives are tricky - both colors that we m…l and these substances are not necessarily safer!'}
// 11: {name: 'citric acid', safety_level: 'high', description: null}
// 12: {name: 'high fructose corn syrup', safety_level: 'controversial', description: null}
// 13: {name: 'glycerol ester of rosin', safety_level: null, description: null}
// 14: {name: 'calcium disodium edta', safety_level: null, description: null}
// 15: {name: 'blue 1', safety_level: 'controversial', description: null}
// 16: {name: 'sucrose acetate isobutyrate', safety_level: null, description: null}
// 17: {name: 'red 40', safety_level: 'controversial', description: null}
// 18: {name: 'sodium citrate', safety_level: null, description: null}
// 19: {name: 'caffeine', safety_level: null, description: null}
// 20: {name: 'preserves freshness', safety_level: null, description: null}
// 21: {name: 'natural flavor', safety_level: null, description: null}
// 22: {name: 'sodium benzoate', safety_level: null, description: null}
// 23: {name: 'carbonated water', safety_level: null, description: null}
// 24: {name: 'gum arabic', safety_level: null, description: null}
// length: 25
// [[Prototype]]: Array(0)
// likes: 0
// nutrition:
// caloricBreakdown: {percentProtein: 0, percentFat: 0, percentCarbs: 0}
// calories: null
// nutrients: [{…}]
// [[Prototype]]: Object
// price: 30
// servings:
// number: 1
// size: null
// unit: null
// [[Prototype]]: Object
// spoonacularScore: 0
// title: "Mtn Dew Merry Mash-Up Soda Cranberry Pomegranate Flavor 16 Fl Oz 6 Count Bottle"
// upc: "012000203169"

function Filter() {
    const btn = document.querySelectorAll(".filter_btn")
    btn.forEach((element) => {
        element.addEventListener("click", () => {
            document.querySelectorAll(".from").forEach((elementSwitch) => {
                elementSwitch.style.display = "none"
            });
            
            const value = element.value;
            document.querySelector(`.${value}`).style.display = "block"
            
            document.querySelector(".active").classList.remove("active")

            element.classList.add("active")
            
        })
    })
}

Filter()



// This function will be called when the page is loaded

loadRandomeRecepie()

async function loadRandomeRecepie() {
    const randomRecipe = `https://api.spoonacular.com/recipes/random?number=6&apiKey=${APP_key}`;
    const response = await fetch(randomRecipe);
    const data = await response.json();
    const randomCards = document.querySelector('.randomCards')
    
    data.recipes.forEach((recipe) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
            <div class="title">
                <img src="${recipe.image}" alt="${recipe.title}">
                <div class="title__left">
                    <h3>${recipe.title}</h3>
                    <p>${recipe.readyInMinutes} Min</p>
                </div>
            </div>
            <div class="recipe-info">
                <h3>Type : ${recipe.dishTypes[0]}</h3>
                <div class="descriptions">
                    <p>${recipe.healthScore}</p>
                    <p>${recipe.pricePerServing} $</p>
                    <p>${recipe.spoonacularScore} % </p>
                </div>
                <span><input data-id="${recipe.id}" type="button" class="btn-readMore" value="ReadMore"></span>
            </div>
        `
        randomCards.appendChild(recipeDiv);
    })
    Readmore()
}


// this function is called to have more information about the recepie

function Readmore() {
    document.querySelectorAll(".btn-readMore").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const MoreInfoUrl = `https://api.spoonacular.com/recipes/${+ e.target.dataset.id}/information?apiKey=${APP_key}`;
            const readmoreCards = document.querySelector('.readmoreCards')
            fetch(MoreInfoUrl)
                .then(response => response.json())
                .then(data => {
                    const readmoreCards = document.querySelector('.readmoreCards')
                    readmoreCards.innerHTML = "";
                    const recipeDiv = document.createElement("div");
                    readmoreCards.appendChild(recipeDiv);
                    recipeDiv.classList.add("global-recipe");
                    recipeDiv.innerHTML = `
                    <div class="close" id="close__btn"> x </div>
                    <div class="title__Readmore">
                        <img src="${data.image}" alt="${data.title}">
                        <h3>${data.title}</h3>
                    </div>

                    <div class="readMore__description">
                        <p>Cuisines type : ${data.cuisines}</p>
                        <p>Dish Type : ${data.dishTypes}</p>
                        <p>Health Score : ${data.healthScore}</p>
                        <p>Price Per Serving : ${data.pricePerServing} $</p>
                        <p>Spoonacular Score : ${data.spoonacularScore} %</p>
                        <p>Ready In Minutes : ${data.readyInMinutes} Min</p>
                        <p>Servings : ${data.servings}</p>
                        <p>Source Url : <a href="${data.sourceUrl}">${data.sourceUrl}</a></p>
                    </div>

                    <div class="readMore__Sumery">
                        <h3>Summary</h3>
                        <p>${data.summary}</p>
                    </div>

                    <div class="readMore__ingredients">
                        <h3>Ingredients</h3>
                        <ul>
                            ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="readMore__instructions">
                        <h3>Instructions</h3>
                        <p>${data.instructions}</p>
                    </div>
                    <div class="readMore__Wine">
                        <h3>Wine Pairung</h3>
                        <p>${data.winePairing.pairedWines}</p>

                    </div>
                    `
                    readmoreCards.appendChild(recipeDiv);
                    
                    function closeBtn(){
                        const closeBtn = document.querySelector("#close__btn")
                        closeBtn.addEventListener("click", () => {
                            document.querySelector(".info__content").style.display = "none";
                            document.querySelector(".info__content").classList.remove("info__content--translate"); 
                        })
                    }
                    closeBtn()
                })

            // style display
            if (document.querySelector(".info__content").style.display == "none") {
                document.querySelector(".info__content").style.display = "block";
                document.querySelector(".info__content").classList.add("info__content--translate");         

            }else if (document.querySelector(".info__content").style.display == "block") {
                document.querySelector(".info__content").style.display = "block";
                document.querySelector(".info__content").classList.add("info__content--translate"); 

            }else {
                document.querySelector(".info__content").style.display = "none";
                document.querySelector(".info__content").classList.remove("info__content--translate");  

            }
        })
    })
}




