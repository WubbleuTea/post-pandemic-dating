var cityFormEl = document.getElementById("city-form")
var textInputEl = document.getElementById("text-input");
var stateSelectEl = document.getElementById("state-select");
var submitButtonEl = document.getElementById("submit-button");
var deleteButtonEl = document.getElementById("delete-button");
var pastCitiesEl = document.getElementById("past-cities")
var eventRowEl = document.getElementById("event-row");
var holidayInfoEl = document.getElementById("holiday-info");
var tylerEl = document.getElementById("tyler");
var weatherRowEl = document.getElementById("weather-row")
var formErrorsEl = document.getElementById("form-errors")
var currentCityEl = document.getElementById("current-city")
var mainPageEl = document.getElementById("main-page")
var drinkImageEl = document.getElementById("drink-image");
var drinkNameEl = document.getElementById("drinkName");
var drinkGlassEl = document.getElementById("drink-glass");
var drinkInstructionsEl = document.getElementById("drink-instructions");
var differentDrinkEl = document.getElementById("drink-button");
var inputCity = "";
var inputState = "";
var submitArr =[];
var checkStorage = JSON.parse(localStorage.getItem("searched"))

// create button for city,state
var createCity = function(){
    formErrorsEl.innerHTML = ""
    var buttonName = inputCity.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + "," + inputState
    var cityButton = document.createElement("button");
        cityButton.className = "btn blue-grey";
        cityButton.textContent = buttonName;
    pastCitiesEl.appendChild(cityButton);
    weatherRowEl.innerHTML = "";

    cityButton.addEventListener("click", function(event){
        event.preventDefault();
        formErrorsEl.innerHTML = ""
        weatherRowEl.innerHTML = "";
        placeArr = event.target.textContent.split(",")
        inputCity = placeArr[0]
        inputState = placeArr[1]
        getWeather(false);
        
        showRestaurants(inputCity, inputState);
    })
}
// get weather for city
var getWeather = function(weather){
    fetch("https://api.weatherapi.com/v1/forecast.json?key=898f900d29334755948192951200207&days=3&hour=19&q=" + inputCity + "," + inputState).then(function(response){
        if (response.ok) {
            formErrorsEl.innerHTML = ""
            var cityState =  inputCity + "," + inputState

            response.json().then(function(data) {
            // if it is a new item push into arrays and local storage and create button
            if (weather==true && !submitArr.includes(cityState) && data.location.country == "United States of America"){
                submitArr.push(cityState);
                localStorage.setItem("searched", JSON.stringify(submitArr))
                createCity();
            } 
            //if button is already made this will run following
        
            //if the city and state combination is not useable
            if (data.location.country != "United States of America") {
             // alert("You missed a perameter try again")
                var elem = document.getElementById("modal2")
                console.log(elem)
                document.getElementById("alertText").textContent = "This is not a city in the United States of America. Please try again."
                var instance = M.Modal.getInstance(elem);
                instance.open()
                formEl.reset();
                // add onclick to close and clean the alertext element
                var close = document.querySelector("#closeModal")
                close.addEventListener("click", function () {
                    instance.close();
                    document.getElementById("alertText").textContent = " ";
                })
                inputCity = ""
                inputState = ""

                cityFormEl.reset();
                return
            }
            currentCityEl.innerHTML = "";
            var currentCityTitle = document.createElement("div")
                currentCityTitle.className = ""
                currentCityTitle.innerHTML = "<h2 class='col s12 card-panel pink lighten-4 center-align city-name'>" + inputCity.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + "," + inputState; + "</h2>"
                currentCityEl.appendChild(currentCityTitle);
           document.getElementById("weather").className = "row show"; 
            //else run the weather forcast
            for (var i=0; i< 3; i++) {
                var getForecast = data.forecast.forecastday[i]
              
                var forecastDate = moment(getForecast.date).format("MM/DD/YYYY")
                var weatherForecast = document.createElement("div")

                    weatherForecast.className = "col s12 m4";
                    weatherForecast.innerHTML =  "<div class='card blue-grey darken-1 z-depth-5'>"+
                        "<div class='card-content white-text'>" +
                        "<span class='card-title'>"+ forecastDate + "</span>" + "<div><img src='https://cdn.weatherapi.com/weather/64x64/day/" + getForecast.day.condition.icon.slice(-7) + "'/></div>" +
                        "<p>High: "+ getForecast.day.maxtemp_f + "°F</p>"  +
                        "<p>Low: " + getForecast.day.mintemp_f + "°F</p>" + 
                        "<p>Rain: " + getForecast.day.daily_chance_of_rain + "%</p>" +
                    "</div>" +
                    "</div>"
                weatherRowEl.appendChild(weatherForecast)
                console.log(data)
                console.log(data.forecast.forecastday[0].day.avgtemp_f)
                
            }
            })  

        // if recieved a error     
        } else {
            var errorOne = document.createElement("div")
                errorOne.className = "col12 red accent-4"
                errorOne.textContent = "Something did not work. Try again."
            formErrorsEl.appendChild(errorOne);
            inputCity = ""
            inputState = ""
            cityFormEl.reset();
            return
        }
    })
    showEvent();
    drinkHandler();
}

