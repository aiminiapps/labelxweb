'use client';

import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { PiTelegramLogo } from "react-icons/pi";
import { RiTwitterXFill, RiGithubFill } from "react-icons/ri";
import { SiBinance } from 'react-icons/si';
import { HiArrowUpRight } from 'react-icons/hi2';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black overflow-hidden pt-32 pb-8">
      
      {/* --- 1. The Massive Background Text (Reference Style) --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[22vw] font-bold text-[#0A0A0A] tracking-tighter leading-none whitespace-nowrap">
          LABELX
        </h1>
      </div>

      {/* --- 2. Main Content Layer --- */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 h-full flex flex-col justify-end">
        
        {/* Top Row: Functional Actions (Your provided data) */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 border-b border-white/[0.05] pb-12">
            
            {/* Left: Brand Identity */}
            <div className="flex flex-col gap-4">
               {/* Replace with your actual Logo Image if needed, using text for now to match style */}
               <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-[#FBBF24] rounded-lg flex items-center justify-center text-black font-bold text-xl">L</div>
                   <span className="text-2xl font-bold text-white tracking-tight">LabelX</span>
               </div>
               <p className="text-neutral-500 text-sm max-w-xs">
                   The decentralized consensus layer for AI data verification and rewards.
               </p>
            </div>

            {/* Right: The Action Buttons (Integrated from your code) */}
            <div className="flex flex-wrap items-center gap-4">
                {/* Live Tasks Button */}
                <Link href='/tasks'>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#FBBF24] text-black font-bold text-sm shadow-[0_0_20px_rgba(251,191,36,0.3)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transition-all"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                        </span>
                        <span>Start Earning</span>
                        <HiArrowUpRight className="w-4 h-4" />
                    </motion.button>
                </Link>

                {/* BSC Contract Address */}
                <a 
                    href="https://bscscan.com/token/0x4f7C0CC4AF9DE23EBb7b99A8e9a723dc5Bd051BF" 
                    target='_blank' 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#111] border border-white/10 hover:border-[#F0B90B]/50 hover:bg-[#F0B90B]/10 transition-all group"
                >
                    <SiBinance className="text-[#F0B90B] w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="text-xs text-neutral-400 font-mono group-hover:text-white transition-colors">
                        0x4f7...51BF
                    </span>
                </a>
            </div>
        </div>

        {/* --- Bottom Row: Meta & Socials (Reference Layout) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-500">
          
          {/* Copyright */}
          <div className="flex items-center gap-2">
             <span>&copy; {currentYear} LabelX Foundation.</span>
             <span className="hidden md:inline text-neutral-700">|</span>
             <span className="hidden md:inline">All Rights Reserved.</span>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
             <SocialButton href="https://twitter.com" icon={RiTwitterXFill} label="Twitter" />
             <SocialButton href="https://t.me/LabelXAI_Bot" icon={PiTelegramLogo} label="Telegram" />
             <SocialButton href="https://github.com" icon={RiGithubFill} label="GitHub" />
          </div>

          {/* Extra Links (From Reference) */}
          <div className="flex items-center gap-6">
             <Link href="/terms" className="hover:text-white transition-colors flex items-center gap-1">
                Terms <HiArrowUpRight className="w-3 h-3" />
             </Link>
             <a href="mailto:hello@labelx.ai" className="hover:text-white transition-colors flex items-center gap-1">
                hello@labelx.ai
             </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

// --- Sub-component: Social Button ---
const SocialButton = ({ href, icon: Icon, label }) => (
  <motion.a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -2, backgroundColor: "#FBBF24", color: "#000" }}
    className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-neutral-400 transition-colors duration-300"
    title={label}
  >
    <Icon className="w-4 h-4" />
  </motion.a>
);

export default Footer;