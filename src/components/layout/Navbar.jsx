import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar({ transparent = true }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const [expandedItem, setExpandedItem] = useState(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > lastScrollY.current && y > 100)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      {/* Announcement Bar */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          // =========================
          // ✅ POSITION CONTROL (LEFT/RIGHT SHIFT)
          // =========================
          // change this value to move entire banner:
          // negative = left, positive = right
          transform: 'translateX(-10px)',

          transition: 'transform 0.3s ease',
          opacity: mobileOpen ? 0 : 1,
          pointerEvents: mobileOpen ? 'none' : 'auto',
          zIndex: 60,
          paddingTop: '10px',
          paddingBottom: '10px',

          paddingLeft: '20px',
          paddingRight: '20px',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <motion.a
          href="#"
          initial="initial"
          whileHover="hover"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
            padding: '12px 20px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#1a1a1a',
            background: '#c8f0e0',
            borderRadius: '100px',
            textAlign: 'center',
            textDecoration: 'none',
            position: 'relative',
            cursor: 'pointer',
            overflow: 'hidden',
            boxSizing: 'border-box',
            maxWidth: '100%',
          }}
          className="sm:px-4 sm:text-[11px]"
          onMouseEnter={e => (e.currentTarget.style.borderRadius = '8px')}
          onMouseLeave={e => (e.currentTarget.style.borderRadius = '100px')}
        >
          {/* Animated Text Wrapper */}
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {/* Original Text */}
            <motion.div
              style={{
                whiteSpace: 'nowrap',
                fontSize: 'clamp(10px, 2.5vw, 13px)',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              variants={{
                initial: { y: 0 },
                hover: { y: -25 },
              }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              🚨 Where are your customers actually searching? Download the report
            </motion.div>

            {/* Hover Text */}
            <motion.div
              style={{
                position: 'absolute',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                width: '100%',
                fontSize: 'clamp(10px, 2.5vw, 13px)',
              }}
              variants={{
                initial: { y: 25 },
                hover: { y: 0 },
              }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            >
              🚨 Where are your customers actually searching? Download the report
            </motion.div>
          </div>
        </motion.a>
      </div>

      {/* Desktop / Main Navbar */}
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed',
          top: '50px',
          left: 0,
          right: 0,
          zIndex: 50,
          height: '72px',
          padding: '12px',
          display: 'flex',
          alignItems: 'stretch',
        }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#1a1a1a',
              zIndex: 100,
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}