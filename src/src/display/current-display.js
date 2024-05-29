import findTempPreference from './temp-preference.js';
const currentContainer = document.querySelector('.current-weather-container');

function displayCurrentData(data) {
    displayTemp(data);
    displayConditions(data);
    displayFeelsLike(data);
    displayHumidity(data);
    displayPrecipitation(data);
    displayWind(data);
    displayElement('UV', data.uv, 7);
    displayWindChill(data);
}

function displayConditions(data) {
    const container = currentContainer.querySelector(`div:nth-child(2)`);
    const image = document.createElement('img');
    image.style.content = `url(${data.icon})`;
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = data.text;
    container.appendChild(description);
    container.appendChild(image);
}

function displayWindChill(data) {
    const chillValue = data[`windchill_${findTempPreference()}`];
    const value = `°${chillValue}`;
    displayElement('Wind Chill', value, 8);
}
function displayWind(data) {
    const value = `${data.wind_mph}`;
    displayElement('mph wind', value, 6);
}
function displayPrecipitation(data) {
    const value = `${data.precip_in}in`;
    displayElement('Precipitation', value, 5);
}

function displayHumidity(data) {
    const value = `${data.humidity}%`;
    displayElement('humidity', value, 4);
}

function displayTemp(data) {
    const tempValue = data[`temp_${findTempPreference()}`];
    const value = `°${tempValue}`;
    displayElement('temperature', value, 1);
}

function displayFeelsLike(data) {
    const feelsLikeValue = data[`feelslike_${findTempPreference()}`];
    const value = `°${feelsLikeValue}`;
    displayElement('feels like', value, 3);
}

function displayElement(key, value, n) {
    const container = currentContainer.querySelector(`div:nth-child(${n})`);
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = key;
    const content = document.createElement('p');
    content.classList.add('content');
    content.textContent = value;
    container.appendChild(description);
    container.appendChild(content);
}

export default displayCurrentData;
