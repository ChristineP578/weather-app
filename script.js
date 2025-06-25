const apiKey = "abc123xyz456"; 
const form = document.getElementById("search-form");
const input = document.getElementById("city-input");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = input.value.trim();
  if (city) {
    searchWeather(city);
  }
});

function searchWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById("city-name").innerText = data.name;
      document.getElementById("temperature").innerText = Math.round(data.main.temp);
      document.getElementById("description").innerText = data.weather[0].description;
      document.getElementById("wind").innerText = `Wind: ${data.wind.speed} m/s`;
      document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    })
    .catch(error => {
      alert("City not found. Please try again.");
    });
}
