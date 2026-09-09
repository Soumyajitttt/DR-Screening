import { motion, useReducedMotion } from "motion/react";

// Wraps a page's content in a single, quiet fade-and-rise on mount so every
// route in the app shares the same entrance feel as the landing page hero.
export default function FadeIn({ children, className }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.35, ease: [0.215, 0.61, 0.355, 1] }}
    >
      {children}
    </motion.div>
  );
}
