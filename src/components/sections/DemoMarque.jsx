import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import img1 from '../../assets/1.jpg';
import img5 from '../../assets/5.jpg';

gsap.registerPlugin(ScrollTrigger);

const DemoMarque = () => {
  const container = useRef();
  const marqueeInner = useRef();

  useGSAP(() => {
    const marquee = marqueeInner.current;
    const totalWidth = marquee.scrollWidth / 2;

    gsap.set(marquee, { x: 0 });

    const loop = gsap.to(marquee, {
      x: -totalWidth,
      repeat: -1,
      duration: 60,
      ease: 'none',
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 0,
      end: 'max',
      onUpdate: self => {
        gsap.to(loop, {
          timeScale: self.direction === 1 ? 2 : -2,
          duration: 0.4
        });
      },
      onToggle: () => gsap.to(loop, { timeScale: 1, duration: 0.4 })
    });
  }, { scope: container });

  const textStyle = {
    fontFamily: "'Bebas Neue', Impact, sans-serif",
    fontWeight: 900,
    letterSpacing: '0.02em',
    lineHeight: 1,
    color: '#000000',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    verticalAlign: 'middle',
  };

  const imgWrap = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
  };

  const imgStyle = {
    objectFit: 'cover',
    display: 'block',
    border: '2px solid rgba(0,0,0,0.12)',
  };

  const dot = {
    display: 'inline-block',
    borderRadius: '50%',
    background: '#000000',
    flexShrink: 0,
    verticalAlign: 'middle',
  };

  const MarqueeContent = () => (
    <div className="flex items-center flex-shrink-0">
      <span
        style={textStyle}
        className="text-[52px] sm:text-[72px] md:text-[90px] lg:text-[120px] px-3 sm:px-5 lg:px-8"
      >
        Hey,
      </span>

      <div
        style={imgWrap}
        className="px-2 sm:px-3 md:px-4 lg:px-5"
      >
        <img
          src={img1}
          alt="Saikat"
          style={imgStyle}
          className="w-[70px] h-[50px] sm:w-[90px] sm:h-[60px] md:w-[110px] md:h-[75px] lg:w-[130px] lg:h-[85px] rounded-lg sm:rounded-xl"
        />
      </div>

      <span
        style={textStyle}
        className="text-[52px] sm:text-[72px] md:text-[90px] lg:text-[120px] px-3 sm:px-5 lg:px-8"
      >
        I am
      </span>

      <span
        style={dot}
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 mx-2 sm:mx-3 lg:mx-4"
      />

      <span
        style={textStyle}
        className="text-[52px] sm:text-[72px] md:text-[90px] lg:text-[120px] px-3 sm:px-5 lg:px-8"
      >
        Saikat
      </span>

      <span
        style={dot}
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 mx-2 sm:mx-3 lg:mx-4"
      />

      <span
        style={textStyle}
        className="text-[52px] sm:text-[72px] md:text-[90px] lg:text-[120px] px-3 sm:px-5 lg:px-8"
      >
        Developer
      </span>

      <div
        style={imgWrap}
        className="px-2 sm:px-3 md:px-4 lg:px-5"
      >
        <img
          src={img5}
          alt="Developer"
          style={imgStyle}
          className="w-[70px] h-[50px] sm:w-[90px] sm:h-[60px] md:w-[110px] md:h-[75px] lg:w-[130px] lg:h-[85px] rounded-lg sm:rounded-xl"
        />
      </div>

      <span
        style={dot}
        className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 mx-2 sm:mx-3 lg:mx-4"
      />
    </div>
  );

  return (
    <section
      ref={container}
      className="bg-[rgb(236,236,236)] overflow-hidden w-full py-10 sm:py-14 md:py-16 lg:py-20"
    >
      <div
        ref={marqueeInner}
        className="flex items-center w-max will-change-transform"
      >
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </section>
  );
};

export default DemoMarque;