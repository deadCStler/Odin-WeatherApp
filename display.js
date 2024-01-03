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
  console.log(dataJson);

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

  let currTemp = document.createElement("h1");
  currTemp.textContent = dataJson.temp_c;
  currTemp.classList.add("currTemp");

  today.appendChild(currTemp);

  let highlow = document.createElement("div");
  highlow.innerHTML = `<p>High: ${dataJson.threeDay[0].maxtemp_c}</p><p>Low: ${dataJson.threeDay[0].mintemp_c}</p>`;

  today.appendChild(highlow);

  dataJson.hourly.forEach((element) => {
    let div = document.createElement("div");

    let temp = document.createElement("div");
    let time = document.createElement("div");
    let img = document.createElement("img");

    temp.textContent = element.temp_c;
    time.textContent = element.time;
    img.src = element.condition.icon;

    div.appendChild(temp);
    div.appendChild(img);
    div.appendChild(time);

    // hourly.appendChild(div);
  });

  dataJson.threeDay.forEach((element) => {
    let div = document.createElement("div");

    let date = document.createElement("div");
    let img = document.createElement("img");
    let temp = document.createElement("div");

    date.textContent = element.date;
    img.src = element.condition.icon;
    temp.innerHTML = `${element.maxtemp_c}/${element.mintemp_c}`;

    div.appendChild(date);
    div.appendChild(img);
    div.appendChild(temp);

    // threeDayForecast.appendChild(div);
  });

  let wind = document.createElement("div");
  wind.classList.add("wind");
  wind.innerHTML = `<p>${dataJson.wind_kph}</p><p>${dataJson.wind_dir}</p>`;

  let humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.textContent = dataJson.humidity;

  let uv = document.createElement("div");
  uv.classList.add("uv");
  uv.textContent = dataJson.uv;

  currentOthers.appendChild(wind);
  currentOthers.appendChild(humidity);
  currentOthers.appendChild(uv);

  let sunrise = document.createElement("div");
  sunrise.textContent = `Sunrise: ${dataJson.threeDay[0].sunrise}`;
  sunrise.classList.add("sunrise");

  let sunset = document.createElement("div");
  sunset.textContent = `Sunset: ${dataJson.threeDay[0].sunset}`;
  sunset.classList.add("sunset");

  sun.appendChild(sunrise);
  sun.appendChild(sunset);
}

async function getInput() {
  let input = document.querySelector("#city");
  if (!input.validity.valid) {
    alert("Invalid Input");
    return;
  }
  const dataJson = await getCityData(input.value);
  displayData(dataJson);
}

function updateToday() {}

export const dom = function () {
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
  main.appendChild(today);
  main.appendChild(hourly);
  main.appendChild(threeDayForecast);
  main.appendChild(currentOthers);
  main.appendChild(sun);

  document.querySelector("#searchCity").addEventListener("click", (e) => {
    e.preventDefault();
    getInput();
  });
};
