const API_KEY = '24cde4488a6a4be19388bf5ad3244acc';

function searchForecast() {
  const cityInput = document.getElementById('city');
  const cityName = cityInput.value.trim();
  const forecastContainer = document.getElementById('forecastContainer');

  if (cityName === '') {
    forecastContainer.innerHTML = '<p class="error">Please enter a city name</p>';
    return;
  }

  forecastContainer.innerHTML = '<p class="loading">Loading...</p>';

  fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${API_KEY}&days=7`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        forecastContainer.innerHTML = '<p class="error">City not found</p>';
      } else {
        const forecastList = data.data;
        let forecastHTML = '';

        forecastList.forEach(forecast => {
          const forecastDate = new Date(forecast.datetime);
          const forecastDay = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
          const temperature = forecast.temp;
          const description = forecast.weather.description;
          const iconCode = forecast.weather.icon;

          const weatherIcon = `<img src="https://www.weatherbit.io/static/img/icons/${iconCode}.png" alt="${description}" class="weather-icon">`;
          const forecastCard = `
            <div class="forecast-card">
              <div class="forecast-date">${forecastDay}</div>
              <div class="forecast-info">
                <div class="forecast-icon">${weatherIcon}</div>
                <div class="forecast-text">
                  <p class="forecast-temperature">${temperature}&deg;C</p>
                  <p class="forecast-description">${description}</p>
                </div>
              </div>
            </div>
          `;

          forecastHTML += forecastCard;
        });

        forecastContainer.innerHTML = forecastHTML;
        forecastTitle.textContent = `${cityName}'s forecast`; 
      }
    })
    .catch(error => {
      console.log(error);
      forecastContainer.innerHTML = '<p class="error">An error occurred</p>';
    });
}
