import { useAppContext } from '../context/index';
import DailyItem from './DailyItem';

function Daily() {
  const {active: {daily}} = useAppContext();

  return (
    <section className="daily">
      {daily.map((item) => (
        <DailyItem item={item} key={item.date.normal} />
      ))}
    </section>
  )
}

export default Daily
