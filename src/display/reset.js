function resetScreen() {
    resetCurrentWeather();
    resetLocation();
    resetHourForcast();
    resetDailyForecast();
    resetError();
}

function resetError() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage.textContent = '';
}

function resetDailyForecast() {
    const dailyForecastContainer = document.querySelector(
        '.daily-forecast-container'
    );
    deleteAllChildren(dailyForecastContainer);
}

function resetCurrentWeather() {
    const currentDivs = Array.from(
        document.querySelectorAll('.current-weather-container div')
    );
    currentDivs.forEach((div) => {
        deleteAllChildren(div);
    });
}

function resetHourForcast() {
    const container = document.querySelector('.day-forecast-container');
    deleteAllChildren(container);
}

function resetLocation() {
    const container = document.querySelector('.weather-header');
    deleteAllChildren(container);
}

function deleteAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

export default resetScreen;
