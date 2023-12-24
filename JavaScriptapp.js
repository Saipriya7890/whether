// JavaScript logic here

const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function fetchWeatherData() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async position => {
      const { latitude, longitude } = position.coords;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }, error => {
      console.error('Error getting geolocation:', error);
    });
  } else {
    console.error('Geolocation is not supported.');
  }
}

function displayWeatherData(data) {
  const weatherCard = document.getElementById('weatherCard');
  weatherCard.innerHTML = `
    <h2>Current Weather</h2>
    <p>Location: ${data.name}</p>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].main}</p>
    <p>Description: ${data.weather[0].description}</p>
  `;
}

// Fetch weather data when the page loads
window.onload = fetchWeatherData;
