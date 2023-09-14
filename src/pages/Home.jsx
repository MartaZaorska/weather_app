import { useOutletContext } from "react-router-dom";
import { motion } from 'framer-motion';
import { CONTAINER_VARIANTS } from '../data/variants';

import Location from '../components/Location';
import Form from '../components/Form';

import image from '../assets/undraw_Nature_benefits_re_kk70.svg';

export function Component() {
  const contextData = useOutletContext();

  return (
    <motion.div variants={CONTAINER_VARIANTS} initial="hidden" animate="visible">
      <section className="main">
        <Form />
        <section className="locations">
          {contextData.map(location => (
            <Location key={`main-${location.id}`} data={location} />
          ))}
        </section>
        <p className="copyright">&copy; Created by <a target="_blank" rel="noreferrer" href="https://martazaorska.github.io/portfolio/"><mark>Marta Zaorska</mark></a> {new Date().getFullYear()}</p>
      </section>
      <section className="main__image">
        <img src={image} alt="nature" />
      </section>
    </motion.div>
  )
}

Component.displayName = "Home";