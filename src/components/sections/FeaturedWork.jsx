import React, { useState } from 'react'
import GoogleImg from '../../assets/google.jpg'
import { motion } from 'framer-motion'
export default function FeaturedWork() {
  const [hovered, setHovered] = useState(false)
  const [hoveredServices, setHoveredServices] = useState(false)

  return (
    <section className="bg-[#ececec] px-5 py-16 sm:px-10 sm:py-20 md:px-14 md:py-24 lg:px-16 lg:py-28 font-sans">

      {/* Layout: stacked on mobile, side-by-side on md+ */}
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:items-start md:gap-8">

        {/* LEFT — descriptor text */}
     <div className="w-full md:w-[35%] md:pt-3">
        <p className="text-[13px] sm:text-[14px] md:text-[14px] lg:text-[24px] font-semibold leading-relaxed tracking-[-0.04em] text-[#1a1a1a]">
          A global team of search-first content marketers <br />
          engineering semantic relevancy &amp; category <br />
          signals for both the internet and people
        </p>
      </div>

        {/* RIGHT — headline + buttons */}
        <div className="w-full md:w-[60%] flex flex-col gap-8 sm:gap-10 md:gap-14">

          {/* Headline */}
          <h1 className="text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.8vw] font-semibold leading-[0.88] tracking-[-0.04em] text-[#1a1a1a] m-0">
            Driving Demand &amp;
            <br />
            <span className="inline-flex items-center gap-3 sm:gap-4 md:gap-5">
              Discovery
              <img
                src={GoogleImg}
                alt="Google"
                className="w-[10vw] h-[10vw] sm:w-[8vw] sm:h-[8vw] md:w-[6.5vw] md:h-[6.5vw] lg:w-[5.2vw] lg:h-[5.2vw] rounded-[14px] sm:rounded-[16px] md:rounded-[18px] lg:rounded-[20px] object-cover"
              />
            </span>
          </h1>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8">
            <motion.button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              animate={{ borderRadius: hovered ? '8px' : '9999px' }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="relative overflow-hidden flex items-center bg-white text-[#1a1a1a] font-semibold shadow-sm
                         text-[14px] px-5 py-3
                         sm:text-[15px] sm:px-6 sm:py-3.5
                         md:text-[16px] md:px-7 md:py-4
                         lg:text-[18px] lg:px-8 lg:py-[18px]
                         cursor-pointer border-none"
            >
              <span className="relative flex items-center">
                {/* Text sliding in from bottom on hover */}
                <motion.span
                  animate={{ y: hovered ? 0 : '110%', opacity: hovered ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
                >
                  Our Story ↗
                </motion.span>

                {/* Original text sliding out upward on hover */}
                <motion.span
                  animate={{ y: hovered ? '-110%' : '0%', opacity: hovered ? 0 : 1 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  Our Story <span className="text-[12px]">↗</span>
                </motion.span>
              </span>
            </motion.button>


            <motion.button
  onMouseEnter={() => setHoveredServices(true)}
  onMouseLeave={() => setHoveredServices(false)}
  className="relative overflow-hidden flex items-center gap-2 bg-transparent border-none text-[#1a1a1a] font-semibold
             text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px]
             cursor-pointer"
>
  <span className="relative flex items-center gap-2">
    <motion.span
      animate={{ y: hoveredServices ? 0 : '110%', opacity: hoveredServices ? 1 : 0 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute inset-0 flex items-center gap-2 whitespace-nowrap"
    >
      Our Services <span className="text-[12px]">↗</span>
    </motion.span>

    <motion.span
      animate={{ y: hoveredServices ? '-110%' : '0%', opacity: hoveredServices ? 0 : 1 }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center gap-2 whitespace-nowrap"
    >
      Our Services <span className="text-[12px]">↗</span>
    </motion.span>
  </span>
</motion.button>
          </div>

        </div>
      </div>
    </section>
  )
}