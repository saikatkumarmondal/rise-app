import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function MarqueText() {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const text = textRef.current;
    if (!wrapper || !text) return;

    const split = SplitText.create(text, { type: "chars,words" });

    const scrollTween = gsap.to(text, {
      xPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        end: "+=5000px",
        scrub: true,
      },
    });

    split.chars.forEach((char) => {
      gsap.from(char, {
        yPercent: gsap.utils.random(-200, 200),
        rotation: gsap.utils.random(-20, 20),
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: char,
          containerAnimation: scrollTween,
          start: "left 100%",
          end: "left 30%",
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      split.revert();
      gsap.killTweensOf(text);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="overflow-hidden h-screen flex items-center"
    >
      <h3
        ref={textRef}
        className="flex w-max whitespace-nowrap font-semibold leading-tight"
        style={{
          gap: "4vw",
          paddingLeft: "100vw",
          fontSize: "clamp(2rem, 10vw, 12rem)",
          lineHeight: 1.1,
        }}
      >
    A Proud Bangladeshi
      </h3>
    </div>
  );
}