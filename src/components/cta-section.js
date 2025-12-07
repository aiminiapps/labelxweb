'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { PiTelegramLogo } from "react-icons/pi";
import { SiBnbchain } from "react-icons/si";
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="relative w-full py-32 flex flex-col items-center justify-center overflow-hidden">
       
       <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, ease: "easeOut" }}
             className="text-5xl md:text-7xl heading font-bold text-white mb-6 tracking-tight "
          >
             Stop Scrolling, <br />
             <span className="text-[#FF7A1A]">Start Earning.</span>
          </motion.h2>

          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1, duration: 0.6 }}
             className="text-lg text-gray-400 max-w-xl mx-auto mb-12 font-light leading-relaxed"
          >
             Connect your wallet and instantly access a stream of micro-tasks. 
             No interviews, no schedules just immediate payouts in LBLX.
          </motion.p>

          {/* --- 4. The "Magnetic" Premium Buttons --- */}
          <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row items-center gap-4"
          >
             {/* Primary Action: Solid White (Maximum Contrast) */}
             <Link href='/tasks' className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                <span>Start Earning Now</span>
                <FaArrowRight className="text-black -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
             </Link>

             {/* Secondary Action: Glass Outline */}
             <button className="px-8 py-4 rounded-full border border-white/10 text-white font-medium hover:bg-white/5 transition-colors backdrop-blur-sm">
                View Documentation
             </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center gap-6 md:gap-12"
          >
              <div className="flex items-center gap-2">
                 <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-zinc-800 border border-black flex items-center justify-center text-[16px] text-gray-500">
                           <SiBnbchain />
                        </div>
                    ))}
                 </div>
                 <div className="text-left ml-2">
                    <p className="text-white text-sm font-bold">12,400+ Active Earners</p>
                    <p className="text-gray-500 text-xs">Join the ecosystem</p>
                 </div>
              </div>

              <div className="hidden md:block w-px h-8 bg-white/10" />

              <div className="flex items-center gap-4 text-gray-500 text-sm">
                 <span>Available on</span>
                 <PiTelegramLogo className="w-5 h-5 text-white hover:text-[#FF7A1A] transition-colors cursor-pointer" />
                 <span className="text-xs border border-white/10 px-2 py-0.5 rounded text-gray-400">Web App</span>
              </div>
          </motion.div>

       </div>
    </section>
  );
};

export default CTASection;