//list of event by city     

function showEvent() {
    //clear the information
    eventRowEl.innerHTML = "";
    //key for the api
    var apikey = "4rwvR5WRLvh2Sb5c";

    // call for show events card
    document.getElementById("events").className = "row show";

    //call the API request
    
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&location=${inputCity},${inputState}&date=Today`)
        .then(function (response) {
            return response.json();
        })
        
        .then(function(data) {
            console.log(data)

            for (var i = 0; i < 3; i++) {

                //create element for event Info
                var eventCity = document.createElement("div")

                //create variable for show the event date
                var dateStarClose;

                //create variable for show  the event address             
                var eventaddress;

                //conditional for the event don't have date for close event
                if (data.events.event[i].stop_time === null || data.events.event[i].stop_time === " ") {
                    dateStarClose = "Start date of the event:" + " " + moment(data.events.event[i].start_time.split(" ")[0]).format("MM/DD/YYYY");
                }
                else {
                    dateStarClose = "Start:" + " " + moment(data.events.event[i].start_time.split(" ")[0]).format("MM/DD/YYYY") + " " +
                        "End:" + " " + moment(data.events.event[i].stop_time.split(" ")[0]).format("MM/DD/YYYY");
                }

                //condicional for the event address is emty
                if (data.events.event[i].venue_address === null || data.events.event[i].venue_address === " ") {

                    eventaddress = "Address: Dear user more specifications on the site 😏";
                }
                else {
                    eventaddress = "Address: " + data.events.event[i].venue_address + ".";
                }

                eventCity.innerHTML = `<div class='col s12 m4'><div class='card blue-grey darken-1 z-depth-5'><div class='card-content white-text'>
                <span class='card-title truncate'>${data.events.event[i].title}</span><p>${dateStarClose}</p>
                <p class='truncate'>${eventaddress}</p></div><div class='card-action'><a href ='${data.events.event[i].url}' target= _blank > Click here for more information. </a>
                <div></div></div></div></div>`

                //all info append on page
                eventRowEl.appendChild(eventCity)

            }
           
        })
}

var drinkHandler = function(event) {

      document.getElementById("cocktail").className = "row show";
     
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        response.json().then(function(data) {

            var drinkIngredientEl = document.getElementById("drink-ingredients");
            // clears html so that ghost images do not appear
            drinkNameEl.innerHTML = "";
            drinkIngredientEl.innerHTML="";
            drinkGlassEl.innerHTML = "";
            drinkImageEl.setAttribute("src","");
            drinkInstructionsEl.innerHTML = "";
            var drinkType = data.drinks[0].strAlcoholic;

            // this checks to make sure the drink is alcoholic
            if (drinkType == "Non alcoholic" || drinkType == "Optional alcohol") {
                drinkHandler(event);
             };

            // information from the API is being added to the index.html 
            var drinkName = data.drinks[0].strDrink;
            drinkNameEl.innerHTML = drinkName;
            var drinkImg = data.drinks[0].strDrinkThumb;
            drinkImageEl.setAttribute("src",drinkImg);
            var drinkGlass = data.drinks[0].strGlass;
            drinkGlassEl.innerHTML = "Served in a: " + drinkGlass;
            var drinkInstructions = data.drinks[0].strInstructions;
            drinkInstructionsEl.innerHTML = drinkInstructions;

            // object bracket notation
            // While statement is used to read indgredients and end when it hits a null value
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

// submit button
submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    // checks to see if any content field is empty
    if (stateSelectEl.value == 0 && textInputEl.value == "") {
        // alert("You missed a perameter try again")
        var elem = document.getElementById("modal2")
        console.log(elem)
        document.getElementById("alertText").textContent = "Please add a city and state"
        var instance = M.Modal.getInstance(elem);
        instance.open()
         formEl.reset();
        // add onclick to close and clean the alertext element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        })
    } else if (textInputEl.value == "") {
        // alert("You missed a perameter try again")
        var elem = document.getElementById("modal2")
        console.log(elem)
        document.getElementById("alertText").textContent = "Please add a city"
        var instance = M.Modal.getInstance(elem);
        instance.open()
         formEl.reset();
        // add onclick to close and clean the alertext element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        })
    } else if (stateSelectEl.value == 0) {
        // alert("You missed a perameter try again")
        var elem = document.getElementById("modal2")
        console.log(elem)
        document.getElementById("alertText").textContent = "Please add a state"
        var instance = M.Modal.getInstance(elem);
        instance.open()
         formEl.reset();
        // add onclick to close and clean the alertext element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        })
    };
    inputCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
    inputState = stateSelectEl.value
    cityFormEl.reset();
    getWeather(true);

    showRestaurants(inputCity, inputState);

});

function showRestaurants(inputCity, inputState) {
    var user_key = '35903b8c609f2fd648fb40bba04deb15';
    var restaurant;
    var city_id;
    
    //Show restaurants div
    $('#food').attr('class', 'row show');

    //Get city ID from Zomato API
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/cities?q=' + inputCity,
        headers: { 'user-key': user_key }
    })
    .done(function(data) {
        for (let location of data.location_suggestions) {
            if (location.state_code == inputState) {
                city_id = location.id;
                return;
            }
        }
        console.log(data)
        city_id = data.location_suggestions[0].id;
    })
    .done(function() {

        //Get random restaurant from search results of this city
        $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city_id + '&entity_type=city',
            headers: { 'user-key': user_key }
        })
        .done(function(data) {

            let index1 = Math.floor(Math.random() * data.results_shown);
            let index2 = Math.floor(Math.random() * data.results_shown);
            while (index2 == index1) {
                index2 = Math.floor(Math.random() * data.results_shown);
            }
            let index3 = Math.floor(Math.random() * data.results_shown);
            while (index3 == index1 || index3 == index2) {
                index3 = Math.floor(Math.random() * data.results_shown);
            }

            let restaurants = [data.restaurants[index1].restaurant, data.restaurants[index2].restaurant, data.restaurants[index3].restaurant];

            console.log(restaurants[0]);

            let restaurantTitleElements = $('.restaurant-title');
            let restaurantDescElements = $('.restaurant-desc');
            let restaurantLinkElements = $('.restaurant-link');

            for (let i = 0; i < restaurants.length; i++) {
                $('.restaurant-title').eq(i).text(restaurants[i].name);
                $('.restaurant-desc').eq(i).text("Cuisines: " + restaurants[i].cuisines + "\nRating: " + restaurants[i].user_rating.aggregate_rating + " out of 5");
                $('.restaurant-link').eq(i).attr('href', restaurants[i].url);
            }


        });

    });
}

//activates modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
});


//deletes buttons created and local storage
deleteButtonEl.addEventListener("click", function(){
    submitArr = [];
    localStorage.setItem("searched", "[]")
    inputCity = ""
    inputState = ""
    pastCitiesEl.innerHTML = "";
    cityFormEl.reset();
    resetPage();
})

var resetPage = function(){
    document.getElementById("form-errors").className = "row hide"; 
    currentCityEl.innerHTML = ""; 
    document.getElementById("weather").className = "row hide"; 
    document.getElementById("holiday").className = "row hide"; 
    document.getElementById("events").className = "row hide"; 
    document.getElementById("food").className = "row hide"; 
    document.getElementById("cocktail").className = "row hide"; 
}

differentDrinkEl.addEventListener("click", function(){
    drinkHandler();
});

// gets local storage data and creates buttons for those items
var oldSearchHistory = function() {
    if (!checkStorage) {
        return; 
    } else {
        localStorage.clear();
        for (var i =0; i < checkStorage.length; i++) {
            submitArr.push(checkStorage[i])
            inputCity = checkStorage[i].split(",")[0]
            inputState = checkStorage[i].split(",")[1];
            createCity();
        }  
        localStorage.setItem("searched", JSON.stringify(submitArr))
    }   
}
oldSearchHistory();