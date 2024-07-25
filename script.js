async function fetchCountries() {
  try {
    let res = await fetch("https://restcountries.com/v3.1/all");
    let countries = await res.json();
    displayCountries(countries);
  } catch (error) {
    console.error(error);
  }
}

async function fetchWeather(lat, lon) {
  try {
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e3624f55ee649b4daf34f33f61be47d3`);
    let weatherData = await res.json();
    return weatherData.main.temp;
  } catch (error) {
    console.error(error);
  }
}

function displayCountries(countries) {
  let container = document.createElement("div");
  container.className = "container";

  let row = document.createElement("div");
  row.className = "row";

  countries.forEach((country, index) => {
    let col = document.createElement("div");
    col.className = "col-lg-4";

    col.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${country.flags.png}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${country.name.common}</h5>
          <p class="card-text">${country.name.official}</p>
          <p class="card-text"><small class="text-muted"><b>Capital:</b> ${country.capital}</small></p>
          <p class="card-text"><small class="text-muted"><b>Region:</b> ${country.region}</small></p>      
          <p class="card-text"><small class="text-muted"><b>Latitude - Longitude:</b> ${country.latlng}</small></p>
          <p class="card-text"><small class="text-muted"><b>Country-Code:</b> ${country.cca3}</small></p>
          <a href="#" class="btn btn-primary" id="check-weather-${index}">Check Weather</a>
        </div>
      </div>
    `;

    row.append(col);
    container.append(row);
    document.body.append(container);

    let weatherButton = document.getElementById(`check-weather-${index}`);
    weatherButton.addEventListener("click", async (event) => {
      event.preventDefault();
      let [lat, lon] = country.latlng;
      let tempKelvin = await fetchWeather(lat, lon);
      let tempCelsius = tempKelvin - 273.15;
      weatherButton.textContent = `Temp: ${tempCelsius.toFixed(2)}°C`;
    });
  });
}
fetchCountries();
