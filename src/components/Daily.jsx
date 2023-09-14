import DailyItem from './DailyItem';

function Daily({ data }) {
  return (
    <section className="daily">
      {data.map((item) => (
        <DailyItem data={item} key={item.date.text} />
      ))}
    </section>
  )
}

export default Daily