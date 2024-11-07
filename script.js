const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const icon = document.getElementById("icon");
const weather = document.getElementById("weather");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

const apiKey = '7ea1ab81ed9bae757890485793ed3ad3';

btn.addEventListener("click", () => {
    const city = input.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherCondition = data.weather[0].main.toLowerCase();
                const iconCode = data.weather[0].icon;

                // Check if the weather is clear (sunny) to show the custom sun icon
                if (weatherCondition === "clear") {
                    icon.classList.add("sunny");
                    icon.innerHTML = ""; // Clear any image or previous icon
                } else {
                    icon.classList.remove("sunny");
                    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" alt="weather icon"/>`;
                }

                const weatherCity = data.name;
                const weatherCountry = data.sys.country;
                weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

                const weatherTemp = data.main.temp - 273.15; // Convert from Kelvin to Celsius
                temperature.innerHTML = `${weatherTemp.toFixed(1)}°C`;

                const weatherDesc = data.weather[0].description;
                description.innerHTML = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
            } else {
                alert("City not found. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Failed to retrieve data. Please try again later.");
        });
}
