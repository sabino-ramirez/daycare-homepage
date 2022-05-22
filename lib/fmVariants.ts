export const navParentVariants = {
  before: {
    opacity: 0,
  },
  after: {
    opacity: 1.0,
    transition: {
      // duration: 0.2,
      duration: 1.2,
      // staggerChildren: 0.08,
      staggerChildren: 0.12,
    },
  },
};
export const navLinkVariants = {
  before: {
    x: "-400vw",
  },
  after: {
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
    },
  },
  hover: {
    scale: 1.04,
    textShadow: "0px 0px 5px rgb(255,255,255)",
  },
};

export const navThemeButtonVariants = {
  after: {
    x: [0, -5, 10, -5, 4, 0],
    transition: {
      duration: 0.8,
    },
  },
  hover: {
    scale: 1.04,
  },
};
