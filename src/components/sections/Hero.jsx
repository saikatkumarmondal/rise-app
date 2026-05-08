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
      <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 md:py-10 text-white">
        <div className="text-xl md:text-2xl font-bold tracking-tighter italic">
          Rise at Seven<span className="not-italic">®</span>
        </div>

        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <motion.button
            initial={{ borderRadius: "24px" }}
            whileHover={{ borderRadius: "8px" }}
            className="hidden sm:flex bg-white text-black px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] items-center gap-2 transition-all hover:bg-[#b3f6e1]"
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
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-white text-[13vw] sm:text-[11vw] lg:text-[8.5vw] font-bold leading-[0.9] tracking-tighter uppercase flex flex-col items-center">
          <span className="block">We Create</span>
          <span className="flex items-center gap-2 md:gap-5">
            Category 
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="h-[8vw] sm:h-[7vw] lg:h-[6vw] w-[12vw] sm:w-[10vw] lg:w-[9vw] bg-white rounded-lg md:rounded-xl overflow-hidden self-center"
            >
              <img src={INNER_IMAGE} className="w-full h-full object-cover" alt="visual" />
            </motion.div>
            Leaders
          </span>
        </h1>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%", transition: { duration: 0.4 } }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-8 perspective-1000"
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