import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ACCORDION_VARIANTS } from '../constants';

function DailyItem({item}) {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="daily__item" onClick={() => setShow(!show)}>
        <header>
          <p><span className="bold">{item.date.day}</span><span>{item.date.normal}</span></p>
          <h2>{item.temp}</h2>
          <img src={item.icon} alt={item.description} />
        </header>
      </div>
      <AnimatePresence initial={false}>
        {show && (
          <motion.div className="properties" variants={ACCORDION_VARIANTS} initial="close" exit="close" animate="open">
            {Object.values(item.properties).map(property => (
              <div key={`property-${item.date.normal}-${property.name}`} className="property">
                <p>{property.name}</p>
                <h3>{property.value}</h3>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(DailyItem);
