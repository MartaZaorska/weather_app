import {DAYS, THEME, ICONS} from "./constants";


function formatDate(dt, timezoneOffset){
  const date = new Date(dt * 1000 + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
  return {
    day: DAYS[date.getDay()],
    normal: `${date.getDate()}`.padStart(2, "0") + "." + `${date.getMonth() + 1}`.padStart(2, "0") + `.${date.getFullYear()}`
  }
}

function formatTime(dt, timezoneOffset){
  const date = new Date(dt * 1000 + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
  return `${date.getHours()}`.padStart(2,"0") + ":" +`${date.getMinutes()}`.padStart(2, "0");
}

function getTheme(data, clouds, timezoneOffset){
  const now = new Date(getTimeNow(timezoneOffset)).getHours();
  const moonrise = +formatTime(data.moonrise, timezoneOffset).slice(0,2);
  const moonset = +formatTime(data.moonset, timezoneOffset).slice(0,2);

  if(moonset <= now && now < 12){
    return clouds <= 40 ? THEME.light.sunny : THEME.light.cloudy;
  }
  
  if(now >= 12 && now < moonrise){
    return clouds <= 40 ? THEME.dark.sunny : THEME.dark.cloudy;
  }

  if(now >= moonrise && now < 1) return THEME.light.night;
  
  return THEME.dark.night;
}

function getIcon(name, moon_phase){
  let n = name;
  if(name === "01n" || name === "02n"){
    n += moon_phase === 0 || moon_phase === 1 || moon_phase === 0.5 ? moon_phase : "";
  } 

  return ICONS[n];
}

function capitalizeFirstLetter(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function prepareLocationData(data){
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    city: data[0].local_names?.pl || data[0].name,
    country: data[0].country,
    current: undefined,
    daily: []
  }
}

export function prepareWeatherData(data){
  const current = {
    date: formatDate(data.current.dt, data.timezone_offset),
    sunrise: formatTime(data.current.sunrise, data.timezone_offset),
    sunset: formatTime(data.current.sunset, data.timezone_offset),
    temp: `${data.current.temp.toFixed(0)}°C`,
    description: capitalizeFirstLetter(data.current.weather[0].description),
    icon: getIcon(data.current.weather[0].icon, data.daily[0].moon_phase),
    theme: getTheme(data.daily[0], data.current.clouds, data.timezone_offset),
    properties: {
      feels_like: {name: "Odczuwalna", value: `${data.current.feels_like.toFixed(0)}°C`},
      min_max: {name: "Min/Max", value: `${data.daily[0].temp.min.toFixed(0)}/${data.daily[0].temp.max.toFixed(0)}°C`},
      clouds: {name: "Zachmurzenie", value: `${data.current.clouds}%`},
      rain: {name: "Deszcz", value: `${data.current.rain?.["1h"] || 0} mm`},
      snow: {name: "Śnieg", value: `${data.current.snow?.["1h"] || 0} mm`},
      humidity: {name: "Wilgotność", value: `${data.current.humidity}%`},
      wind_speed: {name: "Wiatr", value: `${data.current.wind_speed} m/s`},
      pressure: {name: "Ciśnienie", value: `${data.current.pressure} hPa`},
      uvi: {name: "UV", value: `${data.current.uvi}`}
    }
  };

  const daily = data.daily.slice(1).map(item => ({
    date: formatDate(item.dt, data.timezone_offset),
    temp: `${item.temp.day.toFixed(0)}/${item.temp.night.toFixed(0)}°C`,
    description: capitalizeFirstLetter(data.current.weather[0].description),
    icon: getIcon(item.weather[0].icon, item.moon_phase),
    properties: {
      clouds: {name: "Zachmurzenie", value: `${item.clouds}%`},
      rain: {name: "Deszcz", value: `${item.rain || 0} mm`},
      snow: {name: "Śnieg", value: `${item.snow || 0} mm`},
      humidity: {name: "Wilgotność", value: `${item.humidity}%`},
      wind_speed: {name: "Wiatr", value: `${item.wind_speed} m/s`},
      pressure: {name: "Ciśnienie", value: `${item.pressure} hPa`},
    }
  }));


  return {
    timezone_offset: data.timezone_offset,
    current,
    daily
  }
}

export function getTimeNow(timezoneOffset){
  const date = new Date(Date.now() + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
  return date.getTime();
}

