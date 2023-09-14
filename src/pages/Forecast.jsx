import { useLoaderData, redirect } from 'react-router-dom';

import { motion } from 'framer-motion';
import { CONTAINER_VARIANTS } from '../data/variants';

import Header from '../components/Header';
import Current from '../components/Current';
import Daily from '../components/Daily';
import Viewed from '../components/Viewed';

export function Component() {
  const { weather, location } = useLoaderData();

  return (
    <motion.section 
      className="forecast" 
      style={{backgroundImage: weather.current.theme.background, color: weather.current.theme.color}}
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
    >
      <Header city={location.city} />
      <div className="content">
        <Current data={weather.current} timezoneOffset={weather.timezone_offset} />
        <Daily data={weather.daily} />
        <Viewed />
      </div>
    </motion.section>
  )
}

Component.displayName = "Forecast";

export async function loader({ params }){
  const { getFromStorage, saveInStorage, formatWeatherData } = await import("../utils");
  const storageData = getFromStorage("weather_react_app_mz");
  
  const location = storageData.find(item => item.id === params.city);
  if(!location) throw redirect("/");

  //fetch weather
  const { fetchWeather } = await import("../services");

  let fetchData;

  try {
    fetchData = await fetchWeather(location.lat, location.lon);
  }catch(err){
    return { message: err.message }
  }

  const weather = formatWeatherData(fetchData);

  saveInStorage("weather_react_app_mz", storageData.map(item => item.id !== params.city ? item : ({
    ...item,
    updatedAt: new Date().getTime(),
    current: { icon: weather.current.icon, description: weather.current.description, temp: weather.current.temp }
  })));

  return {
    weather,
    location
  };
}