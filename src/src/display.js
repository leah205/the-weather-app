import { getForecast } from './get-data.js';
import displayCurrentData from './display/current-display.js';
import searchIcon from './images/search.svg';
import createCityWeather from './process-data.js';
import resetScreen from './display/reset.js';
import switchUnit from './display/switch-unit.js';
import displayLocation from './display/location.js';
import displayHourlyForecast from './display/hourly-forecast.js';
import displayDailyForecast from './display/daily-forecast.js';
import displayError from './display/error-display.js';

const locationInput = document.querySelector('#location');
const searchLocationBtn = document.querySelector('.search-btn');
let location;
function loadEventListeners() {
    const tempBtns = Array.from(
        document.querySelectorAll('.measurement-container button')
    );
    tempBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            triggerSwitchUnit(location, btn);
        });
    });
    searchLocationBtn.addEventListener('click', () => {
        triggerDisplay(locationInput.value);
    });
}

function triggerDisplay(location) {
    return getForecast(location).then((result) => {
        if (result.error) {
            displayError();
        } else {
            displayData(createCityWeather(result), location);
        }
    });
}

function triggerSwitchUnit(location, button) {
    return getForecast(location).then((result) => {
        switchUnit(createCityWeather(result), button);
    });
}

function loadImages() {
    const searchLocationImg = document.querySelector('.search-btn img');
    searchLocationImg.src = searchIcon;
}

function displayData(obj, place) {
    location = place;
    resetScreen();
    displayCurrentData(obj.currentWeather);
    displayLocation(obj.locationData);
    displayHourlyForecast(obj.hoursForecast, obj.locationData.tz_id);
    displayDailyForecast(obj.daysForecast, obj.locationData.tz_id);
    //displayLocationData(obj.locationData);
}

export { loadEventListeners, loadImages };

export default triggerDisplay;
