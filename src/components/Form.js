import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

import { prepareLocationData } from '../utils';
import { useAppContext } from '../context/index';
import useFetchData from '../hooks/useFetchData';

function Form() {
  const [url, setUrl] = useState("");
  const {addCity} = useAppContext();
  const {data} = useFetchData(url);

  const history = useHistory();

  useEffect(() => {
    if(data?.length > 0){
      addCity(prepareLocationData(data));
      history.push("/forecast");
    }else if(data?.length === 0) {
      window.alert("Miasto nie zostało odnalezione");
    }
    setUrl("");
  }, [data, addCity]);

  const submitHandler = e => {
    e.preventDefault();
    const {city} = e.target.elements;
    
    if(city.value){
      setUrl(`https://api.openweathermap.org/geo/1.0/direct?q=${city.value}&limit=1&appid=${process.env.REACT_APP_API_KEY}`);
      e.target.reset();
    }
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <input 
        tabindex="0"
        type="text" 
        name="city"
        placeholder="Miasto" 
        onFocus={e => e.target?.parentNode?.classList.add("active")}
        onBlur={e => e.target?.parentNode?.classList.remove("active")}
      />
      <button type="submit" aria-label="Search city"><IoSearchOutline className="icon" /></button>
    </form>
  )
}

export default Form