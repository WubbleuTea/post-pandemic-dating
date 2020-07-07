var cityFormEl = document.getElementById("city-form")
var textInputEl = document.getElementById("text-input");
var stateSelectEl = document.getElementById("state-select");
var submitButtonEl = document.getElementById("submit-button");
var deleteButtonEl = document.getElementById("delete-button");
var pastCitiesEl = document.getElementById("past-cities")
var victorEl = document.getElementById("victor");
var anniaEl = document.getElementById("annia");
var eventRowEl = document.getElementById("event-row");
var holidayInfoEl = document.getElementById("holiday-info");
var tylerEl = document.getElementById("tyler");
var joshuaEl = document.getElementById("joshua");
var weatherRowEl = document.getElementById("weather-row")
var formErrorsEl = document.getElementById("form-errors")
var currentCityEl = document.getElementById("current-city")
var mainPageEl = document.getElementById("main-page")
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
                var errorOne = document.createElement("div")
                errorOne.className = "card col 12 red accent-4"
                errorOne.innerHTML = "<h2>City is not in the USA, please try again</h2>"
            formErrorsEl.appendChild(errorOne);
                inputCity = ""
                inputState = ""

                cityFormEl.reset();
                return
            }
            currentCityEl.innerHTML = "";
            var currentCityTitle = document.createElement("div")
                currentCityTitle.className = ""
                currentCityTitle.innerHTML = "<h2 class='col s12 card-panel pink lighten-1 center-align city-name'>" + inputCity.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + "," + inputState; + "</h2>"
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
}

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

})

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
    currentCityEl.className = "row hide"; 
    document.getElementById("weather").className = "row hide"; 
    document.getElementById("holiday").className = "row hide"; 
    document.getElementById("events").className = "row hide"; 
    document.getElementById("food").className = "row hide"; 
    document.getElementById("cocktail").className = "row hide"; 
}

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