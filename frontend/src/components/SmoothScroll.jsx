import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives the whole app's scrolling through Lenis for an inertia-smoothed feel,
 * and keeps GSAP's ScrollTrigger in sync with it every frame via gsap.ticker
 * (instead of Lenis' own requestAnimationFrame loop) so ScrollTrigger-based
 * animations stay perfectly aligned with what's on screen.
 *
 * Respects prefers-reduced-motion by skipping the smoothing entirely and
 * letting the browser's native (instant) scrolling take over.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return children;
}
