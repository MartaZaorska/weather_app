import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className="error">
      <p>Coś poszło nie tak.</p>
      <Link to="/">Wróć do strony głównej.</Link>
    </div>
  )
}

export default Error
