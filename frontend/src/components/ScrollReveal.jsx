import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + rises its children into place as they scroll into view.
 * With `stagger`, each direct child animates in sequence instead of the
 * wrapper animating as a single block - use it for grids/lists of cards.
 * Respects prefers-reduced-motion by skipping straight to the end state.
 */
export default function ScrollReveal({
  children,
  className,
  as: Tag = "div",
  y = 40,
  delay = 0,
  duration = 0.7,
  stagger = false,
  blur = 0,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const fromVars = { opacity: 0, y };
    const toVars = {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      stagger: stagger ? 0.12 : 0,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true
      }
    };

    if (blur) {
      fromVars.filter = `blur(${blur}px)`;
      toVars.filter = "blur(0px)";
    }

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, toVars);
    }, el);

    return () => ctx.revert();
  }, [y, delay, duration, stagger, blur]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
