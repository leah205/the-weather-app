//need location as well

import { format, formatInTimeZone } from 'date-fns-tz';
function createCurrentData(data) {
    console.log(data);
    const {
        condition: { text, icon },
        feelslike_f,
        feelslike_c,
        wind_mph,
        is_day,
        precip_in,
        temp_c,
        temp_f,
        uv,
        humidity,
        windchill_c,
        windchill_f,
    } = data;

    return {
        text,
        icon,
        feelslike_f,
        feelslike_c,
        wind_mph,
        is_day,
        precip_in,
        temp_c,
        temp_f,
        uv,
        humidity,
        windchill_c,
        windchill_f,
    };
}

function createDayWeatherData(data) {
    ///how to destruc
    const {
        date,
        astro: { sunrise, sunset },
        day: {
            maxtemp_c,
            maxtemp_f,
            mintemp_c,
            mintemp_f,
            condition: { icon },
            daily_chance_of_rain,
            daily_chance_of_snow,
        },
    } = data;
    return {
        date,
        maxtemp_c,
        maxtemp_f,
        mintemp_c,
        mintemp_f,
        icon,
        sunrise,
        sunset,
        daily_chance_of_rain,
        daily_chance_of_snow,
    };
}

function createLocationData(data) {
    const { country, name, region, tz_id } = data;
    return { country, name, region, tz_id };
}
//sunrise sunset
function createDaysForecastData(data) {
    const daysForecastData = [];
    data.forEach((day) => {
        daysForecastData.push(createDayWeatherData(day));
    });
    return daysForecastData;
}
function createHourWeatherData(data) {
    //chancd rain/snow
    //next 24 hours
    const {
        condition: { icon },
        temp_c,
        temp_f,
        time,
    } = data;
    return { icon, temp_c, temp_f, time };
}
function createHoursForecastData(today, tomorrow, timezone) {
    const currentHour = formatInTimeZone(new Date(), timezone, 'HH');
    console.log(currentHour);
    const hoursForecastData = [];
    const filteredToday = today.filter(
        (hour) => today.indexOf(hour) >= currentHour
    );
    const filteredTomorrow = tomorrow.filter(
        (hour) => tomorrow.indexOf(hour) <= currentHour
    );
    filteredToday.forEach((hour) => {
        hoursForecastData.push(createHourWeatherData(hour));
    });
    filteredTomorrow.forEach((hour) => {
        hoursForecastData.push(createHourWeatherData(hour));
    });

    return hoursForecastData;
}

function createCityWeatherData(result) {
    const locationData = createLocationData(result.location);
    const currentWeather = createCurrentData(result.current);
    const daysForecast = createDaysForecastData(result.forecast.forecastday);
    const hoursForecast = createHoursForecastData(
        result.forecast.forecastday[0].hour,
        result.forecast.forecastday[1].hour,
        locationData.tz_id
    );

    return { currentWeather, daysForecast, hoursForecast, locationData };
}

export default createCityWeatherData;
