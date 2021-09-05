import { useAppContext } from '../context/index';
import City from './City';

function Viewed() {
  const {cities, active} = useAppContext();

  return (
    <div className="viewed">
      {cities.filter((item) => active.city !== item.city || active.country !== item.country).slice(0, 5).map(item => (
        <City item={item} key={`viewed-${item.lon}-${item.lat}`} />
      ))}
    </div>
  )
}

export default Viewed