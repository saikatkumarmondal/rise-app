import React, { useRef, useEffect } from 'react';
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

function AnimatedCard({ card, index, total, progress }) {
  const spring = useSpring(progress, {
    stiffness: 55,
    damping: 20,
    mass: 1.1,
  });

  const x = useTransform(spring, [0, 1], ['0%', '-60%']);
  const y = useTransform(spring, [0, 1], ['0%', '-105%']);
  const rotate = useTransform(
    spring,
    [0, 1],
    [index % 2 === 0 ? -1.5 : 1.5, -22]
  );
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
      className="px-1 sm:px-0"
    >
      <div
        style={{
          position: 'relative',
          background: card.bg,
          borderBottom: `1.5px solid ${card.accent}`,
          borderRight: `1.5px solid ${card.accent}`,
          boxShadow:
            '6px 12px 48px rgba(0,0,0,0.65), inset 0 0 60px rgba(0,0,0,0.25)',
        }}
        className="rounded-[18px] sm:rounded-[22px] overflow-hidden p-4 sm:p-5 md:p-6 lg:p-7"
      >
        <div className="w-full h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px] mb-5">
          <img src={card.image} className="w-full h-full object-cover block" />
        </div>

        <h2 className="text-[32px] sm:text-[42px] md:text-[48px] lg:text-[54px] font-extrabold mb-3 text-center">
          {card.header}
        </h2>

        <p className="text-center text-sm mb-2">{card.text}</p>
        <p className="text-center text-xs">{card.text2}</p>
      </div>
    </motion.div>
  );
}

function CardChange() {
  const sectionRef = useRef(null);
  const total = CARDS.length;
  const progressMVs = CARDS.map(() => useMotionValue(0));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',

      // 🔥 FIX: reduced scroll distance to remove extra gap
      end: '+=180%',

      scrub: true,

      onUpdate: (self) => {
        const p = self.progress;

        for (let i = 0; i < total - 1; i++) {
          const segStart = i / (total - 1);
          const segEnd = (i + 1) / (total - 1);

          const raw = (p - segStart) / (segEnd - segStart);
          const clamped = Math.min(Math.max(raw, 0), 1);

          progressMVs[i].set(clamped);
        }

        progressMVs[total - 1].set(0);
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section className="bg-[rgb(236,236,236)] overflow-hidden">
      <div className="text-center text-[10px] sm:text-[11px] tracking-[0.15em] text-[#999] pt-8 pb-6 uppercase">
        Legacy In The Making
      </div>

      <div
        ref={sectionRef}
        className="
          relative
          h-[200vh] sm:h-[220vh] md:h-[240vh] lg:h-[260vh]
          flex justify-center
          px-3 sm:px-5 md:px-6
        "
      >
        <div
          className="
            sticky top-[12px]
            sm:top-[4vh]
            md:top-[6vh]
            lg:top-[8vh]
            w-full max-w-[95vw] sm:max-w-[480px] md:max-w-[540px]
            flex justify-center
          "
        >
          {CARDS.map((card, i) => (
            <AnimatedCard
              key={card.id}
              card={card}
              index={i}
              total={total}
              progress={progressMVs[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CardChange;