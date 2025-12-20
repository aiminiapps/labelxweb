'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { RiTwitterXFill } from "react-icons/ri";
import { PiTelegramLogo } from "react-icons/pi";
import { HiSparkles } from "react-icons/hi2";
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Agents', href: '/tasks' }, 
    { name: 'Docs', href: 'https://label-x.gitbook.io/label-x-docs/' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
      >
        {/* Main "Control Center" Pill */}
        <div className="w-full max-w-4xl relative">
          
          <div className="relative flex items-center justify-between px-6 py-3 rounded-full bg-[#0A0A0A]/90 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-50">
            
            {/* 1. Logo Area */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <Image
                src="/logo.png"
                width={100}
                height={60}
                alt="Picture of the author"
              />
            </Link>

            {/* 2. Desktop Links (Centered) */}
            <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  target={link.name === 'Docs' ? '_blank' : '_self'}
                  className="relative px-5 py-2 text- font-medium text-neutral-400 hover:text-white transition-colors group"
                >
                  {link.name}
                  {/* Glowing Dot Indicator */}
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FBBF24] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_8px_#FBBF24]" />
                </Link>
              ))}
            </div>

            {/* 3. Right Actions */}
            <div className="flex items-center gap-4">
              
              {/* Desktop Socials Divider */}
              <div className="hidden md:flex items-center gap-2 pr-4 border-r border-white/10">
                <SocialLink icon={RiTwitterXFill} href="https://x.com/labelxofficial" />
                <SocialLink icon={PiTelegramLogo} href="https://t.me/LabelXAI_Bot" />
              </div>

              {/* CTA Button */}
              <Link href='/tasks'>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-[#FBBF24] text-black text-xs font-bold shadow-[0_0_20px_-5px_rgba(251,191,36,0.4)] hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.6)] transition-shadow overflow-hidden relative group"
                >
                    <div className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <HiSparkles className="w-3 h-3" />
                    <span>Launch App</span>
                </motion.button>
              </Link>

              {/* Mobile Toggle */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
              >
                {isOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 8, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="absolute top-full left-0 right-0 p-2 z-40 md:hidden"
              >
                <div className="rounded-2xl bg-[#0F0F0F]/95 backdrop-blur-2xl border border-white/[0.08] p-4 shadow-2xl flex flex-col gap-2">
                  
                  {/* Mobile Links */}
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-transparent hover:border-white/5 group transition-all"
                    >
                      <span className="text-sm font-medium text-neutral-300 group-hover:text-white">{link.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] opacity-0 group-hover:opacity-100" />
                    </Link>
                  ))}
                  
                  <div className="h-px w-full bg-white/5 my-2" />
                  
                  {/* Mobile Socials & CTA */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex gap-2">
                      <SocialLink icon={RiTwitterXFill} href="https://x.com/labelxofficial" />
                      <SocialLink icon={PiTelegramLogo} href="https://t.me/LabelXAI_Bot" />
                    </div>
                    <Link href="/tasks" onClick={() => setIsOpen(false)}>
                        <span className="text-xs font-bold text-[#FBBF24] uppercase tracking-wider">Launch App &rarr;</span>
                    </Link>
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

// Reusable Social Link
const SocialLink = ({ icon: Icon, href }) => (
  <a 
    href={href}
    target='_blank'
    rel="noreferrer"
    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.05] text-neutral-400 hover:text-[#FBBF24] hover:bg-[#FBBF24]/10 hover:border-[#FBBF24]/20 transition-all duration-300"
  >
    <Icon className="w-3.5 h-3.5" />
  </a>
);

export default Navbar;