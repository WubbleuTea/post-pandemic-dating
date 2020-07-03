var inputEl = document.getElementById("city");
var searchEl = document.getElementById("search");

//start of Victor's script
var citySubmitHandler = function(event) {
    event.preventDefault();
    var cityName = inputEl.value.trim();
    console.log(cityName)

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        response.json().then(function(data) {
            var drinkName = data.drinks[0].strDrink;
            var drinkImg = data.drinks[0].strDrinkThumb;
            var drinkGlass = data.drinks[0].strGlass;
            var drinkInstructions = data.drinks[0].strInstructions;
            var drinkIngredient = data.drinks[0].strIngredient1;

            console.log(drinkName);
            console.log(drinkImg);
            console.log(drinkGlass);
            console.log(drinkInstructions);
            console.log(drinkIngredient);

        })

    })
};
//end of Victor's script



searchEl.addEventListener("click", citySubmitHandler);

