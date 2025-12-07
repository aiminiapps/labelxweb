'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaTelegramPlane, FaTwitter, FaGithub } from 'react-icons/fa'; // Standard icons
import { SiBinance } from 'react-icons/si'; // For BSC

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- Top Section: Brand & Navigation --- */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-6">
              {/* Simple Geometric Logo Placeholder */}
              <div className="w-6 h-6 bg-[#FF7A1A] rounded-sm transform rotate-45" />
              <span className="text-xl font-bold text-white tracking-tight">LabelX</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              The decentralized data layer for Artificial Intelligence. 
              Earn crypto by powering the next generation of models.
            </p>
            
            {/* System Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-500 bg-emerald-500/5 px-3 py-1.5 rounded-full w-fit border border-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Systems Operational</span>
            </div>
          </div>

          {/* Minimal Links Column */}
          <div className="flex flex-wrap gap-12 sm:gap-20">
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Platform</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#FF7A1A] transition-colors">Start Earning</a></li>
                <li><a href="#" className="hover:text-[#FF7A1A] transition-colors">For Developers</a></li>
                <li><a href="#" className="hover:text-[#FF7A1A] transition-colors">Tokenomics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Smart Contract Audit</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- Middle Section: Socials & Contract --- */}
        <div className="w-full h-px bg-white/5 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Icons Group */}
          <div className="flex items-center gap-4">
            <SocialButton href="#" icon={FaTwitter} label="X (Twitter)" />
            <SocialButton href="#" icon={FaTelegramPlane} label="Telegram" />
            
            {/* BscScan Special Button */}
            <a 
              href="#" 
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/5 hover:border-[#F0B90B]/50 transition-all duration-300"
            >
              <SiBinance className="text-[#F0B90B] w-4 h-4" />
              <div className="flex flex-col leading-none">
                <span className="text-[10px] text-gray-500 font-mono group-hover:text-[#F0B90B] transition-colors">BscScan</span>
                <span className="text-xs text-gray-300 font-mono">0x7a...8e21</span>
              </div>
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-600 text-xs">
            &copy; {currentYear} LabelX Foundation. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Buttons
const SocialButton = ({ href, icon: Icon, label }) => (
  <motion.a 
    href={href}
    whileHover={{ y: -2 }}
    className="w-10 h-10 rounded-full bg-[#111] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
    aria-label={label}
  >
    <Icon className="w-4 h-4" />
  </motion.a>
);

export default Footer;