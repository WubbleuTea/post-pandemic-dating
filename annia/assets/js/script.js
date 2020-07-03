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

submitButtonEl.addEventListener("click", function(event){
    event.preventDefault();
    inputCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
    cityFormEl.reset();
    console.log(inputCity);
    showEvent(inputCity);

})

function showEvent(cityName) {
 
       var apikey="4rwvR5WRLvh2Sb5c";
  
    //call the API request
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&keywords=music&location=${cityName}&date=Today`)     
        .then(function(response) {
            return response.json();                           
        })
        .then(function(data) {
            console.log(data)
        })

}

