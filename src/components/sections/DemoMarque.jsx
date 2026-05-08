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

  const MarqueeContent = () => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0,
    }}>
      <span style={textStyle}>Hey,</span>
      <div style={imgWrap}>
        <img src={img1} alt="Saikat" style={imgStyle} />
      </div>
      <span style={textStyle}>I am</span>
      <span style={dot} />
      <span style={textStyle}>Saikat</span>
      <span style={dot} />
      <span style={textStyle}>Developer</span>
      <div style={imgWrap}>
        <img src={img5} alt="Developer" style={imgStyle} />
      </div>
      <span style={dot} />
    </div>
  );

  const textStyle = {
    fontFamily: "'Bebas Neue', Impact, sans-serif",
    fontSize: 'clamp(72px, 10vw, 120px)',
    fontWeight: 900,
    letterSpacing: '0.02em',
    lineHeight: 1,
    color: '#000000',
    whiteSpace: 'nowrap',
    padding: '0 32px',
    display: 'inline-block',
    verticalAlign: 'middle',
  };

  const imgWrap = {
    flexShrink: 0,
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
  };

  const imgStyle = {
    width: '130px',
    height: '85px',
    borderRadius: '8px',
    objectFit: 'cover',
    display: 'block',
    border: '2px solid rgba(0,0,0,0.12)',
  };

  const dot = {
    display: 'inline-block',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#000000',
    flexShrink: 0,
    margin: '0 16px',
    verticalAlign: 'middle',
  };

  return (
    <section
      ref={container}
      style={{
        background: 'rgb(236, 236, 236)',
        overflow: 'hidden',
        padding: '60px 0',
        width: '100%',
      }}
    >
      <div
        ref={marqueeInner}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          willChange: 'transform',
        }}
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