import { useNavigate, useSubmit } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

function Location({data}) {
  const { current, city, country } = data;
  const navigate = useNavigate();
  const submit = useSubmit();

  const deleteLocation = (e) => {
    e.stopPropagation();
    submit({ city: data.id }, { method: "DELETE", action: '/' });
  }

  return (
    <section onClick={() => navigate(`/${data.id}`)} className={current ? "location" : "location center"}>
      <div>
        {current && (
          <>
            <h1><img src={current.icon} alt={current.description} /> <span>{current.temp}</span></h1>
            <h3>{current.description}</h3>
          </>
        )}
        <p>{city}, {country}</p>
      </div>
      <button aria-label="Usuń miasto" onClick={deleteLocation}><MdClose className="icon" /></button>
    </section>
  )
}

export default Location
