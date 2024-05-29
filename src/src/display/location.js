const locationContainer = document.querySelector('.weather-header');

function displayLocation(data) {
    const city = document.createElement('h1');
    city.textContent = data.name;
    city.classList.add('city');
    const region = document.createElement('h2');
    region.textContent = data.region;
    region.classList.add('region');
    const country = document.createElement('h3');
    country.textContent = data.country;
    country.classList.add('country');
    locationContainer.appendChild(city);
    locationContainer.appendChild(region);
    locationContainer.appendChild(country);
}

export default displayLocation;
