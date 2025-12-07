'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiTwitterXFill } from "react-icons/ri";
import { PiTelegramLogo } from "react-icons/pi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Agent', href: '#' },
  ];

  return (
    <>
      {/* Floating Wrapper */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        <div className="w-full max-w-3xl relative">
          
          {/* Main "Pill" Container */}
          <div className="relative flex items-center justify-between px-6 py-3 rounded-full bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            
            {/* 1. Logo Section */}
            <div className="flex items-center gap-2 cursor-pointer group">
            <img 
                  src="/logo.png" 
                  alt="LabelX Logo" 
                  className="relative h-6"
                />
            </div>

            {/* 2. Desktop Links (Centered) */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="relative text-sm font-medium text-gray-400 hover:text-white transition-colors py-2 group"
                >
                  {link.name}
                  {/* Hover Underline Animation */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-[#FF7A1A] group-hover:w-full group-hover:left-0 transition-all duration-300" />
                </a>
              ))}
            </div>

            {/* 3. Socials & Mobile Toggle (Right) */}
            <div className="flex items-center gap-4">
              
              {/* Desktop Socials */}
              <div className="hidden md:flex items-center gap-3 pr-2 border-r border-white/10">
                <SocialLink icon={RiTwitterXFill} href="#" />
                <SocialLink icon={PiTelegramLogo} href="#" />
              </div>
              
              {/* "Launch" Action (Optional but adds balance) */}
              <button className="hidden md:block px-4 py-1.5 rounded-full bg-white text-black text-xs font-bold hover:scale-105 transition-transform">
                App
              </button>

              {/* Mobile Hamburger */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* 4. Mobile Menu Dropdown (Expands from Pill) */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 8, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 p-4 mt-2 rounded-2xl bg-[#111] border border-white/10 shadow-2xl overflow-hidden md:hidden"
              >
                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name}
                      href={link.href}
                      className="text-lg font-medium text-gray-300 hover:text-[#FF7A1A] transition-colors px-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </a>
                  ))}
                  
                  <div className="h-px w-full bg-white/10 my-2" />
                  
                  <div className="flex items-center justify-between px-2">
                    <span className="text-sm text-gray-500">Community</span>
                    <div className="flex gap-4">
                      <SocialLink icon={RiTwitterXFill} href="#" />
                      <SocialLink icon={PiTelegramLogo} href="#" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.nav>
    </>
  );
};

// Helper for Social Icons
const SocialLink = ({ icon: Icon, href }) => (
  <a 
    href={href}
    className="text-gray-400 hover:text-[#FF7A1A] transition-colors"
  >
    <Icon className="w-4 h-4" />
  </a>
);

export default Navbar;