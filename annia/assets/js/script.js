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
    inputState = stateSelectEl.value;
    cityFormEl.reset();
    console.log(inputCity);
    showEvent(inputCity);

})

function showEvent(cityName) {
 
       var apikey="4rwvR5WRLvh2Sb5c";
       var posicion=["0","1","2","3","4","5","6","7","8","9"];
  
    //call the API request
    fetch(`https://api.eventful.com/json/events/search?app_key=${apikey}&keywords=music&location=${cityName}&date=Today`)     
        .then(function(response) {
            return response.json();                           
        })
        .then(function(data) {
            console.log(data)

            //Ramdom  search event
           var index = posicion[Math.floor(Math.random() * (posicion.length - 1))];
            console.log("posicion",index)

            var titleLink=document.createElement("a")         
            titleLink.setAttribute('href',data.events.event[index].url)
            titleLink.setAttribute('target','_blank')
            titleLink.textContent=data.events.event[index].title;

            
            var descriptionEvent=document.createElement("p")
            descriptionEvent.innerHTML =  data.events.event[index].description;

            if (data.events.event[index].description===null ){
                descriptionEvent.innerHTML= "Dear user we recommend you see more specifications of the event on the site 😏";
              }
              else{
            descriptionEvent.innerHTML =  data.events.event[index].description;
            console.log("descripcion", descriptionEvent);
              }

            var dateStar=document.createElement("p")
            dateStar.textContent=data.events.event[index].
                    
           anniaEl.appendChild(titleLink)
           anniaEl.appendChild(descriptionEvent)

        })

}

