import { formatInTimeZone, format } from 'date-fns-tz';
import findTempPreference from './temp-preference.js';
import rainUrl from '../images/rain.svg';
import snowUrl from '../images/snow.svg';
import sunriseUrl from '../images/sunrise.svg';
import sunsetUrl from '../images/sunset.svg';

const dailyForecastContainer = document.querySelector(
    '.daily-forecast-container'
);

function displayDailyForecast(data, timezone) {
    data.forEach((day) => {
        displayDay(day, timezone);
    });
}

function displayDay(data, timezone) {
    const dayContainer = document.createElement('div');
    displayDate(data.date, dayContainer, timezone);
    displayCondition(data.icon, dayContainer);
    displayTemp(data, dayContainer);
    displaySnowAndRain(data, dayContainer);
    displayAstro(data, dayContainer);
    dailyForecastContainer.appendChild(dayContainer);
}
function displayAstro(data, container) {
    console.log(data);
    const astroContainer = document.createElement('div');
    astroContainer.classList.add('astro-container');
    const sunriseContainer = document.createElement('div');
    const sunsetContainer = document.createElement('div');
    const sunriseIcon = document.createElement('img');
    sunriseIcon.src = sunriseUrl;
    const sunriseText = document.createElement('p');
    sunriseText.textContent = data.sunrise;
    const sunsetText = document.createElement('p');
    sunsetText.textContent = data.sunset;
    const sunsetIcon = document.createElement('img');
    sunsetIcon.src = sunsetUrl;
    sunriseContainer.appendChild(sunriseIcon);
    sunriseContainer.appendChild(sunriseText);
    sunsetContainer.appendChild(sunsetIcon);
    sunsetContainer.appendChild(sunsetText);
    astroContainer.appendChild(sunriseContainer);
    astroContainer.appendChild(sunsetContainer);
    container.appendChild(astroContainer);
}
function displaySnowAndRain(data, container) {
    const snowAndRainContainer = document.createElement('div');
    snowAndRainContainer.classList.add('snow-and-rain-container');
    const snowContainer = document.createElement('div');
    const snowText = document.createElement('p');
    snowText.textContent = `${data.daily_chance_of_snow}%`;
    const snowIcon = document.createElement('img');
    snowIcon.src = snowUrl;
    const rainContainer = document.createElement('div');
    const rainIcon = document.createElement('img');
    const rainText = document.createElement('p');
    rainText.textContent = `${data.daily_chance_of_rain}%`;
    rainIcon.src = rainUrl;
    snowContainer.appendChild(snowIcon);
    snowContainer.appendChild(snowText);
    rainContainer.appendChild(rainIcon);
    rainContainer.appendChild(rainText);
    snowAndRainContainer.appendChild(snowContainer);
    snowAndRainContainer.appendChild(rainContainer);
    container.appendChild(snowAndRainContainer);
}
function displayTemp(data, container) {
    const minMaxContainer = document.createElement('div');
    minMaxContainer.classList.add('min-max-container');
    const minTemp = document.createElement('p');
    const maxTemp = document.createElement('p');
    minTemp.textContent = `°${data[`mintemp_${findTempPreference()}`]}`;
    maxTemp.textContent = `°${data[`maxtemp_${findTempPreference()}`]}`;
    minMaxContainer.appendChild(minTemp);
    minMaxContainer.appendChild(maxTemp);
    container.appendChild(minMaxContainer);
}

function displayCondition(icon, container) {
    const image = document.createElement('img');
    image.style.content = `url(${icon})`;
    container.appendChild(image);
}
function displayDate(date, container, timezone) {
    const dateText = document.createElement('p');
    const newDate = date.replace('-', '/');
    const formattedDate = format(newDate, 'EEEE');
    const currentDate = formatInTimeZone(new Date(), timezone, 'EEEE');
    dateText.textContent = formattedDate;
    if (formattedDate == currentDate) {
        dateText.textContent = 'Today';
    }
    container.appendChild(dateText);
}

export default displayDailyForecast;
