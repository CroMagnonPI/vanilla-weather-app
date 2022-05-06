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

function displayForecast(){
    let weatherForecast = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    let forecastDays = ["Sunday", "Monday","Tuesday","Wednesday","Thursday"];
    forecastDays.forEach(function (forecastDay) {
    forecastHTML= forecastHTML + ` 
      <div class="col-2">
      <div class="weather-forecast-date">${forecastDay}</div>
      <img src="#" alt="#" width="36"/>
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temp-high">18°</span><span class="weather-forecast-temp-low">12°</span></div>
    </div>
  </div>`;
    });
  forecastHTML = forecastHTML + `</div>`
  weatherForecast.innerHTML = forecastHTML;
    
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
}
function search(currentCity){
    let apiKey = "d965f5e3fcb1a2054c7f5ac431fe9773"; 
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayTemp)
}

function inputCity(event){
    event.preventDefault();
    let cityInput = document.querySelector("#search-city");
    search(cityInput.value);
   }

  function displayFarenheitTemp(event) {
      event.preventDefault();
      let fahrenheitTemp = (celsiusTemp*9) / 5 +32;
      let currentTemp = document.querySelector("#current-temp");
      currentTemp.innerHTML = Math.round(fahrenheitTemp);
  }

  function displayCelsiusTemp(event) {
    event.preventDefault();
    let currentTemp = document.querySelector("#current-temp");
    currentTemp.innerHTML = Math.round(celsiusTemp);
}  
displayForecast();

let celsiusTemp = null;

let form = document.querySelector("#search-form")
form.addEventListener("submit", inputCity)

let fahrenheitUnit = document.querySelector("#fahrenheitUnit");
fahrenheitUnit.addEventListener("click", displayFarenheitTemp)

let celsiusUnit = document.querySelector("#celsiusUnit");
celsiusUnit.addEventListener("click", displayCelsiusTemp);

search("Tacoma");