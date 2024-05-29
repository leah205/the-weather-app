import findTempPreference from './temp-preference.js';
import { isToday, format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

const hourForecastContainer = document.querySelector('.day-forecast-container');

function displayHourlyForecast(hourArr, timezone) {
    console.log(hourArr);
    hourArr.forEach((hour) => {
        displayHour(hour, timezone);
    });
}
function displayHour(data, timezone) {
    const hourContainer = document.createElement('div');
    displayConditions(data, hourContainer);
    displayTemp(data, hourContainer);
    displayTime(data, hourContainer, timezone);
    hourForecastContainer.appendChild(hourContainer);
}

function displayTime(data, container, timezone) {
    const date = new Date(data.time);
    const currentHour = formatInTimeZone(new Date(), timezone, 'haa');
    const formattedDate = format(date, 'haa');
    const dateElement = document.createElement('p');
    dateElement.classList.add('hour-time');
    dateElement.textContent = formattedDate;
    if (isToday(date) && formattedDate == currentHour) {
        dateElement.textContent = 'now';
    }
    container.appendChild(dateElement);
}

function displayTemp(data, container) {
    const tempValue = data[`temp_${findTempPreference()}`];
    const value = `°${tempValue}`;
    const temp = document.createElement('p');
    temp.classList.add('hour-temp');
    temp.textContent = value;
    container.appendChild(temp);
}

function displayConditions(data, container) {
    const image = document.createElement('img');
    image.style.content = `url(${data.icon})`;
    container.appendChild(image);
}

export default displayHourlyForecast;
