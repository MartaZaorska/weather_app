import { IoSearchOutline } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';

import { prepareLocationData } from '../utils';
import { useAppContext } from '../context/index';
import { location } from '../data';

function Form() {
  const { addCity } = useAppContext();
  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault();
    addCity(prepareLocationData(location));
    e.target.reset();
    history.push("/forecast");
  }

  return (
    <form className="form" onSubmit={submitHandler}>
      <input 
        type="text" 
        name="city"
        placeholder="Szukaj" 
        onFocus={e => e.target?.parentNode?.classList.add("active")}
        onBlur={e => e.target?.parentNode?.classList.remove("active")}
      />
      <button type="submit"><IoSearchOutline className="icon" /></button>
    </form>
  )
}

export default Form