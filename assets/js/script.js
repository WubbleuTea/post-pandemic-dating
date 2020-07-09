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
var currentCityEl = document.getElementById("current-city")
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
    var buttonName = inputCity + "," + inputState
    var cityButton = document.createElement("button");
        cityButton.className = "btn blue-grey";
        cityButton.textContent = buttonName;
    pastCitiesEl.appendChild(cityButton);
    weatherRowEl.innerHTML = "";

    //add listener to run city and state on click
    cityButton.addEventListener("click", function(event){
        event.preventDefault();
        weatherRowEl.innerHTML = "";
        placeArr = event.target.textContent.split(",");
        inputCity = placeArr[0];
        inputState = placeArr[1];
        getWeather(false);
    })
}

// get weather for city
var getWeather = function(weather){
    fetch("https://api.weatherapi.com/v1/forecast.json?key=898f900d29334755948192951200207&days=3&hour=19&q=" + inputCity + "," + inputState).then(function(response){
        if (response.ok) {
            var cityState =  inputCity + "," + inputState;

            response.json().then(function(data) {
            // if it is a new item push into arrays and local storage and create button
            if (weather==true && !submitArr.includes(cityState) && data.location.country == "United States of America"){
                submitArr.push(cityState);
                localStorage.setItem("searched", JSON.stringify(submitArr));
                createCity();
            }; 
            //if button is already made this will run following
        
            //if the city and state combination is not useable
            if (data.location.country != "United States of America") {
             // Error for city not in the United States of America
                var elem = document.getElementById("modal2");
                document.getElementById("alertText").textContent = "This is not a city in the United States of America. Please try again.";
                var instance = M.Modal.getInstance(elem);
                instance.open();
                formEl.reset();
                // add onclick to close and clean the alert text element
                var close = document.querySelector("#closeModal")
                close.addEventListener("click", function () {
                    instance.close();
                    document.getElementById("alertText").textContent = " ";
                });
                inputCity = "";
                inputState = "";

                cityFormEl.reset();
                return
            };
            currentCityEl.innerHTML = "";
            var currentCityTitle = document.createElement("div");
                currentCityTitle.className = "";
                currentCityTitle.innerHTML = "<h2 class='col s12 card-panel pink lighten-4 center-align city-name'>" + inputCity + "," + inputState; + "</h2>";
                currentCityEl.appendChild(currentCityTitle);
           document.getElementById("weather").className = "row show"; 

            //else run the weather forcast
            for (var i=0; i< 3; i++) {
                var getForecast = data.forecast.forecastday[i];
              
                var forecastDate = moment(getForecast.date).format("MM/DD/YYYY");
                var weatherForecast = document.createElement("div");

                    weatherForecast.className = "col s12 m4";
                    weatherForecast.innerHTML =  "<div class='card blue-grey darken-1 z-depth-5'>"+
                        "<div class='card-content white-text'>" +
                        "<span class='card-title'>"+ forecastDate + "</span>" + "<div><img src='https://cdn.weatherapi.com/weather/64x64/day/" + getForecast.day.condition.icon.slice(-7) + "'/></div>" +
                        "<p>High: "+ getForecast.day.maxtemp_f + "°F</p>"  +
                        "<p>Low: " + getForecast.day.mintemp_f + "°F</p>" + 
                        "<p>Rain: " + getForecast.day.daily_chance_of_rain + "%</p>" +
                    "</div>" +
                    "</div>";
                weatherRowEl.appendChild(weatherForecast);                
            }
        });  

        // if recieved a error for any other reason besides user input.   
        } else {
            var elem = document.getElementById("modal2");
                document.getElementById("alertText").textContent = "There was an error. Please try again.";
                var instance = M.Modal.getInstance(elem);
                instance.open();
                formEl.reset();
                // add onclick to close and clean the alert text element
                var close = document.querySelector("#closeModal");
                close.addEventListener("click", function () {
                    instance.close();
                    document.getElementById("alertText").textContent = " ";
                });
        };
    });
    //run all other API
    showEvent();
    drinkHandler();
};

//list of event by city     

