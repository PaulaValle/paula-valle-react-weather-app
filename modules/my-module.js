let apiKey = "2f1b841a3b6dc609cb8924e01b3900c6";
let todayTemperature = document.querySelector(".todaytemperature");
let averageTemperature = document.querySelector(".averagetemperature");

let otherInfo = document.querySelector("#second-grade-info");
let dateMonth = document.querySelector("#date-month");
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
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
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
dateMonth.innerHTML = `${date}, ${day}, ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  if (forecast && forecast.length > 0) {
    forecast.forEach(function(forecastDay, index) {
      if (index < 7 && index > 0) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2 weekdays">
              <div class="weather-day">${formatDate(forecastDay.dt)}</div>
              <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="50"/>
              <div class="week-temperatures">
                <span class="weektemp-min"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
                <span> / </span>
                <span class="weektemp-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
              </div>
            </div>`;
      }
    });
  } else {
    forecastHTML =
      forecastHTML +
      `<div class="noData">We couldn't find the info, try again later.</div>`;
  }
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function temperatureChange(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  celsiusAverageMin = Math.round(response.data.main.temp_min);
  celsiusAverageMax = Math.round(response.data.main.temp_max);

  let temperature = Math.round(response.data.main.temp);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let temperatureMax = Math.round(response.data.main.temp_max);
  todayTemperature.innerHTML = `${temperature}º`;
  averageTemperature.innerHTML = `${temperatureMin}º/ <strong>${temperatureMax}º</strong>`;
  let otherInfo = document.querySelector("#description");
  otherInfo.innerHTML = `${response.data.weather[0].main}`;
  let wind = document.querySelector("#wind");
  let windInfo = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windInfo} km/h`;
  let icon = document.querySelector("#big-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].main}`);
  //info for the next api
  let lon = response.data.coord.lon;
  let lat = response.data.coord.lat;
  let apiUrlCurrent3 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent3).then(displayForecast);
}
function cityChange(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  city.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(temperatureChange);
}
let city = document.querySelector("#city");
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", cityChange);

function show(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  celsiusAverageMin = Math.round(response.data.main.temp_min);
  celsiusAverageMax = Math.round(response.data.main.temp_max);
  todayTemperature.innerHTML = `${celsiusTemperature}º`;
  averageTemperature.innerHTML = `${celsiusAverageMin}º/ <strong>${celsiusAverageMax}º</strong>`;
  city.innerHTML = `${response.data.name}`;
  let windInfo = document.querySelector("#wind");
  windInfo.innerHTML = `${response.data.wind.speed}`;
  let otherInfo = document.querySelector("#description");
  otherInfo.innerHTML = `${response.data.weather[0].main}`;
  let icon = document.querySelector("#big-icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", `${response.data.weather[0].main}`);
}
function currentPlace(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent).then(show);
  let apiUrlCurrent2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCurrent2).then(displayForecast);
}
function getPlace() {
  navigator.geolocation.getCurrentPosition(currentPlace);
}
let currentButton = document.querySelector(".currentbutton");
currentButton.addEventListener("click", getPlace);

window.onload = getPlace;
