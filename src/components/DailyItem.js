import { memo, useState } from 'react'

function DailyItem({item}) {
  const [show, setShow] = useState(false);

  return (
    <div className="daily__item" onClick={() => setShow(!show)}>
      <header>
        <p><span className="bold">{item.date.day}</span><span>{item.date.normal}</span></p>
        <h2>{item.temp}</h2>
        <img src={item.icon} alt={item.description} />
      </header>
      {show && (
        <div className="properties">
          {Object.values(item.properties).map(property => (
            <div key={`property-${item.date.normal}-${property.name}`} className="property">
              <p>{property.name}</p>
              <h3>{property.value}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default memo(DailyItem);
