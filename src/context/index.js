import { useContext, createContext, useState, useEffect } from "react";

const Context = createContext();

export function Provider({children}){
  const [cities, setCities] = useState([]);
  const [active, setActive] = useState(undefined);

  useEffect(() => {
    const localData = localStorage.getItem("weather_react_app");
    if(localData){
      setCities(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weather_react_app", JSON.stringify(cities.map(item => ({...item, current: undefined, daily: []}))));
  }, [cities]);

  const addCity = (data) => {
    const index = cities.findIndex(item => item.city === data.city && item.country === data.country);
    if(index < 0){
      setCities([...cities, data].sort((a,b) => b.daily.length - a.daily.length));
      setActive(data);
    }else{
      setActive(cities[index]);
    }
  }

  const updateCity = (data) => {
    const updatedCities = cities.map(item => item.city === data.city && item.country === data.country ? data : item);
    setCities(updatedCities.sort((a,b) => b.daily.length - a.daily.length));
    setActive(data);
  }

  const changeActive = (data) => setActive(data);

  const deleteCity = (data) => {
    const updatedCities = cities.filter(item => item.city !== data.city || item.country !== data.country);
    setCities(updatedCities);
  }

  return (
    <Context.Provider value={{cities, active, addCity, updateCity, deleteCity, changeActive}}>
      {children}
    </Context.Provider>
  );
}

export const useAppContext = () => useContext(Context);