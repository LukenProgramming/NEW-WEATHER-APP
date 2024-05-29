document.getElementById('submitBtn').addEventListener('click', getWeather);

function getWeather(){
    const API_KEY_WEATHER = 'a86d8f3d0b336a5519c63b46a1dbead3';
    const API_KEY_UNSPLASH = '5K6pUd66m9_0XzRtgXdttRRooUeNjKP-5T_9dYfStvs';
    const cityInput = document.getElementById('cityInput').value;

    if(cityInput === ""){
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=${API_KEY_WEATHER}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === 200) {
                const temp = Math.round(json.main.temp, 2);
                const desc = json.weather[0].description;
                document.querySelector('.temp').textContent = `Temperature: ${temp}°C`;
                document.querySelector('.desc').textContent = `Description: ${desc}`;

                // Fetch background image from Unsplash
                fetch(`https://api.unsplash.com/search/photos?query=${cityInput}&client_id=${API_KEY_UNSPLASH}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.results.length > 0) {
                            const imageUrl = data.results[0].urls.regular;
                            document.body.style.backgroundImage = `url(${imageUrl})`;
                        } else {
                            console.error('No images found for this city');
                        }
                    })
                    .catch(error => console.error('Error fetching image:', error));
            } else {
                document.querySelector('.temp').textContent = '';
                document.querySelector('.desc').textContent = `Error: ${json.message}`;
            }
        })
        .catch(error => {
            document.querySelector('.temp').textContent = '';
            document.querySelector('.desc').textContent = `Error: ${error.message}`;
        });
}
