import { Form } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

function LocationForm() {
  return (
    <Form action="/" method="POST" className="form">
      <input type="text" tabIndex="0" name="city" placeholder='Miasto' />
      <button type="submit" aria-label="Szukaj miasta"><BsSearch className="icon" /></button>
    </Form>
  )
}

export default LocationForm;