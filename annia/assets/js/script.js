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

submitButtonEl.addEventListener("click", function (event) {
    event.preventDefault();
    inputCity = document.querySelector("input[name='city']").value.trim().toLowerCase();
    inputState = stateSelectEl.value;
    cityFormEl.reset();
    console.log(inputCity);
    showEvent(inputCity);

})

//list of event by city

function showEvent(cityName) {

    //key for the api
    var apikey = "4rwvR5WRLvh2Sb5c";
   

    //call the API request
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&keywords=music&location=${cityName}&date=Today`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < 3; i++) {

                //create element for event name
                var titleLink = document.createElement("p")
                var eventUrl = document.createElement("a")
                var eventaddress = document.createElement("p")
                eventUrl.setAttribute('href', data.events.event[i].url)
                eventUrl.setAttribute('target', '_blank')
                eventUrl.textContent = "Click here for more information";
                titleLink.innerHTML = data.events.event[i].title;
               // anniaEl.classList = 

                //create element for event description
                var descriptionEvent = document.createElement("p")
                //create element for star and close event
                var dateStarClose = document.createElement("h6")


                //conditional for the event don't have date for close event
                if (data.events.event[i].stop_time === null || data.events.event[i].stop_time === " ") {

                    dateStarClose.innerHTML = "Start date of the event:" + " " + data.events.event[i].start_time.split(" ")[0];
                }
                else {
                    dateStarClose.innerHTML = "Start:" + " " + data.events.event[i].start_time.split(" ")[0] + " " +
                        "End:" + " " + data.events.event[i].stop_time.split(" ")[0];
                }


                //condicional for the event description is emty
                if (data.events.event[i].venue_address === null || data.events.event[i].venue_address === " ") {

                    eventaddress.innerHTML = "Dear user we recommend you, see more specifications of the event on the site.Click on the event name 😏!!";
                }
                else {
                    eventaddress.innerHTML = data.events.event[i].venue_address;

                }

                //show the information on the page
                anniaEl.appendChild(titleLink)
                anniaEl.appendChild(dateStarClose)
                anniaEl.appendChild(eventaddress)
                anniaEl.appendChild(eventUrl)

            }

        })
      //clear the information
      anniaEl.innerHTML = "";  
}

  

