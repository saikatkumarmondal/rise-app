import { useState, useEffect } from 'react'
import './App.css'
import { AnimatePresence } from 'framer-motion'

import Hero from './components/sections/Hero'
import Navbar from './components/layout/Navbar'
import LogoMarquee from './components/sections/LogoMarquee'
import FeaturedWork from './components/sections/FeaturedWork'
import ServicesSection from './components/sections/ServicesSection'
import StatsSection from './components/sections/StatsSection'
import DemoMarque from './components/sections/DemoMarque'
import CardChange from './components/sections/Cardchange'
import WhatsNew from './components/sections/Whatsnew'
import MarqueText from './components/sections/MarqueText'
import Footer from './components/layout/Footer'
import Preloader from './components/loader/Preloader'

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating the loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2300); // Should be slightly longer than the Preloader animation delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <main className={isLoading ? "h-screen overflow-hidden" : ""}>
        <Navbar />
        <Hero />
        <div className='my-4'>
          <LogoMarquee />
        </div>
        <div className='my-4'>
          <FeaturedWork />
        </div>
        <div className='my-4'>
          <ServicesSection />
        </div>
        <StatsSection />
        <DemoMarque />
        <CardChange />
        <WhatsNew />
        <MarqueText />
        <Footer />
      </main>
    </>
  )
}

export default App