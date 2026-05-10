import { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Saikat Mondal',
    year: '2023–2025',
    img: img1,
    bg: '#0d0a1a',
    accent: '#7c3aed',
    card: '#1a1030',
    tag: 'Identity',
    desc: 'Crafting bold digital identities that leave a lasting mark on every screen.',
  },
  {
    title: 'Saikat Mondal',
    year: '2021–2025',
    img: img2,
    bg: '#0a1a10',
    accent: '#16a34a',
    card: '#0f2018',
    tag: 'Strategy',
    desc: 'Building B2B strategies that transform businesses from the inside out.',
  },
  {
    title: 'Saikat Mondal',
    year: '2023–2024',
    img: img3,
    bg: '#1a0a0a',
    accent: '#dc2626',
    card: '#2a1010',
    tag: 'Motion',
    desc: 'Magnetic motion design that pulls users into the experience.',
  },
  {
    title: 'Saikat Mondal',
    year: '2022–2025',
    img: img4,
    bg: '#0a0f1a',
    accent: '#0ea5e9',
    card: '#0a1828',
    tag: 'Search',
    desc: 'Search-first thinking that puts your brand exactly where it needs to be.',
  },
  {
    title: 'Saikat Mondal',
    year: '2024–2026',
    img: img5,
    bg: '#1a130a',
    accent: '#f59e0b',
    card: '#201808',
    tag: 'Future',
    desc: 'Next-generation projects built for the world that is still becoming.',
  },
]

