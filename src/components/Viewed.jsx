import { useMemo } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import Location from './Location';

function Viewed() {
  const contextData = useOutletContext();
  const { city } = useParams();

  const locations = useMemo(() => contextData.filter(locationItem => locationItem.id !== city).slice(0,5), [contextData, city]);

  return (
    <div className="viewed">
      {locations.map(item => (
        <Location data={item} key={`viewed-${item.id}`} />
      ))}
    </div>
  )
}

export default Viewed