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
      style={{
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        marginTop: "-4vh",
        marginBottom: "-4vh",
        background: "rgb(236,236,236)",
        position: "relative",
      }}
    >
      {/* Subtle top fade to blend with previous section */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "18%",
        background: "linear-gradient(to bottom, rgb(236,236,236), transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      {/* Subtle bottom fade to blend with next section */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "18%",
        background: "linear-gradient(to top, rgb(236,236,236), transparent)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      <h3
        ref={textRef}
        style={{
          display: "flex",
          width: "max-content",
          whiteSpace: "nowrap",
          fontWeight: 700,
          lineHeight: 1.05,
          gap: "4vw",
          paddingLeft: "100vw",
          fontSize: "clamp(2rem, 10vw, 12rem)",
          margin: 0,
          letterSpacing: "-0.03em",
          fontFamily: "system-ui, sans-serif",
          color: "transparent",
          WebkitTextStroke: "1.5px #1a1a1a",
          position: "relative",
          zIndex: 1,
        }}
      >
        A Proud Bangladeshi
      </h3>
    </div>
  );
}