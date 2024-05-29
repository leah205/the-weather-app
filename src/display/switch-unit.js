import findTempPreference from './temp-preference.js';
const currentContainer = document.querySelector('.current-weather-container');

function switchUnit(data, button) {
    if (isSameUnit(button)) return;
    switchUnitButton(button);
    const selectedUnit = findTempPreference();
    updateCurrentWeather(selectedUnit, data.currentWeather);
    updateHourlyForecast(selectedUnit, data.hoursForecast);
    updateDailyForecast(selectedUnit, data.daysForecast);
}
function isSameUnit(button) {
    return button.classList.contains('selected measurement');
}

function updateDailyForecast(newUnit, data) {
    const dayContainers = Array.from(
        document.querySelectorAll('.daily-forecast-container > div')
    );
    dayContainers.forEach((container) => {
        const index = dayContainers.indexOf(container);
        const day = data.filter((day) => data.indexOf(day) === index);
        const minTemp = container.querySelector(
            '.min-max-container p:first-child'
        );
        const maxTemp = container.querySelector(
            '.min-max-container p:last-child'
        );
        minTemp.textContent = `°${day[0][`mintemp_${newUnit}`]}`;
        maxTemp.textContent = `°${day[0][`maxtemp_${newUnit}`]}`;
    });
}

function updateHourlyForecast(newUnit, data) {
    const hourContainers = Array.from(
        document.querySelectorAll('.day-forecast-container div')
    );

    hourContainers.forEach((container) => {
        const index = hourContainers.indexOf(container);
        const hour = data.filter((hour) => data.indexOf(hour) === index);
        const hourTemp = container.querySelector('.hour-temp');
        hourTemp.textContent = `°${hour[0][`temp_${newUnit}`]}`;
    });
}

function updateCurrentWeather(newUnit, data) {
    const tempValue = currentContainer.querySelector(
        '.current-weather-container > div:nth-child(1) .content'
    );
    tempValue.textContent = `°${data[`temp_${newUnit}`]}`;
    const feelsLikeValue = currentContainer.querySelector(
        '.current-weather-container > div:nth-child(3) .content'
    );
    console.log(`°${data[`feelslike_${newUnit}`]}`);
    // console.log(feelsLikeValue);
    feelsLikeValue.textContent = `°${data[`feelslike_${newUnit}`]}`;
    const windChillValue = currentContainer.querySelector(
        '.current-weather-container > div:nth-child(8) .content'
    );
    windChillValue.textContent = `°${data[`windchill_${newUnit}`]}`;
}

function switchUnitButton(button) {
    removeClass();
    button.classList.add('selected-measurement');
}

function removeClass() {
    const btns = Array.from(
        document.querySelectorAll('.measurement-container button')
    );
    btns.forEach((btn) => {
        btn.classList.remove('selected-measurement');
    });
}

export default switchUnit;
