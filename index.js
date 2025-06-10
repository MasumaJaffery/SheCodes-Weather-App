function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  document.querySelector("#current-city").innerHTML = city;

  searchWeather(city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

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

function displayWeather(response) {
  let temperature = Math.round(response.main.temp);
  let humidity = response.main.humidity;
  let wind = Math.round(response.wind.speed);
  let description = response.weather[0].description;

  document.querySelector("#temperature").innerHTML = temperature;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;
  document.querySelector("#wind").innerHTML = `${wind} km/h`;
  document.querySelector("#description").innerHTML = description;
}

function searchWeather(city) {
  let apiKey = "adf059698fbebe496a37541762d23025";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(displayWeather)
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

// Initial setup
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
