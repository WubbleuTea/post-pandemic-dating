var dating = '';


var submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    var city = $("input").val().trim();
    console.log(city)
    showEvent(city)
})

function showEvent(cityName) {
 
       var apikey="4rwvR5WRLvh2Sb5c";
  
    //call the API request
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&keywords=music&location=${cityName}&date=Today`)     
        .then(function(response) {
            console.log("este", response)                             
           
        })

}
//showEvent(houston);
