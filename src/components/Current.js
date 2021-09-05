import { useAppContext } from '../context/index';
import { useMemo } from 'react';
import { formatTime } from '../utils';

function Current() {
  const {active: {current, timezone_offset}} = useAppContext();

  const time = useMemo(() => {
    return timezone_offset ? formatTime(timezone_offset) : "";
  }, [timezone_offset]);


  return (
    <section className="current">
      <header>
        <p><span className="bold">{time} |</span> <span className="desktop">{current.date.day},</span> {current.date.normal}</p>
        <p><img src="./icons/sun.png" alt="sun" /> {current.sunrise} / {current.sunset}</p>
      </header>
      <div className="temp">
        <img src={current.icon} alt={current.description} />
        <p>{current.description}</p>
        <h1>{current.temp}</h1>
      </div>
      <div className="properties">
        {Object.values(current.properties).map(item => (
          <div key={`property-${item.name}`} className="property">
            <p>{item.name}</p>
            <h3>{item.value}</h3>  
          </div>
        ))}
      </div>
    </section>
  )
}

export default Current
