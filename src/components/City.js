import {memo} from 'react';
import {MdClose} from 'react-icons/md';
import { useHistory } from 'react-router-dom';

import { useAppContext } from '../context/index';

function City({item}) {
  const {changeActive} = useAppContext();
  const history = useHistory();

  const clickHandler = () => {
    changeActive(item);
    history.push("/forecast");
  }

  return (
    <section onClick={clickHandler} className={item.current ? "city" : "city center"}>
        {item.current ? (
          <div>
            <h1><img src={item.current.icon} alt="weather icon" /> <span>{item.current.temp}</span></h1>
            <h3>{item.current.description}</h3>
            <p>{item.city}, {item.country}</p>
          </div>
        ) : (
          <div>
            <p>{item.city}, {item.country}</p>
          </div>
        )}
      <button><MdClose className="icon" /></button>
    </section>
  )
}

export default memo(City);
