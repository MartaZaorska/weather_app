import { memo } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';

function Header({ city }) {
  return (
    <header className="header">
      <h1>{city}</h1>
      <Link to="/"><IoSearchOutline className='icon' /></Link>
    </header>
  )
}

export default memo(Header);