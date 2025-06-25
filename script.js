const apiKey = "29da5a589ae0c8bde3e8817f5094e1ad"; 
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const weatherDiv = document.getElementById("weather");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

function getWeather(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("city-name").textContent = data.name;
      document.getElementById("temperature").textContent = `Temperature: ${Math.round(data.main.temp)}°C`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;
      document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      weatherDiv.classList.remove("hidden");
    })
    .catch(error => {
      alert(error.message);
    });
}
