const API_KEY = '24cde4488a6a4be19388bf5ad3244acc';

function searchWeather(cityNumber) {
  const cityInput = document.getElementById(`city${cityNumber}`);
  const cityName = cityInput.value.trim();
  const cityCard = document.getElementById(`cityCard${cityNumber}`);
  const cityWeather = document.getElementById(`cityWeather${cityNumber}`);
  const cityTemperature = document.getElementById(`cityTemperature${cityNumber}`);
  const cityHumidity = document.getElementById(`cityHumidity${cityNumber}`);
  const cityWindSpeed = document.getElementById(`cityWindSpeed${cityNumber}`);
  const cityWeatherDesc = document.getElementById(`cityWeatherDesc${cityNumber}`);

  if (cityName === '') {
    cityWeather.innerHTML = '<p class="error">Please enter a city name</p>';
    return;
  }

  cityWeather.innerHTML = '<p class="loading">Loading...</p>';

  fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        cityWeather.innerHTML = '<p class="error">City not found</p>';
      } else {
        const temperature = Math.round(data.data[0].temp);
        const humidity = data.data[0].rh;
        const windSpeed = data.data[0].wind_spd;
        const description = data.data[0].weather.description;
        const iconCode = data.data[0].weather.icon;

        const weatherIcon = `<img src="https://www.weatherbit.io/static/img/icons/${iconCode}.png" alt="${description}" class="weather-icon">`;
        const temperatureText = `<p class="temperature">${temperature}&deg;C</p>`;
        const descriptionText = `<p class="description">${description}</p>`;

        cityTemperature.textContent = temperature + '°C';
        cityHumidity.textContent = humidity + '%';
        cityWindSpeed.textContent = windSpeed + 'm/s';
        cityWeatherDesc.textContent = description + ' ' + temperature + '°C';

        cityWeather.innerHTML = weatherIcon + temperatureText + descriptionText;
      }
    })
    .catch(error => {
      console.log(error);
      cityWeather.innerHTML = '<p class="error">An error occurred</p>';
    });
}
