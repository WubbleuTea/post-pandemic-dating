// this is the whole script the functions used are lines 113-191
var cityFormEl = document.getElementById("city-form")
var textInputEl = document.getElementById("text-input");
var stateSelectEl = document.getElementById("state-select");
var submitButtonEl = document.getElementById("submit-button");
var deleteButtonEl = document.getElementById("delete-button");
var pastCitiesEl = document.getElementById("past-cities")
var victorEl = document.getElementById("victor");
var anniaEl = document.getElementById("annia");
var holidayInfoEl = document.getElementById("holiday-info");
var tylerEl = document.getElementById("tyler");
var joshuaEl = document.getElementById("joshua");
var weatherRowEl = document.getElementById("weather-row")
var formErrorsEl = document.getElementById("form-errors")
var currentCityEl = document.getElementById("current-city")
var inputCity = "";
var inputState = "";
var searchedCity = [];
var searchedState = [];
var checkStorageCity = JSON.parse(localStorage.getItem("city"))
var checkStorageState = JSON.parse(localStorage.getItem("state"))

var createCity = function(){
    formErrorsEl.innerHTML = ""
    var buttonName = inputCity.replace(/(^\w|\s\w)/g, m => m.toUpperCase()) + "," + inputState
    var cityButton = document.createElement("button")
        cityButton.className = "btn pink blue-grey"
        cityButton.textContent = buttonName
    pastCitiesEl.appendChild(cityButton);
    weatherRowEl.innerHTML = ""

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
var getWeather = function(weather){
    fetch("https://api.weatherapi.com/v1/forecast.json?key=898f900d29334755948192951200207&days=3&hour=19&q=" + inputCity + "," + inputState).then(function(response){
        if (response.ok) {
            formErrorsEl.innerHTML = ""
            response.json().then(function(data) {
            // if it is a new item push into arrays and local storage and create button
            if (weather==true && !searchedCity.includes(inputCity) && data.location.country == "United States of America"){
                searchedCity.push(inputCity)
                localStorage.setItem("city", JSON.stringify(searchedCity))
                searchedState.push(inputState);
                localStorage.setItem("state", JSON.stringify(searchedState))
                createCity();
            } 
            //if button is already made this will run
           
            //if not useable
            if (data.location.country != "United States of America") {
                var errorOne = document.createElement("div")
                errorOne.className = "card col 12 red accent-4"
                errorOne.innerHTML = "<h2>City is not in the USA</h2>"
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
                        "<span class='card-title'>"+ forecastDate + "</span>" + "<div><img src='//cdn.weatherapi.com/weather/64x64/day/" + getForecast.day.condition.icon.slice(-7) + "'/></div>" +
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


    // sets the function for Holiday API
    function showHoliday() {

        //var cardHoliday =createElement("div")
    //recieves and formats dates for presentation
      var holidayDay = moment().format("DD")
      var addingDay = holidayDay;
      var holidayMonth = moment().format("MM")
      var holidayYear = moment().format("YYYY")
      var todayDate = moment().format('MM/DD/YYYY')
     var tomorrowDate = moment().add(1,'days').format('MM/DD/YYYY')
     var followingDate = moment().add(2,'days').format('MM/DD/YYYY')
     // connects dates to HTML and styles them
        var blueHoliday0El = document.getElementById("blue-holiday0")
        blueHoliday0El.className = "row show";  
        blueHoliday0El.innerHTML += "<span class='card-title'>" + todayDate + "</span>";
        var blueHoliday1El = document.getElementById("blue-holiday1")
        blueHoliday1El.className = "row show";  
        blueHoliday1El.innerHTML += "<span class='card-title'>" + tomorrowDate + "</span>";
        var blueHoliday2El = document.getElementById("blue-holiday2")
        blueHoliday2El.innerHTML += "<span class='card-title'>" + followingDate + "</span>";
        blueHoliday2El.className = "row show";   
        //creates AA variable 
        var AA = document.createElement('p')
      
        // Key for the API
      var apikey = "47cffd35c3b98761e7a671cc818f58812739481a";    
    
      // calls the Request for API and fetches it
      for (let i=0; i<=2; i++) {
        console.log(i)
      fetch(`https://calendarific.com/api/v2/holidays?api_key=${apikey}&country=US&year=${holidayYear}&month=${holidayMonth}&day=${addingDay}`)
           .then(function(response) {
             response.json().then(function (holiday) {
                console.log("holiday", holiday)
                //creates document for the holiday function to be able to append properly
             var AA = document.createElement('p')
                  AA.innerText += ""
                  
                //runs if statement to display if there is a holiday
                 if (holiday.response.holidays.length == 0) {
                     AA.innerHTML = 'there is no Holiday today';
                    //runs else if statement for if there is a single holiday
                 } else if ( holiday.response.holidays.length == 1) {
                     AA.innerText += holiday.response.holidays[0].name;
                     //runs else if statement for if there is more than one holiday
                 } else if (holiday.response.holidays.length > 1) {
                         AA.innerText += holiday.response.holidays[0].name + ' & there are other holidays today';            
                  // runs an error statement if not working properly
                 } else {
                     window.alert ("error in holiday pull");
                 }
                 
                 // runs an if statement that appends the proper data to the proper date div
                 if (i ===0) {
                    blueHoliday0El.appendChild(AA);
             } else if (i ===1){
                  blueHoliday1El.appendChild(AA);
             } else  {
                  blueHoliday2El.appendChild(AA);
             }
             });
            
            })
            addingDay++  
        }
    }
  
submitButtonEl.addEventListener("click", function(event){
    if (stateSelectEl.value == 0) {
        alert("You missed a perameter try again")
        formEl.reset();
    }
    event.preventDefault();
    inputCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
    inputState = stateSelectEl.value
    cityFormEl.reset();
   // getWeather(true);
   showHoliday();

})
//deletes buttons created and local storage
deleteButtonEl.addEventListener("click", function(){
    searchedCity = [];
    localStorage.setItem("city", "[]")
    localStorage.setItem("state", "[]")
    inputCity = ""
    inputState = ""
    pastCitiesEl.innerHTML = "";
    cityFormEl.reset();
})
// gets local storage data and creates buttons for those items
var oldSearchHistory = function() {
    if (!checkStorageCity || !checkStorageState) {
        return; 
    } else {
        localStorage.clear();
        for (var i =0; i < checkStorageCity.length; i++) {
            searchedCity.push(checkStorageCity[i]); 
            searchedState.push(checkStorageState[i]); 
            inputCity = checkStorageCity[i].replace(/(^\w|\s\w)/g, m => m.toUpperCase());
            inputState = checkStorageState[i];
            createCity();
        }  
        // puts all items made in for loop into localStorage
        localStorage.setItem("city", JSON.stringify(searchedCity));
        localStorage.setItem("state", JSON.stringify(searchedState))
    }   
}
oldSearchHistory();
