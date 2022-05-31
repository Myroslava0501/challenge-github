let now = new Date();
let h3 = document.querySelector("today");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

today.innerHTML = `${day}  ${hour}:${minute}`;
let fullday = document.querySelector("full");
let date = now.getDate();
if (date < 10) {
  date = `0${date}`;
}
let monthes = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];
let month = monthes[now.getMonth()];

let year = now.getFullYear();
full.innerHTML = `${date}.${month}.${year}`;

function dayFormat(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let days = [
    "0",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForcast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        `<div class="col-6 ">
 <div class="days">${dayFormat(forecastDay.dt)}</div>

  <img
  id="forecast-icon"
  src="https://delicate-syrniki-fd5eec.netlify.app/images/clearsky.png"
  alt=""
  />
  <div>
  <span class="week-temperature-max">${Math.round(forecastDay.temp.max)}</span>
  <span class="week-temperature-min">${Math.round(forecastDay.temp.min)}</span>
  </div>
  </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  let apiKey = "b23da6817af02c700cc67fc7aecfce3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForcast);
}

function displayWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  getForcast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b23da6817af02c700cc67fc7aecfce3a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function handelSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "b23da6817af02c700cc67fc7aecfce3a";
  let geoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(geoUrl).then(displayWeather);
}

function displayLocalWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let currentLocationButton = document.querySelector("#location");
currentLocationButton.addEventListener("click", displayLocalWeather);
