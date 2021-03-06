function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10){ hours = `0${hours}`}
    let minutes = date.getMinutes();
    if (minutes <10){ minutes = `0${minutes}`}
    let daysofWeek = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ];
    let day = daysofWeek[date.getDay()];

    return `${day} ${hours}:${minutes}`;
}

function formatForecastDay (timestamp) {
let date = new Date(timestamp*1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

return days[day];
}

function displayForecast(response){
    let forecastDays = response.data.daily;
    let weatherForecast = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecastDays.forEach(function (forecastDay, index) {
        if (index <6){
    forecastHTML= forecastHTML + 
    ` 
      <div class="col-2">
      <div class="weather-forecast-date">${formatForecastDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
      alt="#" 
      width="42"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temp-high">${Math.round(forecastDay.temp.max)}°</span><span class="weather-forecast-temp-low">${Math.round(forecastDay.temp.min)}°</span></div>
    </div>
  `;
        }
    });
  forecastHTML = forecastHTML + `</div>`
  weatherForecast.innerHTML = forecastHTML;
    
}



function getForecast(coordinates) {
    let apiKey = "d965f5e3fcb1a2054c7f5ac431fe9773";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(displayForecast)


}

function displayTemp(response){
    let currentTemp = document.querySelector("#current-temp");
    let city = document.querySelector("#city");
    let todaysDate = document.querySelector("#date");
    let description = document.querySelector("#weather-description");
    let precipitation = document.querySelector("#precipitation");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let currentWeatherImg = document.querySelector("#weather-img");

    celsiusTemp = response.data.main.temp;

    currentTemp.innerHTML = Math.round(response.data.main.temp);
    city.innerHTML = response.data.name;
    todaysDate.innerHTML = formatDate(response.data.dt * 1000)
    description.innerHTML = response.data.weather[0].description;
    precipitation.innerHTML = response.data.clouds.all;
    humidity.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    currentWeatherImg.setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    currentWeatherImg.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function search(currentCity){
    let apiKey = "d965f5e3fcb1a2054c7f5ac431fe9773"; 
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=imperial`;
    axios.get(apiURL).then(displayTemp)
}

function inputCity(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-city");
    search(cityInput.value);
   }

let form = document.querySelector("#search-form")
form.addEventListener("submit", inputCity)

search("Tacoma");