export default function ServicesSection() {
  const containerRef = useRef(null)
  const rightRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageHovered, setImageHovered] = useState(false)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springX = useSpring(cursorX, { stiffness: 120, damping: 22 })
  const springY = useSpring(cursorY, { stiffness: 120, damping: 22 })

  const handleMouseMove = useCallback((e) => {
    const rect = rightRef.current?.getBoundingClientRect()
    if (!rect) return
    cursorX.set(e.clientX - rect.left)
    cursorY.set(e.clientY - rect.top)
  }, [])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.right-panel',
        pinSpacing: false,
      })

      projects.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.proj-${i}`,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveIndex(i)
            gsap.to(`.proj-${i}`, { x: 14, opacity: 1, color: projects[i].accent, duration: 0.55, ease: 'power3.out' })
            gsap.to(`.proj-num-${i}`, { opacity: 1, duration: 0.4 })
          },
          onLeave: () => {
            gsap.to(`.proj-${i}`, { x: 0, opacity: 0.22, color: '#ffffff', duration: 0.55, ease: 'power3.inOut' })
            gsap.to(`.proj-num-${i}`, { opacity: 0, duration: 0.3 })
          },
          onEnterBack: () => {
            setActiveIndex(i)
            gsap.to(`.proj-${i}`, { x: 14, opacity: 1, color: projects[i].accent, duration: 0.55, ease: 'power3.out' })
            gsap.to(`.proj-num-${i}`, { opacity: 1, duration: 0.4 })
          },
          onLeaveBack: () => {
            gsap.to(`.proj-${i}`, { x: 0, opacity: 0.22, color: '#ffffff', duration: 0.55, ease: 'power3.inOut' })
            gsap.to(`.proj-num-${i}`, { opacity: 0, duration: 0.3 })
          },
        })
      })

      gsap.set('.proj-0', { opacity: 1, x: 14, color: projects[0].accent })
      gsap.set('.proj-num-0', { opacity: 1 })
    })

    mm.add('(max-width: 1023px)', () => {
      projects.forEach((_, i) => {
        gsap.fromTo(
          `.mob-proj-${i}`,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.65, ease: 'power3.out',
            scrollTrigger: { trigger: `.mob-proj-${i}`, start: 'top 88%' },
          }
        )
      })
    })
  }, { scope: containerRef })

  const active = projects[activeIndex]

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080808] text-white"
    >
      {/* Grain — absolute not fixed, scoped to this section */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '150px',
        }}
      />

      {/* ══════════════════════════════════════
          MOBILE + TABLET  (hidden on lg+)
      ══════════════════════════════════════ */}
      <div className="block lg:hidden relative z-10">

        {/* Section header */}
        <div className="px-5 pt-14 pb-8 sm:px-8 sm:pt-16 sm:pb-10 md:px-12 md:pt-20 md:pb-12">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 inline-block" />
            <p className="text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-white/40 m-0 font-mono">
              Featured Work
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="px-5 pb-16 sm:px-8 sm:pb-20 md:px-12 md:pb-24 flex flex-col gap-6 sm:gap-8 md:gap-10">
          {projects.map((item, i) => (
            <div
              key={i}
              className={`mob-proj-${i} opacity-0`}
            >
              <div className="bg-[#111111] rounded-2xl overflow-hidden border border-white/[0.06]">

                {/* Image */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* color grade */}
                  <div
                    className="absolute inset-0 mix-blend-color pointer-events-none"
                    style={{ background: `${item.accent}20` }}
                  />
                  {/* gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${item.card}e8 0%, transparent 55%)` }}
                  />
                  {/* Tag on image */}
                  <span
                    className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] tracking-[0.14em] uppercase font-mono"
                    style={{
                      background: `${item.accent}25`,
                      border: `1px solid ${item.accent}55`,
                      color: item.accent,
                    }}
                  >
                    {item.tag}
                  </span>
                  {/* Year on image */}
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[10px] font-mono text-white/40 tracking-[0.08em]">
                    {item.year}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-4 sm:p-5 md:p-6 flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <span
                      className="text-[10px] font-mono tracking-[0.1em] block mb-1.5"
                      style={{ color: item.accent }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2
                      className="text-[22px] sm:text-[26px] md:text-[30px] font-black leading-none tracking-[-0.03em] mb-2"
                      style={{ fontFamily: "'Syne', sans-serif", color: '#ffffff' }}
                    >
                      {item.title}
                    </h2>
                    <p className="text-[11px] sm:text-[12px] text-white/45 font-mono leading-relaxed m-0">
                      {item.desc}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-base shrink-0 mt-1"
                    style={{ borderColor: `${item.accent}70`, color: item.accent }}
                  >
                    ↗
                  </div>
                </div>

                {/* Bottom accent bar */}
                <div
                  className="h-[2px] w-full"
                  style={{ background: `linear-gradient(to right, ${item.accent}80, transparent)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          DESKTOP  lg+ — pinned split layout
      ══════════════════════════════════════ */}
      <div className="hidden lg:flex flex-row relative z-10">

        {/* LEFT: scrollable list */}
        <div className="w-1/2 px-[clamp(32px,5vw,80px)] py-[clamp(80px,10vw,140px)]">

          <div className="flex items-center gap-2.5 mb-[clamp(60px,9vw,120px)]">
            <span
              className="w-2 h-2 rounded-full inline-block transition-all duration-500"
              style={{ background: active.accent }}
            />
            <p className="text-[12px] tracking-[0.2em] uppercase opacity-50 m-0 font-mono">
              Featured Work
            </p>
          </div>

          {projects.map((item, i) => (
            <div
              key={i}
              className={`proj-${i} mb-[clamp(44px,7vw,96px)] opacity-[0.22] cursor-pointer relative pl-7 text-white`}
              onMouseEnter={() => {
                gsap.to(`.proj-hover-line-${i}`, { scaleX: 1, duration: 0.4, ease: 'power3.out' })
                gsap.to(`.proj-tag-${i}`, { opacity: 1, x: 0, duration: 0.35 })
              }}
              onMouseLeave={() => {
                gsap.to(`.proj-hover-line-${i}`, { scaleX: 0, duration: 0.35, ease: 'power3.inOut' })
                gsap.to(`.proj-tag-${i}`, { opacity: 0, x: -8, duration: 0.3 })
              }}
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[70%] rounded-sm transition-opacity duration-300"
                style={{ background: item.accent, opacity: activeIndex === i ? 1 : 0 }}
              />

              {/* Index */}
              <span
                className={`proj-num-${i} text-[11px] font-mono opacity-0 tracking-[0.1em] block mb-1`}
                style={{ color: item.accent }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Title */}
              <div
                className="flex items-baseline gap-3 flex-wrap"
                style={{
                  fontSize: 'clamp(30px, 5vw, 68px)',
                  fontWeight: 900,
                  lineHeight: 0.95,
                  letterSpacing: '-0.04em',
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                {item.title}
                <span className="text-[clamp(11px,1.1vw,13px)] opacity-40 font-normal tracking-[0.05em] font-mono">
                  [{item.year}]
                </span>
              </div>

              {/* Hover underline */}
              <div
                className={`proj-hover-line-${i} absolute bottom-[-6px] left-7 right-0 h-px origin-left scale-x-0`}
                style={{ background: item.accent }}
              />

              {/* Tag pill */}
              <span
                className={`proj-tag-${i} inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.12em] uppercase font-mono opacity-0 -translate-x-2`}
                style={{
                  background: `${item.accent}22`,
                  border: `1px solid ${item.accent}55`,
                  color: item.accent,
                }}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* RIGHT: pinned image panel */}
        <div
          className="right-panel w-1/2 h-screen flex items-center justify-center relative overflow-hidden"
          ref={rightRef}
          onMouseMove={handleMouseMove}
        >
          {/* BG glow */}
          <motion.div
            key={`bg-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 60% 50%, ${active.accent}28 0%, transparent 70%)` }}
          />

          {/* Image container */}
          <div
            className="w-[80%] relative rounded-[20px] overflow-hidden"
            style={{ aspectRatio: '3/4', maxHeight: '78vh' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeIndex}`}
                initial={{ opacity: 0, scale: 1.06, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 rounded-[20px] overflow-hidden cursor-none"
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                <img
                  src={active.img}
                  alt={active.title}
                  className="w-full h-full object-cover block"
                  style={{ transition: 'transform 0.6s ease', transform: imageHovered ? 'scale(1.04)' : 'scale(1)' }}
                />
                <div
                  className="absolute inset-0 mix-blend-color pointer-events-none"
                  style={{ background: `${active.accent}18` }}
                />

                {/* Hover overlay */}
                <AnimatePresence>
                  {imageHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                      className="absolute bottom-0 left-0 right-0 p-7 backdrop-blur-md"
                      style={{ background: `linear-gradient(to top, ${active.card}f5 0%, ${active.card}cc 50%, transparent 100%)` }}
                    >
                      <div className="flex justify-between items-end gap-3">
                        <div>
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full text-[9px] tracking-[0.15em] uppercase font-mono mb-2.5"
                            style={{ background: `${active.accent}30`, border: `1px solid ${active.accent}60`, color: active.accent }}
                          >
                            {active.tag}
                          </span>
                          <h3
                            className="text-[22px] font-extrabold tracking-[-0.03em] m-0 mb-2 text-white leading-none"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                          >
                            {active.title}
                          </h3>
                          <p className="text-[12px] text-white/60 m-0 leading-relaxed font-mono max-w-[28ch]">
                            {active.desc}
                          </p>
                        </div>
                        <div
                          className="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0"
                          style={{ border: `1.5px solid ${active.accent}`, color: active.accent }}
                        >
                          ↗
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Custom cursor */}
          <motion.div
            style={{
              position: 'absolute',
              x: springX, y: springY,
              pointerEvents: 'none',
              zIndex: 10,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <motion.div
              animate={{ scale: imageHovered ? 1 : 0, opacity: imageHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="w-14 h-14 rounded-full flex items-center justify-center text-[10px] tracking-[0.12em] font-mono backdrop-blur-sm"
              style={{ border: `1.5px solid ${active.accent}`, color: active.accent, background: `${active.accent}15` }}
            >
              VIEW
            </motion.div>
          </motion.div>

          {/* Progress dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
            {projects.map((p, i) => (
              <motion.div
                key={i}
                animate={{
                  height: activeIndex === i ? '28px' : '6px',
                  opacity: activeIndex === i ? 1 : 0.28,
                  background: activeIndex === i ? p.accent : '#ffffff',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-[3px] rounded-sm"
              />
            ))}
          </div>

          {/* Year */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`year-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="absolute bottom-8 left-10 font-mono text-[11px] tracking-[0.12em] opacity-75"
              style={{ color: active.accent }}
            >
              {active.year}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');
      `}</style>
    </section>
  )
}