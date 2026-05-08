import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'


import Logo1 from '../../assets/logo1.png'
import Logo2 from '../../assets/logo2.png'
import Logo3 from '../../assets/logo3.png'


const clientLogos = [
  { name: 'Sixt', src: Logo1 },
  { name: 'Revolution', src: Logo2 },
  { name: 'PlayStation', src: Logo3 },
]

function LogoItem({ logo }) {
  return (
    <div
      style={{
        flexShrink: 0,
        padding: '0 60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '120px', 
      }}
    >
      {logo.src ? (
        <img 
          src={logo.src} 
          alt={logo.name} 
          style={{ 
            height: '65px', 
            width: 'auto', 
            filter: 'grayscale(100%) brightness(0)' 
          }} 
        />
      ) : (
        <span style={{ fontSize: '24px', fontWeight: '900', color: '#000', textTransform: 'uppercase' }}>
          {logo.name}
        </span>
      )}
    </div>
  )
}

export default function LogoMarquee() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    gsap.to(track, {
      xPercent: -50,
      ease: 'none',
      duration: 20,
      repeat: -1,
    })
  }, { scope: containerRef })

  return (
    <section
      style={{
        background: '#ececec',
        overflow: 'hidden',
        padding: '40px 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            flexShrink: 0,
            fontSize: '18px',
            fontWeight: '600',
            color: '#1a1a1a',
            paddingLeft: '40px',
            paddingRight: '20px',
            zIndex: 10,
          }}
        >
          The agency behind…
        </div>

        <div
          ref={containerRef}
          style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
           
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 80%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 80%, transparent)',
          }}
        >
          {/* Blur Layers */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px',
            backdropFilter: 'blur(8px)', zIndex: 5, pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px',
            backdropFilter: 'blur(8px)', zIndex: 5, pointerEvents: 'none'
          }} />

          {/* Scrolling Track */}
          <div
            ref={trackRef}
            style={{ 
              display: 'flex', 
              width: 'max-content',
              alignItems: 'center' 
            }}
          >
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
              <LogoItem key={i} logo={logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}