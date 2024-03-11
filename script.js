const date = document.querySelector(".date");
const weatherType = document.querySelector(".weather");
const temp = document.querySelector(".temprature");
const minTemp = document.querySelector(".min");
const maxTemp = document.querySelector(".max");
const feelslike = document.querySelector(".feels");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind-card");
const pressure = document.querySelector(".pressure");
const mode = document.querySelector("body");
const modeText = document.querySelector(".mode");
let city = "Khatima";

const cityDisplay = document.querySelector(".city");
const searchBtn = document.querySelector(".search-btn");
const cityInput = document.querySelector(".input-text");

// Function to update weather based on city
const updateWeather = async (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=02e113de2bd1abf009a74b93f1485500`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    const { main, name, weather, wind, sys, dt } = data;

    cityDisplay.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    date.innerHTML = getDateTime(dt);

    weatherType.innerHTML = weather[0].main;
    temp.innerHTML = `${Math.round(main.temp)}&#176`;
    minTemp.innerHTML = `Min: ${Math.round(main.temp_min)}&#176`;
    maxTemp.innerHTML = `Max: ${Math.round(main.temp_max)}&#176`;

    feelslike.innerHTML = `<i class="fa-solid fa-poo-storm"></i><p>feels</p><p>${Math.round(
      main.feels_like
    )}&#176</p>`;
    humidity.innerHTML = `<i class="fa-solid fa-water"></i><p>humidity</p><p>${main.humidity}%</p>`;
    wind.innerHTML = `<i class="fa-solid fa-wind"></i><p>wind ${wind.speed} m/s</p>`;
    pressure.innerHTML = `<i class="fa-solid fa-icicles"></i><p>pressure</p><p>${main.pressure} hPa</p>`;
  } catch (error) {
    console.log(error);
  }
};

// Function to get country name based on country code
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: "region" }).of(code);
};

// Function to format date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(curDate);
};

// Event listener for search button
searchBtn.addEventListener("click", () => {
  city = cityInput.value.trim();
  updateWeather(city);
});

// Event listener for dark mode toggle
modeText.addEventListener("click", () => {
  mode.classList.toggle("body-dark");
  modeText.innerText = mode.classList.contains("body-dark") ? "🌞" : "🌙";
});

// Initial weather update on page load
document.addEventListener("DOMContentLoaded", () => {
  updateWeather(city);
});
