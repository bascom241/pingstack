"use client";

import { useEffect } from "react";
import { animate, inView } from "framer-motion";
import { useReducedMotion } from "../lib/use-reduced-motion";

export default function PageMotion() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion !== false || !("IntersectionObserver" in window)) return;
    const mobile = window.matchMedia("(max-width: 639px)").matches;
    const animations = new Set<ReturnType<typeof animate>>();
    const revealed = new WeakSet<Element>();
    const stopObserving = inView("[data-reveal]", (element) => {
      if (revealed.has(element)) return;
      revealed.add(element);
      const delay = Math.min(Number((element as HTMLElement).dataset.revealDelay) || 0, mobile ? 100 : 400) / 1000;
      const controls = animate(element, { opacity: [0, 1], y: [mobile ? 12 : 22, 0] }, {
        duration: mobile ? 0.45 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      });
      animations.add(controls);
      void controls.then(() => animations.delete(controls));
    }, { amount: 0.08 });

    return () => {
      stopObserving();
      // Finish at the visible state if motion preferences change mid-animation.
      animations.forEach((animation) => animation.complete());
      animations.clear();
    };
  }, [reduceMotion]);

  return null;
}
