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

function displayTemp(response){
    let currentTemp = document.querySelector("#current-temp");
    let city = document.querySelector("#city");
    let todaysDate = document.querySelector("#date");
    let description = document.querySelector("#weather-description");
    let precipitation = document.querySelector("#precipitation");
    let humidity = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind-speed");
    let currentWeatherImg = document.querySelector("#weather-img");

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

let apiKey = "d965f5e3fcb1a2054c7f5ac431fe9773"; 
let currentCity = "Tacoma";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(displayTemp)