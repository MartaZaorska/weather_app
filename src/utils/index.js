import { DAYS, THEME } from '../data/constants';
import { ICONS } from '../data/icons';


//FORMAT

function getTheme(data, timezoneOffset){
  const timeNow = +formatTime(timezoneOffset).slice(0,2);
  const sunsetTime = +formatTime(timezoneOffset, data.sunset).slice(0,2);
  const sunriseTime = +formatTime(timezoneOffset, data.sunrise).slice(0,2);

  if(timeNow >= sunriseTime && timeNow < 14){
    return data.clouds <= 40 ? THEME.light.sunny : THEME.light.cloudy;
  }

  if(timeNow >= 14 && timeNow < sunsetTime){
    return data.clouds <= 40 ? THEME.dark.sunny : THEME.dark.cloudy;
  }

  return timeNow >= sunsetTime && timeNow < 22 ? THEME.light.night : THEME.dark.night;
}

function getIcon(name, moon_phase){
  const full_name = ["01n", "02n"].includes(name) && [0,1,0.5].includes(moon_phase) ? `${name}${moon_phase}` : name;
  return ICONS[full_name];
}

function formatProperties(data){
  return {
    clouds: { name: "Zachmurzenie", value: `${data.clouds}%` },
    humidity: { name: "Wilgotność", value: `${data.humidity}%` },
    wind_speed: { name: "Wiatr", value: `${data.wind_speed} m/s` },
    pressure: { name: "Ciśnienie", value: `${data.pressure} hPa` }
  };
}

function capitalizeFirstLetter(text){ return `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`; }

function formatTemperature(temp){
  return `${temp.toFixed(0)}°C`;
}

function formatDate(datetime, timezoneOffset){
  const date = new Date(datetime * 1000 + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
  return {
    day: DAYS[date.getDay()],
    text: `${`${date.getDate()}`.padStart(2, "0")}.${`${date.getMonth() + 1}`.padStart(2, "0")}.${date.getFullYear()}`
  };
}

export function formatTime(timezoneOffset, datetime = 0){
  const tmp = datetime ? datetime * 1000 : Date.now();
  const date = new Date(tmp + timezoneOffset * 1000 + new Date().getTimezoneOffset() * 60000);
  return `${`${date.getHours()}`.padStart(2, "0")}:${`${date.getMinutes()}`.padStart(2, "0")}`;
}

export function formatLocationData(data){
  return {
    id: data.name.split(" ").join("-").toLowerCase(),
    lat: data.lat,
    lon: data.lon,
    city: data.local_names?.pl || data.name,
    country: data.country,
    current: undefined,
    daily: []
  }
}

export function formatWeatherData(data){
  const { current, daily, timezone_offset } = data;

  const currentData = {
    date: formatDate(current.dt, timezone_offset),
    sunrise: formatTime(timezone_offset, current.sunrise),
    sunset: formatTime(timezone_offset, current.sunset),
    temp: formatTemperature(current.temp),
    description: capitalizeFirstLetter(current.weather[0].description),
    icon: getIcon(current.weather[0].icon, daily[0].moon_phase),
    theme: getTheme(current, timezone_offset),
    properties: {
      ...formatProperties(current),
      feels_like: { name: "Odczuwalna", value: formatTemperature(current.feels_like) },
      min_max: { name: "Min/Max", value: `${formatTemperature(daily[0].temp.min).slice(0, -2)}/${formatTemperature(daily[0].temp.max)}` },
      uvi: { name: "UV", value: `${current.uvi}` },
      rain: { name: "Deszcz", value: `${data.rain?.["1h"] || 0} mm`},
      snow: { name: "Śnieg", value: `${data.snow?.["1h"] || 0} mm` },
    }
  };

  const dailyData = daily.slice(1).map(item => ({
    date: formatDate(item.dt, data.timezone_offset),
    temp: `${formatTemperature(item.temp.day).slice(0, -2)}/${formatTemperature(item.temp.night)}`,
    description: capitalizeFirstLetter(item.weather[0].description),
    icon: getIcon(item.weather[0].icon, item.moon_phase),
    properties: {
      ...formatProperties(item),
      rain: { name: "Deszcz", value: `${item.rain || 0} mm` },
      snow: { name: "Śnieg", value: `${item.snow || 0} mm` },
    }
  }));

  return { daily: dailyData, current: currentData, timezone_offset };
}


//LOCAL STORAGE

export function getFromStorage(key){
  const localData = localStorage.getItem(key);
  return localData ? JSON.parse(localData) : null;
}

export function saveInStorage(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}
