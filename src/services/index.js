async function fetchData(url){
  const res = await fetch(url);
  if(res.status !== 200) throw new Error("Nie udało się pobrać danych");
  return await res.json();
}

export async function fetchLocation(city){
  return await fetchData(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_API_KEY}`);
}


export async function fetchWeather(lat, lon){
  return await fetchData(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=pl&units=metric&exclude=alerts,minutely,hourly&appid=${import.meta.env.VITE_API_KEY}`)
}

