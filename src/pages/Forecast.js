import { useEffect, useState } from 'react';
import { useAppContext } from '../context/index';
import { prepareWeatherData } from '../utils';
import useFetchData from '../hooks/useFetchData';

import Header from '../components/Header';
import Current from '../components/Current';
import Daily from '../components/Daily';
import Viewed from '../components/Viewed';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Forecast() {
  const [url, setUrl] = useState("");
  const {updateCity, active} = useAppContext();

  const {data, loading, error} = useFetchData(url);

  useEffect(() => {
    if(active.daily.length === 0){
      setUrl(`https://api.openweathermap.org/data/2.5/onecall?lat=${active.lat}&lon=${active.lon}&lang=pl&units=metric&exclude=alerts,minutely,hourly&appid=${process.env.REACT_APP_API_KEY}`);
    }
  }, [active]);

  useEffect(() => {
    if(data && active.daily.length === 0){
      updateCity({...active, ...prepareWeatherData(data)});
      setUrl("");
    }
  }, [data, active, updateCity]);

  if(loading || active.daily.length === 0) return <Loader />

  if(error) return <Error />

  return (
    <section className="forecast" style={{backgroundImage: active.current.theme.background, color: active.current.theme.color}}>
      <Header city={active.city} />
      <div className="content">
        <Current />
        <Daily />
        <Viewed />
      </div>
    </section>
  )
}

export default Forecast