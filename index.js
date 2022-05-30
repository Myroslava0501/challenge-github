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

  celsiusTemp = Math.round(response.data.main.temp);
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
  console.log(geoUrl);
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

searchCity("Warsaw");

function dispayFahranheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahranheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahranheitTemp);
}
function dispayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemp;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", dispayFahranheit);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", dispayCelsius);

let celsiusTemp = null;
