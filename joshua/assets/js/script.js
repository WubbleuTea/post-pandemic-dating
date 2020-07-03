var dating = '';

var submittedName = "adsfasdf";

fetch("https://api.weatherapi.com/v1/forecast.json?key=898f900d29334755948192951200207&days=3&hour=19&q=" + submittedName).then(function(response){
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
    