function showEvent() {
    //clear the information currently in the card
    eventRowEl.innerHTML = "";
    //key for Eventful API
    var apikey = "4rwvR5WRLvh2Sb5c";
    // shows the big card hat contains all elements for Events
    document.getElementById("events").className = "row show";
    //call the API request
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&location=${inputCity},${inputState}&date=Today`)
        .then(function (response) {
            return response.json();
        })   
        .then(function(data) {
            for (var i = 0; i < 3; i++) {
                //create element for event Info
                var eventCity = document.createElement("div");
                //create variable to show the event date
                var dateStartEnd;
                //create variable to show the event address             
                var eventAddress;
                //conditional if the event does not have an end date.
                if (data.events.event[i].stop_time === null || data.events.event[i].stop_time === " ") {
                    dateStartEnd = "Start date of the event is " + moment(data.events.event[i].start_time.split(" ")[0]).format("MM/DD/YYYY");
                }
                else {
                    dateStartEnd = "Start: " + moment(data.events.event[i].start_time.split(" ")[0]).format("MM/DD/YYYY") + "   " +
                        "End: " + moment(data.events.event[i].stop_time.split(" ")[0]).format("MM/DD/YYYY");
                }
                //condtional for the event if address is empty
                if (data.events.event[i].venue_address === null || data.events.event[i].venue_address === " ") {
                    eventAddress = "Address: Please check out the link below.";
                }
                else {
                    eventAddress = "Address: " + data.events.event[i].venue_address;
                }
                eventCity.innerHTML = `<div class='col s12 m4'><div class='card blue-grey darken-1 z-depth-5'>
                    <div class='card-content white-text'>
                <span class='card-title truncate'>${data.events.event[i].title}</span><p>${dateStartEnd}</p>
                <p class='truncate'>${eventAddress}</p></div><div class='card-action'><a href ='${data.events.event[i].url}' target= _blank > Click here for more information. </a>
                <div></div></div></div></div>`

                //all info append on page
                eventRowEl.appendChild(eventCity)

            }
           
        })
}

var drinkHandler = function(event) {
    //show card for cocktails
      document.getElementById("cocktail").className = "row show";
     
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function(response) {
        response.json().then(function(data) {

            var drinkIngredientEl = document.getElementById("drink-ingredients");
            // clears HTML so that past data does not appear
            drinkNameEl.innerHTML = "";
            drinkIngredientEl.innerHTML="";
            drinkGlassEl.innerHTML = "";
            drinkImageEl.setAttribute("src","");
            drinkInstructionsEl.innerHTML = "";
            var drinkType = data.drinks[0].strAlcoholic;

            // this checks to make sure the drink is alcoholic and reruns the API to try again.
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
            // While statement is used to read ingredients and end when it hits a null value
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
        });
    });
};

// submit button
submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    // checks to see if any content field is empty
    if (stateSelectEl.value == 0 && textInputEl.value == "") {
        // Error message for no city or state
        var elem = document.getElementById("modal2")
        document.getElementById("alertText").textContent = "Please add a city and state"
        var instance = M.Modal.getInstance(elem);
        instance.open()
         formEl.reset();
        // add onclick to close and clean the alert text element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        })
    } else if (textInputEl.value == "") {
        // Eror message for no city entered
        var elem = document.getElementById("modal2")
        document.getElementById("alertText").textContent = "Please add a city"
        var instance = M.Modal.getInstance(elem);
        instance.open()
         formEl.reset();
        // add onclick to close and clean the alert text element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        })
    } else if (stateSelectEl.value == 0) {
        // Error message for no state entered
        var elem = document.getElementById("modal2")
        document.getElementById("alertText").textContent = "Please add a state"
        var instance = M.Modal.getInstance(elem);
        instance.open()
         formEl.reset();
        // add onclick to close and clean the alert text element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        });
    };
    // if both inputs have items then run this
    inputCity = document.querySelector("input[name='city']").value.trim().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    inputState = stateSelectEl.value;
    cityFormEl.reset();
    getWeather(true);

})

//activates modal
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
});


//deletes buttons created and local storage
deleteButtonEl.addEventListener("click", function(){
    submitArr = [];
    localStorage.setItem("searched", "[]");
    inputCity = "";
    inputState = "";
    pastCitiesEl.innerHTML = "";
    cityFormEl.reset();
    resetPage();
})

var resetPage = function(){
    cityFormEl.reset();
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

// gets localStorage data and creates buttons for those items
var oldSearchHistory = function() {
    if (!checkStorage) {
        return; 
    } else {
        localStorage.clear();
        for (var i =0; i < checkStorage.length; i++) {
            submitArr.push(checkStorage[i]);
            inputCity = checkStorage[i].split(",")[0];
            inputState = checkStorage[i].split(",")[1];
            createCity();
        }  
        localStorage.setItem("searched", JSON.stringify(submitArr));
    }   
}

oldSearchHistory();