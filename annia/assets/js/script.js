var cityFormEl = document.getElementById("city-form")
var textInputEl = document.getElementById("text-input");
var stateSelectEl = document.getElementById("state-select");
var submitButtonEl = document.getElementById("submit-button");
var deleteButtonEl = document.getElementById("delete-button");
var eventRowEl = document.getElementById("event-row")
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

function showEvent() {

    //key for the api
    var apikey = "4rwvR5WRLvh2Sb5c";
   
 //
    //call the API request
    //fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&keywords=music&location=${inputCity}&date=Today`
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&keywords=music&location=${inputCity}&date=Today`)
        .then(function (response) {
                    
        if(response.ok){
           response.json().then(function (data) {
                console.log(data)
    
                for (var i = 0; i < 3; i++) {
    
                    //create element for event Info
                    var eventCity=document.createElement("div")
                    var eventInfo=document.createElement("div")
                    var divEventContainer=document.createElement("div")
                    var divEventLink=document.createElement("div")

                   //create element for show the event date
                   var dateStarClose = document.createElement("p")

                    //create element for show  the event address             
                   var eventaddress = document.createElement("p")
                    // add title to eventInfo
                    // class assignment
                    eventCity.className="col s12 m4"   
                    divEventContainer.className="card blue-grey darken-1 "                
                    eventInfo.className="card-content white-text"  
                    divEventLink.className="card-action"           
    
                   //conditional for the event don't have date for close event
                    if (data.events.event[i].stop_time === null || data.events.event[i].stop_time === " ") {                         
                       dateStarClose.innerHTML = "Start date of the event:" + " " + data.events.event[i].start_time.split(" ")[0];
                    }
                    else { 
                        dateStarClose.innerHTML = "Start:" + " " + data.events.event[i].start_time.split(" ")[0] + " " +
                            "End:" + " " + data.events.event[i].stop_time.split(" ")[0];
                    }
    
                        //condicional for the event address is emty
                    if (data.events.event[i].venue_address === null || data.events.event[i].venue_address === " ") {
    
                        eventaddress.innerHTML= "Address:Dear user more specifications on the site 😏";
                    }
                    else {
                        eventaddress.innerHTML ="Address:"+ data.events.event[i].venue_address+ ".";
                    }

                     //event url for see more info
                    divEventLink.innerHTML="<a href ='"+ data.events.event[i].url +"'  target= _blank > Click here for more information. </a> "
                    
                     //event title
                    eventInfo.innerHTML= "<span class='card-title truncate'> "+ data.events.event[i].title +"</span>" ;
                    // event date
                    eventInfo.appendChild(dateStarClose) 
                    // event address
                    eventInfo.appendChild(eventaddress) 
                    //conatiner the event info
                    divEventContainer.appendChild(eventInfo)
                    divEventContainer.appendChild(divEventLink)
                    //all info
                    eventCity.appendChild(divEventContainer)
                    //all info append on page
                    eventRowEl.appendChild(eventCity)
                    
                }
             })
        }else{
            alert("Error connect to the API")
        }
    }).catch(function (error) {

        alert("Error" + " " + error.statusText)
      })
      //clear the information
      eventRowEl.innerHTML = "";  
}

  

