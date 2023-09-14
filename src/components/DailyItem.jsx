import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ACCORDION_VARIANTS } from '../data/variants'; 

function DailyItem({data}){
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="daily__item" onClick={() => setShow(prev => !prev)}>
        <header>
          <p><mark>{data.date.day}</mark><span>{data.date.text}</span></p>
          <h2>{data.temp}</h2>
          <img src={data.icon} alt={data.description} />
        </header>
      </div>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div className="properties" variants={ACCORDION_VARIANTS} initial="close" exit="close" animate="open">
            {Object.values(data.properties).map(property => (
              <div key={`property-${data.date.text}-${property.name}`} className="property">
                <p>{property.name}</p>
                <h3>{property.value}</h3>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default DailyItem;