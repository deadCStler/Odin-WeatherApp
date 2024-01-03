const key = "af830071d0854cbdb89191722232712";
const baseURL = "https://api.weatherapi.com/v1";

function processData(responseObj) {
  let obj = {};
  obj.temp_c = responseObj.current.temp_c;
  obj.temp_f = responseObj.current.temp_f;
  obj.wind_kph = responseObj.current.wind_kph;
  obj.wind_mph = responseObj.current.wind_mph;
  obj.wind_dir = responseObj.current.wind_dir;
  obj.humidity = responseObj.current.humidity;
  obj.uv = responseObj.current.uv;

  obj.hourly = responseObj.forecast.forecastday[0].hour.map((element) => ({
    time: element.time.split(" ")[1],
    temp_c: element.temp_c,
    temp_f: element.temp_f,
    condition: element.condition,
  }));

  obj.threeDay = responseObj.forecast.forecastday.map((element) => ({
    date: element.date,
    sunrise: element.astro.sunrise,
    sunset: element.astro.sunset,
    maxtemp_c: element.day.maxtemp_c,
    maxtemp_f: element.day.maxtemp_f,
    mintemp_c: element.day.mintemp_c,
    mintemp_f: element.day.mintemp_f,
    condition: element.day.condition,
  }));

  obj.location = `${responseObj.location.name}, ${responseObj.location.region}, ${responseObj.location.country}`;

  return obj;
}

async function fetchData(location) {
  try {
    const obj = await fetch(
      `${baseURL}/forecast.json?key=${key}&q=${location}&days=3`,
      { mode: "cors" }
    );
    if (!obj.ok) {
      throw new Error();
    }
    return await obj.json();
  } catch (error) {
    alert(`No matching location found for ${location}`);
  }
}

export async function getCityData(location) {
  const responseObj = await fetchData(location);
  return processData(responseObj);
}
