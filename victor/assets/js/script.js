

var inputEl = document.getElementById("submit-button");
var searchEl = document.getElementById("search");//probably don't need this for my funciton to work
//Variables that are part of Victor'script
var drinkPicEl = document.getElementById("drinkImg");
var drinkNameEl = document.getElementById("drinkName");
var drinkGlassEl = document.getElementById("drinkGlass");
var drinkInsEl = document.getElementById("drinkIns");
var differentDrinkEl = document.getElementById("drink-button");

//End of variables that are part of Victor's script

//start of Victor's script
var drinkHandler = function(event) {

    //   document.getElementById("cocktail").className = "row show";
     
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        response.json().then(function(data) {

            var drinkIngredientEl = document.getElementById("drinkIngredients");
            // clears html so that ghost images do not appear
            drinkNameEl.innerHTML = "";
            drinkIngredientEl.innerHTML="";
            drinkGlassEl.innerHTML = "";
            drinkPicEl.setAttribute("src","");
            drinkInsEl.innerHTML = "";
            var drinkType = data.drinks[0].strAlcoholic;

            // this checks to make sure the drink is alcoholic
            if (drinkType == "Non alcoholic" || drinkType == "Optional alcohol") {
                drinkHandler(event);
             };

            // information from the API is being added to the index.html 
            var drinkName = data.drinks[0].strDrink;
            drinkNameEl.innerHTML = drinkName;
            var drinkImg = data.drinks[0].strDrinkThumb;
            drinkPicEl.setAttribute("src",drinkImg);
            var drinkGlass = data.drinks[0].strGlass;
            drinkGlassEl.innerHTML = "Served in a: " + drinkGlass;
            var drinkInstructions = data.drinks[0].strInstructions;
            drinkInsEl.innerHTML = drinkInstructions;

            // object bracket notation
            // While statement is used to read indredients and end when it hits a null value
            var i=1;
             while (data.drinks[0]["strIngredient"+i]) {
                    var drinkMeasure = data.drinks[0]["strMeasure"+i];
                    if (data.drinks[0]["strMeasure"+i] == null ) {
                        drinkItem = data.drinks[0]["strIngredient"+i];
                    } else {
                        drinkItem = data.drinks[0]["strMeasure"+i] + " - " + data.drinks[0]["strIngredient"+i];
                    }
                    var drinkItemEl = document.createElement("p");
                    drinkItemEl.innerHTML = drinkItem;
                    drinkIngredientEl.appendChild(drinkItemEl);
                    i++;
                };
        })
    })
};
//end of Victor's script
inputEl.addEventListener("click", drinkHandler);//this initiates the drink function
differentDrinkEl.addEventListener("click", drinkHandler);//this initiates the drink function without resetting the page

