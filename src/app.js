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
function currentWeather(response) {
  // Update the HTML with new data
  let tempElem = document.querySelector("#temp-display");
  let windElem = document.querySelector("#wind-display");
  let humidElem = document.querySelector("#humid-display");
  let descripElem = document.querySelector("#descrip-display");
  let nameElem = document.querySelector("#city-name");
  let dateElem = document.querySelector("#date-display");
  let iconELem = document.querySelector("#icon");

  tempElem.innerHTML = Math.round(response.data.main.temp);
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
}

function search(city) {
  let APIkey = "421760f2fa0cfa886ced8b96269374ed";
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
// declarin API variables
search("Rotterdam");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
