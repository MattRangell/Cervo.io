const apiKey = '########################'; // Replace with your OpenWeatherMap API key

function fetchWeather() {
    const location = document.getElementById('location').value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            displayMap(data.coord.lat, data.coord.lon);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weather-data');
    weatherDataDiv.innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayMap(lat, lon) {
    const mapDiv = document.getElementById('map');
    mapDiv.style.display = 'block'; // Show the map
    const map = L.map(mapDiv).setView([lat, lon], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker([lat, lon]).addTo(map);

    // Add layers for rivers and vegetation
    L.tileLayer.wms('https://ahocevar.com/geoserver/wms', {
        layers: 'topp:states',
        format: 'image/png',
        transparent: true,
        attribution: 'Rivers & Vegetation'
    }).addTo(map);
}

function sendAlert() {
    const phoneNumber = document.getElementById('phone-number').value;
    const message = 'Alerta Ambiental: Condições climáticas adversas detectadas. Fique seguro!';
    const whatsappUrl = `https://web.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;

    window.open(whatsappUrl, '_blank');
}
