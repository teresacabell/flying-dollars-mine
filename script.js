var cityInputEl = document.querySelector("#search-form");
var searchButtonEl = document.querySelector("#search-button");
var forecastEl = document.querySelector("#forecast");
var currencyEl = document.querySelector("#currency");
var pastCities = document.querySelector(".past-cities");
var cityContainerEl = document.querySelector("#cityContainer");
var currencyAmountEl = document.querySelector("#currencyAmount");
var convertButtonEl = document.querySelector("#convertButton");
var selection1 = document.querySelector("#sel1");
var selection2 = document.querySelector("#sel2");
var savedCurrencyEl = document.querySelector("#saved-currency")
var searchValue;
var selectionFrom

// Weather API Key
var apiWeatKey = "a6f4e97706bc320bc77d0f64e4111a15";


//get forecast from api and declare variables, create dynamic elements and then append to browser page 
var getForecast = function(lat, lon) {
    //input city, lat & lon parameters
    var apiWeatUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiWeatKey;
    fetch(apiWeatUrl) 
    .then(response => {
        if(response.ok){
            response.json()
            .then(function(data){

                var currentDate = new Date(data.current.dt *1000).toLocaleDateString()
                var currentIcon = data.current.weather[0].icon
                var currentTemp = data.current.temp;
                var currentHumidity = data.current.humidity;
                var currentWind = data.current.wind_speed;
                var currentUVI = data.current.uvi;
                
                //current date elements
                var dateEl = document.createElement("h3");
                var iconEl = document.createElement("img")
                var tempEl = document.createElement("h4");
                var humidityEl = document.createElement("h4")
                var windEl = document.createElement("h4")                
                var uviEl = document.createElement("h4")
                     
                dateEl.innerHTML = 'Date: '  + currentDate;
                iconEl.setAttribute("src","http://openweathermap.org/img/wn/" + currentIcon + ".png");
                tempEl.innerHTML = "Temp: "  + currentTemp + "\u00B0F";
                humidityEl.innerHTML = "Humidity: "  + currentHumidity + "%";
                windEl.innerHTML = "Wind: "  + currentWind + "mph";
                uviEl.innerHTML ="UV Index: "  +  currentUVI;

                
                cityContainerEl.append(dateEl);
                cityContainerEl.append(iconEl);
                cityContainerEl.append(tempEl);
                cityContainerEl.append(humidityEl);
                cityContainerEl.append(windEl);
                cityContainerEl.append(uviEl);

                //5 Day Forecast
                for (let i = 0; i < 5; i++) {
                    var dailyDate = new Date(data.daily[i].dt * 1000).toLocaleDateString();
                    var dailyImg = data.daily[i].weather[0].icon;
                    var dailyTemp = data.daily[i].temp.day;
                    var dailyHumidity = data.daily[i].humidity;
                    var dailyWind  = data.daily[i].wind_speed;

                    var dailyContainer = document.createElement("div");
                    var dateDaily = document.createElement("h3");
                    var dailyIcon = document.createElement("img");
                    var tempDaily = document.createElement("p");
                    var windDaily = document.createElement('p');
                    var humidityDaily = document.createElement("p");

                    dailyContainer.className = "container dailyContainer"
                    dateDaily.innerHTML = (dailyDate);
                    dailyIcon.setAttribute("src","http://openweathermap.org/img/wn/" + dailyImg + ".png");
                    dailyIcon.setAttribute('alt', "weather icon");
                    tempDaily.innerHTML = "Temp: " + dailyTemp + "\u00B0F";
                    windDaily.innerHTML = "Wind Speed: " + dailyWind + "mph";
                    humidityDaily.innerHTML = "Humidity: " + dailyHumidity + "%";

                    dailyContainer.append(dailyDate);
                    dateDaily.append(dailyImg);
                    dailyContainer.append(tempDaily);
                    dailyContainer.append(windDaily);
                    dailyContainer.append(humidityDaily);
                    forecastEl.append(dailyContainer);
               }


            })
           
        } else{
            alert("Error" + response.statusText)
        }
    })
};

// get city and display forecasted information 
var displayCity = function(cityName) {
    var apiWeatUrl2 = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiWeatKey;
    fetch(apiWeatUrl2)
    .then(response => {
        if(response.ok){
            response.json()
            .then(function(data) {
             var cityEl = document.createElement("li")
             cityEl.innerText=cityName
             pastCities.appendChild(cityEl);
            
                getForecast(data.coord.lat, data.coord.lon)
            })
        }
        })
};


var searchedCity = function(event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    displayCity(city)
    cityContainerEl.innerHTML = "";
    forecastEl.innerHTML = "";
}

// save recent searched cities
var saveCity = (city) => {
    var saveSearchContainer = document.createElement("div")
    var savedCity = document.createElement("button");
    savedCity.innerHTML = cities;
    saveSearchContainer.append(savedCity);
    historyEl.append(saveSearchContainer);
    
    var location = localStorage.getItem("location");

    if (location === "null") {
        var saveCityObj = JSON.stringify([{city: city}])
        var location = localStorage.setItem("location", saveCityObj)
    } else {
        var location = JSON.parse(location);
        location.push([])
    }

}

var api$Key = "abe795746da563df666baeba0b874e03";

var getCurrency = function() {
    var api$Url = "https://api.currencyscoop.com/v1/latest?api_key=abe795746da563df666baeba0b874e03&base="+selectionFrom
    console.log("clicked")
    fetch(api$Url)
    .then(currency => {

        return currency.json()
        .then(displayResults) 
            // var currencyBase = data.response.base;
            // var currencyChange = data.response.rates;
            // console.log(currencyChange);
    });
};
// getCurrency();

var conversionRate = function(event) {
    event.preventDefault();
    // getCurrency(event.target.value)
    selectionTo = `${event.target.value}`
    console.log(selectionTo)
}

var startingRates = function(event) {
    event.preventDefault();
    // getCurrency(event.target.value)
    selectionFrom = event.target.value
    console.log(selectionFrom)
}

var updatedValue = function(event) {
    event.preventDefault();
    searchValue = event.target.value
    currencyAmountEl = parseInt(document.getElementById("currencyAmount").value);
}


var displayResults = function(data) {
    console.log(data)
    var currencyInput = data.response.rates [selectionFrom];
    var currencyOutput = data.response.rates [selectionTo];
    console.log(currencyInput);
    console.log(currencyOutput);

    var currencyInputBank = currencyInput * searchValue
    console.log(currencyInputBank)
    var currencyOutputBank = currencyInputBank*currencyOutput
    console.log(currencyOutputBank)
    savedCurrencyEl.innerHTML = "$" + currencyOutputBank
    console.log(currencyAmountEl)
}

searchButtonEl.addEventListener("click", searchedCity);
selection2.addEventListener("change", conversionRate);
selection1.addEventListener("change", startingRates);
currencyAmountEl.addEventListener("input", updatedValue);
convertButtonEl.addEventListener("click", getCurrency);

