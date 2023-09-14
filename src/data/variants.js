export const CONTAINER_VARIANTS = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      delay: 0.4
    }
  }
};

export const ACCORDION_VARIANTS = {
  close: { opacity: 0, height: 0, transition: {duration: 0.15, ease: "easeInOut"} },
  open: { 
    opacity: 1, 
    height: "auto",
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};