import Lenis from "lenis";

export const initLenis = () => {
  const lenis = new Lenis({
    lerp: 0.07,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};