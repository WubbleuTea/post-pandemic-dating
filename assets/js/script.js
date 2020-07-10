var cityFormEl = document.getElementById("city-form")
var textInputEl = document.getElementById("text-input");
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
var submitArr = [];
var checkStorage = JSON.parse(localStorage.getItem("searched"))

// create button for city
var createCity = function () {
    var cityButton = document.createElement("button");
    cityButton.className = "btn blue-grey";
    cityButton.textContent = inputCity;
    pastCitiesEl.appendChild(cityButton);
    weatherRowEl.innerHTML = "";

    //add listener to run city on click
    cityButton.addEventListener("click", function (event) {
        event.preventDefault();
        weatherRowEl.innerHTML = "";
        inputCity = cityButton.textContent;
        getWeather(false);
    })
}

// get weather for city
var getWeather = function (weather) {
    fetch("https://api.weatherapi.com/v1/forecast.json?key=898f900d29334755948192951200207&days=3&hour=19&q=" + inputCity).then(function (response) {
        if (response.ok) {

            response.json().then(function (data) {
                // if it is a new item push into arrays and local storage and create button
                if (weather == true && !submitArr.includes(inputCity) && data.location.country == "United States of America") {
                    submitArr.push(inputCity);
                    localStorage.setItem("searched", JSON.stringify(submitArr));
                    createCity();
                };
                //if button is already made this will run following

                //if the city is not useable
                if (data.location.country != "United States of America") {
                    // Error for city not in the United States of America
                    var elem = document.getElementById("modal2");
                    document.getElementById("alertText").textContent = "This is not a city in the United States of America. Please try again.";
                    var instance = M.Modal.getInstance(elem);
                    instance.open();
                    cityFormEl.reset();

                    // add onclick to close and clean the alert text element
                    var close = document.querySelector("#closeModal")
                    close.addEventListener("click", function () {
                        instance.close();
                        document.getElementById("alertText").textContent = " ";
                    });
                    inputCity = "";
                    cityFormEl.reset();
                    return
                };
                weatherRowEl.innerHTML = ""
                currentCityEl.innerHTML = "";
                var currentCityTitle = document.createElement("div");
                currentCityTitle.className = "";
                currentCityTitle.innerHTML = "<h2 class='col s12 card-panel card N/A transparent center-align city-name'>" + inputCity + "</h2>";
                currentCityEl.appendChild(currentCityTitle);
                document.getElementById("weather").className = "row show";

                //else run the weather forcast
                for (var i = 0; i < 3; i++) {
                    var getForecast = data.forecast.forecastday[i];

                    var forecastDate = moment(getForecast.date).format("MM/DD/YYYY");
                    var weatherForecast = document.createElement("div");

                    weatherForecast.className = "col s12 m4";
                    weatherForecast.innerHTML = "<div class='card N/A transparent z-depth-5'>" +
                        "<div class='card-content black-text'>" +
                        "<span class='card-title'>" + forecastDate + "</span>" + "<div><img src='https://cdn.weatherapi.com/weather/64x64/day/" + getForecast.day.condition.icon.slice(-7) + "'/></div>" +
                        "<p class='black-text'>High: " + getForecast.day.maxtemp_f + "°F</p>" +
                        "<p class='black-text'>Low: " + getForecast.day.mintemp_f + "°F</p>" +
                        "<p class='black-text'>Rain: " + getForecast.day.daily_chance_of_rain + "%</p>" +
                        "</div>" +
                        "</div>";
                    weatherRowEl.appendChild(weatherForecast);
                }
                //run all other API
                showHoliday();
                showEvent();
                showRestaurants(inputCity);
                drinkHandler();
            });

            // if recieved a error for any other reason besides user input.   
        } else {
            var elem = document.getElementById("modal2");
            document.getElementById("alertText").textContent = "There was an error. Please try again.";
            var instance = M.Modal.getInstance(elem);
            instance.open();
            cityFormEl.reset();
            // add onclick to close and clean the alert text element
            var close = document.querySelector("#closeModal");
            close.addEventListener("click", function () {
                instance.close();
                document.getElementById("alertText").textContent = " ";
            });
            return
        };
    });
};
// sets the function for Holiday API
function showHoliday() {
    document.getElementById("holiday").className = "row show";

    //recieves and formats dates for presentation
    var holidayDay = moment().format("DD")
    var addingDay = holidayDay;
    var holidayMonth = moment().format("MM")
    var holidayYear = moment().format("YYYY")
    var todayDate = moment().format('MM/DD/YYYY')
    var tomorrowDate = moment().add(1, 'days').format('MM/DD/YYYY')
    var followingDate = moment().add(2, 'days').format('MM/DD/YYYY')
    // connects dates to HTML and styles them
    var blueHoliday0El = document.getElementById("blue-holiday0")
    blueHoliday0El.innerHTML = ""
    blueHoliday0El.className = "row show";
    blueHoliday0El.innerHTML += "<span class='card-title'>" + todayDate + "</span>";
    var blueHoliday1El = document.getElementById("blue-holiday1")
    blueHoliday1El.innerHTML = ""
    blueHoliday1El.className = "row show";
    blueHoliday1El.innerHTML += "<span class='card-title'>" + tomorrowDate + "</span>";
    var blueHoliday2El = document.getElementById("blue-holiday2")
    blueHoliday2El.innerHTML = ""
    blueHoliday2El.innerHTML += "<span class='card-title'>" + followingDate + "</span>";
    blueHoliday2El.className = "row show";

    //creates holidayText variable 
    // var holidayText = document.createElement('p')

    // Key for the API
    var apikey = "47cffd35c3b98761e7a671cc818f58812739481a";

    // calls the Request for API and fetches it
    for (let i = 0; i <= 2; i++) {
        fetch(`https://calendarific.com/api/v2/holidays?api_key=${apikey}&country=US&year=${holidayYear}&month=${holidayMonth}&day=${addingDay}`)
            .then(function (response) {
                response.json().then(function (holiday) {
                    //creates document for the holiday function to be able to append properly
                    var holidayText = document.createElement('p')
                    holidayText.classList="black-text";
                    holidayText.innerText += ""

                    //runs if statement to display if there is a holiday
                    if (holiday.response.holidays.length == 0) {
                        holidayText.innerHTML = 'There are no holidays today.';
                        //runs else if statement for if there is a single holiday
                    } else if (holiday.response.holidays.length == 1) {
                        holidayText.innerText += "The holiday for this day is " + holiday.response.holidays[0].name + ".";
                        //runs else if statement for if there is more than one holiday
                    } else if (holiday.response.holidays.length > 1) {
                        holidayText.innerText += "The holiday for this day is " + holiday.response.holidays[0].name + ' & there are other holidays.';
                        // runs an error statement if not working properly
                    } else {
                        var elem = document.getElementById("modal2");
                        document.getElementById("alertText").textContent = "There was an error with the finding holiday information.";
                        var instance = M.Modal.getInstance(elem);
                        instance.open();
                        cityFormEl.reset();
                        // add onclick to close and clean the alert text element
                        var close = document.querySelector("#closeModal");
                        close.addEventListener("click", function () {
                            instance.close();
                            document.getElementById("alertText").textContent = " ";
                        });
                        return
                    }
                    

                    // runs an if statement that appends the proper data to the proper date div
                    if (i === 0) {
                        blueHoliday0El.appendChild(holidayText);
                    } else if (i === 1) {
                        blueHoliday1El.appendChild(holidayText);
                    } else {
                        blueHoliday2El.appendChild(holidayText);
                    }
                });

            })
        // adds to the day variable so the next fetch can move to the next day.
        addingDay++
    }
};

