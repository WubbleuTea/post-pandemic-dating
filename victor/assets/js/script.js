

var inputEl = document.getElementById("submit-button");
var searchEl = document.getElementById("search");//probably don't need this for my funciton to work
//Variables that are part of Victor'script
var drinkPicEl = document.getElementById("drinkImg");
var drinkNameEl = document.getElementById("drinkName");
var drinkGlassEl = document.getElementById("drinkGlass");
var drinkInsEl = document.getElementById("drinkIns");
var differentDrinkEl = document.getElementById("drink-button");
var drinkIngredientEl = document.getElementById("drinkIngredients");
// var drinkIngredientEl = document.querySelectorAll(".drinkIngredients");
//End of variables that are part of Victor's script

//start of Victor's script
var drinkHandler = function(event) {
    event.preventDefault();               
    // var cityName = inputEl.value.trim();
    // console.log(cityName)

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        response.json().then(function(data) {
            console.log(data);
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
            drinkGlassEl.innerHTML = "The "+ drinkName + " is served in a " + drinkGlass+".";
            
            var drinkInstructions = data.drinks[0].strInstructions;
            // console.log(drinkInstructions);
            drinkInsEl.innerHTML = drinkInstructions;

            var i=1;
            
            // object bracket notation
             while (data.drinks[0]["strIngredient"+i]) {
                    console.log(data.drinks[0]["strMeasure"+i],data.drinks[0]["strIngredient"+i]);
                    var drinkItem = data.drinks[0]["strMeasure"+i] + " - " + data.drinks[0]["strIngredient"+i];
                   console.log("drink Item is" ,drinkItem);
                //    drinkIngredientEl.createElement("p")
                //    var drinkItemEl = document.createElement("p");
                //    var elementId = "id"[i];
                //    console.log(elementId);
                   
                //    drinkItemEl.setAttribute("id",i)
                //     drinkItemEl.innerHTML = drinkItem;
                   
                   // var addDrinkItem = function( id="drinkIngredients", data) {
                       
                    //     }
                        
                    //     
                    //     drinkItemEl.innerHTML = drinkItem;
                        
                    //     drinkIngredientEl.innerHTML = drinkItem;
                    
                    // addDrinkItem("drinkIngredients", drinkItem);
                    i++;
                    
             };

             
            
            


            



        })

    })
};
//end of Victor's script



inputEl.addEventListener("click", drinkHandler);//this initiates the drink
differentDrinkEl.addEventListener("click", drinkHandler);

