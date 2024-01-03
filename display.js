import { getCityData } from "./dataCalls.js";

const createForm = function () {
  let searchForm = document.createElement("form");
  searchForm.setAttribute("novalidate", "");
  searchForm.setAttribute("id", "searchForm");

  let searchBarInput = document.createElement("input");
  searchBarInput.setAttribute("id", "city");
  searchBarInput.setAttribute("type", "text");
  searchBarInput.setAttribute("placeholder", "Enter a city name");
  searchBarInput.setAttribute("required", "");

  let searchButton = document.createElement("button");
  searchButton.setAttribute("type", "submit");
  searchButton.setAttribute("id", "searchCity");
  searchButton.textContent = "Search";

  searchForm.appendChild(searchBarInput);
  searchForm.appendChild(searchButton);

  return searchForm;
};

function displayData(dataJson) {

  const today = document.querySelector(".today");
  const hourly = document.querySelector(".hourly");
  const threeDayForecast = document.querySelector(".threeDayForecast");
  const currentOthers = document.querySelector(".currentOthers");
  const sun = document.querySelector(".sun");

  today.innerHTML = "";
  hourly.innerHTML = "";
  threeDayForecast.innerHTML = "";
  currentOthers.innerHTML = "";
  sun.innerHTML = "";

  //DOM for current details

  let todayHeading = document.createElement("div");
  todayHeading.innerHTML = `<h2>Now</h2> <div>${dataJson.location}</div>`;
  todayHeading.classList.add('todayHeading');

  let todayBody = document.createElement("div");
  todayBody.classList.add("todayBody");

  let currTemp = document.createElement("h1");
  currTemp.textContent = `${dataJson.temp_c}°`;
  currTemp.classList.add("currTemp");

  todayBody.appendChild(currTemp);

  let highlow = document.createElement("div");
  highlow.innerHTML = `<p>High: ${dataJson.threeDay[0].maxtemp_c}°</p><p>Low: ${dataJson.threeDay[0].mintemp_c}°</p>`;

  todayBody.appendChild(highlow);

  today.appendChild(todayHeading);
  today.appendChild(todayBody);

  //DOM for hourly forecast

  let hourlyHeading = document.createElement("h2");
  hourlyHeading.textContent = "Hourly Forecast";

  let hourlyBody = document.createElement("div");
  hourlyBody.classList.add("hourlyBody");

  dataJson.hourly.forEach((element) => {
    let div = document.createElement("div");

    let temp = document.createElement("div");
    let time = document.createElement("div");
    let img = document.createElement("img");

    temp.textContent = `${element.temp_c}°`;
    time.textContent = element.time;
    img.src = element.condition.icon;

    div.appendChild(temp);
    div.appendChild(img);
    div.appendChild(time);

    hourlyBody.appendChild(div);
  });

  hourly.appendChild(hourlyHeading);
  hourly.appendChild(hourlyBody);

  //DOM for 3 day forecast

  let threeDayForecastHeading = document.createElement("h2");
  threeDayForecastHeading.textContent = "3-day Forecast";

  let threeDayForecastBody = document.createElement("div");
  threeDayForecastBody.classList.add("threeDayForecastBody");

  dataJson.threeDay.forEach((element) => {
    let div = document.createElement("div");

    let date = document.createElement("div");
    let img = document.createElement("img");
    let temp = document.createElement("div");

    date.textContent = element.date;
    img.src = element.condition.icon;
    temp.innerHTML = `${element.maxtemp_c}°/${element.mintemp_c}°`;

    div.appendChild(date);
    div.appendChild(img);
    div.appendChild(temp);

    threeDayForecastBody.appendChild(div);
  });

  threeDayForecast.appendChild(threeDayForecastHeading);
  threeDayForecast.appendChild(threeDayForecastBody);

  //DOM for current conditions

  let currentOthersHeading = document.createElement("h2");
  currentOthersHeading.textContent = "Current Conditions";

  let currentOthersBody = document.createElement("div");
  currentOthersBody.classList.add("currentOthersBody");

  let wind = document.createElement("div");
  wind.classList.add("wind");
  wind.innerHTML = `<p>Wind: ${dataJson.wind_kph}km/h from ${dataJson.wind_dir}</p>`;

  let humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.textContent = `Humidity: ${dataJson.humidity}%`;

  let uv = document.createElement("div");
  uv.classList.add("uv");
  uv.textContent = `UV Index: ${dataJson.uv}`;

  currentOthersBody.appendChild(wind);
  currentOthersBody.appendChild(humidity);
  currentOthersBody.appendChild(uv);

  currentOthers.appendChild(currentOthersHeading);
  currentOthers.appendChild(currentOthersBody);

  //DOM for sunrise & sunset

  let sunHeading = document.createElement("h2");
  sunHeading.textContent = "Sunrise & Sunset";

  let sunBody = document.createElement("div");
  sunBody.classList.add("sunBody");

  let sunrise = document.createElement("div");
  sunrise.textContent = `Sunrise: ${dataJson.threeDay[0].sunrise}`;
  sunrise.classList.add("sunrise");

  let sunset = document.createElement("div");
  sunset.textContent = `Sunset: ${dataJson.threeDay[0].sunset}`;
  sunset.classList.add("sunset");

  sunBody.appendChild(sunrise);
  sunBody.appendChild(sunset);

  sun.appendChild(sunHeading);
  sun.appendChild(sunBody);
}

async function getInput() {
  let input = document.querySelector("#city");
  if (!input.validity.valid) {
    alert("Invalid Input");
    return;
  }
  else if (!/^[a-zA-Z\s]+$/.test(input.value.trim())) {
    alert("Input must contain only alphabetic characters");
    return;
  }
  const dataJson = await getCityData(input.value);
  displayData(dataJson);
}

const dom = (function () {
  const main = document.querySelector("#main");

  let today = document.createElement("div");
  today.classList.add("today");

  let hourly = document.createElement("div");
  hourly.classList.add("hourly");

  let threeDayForecast = document.createElement("div");
  threeDayForecast.classList.add("threeDayForecast");

  let currentOthers = document.createElement("div");
  currentOthers.classList.add("currentOthers");

  let sun = document.createElement("div");
  sun.classList.add("sun");
  main.appendChild(createForm());

  document.querySelector("#searchCity").addEventListener("click", (e) => {
    e.preventDefault();
    main.appendChild(today);
    main.appendChild(hourly);
    main.appendChild(threeDayForecast);
    main.appendChild(currentOthers);
    main.appendChild(sun);
    getInput();
  });
})();
