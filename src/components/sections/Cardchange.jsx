import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import img1 from '../../assets/1.jpg';
import img2 from '../../assets/2.jpg';
import img3 from '../../assets/3.jpg';
import img4 from '../../assets/4.jpg';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: 1,
    image: img1,
    header: 'Saikat',
    label: 'Legacy In The Making',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.',
    text2: 'Consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    bg: '#0a0e1a',
    accent: '#1e3a5f',
    highlight: '#4a9eff',
    textColor: '#e8f0fe',
    subColor: 'rgba(232,240,254,0.55)',
  },
  {
    id: 2,
    image: img2,
    header: 'Kumar',
    label: 'Vision & Craft',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.',
    text2: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    bg: '#071510',
    accent: '#1a3d28',
    highlight: '#3ddc84',
    textColor: '#e6f5ec',
    subColor: 'rgba(230,245,236,0.55)',
  },
  {
    id: 3,
    image: img3,
    header: 'Mondal',
    label: 'Built Different',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.',
    text2: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.',
    bg: '#160a0e',
    accent: '#3d1a24',
    highlight: '#e05c7a',
    textColor: '#fde8ee',
    subColor: 'rgba(253,232,238,0.55)',
  },
  {
    id: 4,
    image: img4,
    header: 'Khulna',
    label: 'Roots & Rising',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation.',
    text2: 'Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
    bg: '#15100a',
    accent: '#3d2e0f',
    highlight: '#f5a623',
    textColor: '#fef3e2',
    subColor: 'rgba(254,243,226,0.55)',
  },
];

// progress: 0 = card sitting in stack (visible), 1 = card fully exited top-left
function AnimatedCard({ card, index, total, progress }) {
  const spring = useSpring(progress, {
    stiffness: 55,
    damping: 20,
    mass: 1.1,
  });

  // Exit path: moves UP and to the LEFT simultaneously
  const x = useTransform(spring, [0, 1], ['0%', '-60%']);
  const y = useTransform(spring, [0, 1], ['0%', '-105%']);
  const rotate = useTransform(spring, [0, 1], [index % 2 === 0 ? -1.5 : 1.5, -22]);
  const scale = useTransform(spring, [0, 0.5, 1], [1, 0.96, 0.86]);
  const opacity = useTransform(spring, [0.6, 1], [1, 0]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: total - index,
        x,
        y,
        rotate,
        scale,
        opacity,
        transformOrigin: 'bottom right',
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {/* bottom-right only glow shadow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '22px',
        background: card.highlight,
        opacity: 0.15,
        transform: 'translate(9px, 9px)',
        zIndex: -1,
        clipPath: 'inset(6px 0px 0px 6px round 22px)',
        filter: 'blur(3px)',
      }} />

      <div style={{
        position: 'relative',
        background: card.bg,
        borderRadius: '22px',
        overflow: 'hidden',
        padding: 'clamp(18px, 4vw, 28px)',
        borderTop: 'none',
        borderLeft: 'none',
        borderBottom: `1.5px solid ${card.accent}`,
        borderRight: `1.5px solid ${card.accent}`,
        boxShadow: `6px 12px 48px rgba(0,0,0,0.65), inset 0 0 60px rgba(0,0,0,0.25)`,
      }}>
        {/* subtle right-edge glow line */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '1px', height: '45%',
          background: `linear-gradient(to bottom, transparent, ${card.highlight}50)`,
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0,
          height: '1px', width: '45%',
          background: `linear-gradient(to right, transparent, ${card.highlight}50)`,
        }} />

        {/* Label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: `${card.highlight}18`,
          border: `1px solid ${card.highlight}45`,
          borderRadius: '100px',
          padding: '4px 13px',
          fontSize: '10px', letterSpacing: '0.13em',
          color: card.highlight, textTransform: 'uppercase',
          marginBottom: '16px',
          fontFamily: 'system-ui, sans-serif', fontWeight: 600,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: card.highlight, display: 'inline-block' }} />
          {card.label}
        </div>

        {/* Image */}
        <div style={{
          width: '100%',
          height: 'clamp(150px, 25vw, 220px)',
          borderRadius: '13px', overflow: 'hidden',
          marginBottom: '18px', background: card.accent,
          position: 'relative',
        }}>
          <img src={card.image} alt={card.header} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: `${card.highlight}10`, mixBlendMode: 'color' }} />
        </div>

        {/* Header */}
        <h2 style={{
          fontSize: 'clamp(34px, 7vw, 54px)', fontWeight: 800,
          margin: '0 0 12px', color: card.textColor,
          textAlign: 'center', lineHeight: 1, letterSpacing: '-0.03em',
          fontFamily: 'system-ui, sans-serif',
        }}>
          {card.header}
        </h2>

        <p style={{
          fontSize: 'clamp(12px, 1.8vw, 14px)', lineHeight: 1.72,
          color: card.subColor, margin: '0 0 10px',
          textAlign: 'center', fontFamily: 'system-ui, sans-serif',
        }}>
          {card.text}
        </p>

        <p style={{
          fontSize: 'clamp(11px, 1.6vw, 13px)', lineHeight: 1.65,
          color: card.subColor.replace('0.55', '0.32'),
          margin: 0, textAlign: 'center', fontFamily: 'system-ui, sans-serif',
        }}>
          {card.text2}
        </p>
      </div>
    </motion.div>
  );
}

function CardChange() {
  const sectionRef = useRef(null);
  const total = CARDS.length;

  // One MotionValue per card: 0 = in stack, 1 = exited top-left
  const progressMVs = useRef(CARDS.map(() => useMotionValue(0)));

  // Responsive scroll height: shorter on small mobile to eliminate bottom gap
  const [scrollHeight, setScrollHeight] = useState('350vh');

  useEffect(() => {
    const updateHeight = () => {
      setScrollHeight(window.innerWidth < 480 ? '240vh' : '350vh');
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress; // 0 → 1 as you scroll down

        // We have (total - 1) transitions
        // Segment i covers when card i exits (progress from i/(total-1) to (i+1)/(total-1))
        for (let i = 0; i < total - 1; i++) {
          const segStart = i / (total - 1);
          const segEnd = (i + 1) / (total - 1);
          const raw = (p - segStart) / (segEnd - segStart);
          const clamped = Math.min(Math.max(raw, 0), 1);
          progressMVs.current[i].set(clamped);
        }
        // Last card never exits
        progressMVs.current[total - 1].set(0);
      },
    });

    return () => { trigger.kill(); };
  }, []);

  return (
    <section style={{ background: 'rgb(236,236,236)', minHeight: '100vh' }}>
      <div style={{
        textAlign: 'center', fontFamily: 'system-ui, sans-serif',
        fontSize: '11px', letterSpacing: '0.15em', color: '#aaa',
        padding: '44px 0 20px', fontWeight: 600, textTransform: 'uppercase',
      }}>
        Legacy In The Making
      </div>

      <div
        ref={sectionRef}
        style={{
          position: 'relative',
          height: scrollHeight,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 clamp(12px, 4vw, 24px)',
        }}
      >
        <div style={{
          position: 'sticky',
          top: '8vh',
          height: '84vh',
          width: '100%',
          maxWidth: 'min(460px, 94vw)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
          {CARDS.map((card, i) => (
            <AnimatedCard
              key={card.id}
              card={card}
              index={i}
              total={total}
              progress={progressMVs.current[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardChange;