var cityFormEl = document.getElementById("city-form")
var textInputEl = document.getElementById("text-input");
var stateSelectEl = document.getElementById("state-select");
var submitButtonEl = document.getElementById("submit-button");
var deleteButtonEl = document.getElementById("delete-button");
var victorEl = document.getElementById("victor");
var anniaEl = document.getElementById("annia");
var shaneEl = document.getElementById("shane");
var tylerEl = document.getElementById("tyler");
var joshuaEl = document.getElementById("joshua");
var inputCity = "";
var inputState = "";

var getWeather = function(){
    fetch("https://api.weatherapi.com/v1/forecast.json?key=898f900d29334755948192951200207&days=3&hour=19&q=" + inputCity + "," + inputState).then(function(response){
        if (response.ok) {
        response.json().then(function(data) {
            for (var i=0; i<data.forecast.forecastday.length; i++)
                console.log(data)
                console.log(data.forecast.forecastday[0].day.avgtemp_f)
            })       
        } else {
            console.log("This did not work")
        }
    })
}

submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    inputCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
    inputState = stateSelectEl.value
    cityFormEl.reset();
    console.log(inputCity, inputState);
    getWeather();

})
    
