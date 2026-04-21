const apiKey = "6043fb48f1348e0e38015ac2395d1790";

const input = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDiv = document.getElementById("weather");
const errorDiv = document.getElementById("error");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

async function getWeather() {
  const city = input.value.trim();
  if (!city) return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      weatherDiv.classList.add("hidden");
      errorDiv.classList.remove("hidden");
      return;
    }

    cityName.textContent = data.name + ", " + data.sys.country;
    temperature.textContent = Math.round(data.main.temp) + "°C";
    description.textContent = data.weather[0].description;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    errorDiv.classList.add("hidden");
    weatherDiv.classList.remove("hidden");

  } catch (error) {
    weatherDiv.classList.add("hidden");
    errorDiv.classList.remove("hidden");
  }
}

searchBtn.addEventListener("click", getWeather);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});