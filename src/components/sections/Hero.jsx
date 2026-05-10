import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import INNER_IMAGE from '../../assets/5.jpg'

export default function HeroSection() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const containerRef = useRef(null)
  const drawerRef = useRef(null)
  const closeBtnRef = useRef(null)
  const linkRefs = useRef([])
  const bgRefs = useRef([])
  const tlRefs = useRef([])

  const navLinks = [
    { name: 'Services +', href: '#' },
    { name: 'Industries +', href: '#' },
    { name: 'International +', href: '#' },
    { name: 'About +', href: '#' },
    { name: 'Work', href: '#', badge: '25' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Webinar', href: '#' },
  ]

  const handleMouseEnter = useCallback((i) => {
    if (!tlRefs.current[i]) {
      tlRefs.current[i] = gsap.timeline({ paused: true })
        .to(bgRefs.current[i], { scale: 1, opacity: 1, duration: 0.28, ease: 'power2.out' }, 0)
        .to(linkRefs.current[i], { color: '#111111', duration: 0.2, ease: 'power1.out' }, 0)
    }
    tlRefs.current[i].play()
  }, [])

  const handleMouseLeave = useCallback((i) => {
    tlRefs.current[i]?.reverse()
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset'
  }, [mobileOpen])

  useGSAP(() => {
    if (mobileOpen) {
      gsap.fromTo(drawerRef.current,
        { y: '-100%' },
        { y: '0%', duration: 0.8, ease: 'power4.out' }
      )
      gsap.fromTo(closeBtnRef.current,
        { rotationY: 180, scale: 0, opacity: 0 },
        { rotationY: 0, scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: 'back.out(1.7)' }
      )
    }
  }, [mobileOpen])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden font-sans pb-5"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={INNER_IMAGE}
          alt="Hero BG"
          className="w-full h-full object-cover opacity-60 brightness-[0.4] transition-all duration-700 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:px-6 md:px-12 md:py-6 text-white">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="text-xl md:text-2xl font-bold tracking-tighter italic">
            Rise at Seven<span className="not-italic">®</span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) => (
              <div
                key={link.name}
                className="relative inline-block"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <div
                  ref={el => (bgRefs.current[i] = el)}
                  className="absolute inset-0 bg-[#e5e5e5] rounded-full"
                  style={{ transform: 'scale(0.6)', opacity: 0, zIndex: 0 }}
                />
                
                <a  ref={el => (linkRefs.current[i] = el)}
                  href={link.href}
                  className="relative z-10 inline-flex items-center gap-1.5 text-white font-semibold tracking-tight rounded-full cursor-pointer no-underline text-[11px] px-2.5 py-1.5 md:text-[12px] md:px-3 md:py-1.5 lg:text-[13px] lg:px-[15px] lg:py-2"
                >
                  {link.name}
                  {link.badge && (
                    <span className="bg-[#b3f6e1] text-black text-[9px] font-black rounded-full px-1.5 py-0.5 leading-none tracking-wide">
                      {link.badge}
                    </span>
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.button
              initial={{ borderRadius: '24px' }}
              whileHover={{ borderRadius: '8px' }}
              className="hidden sm:inline-flex bg-white text-black px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] items-center gap-2 transition-all hover:bg-[#b3f6e1]"
            >
              Get In Touch <ArrowUpRight size={14} />
            </motion.button>

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-white/10 rounded-full transition-colors text-white"
            >
              <Menu size={30} />
            </button>
          </div>

        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl flex flex-col items-center">
          <h1 className="text-white font-bold leading-[0.9] tracking-tighter uppercase">
            <span className="block text-[13vw] sm:text-[11vw] md:text-[9vw] lg:text-[7vw]">We Create</span>
            <span className="mt-4 inline-flex flex-col items-center gap-4 md:flex-row md:gap-5">
              <span className="text-[5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.6vw]">Category</span>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-[18vw] min-h-[80px] w-[35vw] max-w-[220px] sm:h-[16vw] sm:w-[28vw] md:h-[12vw] md:w-[22vw] lg:h-[9vw] lg:w-[18vw] bg-white rounded-lg md:rounded-xl overflow-hidden self-center"
              >
                <img src={INNER_IMAGE} className="w-full h-full object-cover" alt="visual" />
              </motion.div>
              <span className="text-[5vw] sm:text-[4.5vw] md:text-[3.5vw] lg:text-[2.6vw]">Leaders</span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: 'easeOut' }}
            className="mt-6 text-white/60 text-[3vw] sm:text-[1.8vw] md:text-[1.3vw] lg:text-[1vw] font-medium tracking-[0.25em] uppercase"
          >
            on every searchable platform
          </motion.p>
        </div>
      </div>

      {/* BOTTOM BAR — left & right text */}
       <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.7, ease: 'easeOut' }}
        className="absolute bottom-5 left-0 right-0 z-20 flex items-end justify-between px-4 sm:px-6 md:px-12"
      >
        {/* Bottom Left */}
        <div className="flex flex-col gap-0.5">
          <p className="text-white/70 text-[3.2vw] sm:text-[1.9vw] md:text-[1.35vw] lg:text-[1vw] font-medium leading-snug">
            Organic media planners creating, distributing &amp; optimising
          </p>
          <p className="text-white/40 text-[3.2vw] sm:text-[1.9vw] md:text-[1.35vw] lg:text-[1vw] font-normal leading-snug">
            search-first content for SEO, Social, PR, AI and LLM search
          </p>
        </div>

        {/* Bottom Right */}
        <div className="flex flex-col gap-0.5 text-right">
          <p className="text-white/70 text-[3.2vw] sm:text-[1.9vw] md:text-[1.35vw] lg:text-[1vw] font-medium leading-snug">
            4 Global Offices serving
          </p>
          <p className="text-white/40 text-[3.2vw] sm:text-[1.9vw] md:text-[1.35vw] lg:text-[1vw] font-normal leading-snug">
            UK, USA (New York) &amp; EU
          </p>
        </div>
      </motion.div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%', transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-6 sm:p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="text-white text-2xl font-bold italic">Rise.</div>
              <button
                ref={closeBtnRef}
                onClick={() => setMobileOpen(false)}
                className="relative group p-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 bg-[#b3f6e1] rounded-full scale-100 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                <div className="relative z-10 bg-white text-black p-2 rounded-full shadow-2xl">
                  <X size={28} strokeWidth={3} />
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.5 }}
                  className="text-4xl font-black text-white uppercase tracking-tighter hover:text-[#b3f6e1]"
                >
                  {link.name.replace(' +', '')}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto pt-10">
              <button className="w-full bg-[#b3f6e1] text-black py-5 rounded-xl font-black uppercase tracking-widest">
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}