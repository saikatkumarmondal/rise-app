import React, { useState } from 'react'
import serviceImg from '../../assets/service.jpg'

import img1 from '../../assets/1.jpg'
import img2 from '../../assets/2.jpg'
import img3 from '../../assets/3.jpg'
import img4 from '../../assets/4.jpg'
import img5 from '../../assets/5.jpg'

const serviceList = [
  { title: "Digital PR", image: img1 },
  { title: "Organic Social & Content", image: img2 },
  { title: "Search & Growth Strategy", image: img3 },
  { title: "Content Experience", image: img4 },
  { title: "Data & Insights", image: img5 },
  { title: "Onsite SEO", image: img1 },
]

export default function StatsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <section className="bg-[#ececec] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-28 font-sans text-[#1a1a1a]">
      
      <div className="flex justify-center mb-12 sm:mb-16">
        <button className="px-5 sm:px-6 py-2.5 rounded-full border border-black/10 bg-white text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white">
          Explore Our Work ↗
        </button>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-10 mb-10 border-b border-black/10 pb-10">
        
        <h1 className="flex flex-wrap items-center text-[42px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[110px] font-semibold leading-none tracking-[-2px] sm:tracking-[-3px] lg:tracking-[-4px]">
          Our

          <img
            src={serviceImg}
            alt="Service"
            className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] md:w-[90px] md:h-[90px] lg:w-[100px] lg:h-[100px] rounded-2xl object-cover mx-3 sm:mx-5"
          />

          Services
        </h1>

        <div className="flex lg:justify-end">
          <button className="px-5 sm:px-6 py-2.5 rounded-full border border-black/10 bg-white text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white whitespace-nowrap">
            View All Services ↗
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-24">
        {serviceList.map((service, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative py-7 sm:py-9 border-b border-black/10 flex items-center cursor-pointer group overflow-hidden"
          >

            {/* FULL IMAGE BACKGROUND */}
            <div
              className={`
                absolute inset-0 z-0 transition-all duration-500 ease-out
                ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-110"}
              `}
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-black/40 rounded-2xl" />
            </div>

            {/* TEXT */}
            <h2
              className={`
                relative z-10 text-[30px] sm:text-[38px] md:text-[42px] lg:text-[52px]
                font-semibold tracking-[-1px] sm:tracking-[-2px]
                leading-tight transition-all duration-300
                group-hover:translate-x-2
                ${hoveredIndex === index ? "opacity-0" : "opacity-100"}
              `}
            >
              {service.title}
            </h2>

          </div>
        ))}
      </div>

    </section>
  )
}