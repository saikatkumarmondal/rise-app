import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Hero from './components/sections/Hero'
import Navbar from './components/layout/Navbar'
import LogoMarquee from './components/sections/LogoMarquee'
import FeaturedWork from './components/sections/FeaturedWork'
import ServicesSection from './components/sections/ServicesSection'
import StatsSection from './components/sections/StatsSection'
import DemoMarque from './components/sections/DemoMarque'
import CardChange from './components/sections/Cardchange'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <h1 className='text-5xl'>Om Namah Shivaya</h1> */}
     <Navbar></Navbar>
     <Hero/>
     <div className='my-4'>
      <LogoMarquee></LogoMarquee>
     </div>
     <div className='my-4'>
      <FeaturedWork></FeaturedWork>
     </div>
     <div className='my-4'>
      <ServicesSection></ServicesSection>
     </div>
     <StatsSection></StatsSection>
     <DemoMarque></DemoMarque>
     <CardChange></CardChange>
    </>
  )
}

export default App
