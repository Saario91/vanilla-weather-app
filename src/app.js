function formatDate(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

function formatDay(date) {
  let day = new Date(date * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day.getDay()];
}
function getForecast(coord) {
  let lat = coord.lat;
  let lon = coord.lon;
  APIurl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${APIkey}&units=metric`;
  console.log(APIurl);
  axios.get(APIurl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElem = document.querySelector("#forecast");
  forecastHTML = `<div class="row">`;
  let days = ["Friday", "Saturday", "Sunday"];
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML += `
              <div class="col-2">
                <div class="weather-forecast-date">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="42"
                />
                <div class="weather-forecast-temp">
                  <span class="forecast-temp-max">${Math.round(
                    forecastDay.temp.max
                  )}°</span>
                  <span class="forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            
            `;
    }
  });
  forecastHTML += `</div>`;

  forecastElem.innerHTML = forecastHTML;
}

function currentWeather(response) {
  // Update the HTML with new data
  let tempElem = document.querySelector("#temp-display");
  let windElem = document.querySelector("#wind-display");
  let humidElem = document.querySelector("#humid-display");
  let descripElem = document.querySelector("#descrip-display");
  let nameElem = document.querySelector("#city-name");
  let dateElem = document.querySelector("#date-display");
  let iconELem = document.querySelector("#icon");

  celciusTemp = response.data.main.temp;

  tempElem.innerHTML = Math.round(celciusTemp);
  windElem.innerHTML = Math.round(response.data.wind.speed);
  humidElem.innerHTML = Math.round(response.data.main.humidity);
  descripElem.innerHTML = response.data.weather[0].description;
  nameElem.innerHTML = response.data.name;
  dateElem.innerHTML = formatDate(response.data.dt * 1000);
  iconELem.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconELem.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function search(city) {
  let unit = "metric";
  let cityName = city;
  let APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${unit}&appid=${APIkey}`;
  axios.get(APIurl).then(currentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function fahrenheitConversion(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celciusTemp * 5) / 9 + 32;
  let tempElem = document.querySelector("#temp-display");
  tempElem.innerHTML = Math.round(fahrenheitTemp);
}

function celciusConversion(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let tempElem = document.querySelector("#temp-display");
  tempElem.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;
let APIkey = "421760f2fa0cfa886ced8b96269374ed";

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//Unit conversion
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", celciusConversion);
search("Rotterdam");
