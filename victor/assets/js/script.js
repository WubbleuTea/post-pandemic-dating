

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
    // event.preventDefault();               
    // var cityName = inputEl.value.trim();
    // console.log(cityName)
    //  document.getElementById("cocktail").className = "row show";
     
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            var drinkIngredientEl = document.getElementById("drinkIngredients");
            
            drinkIngredientEl.innerHTML="";
            var drinkType = data.drinks[0].strAlcoholic;
            console.log(drinkType);

            // this checks to make sure the drink is alcoholic
            if (drinkType == "Non alcoholic" || drinkType == "Optional alcohol") {
                drinkHandler(event);
             };
            // information form the API is being added to the index.html 
            var drinkName = data.drinks[0].strDrink;
            // console.log(drinkName);
            drinkNameEl.innerHTML = drinkName;
            
            var drinkImg = data.drinks[0].strDrinkThumb;
            // console.log(drinkImg);
            drinkPicEl.setAttribute("src",drinkImg);

            var drinkGlass = data.drinks[0].strGlass;
            // console.log(drinkGlass);
            drinkGlassEl.innerHTML = "Served in a: " + drinkGlass;
            
            var drinkInstructions = data.drinks[0].strInstructions;
            // console.log(drinkInstructions);
            drinkInsEl.innerHTML = drinkInstructions;

            var i=1;
            
            // object bracket notation
             while (data.drinks[0]["strIngredient"+i]) {
                    console.log(data.drinks[0]["strMeasure"+i],data.drinks[0]["strIngredient"+i]);
                    //var drinkItem = data.drinks[0]["strMeasure"+i] + " - " + data.drinks[0]["strIngredient"+i];
                    var drinkMeasure = data.drinks[0]["strMeasure"+i];
                    //var drinkItem01 = data.drinks[0]["strIngredient"+i];
                    console.log(drinkMeasure);
                    // var drinkItme = "";
                   // console.log("drink Item if there is no measurement" ,drinkItem01);
                    //add if statement to check for null indredient values
                    if (data.drinks[0]["strMeasure"+i] == null ) {
                        drinkItem = data.drinks[0]["strIngredient"+i];
                    } else {
                        drinkItem = data.drinks[0]["strMeasure"+i] + " - " + data.drinks[0]["strIngredient"+i];
                    }
                    
                    console.log("drink Item is" ,drinkItem);
                     
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