//list of event by city     

function showEvent() {
    //clear the information currently in the card
    eventRowEl.innerHTML = "";
    //key for Eventful API
    var apikey = "G0BAiyLNapnnmpiC6motC5S9k6gFkYLl";
    // shows the big card hat contains all elements for Events
    document.getElementById("events").className = "row show";
    //call the API request
    var today = moment().format().slice(0,19)
    var twoDays =moment().add(2, 'days').format().slice(0,19)
    //https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=G0BAiyLNapnnmpiC6motC5S9k6gFkYLl&includeTBA=no&includeTBD=no&includeTest=no&includeFamily=no&localStartEndDateTime=${today},${twoDays}&city=${inputCity}
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=${apikey}&includeTBA=no&includeTBD=no&includeTest=no&includeFamily=no&localStartEndDateTime=${today},${twoDays}&city=${inputCity}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
           for (var i = 0; i < 3; i++) {
                //create element for event Info
                var eventCity = document.createElement("div");
                //create variable to show the event date
                var dateStartEnd;
                //create variable to show the event address             
                var eventAddress;
                //conditional if the event does not have an end date.
               /* if (data.events.event[i].stop_time === null || data.events.event[i].stop_time === " ") {
                    dateStartEnd = "Start date of the event is " + moment(data.events.event[i].start_time.split(" ")[0]).format("MM/DD/YYYY");
                }
                else {
                    dateStartEnd = "Start: " + moment(data.events.event[i].start_time.split(" ")[0]).format("MM/DD/YYYY") + "   " +
                        "End: " + moment(data.events.event[i].stop_time.split(" ")[0]).format("MM/DD/YYYY");
                }*/
                //condtional for the event if address is empty
               /* if (data.events.event[i].venue_address === null || data.events.event[i].venue_address === " ") {
                    eventAddress = "Address: Please check out the link below.";
                }
                else {
                    eventAddress = "Address: " + data.events.event[i].venue_address;
                }*/
                eventCity.innerHTML = `<div class='col s12 l4'><div class='card N/A transparent z-depth-5'>
                    <div class='card-content black-text'>
                <span class='card-title truncate'>${data._embedded.events[i].name}</span><p class='black-text'>Start date of the event is ${moment(data._embedded.events[i].dates.start.localDate).format("MM/DD/YYYY")}</p>
                <div class='card-image'><img id='drink-image' class='card-image' src='${data._embedded.events[i].images[0].url}' /></div> </div><div class='card-action'><a href ='${data._embedded.events[i]._embedded.attractions[0].url}' target= _blank > Click here for more information </a>
                <div></div></div></div></div>`

                //all info append on page
                eventRowEl.appendChild(eventCity)
          
            }
        
    
         })
 }

