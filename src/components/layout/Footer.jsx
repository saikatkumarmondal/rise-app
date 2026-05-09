import React from 'react';
import { motion } from 'framer-motion';

const footerLinks = [
  { links: ['Services', 'Work', 'About', 'Culture', 'Meet The Risers'] },
  { links: ['Testimonials', 'Blog & Resources', 'Webinars', 'Careers'] },
  { links: ['Sheffield', 'Manchester', 'London', 'New York', 'Contact'] },
];

const socialIcons = [
  { label: 'f' }, { label: 'X' }, { label: 'in' }, 
  { label: 'y' }, { label: 't' }, { label: 'i' }
];

const AnimatedLink = ({ title }) => {
  return (
    <motion.a
      href="#"
      className="relative block overflow-hidden text-[22px] font-semibold tracking-tighter leading-[1.2]"
      initial="initial"
      whileHover="hovered"
    >
      <motion.div
        variants={{ initial: { y: 0 }, hovered: { y: "-100%" } }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        className="text-white"
      >
        {title}
      </motion.div>
      <motion.div
        className="absolute inset-0 text-[#B2F5EA]"
        variants={{ initial: { y: "100%" }, hovered: { y: 0 } }}
        transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        {title}
      </motion.div>
    </motion.a>
  );
};

const SocialIcon = ({ label }) => {
  return (
    <motion.a
      href="#"
      initial="initial"
      whileHover="hovered"
      className="flex h-7 px-3 items-center justify-between gap-3 rounded-full bg-white text-black cursor-pointer"
    >
      <span className="text-[12px] font-bold lowercase leading-none">{label}</span>
      <motion.span variants={{ initial: { x: 0 }, hovered: { x: 2 } }} className="text-[14px]">↗</motion.span>
    </motion.a>
  );
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f5] p-2 sm:p-4 md:p-6">
      <div className="mx-auto max-w-[1440px] rounded-[30px] sm:rounded-[40px] bg-[#0A0A0A] px-6 sm:px-8 pt-12 sm:pt-16 pb-8 text-white font-sans">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 mb-16">
          <div className="flex flex-col justify-start">
            <h2 className="mb-6 text-[28px] sm:text-[32px] font-medium tracking-tighter leading-tight text-white">
              Stay updated with Rise news
            </h2>
            <div className="relative w-full max-w-md mb-8">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full rounded-full bg-[#1A1A1A] py-4 pl-6 pr-16 text-sm outline-none placeholder:text-white/40 border border-white/5"
              />
              <button className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#B2F5EA]">
                <span className="text-xl text-black">↗</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {socialIcons.map((icon) => <SocialIcon key={icon.label} label={icon.label} />)}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-0">
            {footerLinks.map((column, idx) => (
              <div key={idx} className="border-l border-white/20 pl-4 sm:pl-6 h-fit">
                <ul className="space-y-[6px]">
                  {column.links.map((link) => (
                    <li key={link}><AnimatedLink title={link} /></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10 flex items-center justify-center overflow-hidden">
          <h1 className="whitespace-nowrap text-[13vw] font-bold leading-none tracking-tighter text-white">
            Rise at Seven<span className="ml-2 text-[0.2em] align-top">®</span>
          </h1>
        </div>

        {/* BOTTOM METADATA BAR - RESPONSIVE & EXACT COLOR */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] sm:text-[11px] font-normal text-white/40">
            <span className="whitespace-nowrap text-white">© 2025 Rise at Seven Ltd. All rights reserved</span>
            <span className="hidden sm:block h-[3px] w-[3px] rounded-full bg-white/20" />
            <span className="whitespace-nowrap text-white">Company Number 11955187</span>
            <span className="hidden sm:block h-[3px] w-[3px] rounded-full bg-white/20" />
            <span className="whitespace-nowrap text-white">VAT Registered GB 322402945</span>
            <span className="hidden sm:block h-[3px] w-[3px] rounded-full bg-white/20" />
            <a href="#" className="hover:text-white transition-colors text-white whitespace-nowrap">Privacy Policy</a>
            <span className="hidden sm:block h-[3px] w-[3px] rounded-full bg-white/20 text-white" />
            <a href="#" className="hover:text-white transition-colors text-white whitespace-nowrap">Terms & conditions</a>
          </div>
          
          <a href="#" className="text-[10px] sm:text-[11px]  text-white hover:text-white transition-colors">
            Website MadeByShape
          </a>
        </div>
      </div>
    </footer>
  );
}