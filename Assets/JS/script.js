document.getElementById('fetchWeather').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'YOUR_API_KEY';
    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            const { lat, lon } = data.coord;
            const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

            fetch(weatherUrl)
                .then(response => response.json())
                .then(weatherData => {
                    // Process and display the weather data
                    const weatherContainer = document.getElementById('weatherData');
                    weatherContainer.innerHTML = ''; // Clear previous data
                    
                    weatherData.list.forEach(item => {
                        const temp = item.main.temp;
                        const description = item.weather[0].description;
                        const date = new Date(item.dt * 1000).toLocaleDateString();

                        const weatherInfo = document.createElement('div');
                        weatherInfo.innerHTML = `<h3>${date}</h3><p>Temperature: ${temp} K</p><p>Description: ${description}</p>`;
                        weatherContainer.appendChild(weatherInfo);
                    });
                });
        })
        .catch(error => console.error('Error:', error));
});
