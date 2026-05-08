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
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [imageHovered, setImageHovered] = useState(false)

  // Smooth cursor follower for right panel
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

    mm.add('(min-width: 768px)', () => {
      // Pin right side
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.right-panel',
        pinSpacing: false,
      })

      // Per-item scroll triggers
      projects.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.proj-${i}`,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            setActiveIndex(i)
            gsap.to(`.proj-${i}`, {
              x: 14,
              opacity: 1,
              color: projects[i].accent,
              duration: 0.55,
              ease: 'power3.out',
            })
            gsap.to(`.proj-num-${i}`, { opacity: 1, duration: 0.4 })
          },
          onLeave: () => {
            gsap.to(`.proj-${i}`, {
              x: 0,
              opacity: 0.22,
              color: '#ffffff',
              duration: 0.55,
              ease: 'power3.inOut',
            })
            gsap.to(`.proj-num-${i}`, { opacity: 0, duration: 0.3 })
          },
          onEnterBack: () => {
            setActiveIndex(i)
            gsap.to(`.proj-${i}`, {
              x: 14,
              opacity: 1,
              color: projects[i].accent,
              duration: 0.55,
              ease: 'power3.out',
            })
            gsap.to(`.proj-num-${i}`, { opacity: 1, duration: 0.4 })
          },
          onLeaveBack: () => {
            gsap.to(`.proj-${i}`, {
              x: 0,
              opacity: 0.22,
              color: '#ffffff',
              duration: 0.55,
              ease: 'power3.inOut',
            })
            gsap.to(`.proj-num-${i}`, { opacity: 0, duration: 0.3 })
          },
        })
      })

      // Set first item active on load
      gsap.set('.proj-0', { opacity: 1, x: 14, color: projects[0].accent })
      gsap.set('.proj-num-0', { opacity: 1 })
    })

    // Mobile: simple fade in
    mm.add('(max-width: 767px)', () => {
      projects.forEach((_, i) => {
        gsap.fromTo(
          `.proj-${i}`,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: `.proj-${i}`,
              start: 'top 80%',
            },
          }
        )
      })
    })
  }, { scope: containerRef })

  const active = projects[activeIndex]

  return (
    <section
      ref={containerRef}
      style={{
        backgroundColor: '#080808',
        color: 'white',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {/* Noise grain overlay */}
      <div style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '150px',
      }} />

      <div style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ─── LEFT: text list ─── */}
        <div style={{
          width: '50%',
          padding: 'clamp(80px, 12vw, 160px) clamp(24px, 5vw, 72px)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: 'clamp(60px, 10vw, 120px)',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: active.accent,
              display: 'inline-block',
              transition: 'background 0.5s ease',
            }} />
            <p style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              opacity: 0.5,
              margin: 0,
              fontFamily: "'DM Mono', monospace",
            }}>
              Featured Work
            </p>
          </div>

          {projects.map((item, i) => (
            <div
              key={i}
              className={`proj-${i}`}
              style={{
                marginBottom: 'clamp(40px, 7vw, 90px)',
                opacity: 0.22,
                cursor: 'pointer',
                position: 'relative',
                paddingLeft: '28px',
                color: '#ffffff',
                transition: 'color 0.4s ease',
              }}
              onMouseEnter={() => {
                setHoveredIndex(i)
                gsap.to(`.proj-hover-line-${i}`, { scaleX: 1, duration: 0.4, ease: 'power3.out' })
                gsap.to(`.proj-tag-${i}`, { opacity: 1, x: 0, duration: 0.35 })
              }}
              onMouseLeave={() => {
                setHoveredIndex(null)
                gsap.to(`.proj-hover-line-${i}`, { scaleX: 0, duration: 0.35, ease: 'power3.inOut' })
                gsap.to(`.proj-tag-${i}`, { opacity: 0, x: -8, duration: 0.3 })
              }}
            >
              {/* left accent bar */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '3px',
                height: '70%',
                borderRadius: '2px',
                background: item.accent,
                opacity: activeIndex === i ? 1 : 0,
                transition: 'opacity 0.4s ease',
              }} />

              {/* index number */}
              <span
                className={`proj-num-${i}`}
                style={{
                  fontSize: '11px',
                  fontFamily: "'DM Mono', monospace",
                  opacity: 0,
                  letterSpacing: '0.1em',
                  color: item.accent,
                  display: 'block',
                  marginBottom: '4px',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* title */}
              <div style={{
                fontSize: 'clamp(32px, 5.5vw, 72px)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                fontFamily: "'Syne', sans-serif",
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                flexWrap: 'wrap',
              }}>
                {item.title}
                <span style={{
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  opacity: 0.45,
                  fontWeight: 400,
                  letterSpacing: '0.05em',
                  fontFamily: "'DM Mono', monospace",
                }}>
                  [{item.year}]
                </span>
              </div>

              {/* hover underline */}
              <div
                className={`proj-hover-line-${i}`}
                style={{
                  position: 'absolute',
                  bottom: '-6px',
                  left: '28px',
                  right: 0,
                  height: '1px',
                  background: item.accent,
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }}
              />

              {/* tag pill */}
              <span
                className={`proj-tag-${i}`}
                style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  background: `${item.accent}22`,
                  border: `1px solid ${item.accent}55`,
                  color: item.accent,
                  fontFamily: "'DM Mono', monospace",
                  opacity: 0,
                  transform: 'translateX(-8px)',
                }}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        {/* ─── RIGHT: pinned image panel ─── */}
        <div
          className="right-panel"
          ref={rightRef}
          onMouseMove={handleMouseMove}
          style={{
            width: '50%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* bg color transition */}
          <motion.div
            key={`bg-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 60% 50%, ${active.accent}28 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />

          {/* image stack */}
          <div style={{
            width: '82%',
            aspectRatio: '3/4',
            maxHeight: '75vh',
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${activeIndex}`}
                initial={{ opacity: 0, scale: 1.06, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -20 }}
                transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'none',
                }}
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
              >
                <img
                  src={active.img}
                  alt={active.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                    transform: imageHovered ? 'scale(1.04)' : 'scale(1)',
                  }}
                />

                {/* color grade */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `${active.accent}18`,
                  mixBlendMode: 'color',
                  pointerEvents: 'none',
                }} />

                {/* hover card overlay */}
                <AnimatePresence>
                  {imageHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: `linear-gradient(to top, ${active.card}f5 0%, ${active.card}cc 50%, transparent 100%)`,
                        padding: 'clamp(20px, 3vw, 36px)',
                        backdropFilter: 'blur(12px)',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        gap: '12px',
                      }}>
                        <div>
                          <span style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: '100px',
                            fontSize: '9px',
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase',
                            background: `${active.accent}30`,
                            border: `1px solid ${active.accent}60`,
                            color: active.accent,
                            fontFamily: "'DM Mono', monospace",
                            marginBottom: '10px',
                          }}>
                            {active.tag}
                          </span>
                          <h3 style={{
                            fontSize: 'clamp(18px, 2.5vw, 26px)',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            margin: '0 0 8px',
                            color: '#fff',
                            fontFamily: "'Syne', sans-serif",
                            lineHeight: 1,
                          }}>
                            {active.title}
                          </h3>
                          <p style={{
                            fontSize: 'clamp(11px, 1.3vw, 13px)',
                            color: 'rgba(255,255,255,0.6)',
                            margin: 0,
                            lineHeight: 1.6,
                            fontFamily: "'DM Mono', monospace",
                            maxWidth: '28ch',
                          }}>
                            {active.desc}
                          </p>
                        </div>
                        <div style={{
                          width: 'clamp(36px, 4vw, 48px)',
                          height: 'clamp(36px, 4vw, 48px)',
                          borderRadius: '50%',
                          border: `1.5px solid ${active.accent}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: active.accent,
                          fontSize: '18px',
                          flexShrink: 0,
                          fontWeight: 300,
                        }}>
                          ↗
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* custom cursor dot */}
          <motion.div
            style={{
              position: 'absolute',
              x: springX,
              y: springY,
              pointerEvents: 'none',
              zIndex: 10,
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <motion.div
              animate={{
                scale: imageHovered ? 1 : 0,
                opacity: imageHovered ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                border: `1.5px solid ${active.accent}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                letterSpacing: '0.12em',
                color: active.accent,
                fontFamily: "'DM Mono', monospace",
                backdropFilter: 'blur(4px)',
                background: `${active.accent}15`,
              }}
            >
              VIEW
            </motion.div>
          </motion.div>

          {/* progress dots */}
          <div style={{
            position: 'absolute',
            right: 'clamp(16px, 3vw, 36px)',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {projects.map((p, i) => (
              <motion.div
                key={i}
                animate={{
                  height: activeIndex === i ? '28px' : '6px',
                  opacity: activeIndex === i ? 1 : 0.3,
                  background: activeIndex === i ? p.accent : '#ffffff',
                }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  width: '3px',
                  borderRadius: '2px',
                }}
              />
            ))}
          </div>

          {/* year counter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`year-${activeIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 4vh, 44px)',
                left: 'clamp(20px, 4vw, 44px)',
                fontFamily: "'DM Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.12em',
                color: active.accent,
                opacity: 0.8,
              }}
            >
              {active.year}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=DM+Mono:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        @media (max-width: 767px) {
          .right-panel { display: none !important; }
          section > div > div:first-child { width: 100% !important; }
        }
        @media (min-width: 768px) and (max-width: 1024px) {
          section > div > div:first-child { padding: 80px 32px !important; }
        }
      `}</style>
    </section>
  )
}