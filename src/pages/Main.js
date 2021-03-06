import { motion } from 'framer-motion';
import { useAppContext } from '../context/index';
import { CONTAINER_VARIANTS } from '../constants';

import City from '../components/City';
import Form from '../components/Form';

import image from '../images/undraw_Nature_benefits_re_kk70.svg';

function Main() {
  const {cities} = useAppContext();

  return (
    <motion.div variants={CONTAINER_VARIANTS} initial="hidden" animate="visible">
      <section className="main">
        <Form />
        <section className="cities">
          {cities.map((item) => (
            <City key={`main-${item.lat}-${item.lon}`} item={item} />
          ))}
        </section>
        <p className="copyright">&copy; Created by <a className="bold" target="_blank" rel="noreferrer" href="https://martazaorska.github.io/portfolio/">Marta Zaorska</a> {new Date().getFullYear()}</p>
      </section>
      <section className="main__image"><img src={image} alt="nature" /></section>
    </motion.div>
  )
}

export default Main
