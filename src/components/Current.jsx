import { formatTime } from '../utils';

function Current({ data, timezoneOffset }) {
  const time = timezoneOffset ? formatTime(timezoneOffset) : "";

  return (
    <section className="current">
      <header>
        <p><mark>{time} |</mark> <span className="desktop">{data.date.day},</span> {data.date.text}</p>
        <p><img src="./sun.png" alt="sun" /> {data.sunrise} / {data.sunset}</p>
      </header>
      <div className="temp">
        <img src={data.icon} alt={data.description} />
        <p>{data.description}</p>
        <h1>{data.temp}</h1>
      </div>
      <div className="properties">
        {Object.values(data.properties).map(item => (
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