function showRestaurants(inputCity) {
    var user_key = '35903b8c609f2fd648fb40bba04deb15';
    var city_id;
    //Show restaurants div
    $('#food').attr('class', 'row show');

    //Get city ID from Zomato API
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/cities?q=' + inputCity,
        headers: { 'user-key': user_key }
    })
        .done(function (data) {
            city_id = data.location_suggestions[0].id;
        })
        .done(function () {

            //Get random restaurant from search results of this city
            $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + city_id + '&entity_type=city',
                headers: { 'user-key': user_key }
            })
                .done(function (data) {
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

                    for (let i = 0; i < restaurants.length; i++) {
                            $('.restaurant-title').eq(i).text(restaurants[i].name);
                            $('.restaurant-desc').eq(i).html("Cuisines: " + restaurants[i].cuisines + "<br>" + "Rating: " + restaurants[i].user_rating.aggregate_rating + " out of 5" + "<br>" + "Hours: " + restaurants[i].timings +"<br>" + "Address: " + restaurants[i].location.address + "<br>" + "Phone number(s):  " + restaurants[i].phone_numbers);                   
                            $('.restaurant-link').eq(i).attr('href', restaurants[i].url);
                    }
                });
        });
}

var drinkHandler = function (event) {
    //show card for cocktails
    document.getElementById("cocktail").className = "row show";

    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(function (response) {
        response.json().then(function (data) {

            var drinkIngredientEl = document.getElementById("drink-ingredients");
            // clears HTML so that past data does not appear
            drinkNameEl.innerHTML = "";
            drinkIngredientEl.innerHTML = "";
            drinkGlassEl.innerHTML = "";
            drinkImageEl.setAttribute("src", "");
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
            drinkImageEl.setAttribute("src", drinkImg);
            var drinkGlass = data.drinks[0].strGlass;
            drinkGlassEl.innerHTML = "Served in a: " + drinkGlass;
            var drinkInstructions = data.drinks[0].strInstructions;
            drinkInstructionsEl.innerHTML = drinkInstructions;

            // object bracket notation
            // While statement is used to read ingredients and end when it hits a null value
            var i = 1;
            while (data.drinks[0]["strIngredient" + i]) {
                var drinkMeasure = data.drinks[0]["strMeasure" + i];
                if (data.drinks[0]["strMeasure" + i] == null) {
                    drinkItem = data.drinks[0]["strIngredient" + i];
                } else {
                    drinkItem = data.drinks[0]["strMeasure" + i] + " - " + data.drinks[0]["strIngredient" + i];
                }
                var drinkItemEl = document.createElement("p");
                drinkItemEl.classList="black-text"
                drinkItemEl.innerHTML = drinkItem;
                drinkIngredientEl.appendChild(drinkItemEl);
                i++;
            };
        });
    });
};

// submit button
submitButtonEl.addEventListener("click", function (event) {
    event.preventDefault();
    // checks to see if content field is empty
    if (textInputEl.value == "") {
        // Error message for no city
        var elem = document.getElementById("modal2")
        document.getElementById("alertText").textContent = "Please add a city"
        var instance = M.Modal.getInstance(elem);
        instance.open()
        cityFormEl.reset();
        // add onclick to close and clean the alert text element
        var close = document.querySelector("#closeModal")
        close.addEventListener("click", function () {
            instance.close();
            document.getElementById("alertText").textContent = " ";
        });
        return
    };
    // if both inputs have items then run this
    inputCity = document.querySelector("input[name='city']").value.trim().replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    cityFormEl.reset();
    getWeather(true);

})

//activates modal
document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems, {});
});


//deletes buttons created and local storage
deleteButtonEl.addEventListener("click", function () {
    submitArr = [];
    localStorage.setItem("searched", "[]");
    inputCity = "";
    pastCitiesEl.innerHTML = "";
    cityFormEl.reset();
    resetPage();
})

var resetPage = function () {
    cityFormEl.reset();
    currentCityEl.innerHTML = "";
    document.getElementById("weather").className = "row hide";
    document.getElementById("holiday").className = "row hide";
    document.getElementById("events").className = "row hide";
    document.getElementById("food").className = "row hide";
    document.getElementById("cocktail").className = "row hide";
}

differentDrinkEl.addEventListener("click", function () {
    drinkHandler();
});

// gets localStorage data and creates buttons for those items
var oldSearchHistory = function () {
    if (!checkStorage) {
        return;
    } else {
        localStorage.clear();
        for (var i = 0; i < checkStorage.length; i++) {
            submitArr.push(checkStorage[i]);
            inputCity = checkStorage[i];
            // inputState = checkStorage[i].split(",")[1];
            createCity();
        }
        localStorage.setItem("searched", JSON.stringify(submitArr));
    }
}

oldSearchHistory();