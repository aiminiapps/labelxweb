'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PiTelegramLogo } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { SiBinance } from 'react-icons/si';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* --- Left Side: Logo & Brand Identity --- */}
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
             <div className="flex flex-col">
             <img 
                  src="/logo.png" 
                  alt="LabelX Logo" 
                  className="relative h-8 mb-2"
                />
                <span className="text-gray-500 text-xs">
                   &copy; {currentYear} LabelX Foundation
                </span>
             </div>
          </div>

          {/* --- Right Side: Socials & Agent Actions --- */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            
            {/* 1. AI Agent Button (New) */}
            <Link href='/tasks'>
            <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FF7A1A]/30 transition-all cursor-pointer"
            >
               <div className="relative flex items-center justify-center">
                  <span className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-75" />
                  <span className="w-2 h-2 bg-emerald-500 rounded-full relative" />
               </div>
               <span className="text-sm font-medium text-gray-300 group-hover:text-white">Live Tasks</span>
            </motion.button>
            </Link>
            <div className="w-px h-8 bg-white/10 hidden md:block" />

            {/* 2. BscScan Smart Contract */}
            <a 
              href="#" 
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#111] border border-white/5 hover:border-[#F0B90B]/50 transition-colors group"
            >
              <SiBinance className="text-[#F0B90B] w-4 h-4" />
              <span className="text-xs text-gray-400 font-mono group-hover:text-white">0x7a...8e21</span>
            </a>

            {/* 3. Social Icons */}
            <div className="flex gap-2">
               <SocialButton href="https://x.com/AI_UR_Alfredo" icon={RiTwitterXFill} />
               <SocialButton href="#" icon={PiTelegramLogo} />
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

// Simple reusable social button component
const SocialButton = ({ href, icon: Icon }) => (
  <motion.a 
    href={href}
    whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
    className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 transition-colors"
  >
    <Icon className="w-4 h-4" />
  </motion.a>
);

export default Footer;