import React from 'react'
import serviceImg from '../../assets/service.jpg'

const serviceList = [
  { title: "Digital PR" },
  { title: "Organic Social & Content" },
  { title: "Search & Growth Strategy" },
  { title: "Content Experience" },
  { title: "Data & Insights" },
  { title: "Onsite SEO" },
]

export default function StatsSection() {
  return (
    <section className="bg-[#ececec] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 lg:py-28 font-sans text-[#1a1a1a]">
      
      {/* Upper Button */}
      <div className="flex justify-center mb-12 sm:mb-16">
        <button className="px-5 sm:px-6 py-2.5 rounded-full border border-black/10 bg-white text-sm font-semibold transition-all duration-300 hover:bg-black hover:text-white">
          Explore Our Work ↗
        </button>
      </div>

      {/* Main Heading with Inline Image */}
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

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-24">
        {serviceList.map((service, index) => (
          <div
            key={index}
            className="py-7 sm:py-9 border-b border-black/10 flex items-center cursor-pointer group transition-all duration-300"
          >
            <h2 className="text-[30px] sm:text-[38px] md:text-[42px] lg:text-[52px] font-semibold tracking-[-1px] sm:tracking-[-2px] leading-tight transition-all duration-300 group-hover:translate-x-2">
              {service.title}
            </h2>
          </div>
        ))}
      </div>
    </section>
  )
}