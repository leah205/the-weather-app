async function getForecast(city) {
    try {
        const forecastData = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=a5eec768c43e4807897165154242605&q=${city}&days=3`,
            {
                mode: 'cors',
            }
        );
        return forecastData.json();
    } catch (err) {
        alert(err);
    }
}

export { getForecast };
