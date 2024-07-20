const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '6571c299cba5c60fdf817ae67ed0bb8c';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => { 

        if (json.cod == '404') {
            container.style.height = '500px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '500px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'images/clear-sun-removebg-preview.png';
                break;
    
            case 'Rain':
                image.src = 'images/rain-cloud-removebg-preview.png';
                break;
    
            case 'Snow':
                image.src = 'images/snow-cloud-removebg-preview.png';
                break;
    
            case 'Mist':
                image.src = 'images/mist-cloud-removebg-preview.png';
                break;
                    
            case 'Cloudy':
                image.src = 'images/cloudyremovebg-preview.png';
                break;
            
            case 'Haze':
                image.src = 'images/haze-image-removebg-preview.png';
                break;
            
            default:
                image.src = 'images/cloudy-sun-removebg-preview.png';
        }
    
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/hr`;

    });
});

