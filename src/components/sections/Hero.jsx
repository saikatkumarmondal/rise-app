import { useRef, useState, useEffect } from 'react'
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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset'
  }, [mobileOpen])

  // GSAP for Smooth Drawer and 3D Close Icon
  useGSAP(() => {
    if (mobileOpen) {
      gsap.fromTo(drawerRef.current, 
        { y: "-100%" },
        { y: "0%", duration: 0.8, ease: "power4.out" }
      )
      
      // Close Icon 3D Animation
      gsap.fromTo(closeBtnRef.current,
        { rotationY: 180, scale: 0, opacity: 0 },
        { rotationY: 0, scale: 1, opacity: 1, duration: 0.8, delay: 0.4, ease: "back.out(1.7)" }
      )
    }
  }, [mobileOpen])

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-black overflow-hidden font-sans"
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

      {/* Navbar Overlay */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-12 md:py-6 text-white">
        <div className="text-xl md:text-2xl font-bold tracking-tighter italic">
          Rise at Seven<span className="not-italic">®</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 justify-between sm:justify-end">
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
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl">
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
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%", transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-6 sm:p-8 overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-16">
                <div className="text-white text-2xl font-bold italic">Rise.</div>
                
                {/* 3D High Visibility Close Button */}
                <button 
                  ref={closeBtnRef}
                  onClick={() => setMobileOpen(false)} 
                  className="relative group p-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glowing Background for visibility */}
                  <div className="absolute inset-0 bg-[#b3f6e1] rounded-full scale-100 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  
                  {/* The Icon Container */}
                  <div className="relative z-10 bg-white text-black p-2 rounded-full shadow-2xl transform group-active:translate-z-[-20px] transition-transform">
                    <X size={28} strokeWidth={3} />
                  </div>
                </button>
            </div>
            
            {/* Links */}
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

            <div className="mt-auto">
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