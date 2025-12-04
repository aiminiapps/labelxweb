'use client';
import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { FaTelegramPlane, FaArrowRight } from 'react-icons/fa';
import { BsStars } from 'react-icons/bs';
import Herocobe from './ui/hero-element';

// --- 1. Your Custom Magnetic Wrapper ---
const MagneticWrapper = ({ children, strength = 0.5 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block" // Ensure it wraps content tightly
    >
      {children}
    </motion.div>
  );
};

// --- 2. Main Hero Component ---
export default function Hero() {
  const containerRef = useRef(null);

  // Background Parallax Logic (Kept subtle as requested)
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 200]);

  // Mouse Parallax for Background Light
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  function handleMouseMove({ clientX, clientY }) {
    if (typeof window !== 'undefined') {
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    }
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-[#000000] flex items-center font-sans selection:bg-[#FFD60A] selection:text-black"
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none z-0">
        {/* Massive Dynamic Light Source */}
        <TiltLayer mouseX={smoothX} mouseY={smoothY} depth={-5}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] bg-[conic-gradient(from_0deg_at_50%_50%,#FFD60A_0deg,#5856D6_120deg,#FFD60A_240deg)] opacity-15 blur-[160px] rounded-[100%]" />
        </TiltLayer>
        
        {/* Grain & Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </motion.div>
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">
        
        {/* --- LEFT SIDE: Copy & Actions --- */}
        <div className="space-y-10 max-w-4xl">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(255,214,10,0.1)]"
          >
            <BsStars className="text-[#FFD60A] text-xs" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/80 font-semibold">
              The AI Consensus Layer
            </span>
          </motion.div>

          {/* New Creative Title */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 1, 0.2, 1] }}
              className="text-5xl heading md:text-7xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Refining Intelligence.
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 1, 0.2, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFD60A] via-[#FF9500] to-[#FFD60A] leading-[1.1] pb-2"
            >
              Rewarding Humanity.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-neutral-400 max-w-lg leading-relaxed font-light"
          >
            Join the decentralized workforce training the next generation of AI models. Verify data, earn points, and claim $LBLX.
          </motion.p>

          {/* Magnetic Buttons (Using your custom wrapper) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-6 pt-2 items-center"
          >
            {/* Primary Button */}
            <MagneticWrapper strength={0.6}>
              <button className="relative group px-8 py-4 rounded-full bg-[#FFD60A] text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,214,10,0.5)]">
                <span className="relative z-10 flex items-center gap-2">
                  <FaTelegramPlane className="text-lg" />
                  Launch Agent
                </span>
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-0" />
              </button>
            </MagneticWrapper>

            {/* Secondary Button */}
            <MagneticWrapper strength={0.3}>
              <button className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-sm uppercase tracking-wider backdrop-blur-md hover:bg-white/10 transition-colors flex items-center gap-2 group">
                How it works
                <FaArrowRight className="-rotate-45 group-hover:rotate-0 transition-transform duration-300 text-[#FFD60A]" />
              </button>
            </MagneticWrapper>
          </motion.div>

          {/* Real Social Proof (Avatars) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-5 pt-8 border-t border-white/10"
          >
            {/* Real Avatar Stack */}
            <div className="flex -space-x-4">
              {[
                'https://i.pravatar.cc/150?img=33',
                'https://i.pravatar.cc/150?img=47',
                'https://i.pravatar.cc/150?img=12',
                'https://i.pravatar.cc/150?img=68'
              ].map((src, i) => (
                <div 
                    key={i} 
                    className="relative w-12 h-12 rounded-full border-[3px] border-black overflow-hidden ring-1 ring-white/20"
                >
                    <img src={src} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-[3px] border-black bg-neutral-800 flex items-center justify-center text-xs font-bold text-white ring-1 ring-white/20">
                +4k
              </div>
            </div>

            <div className="flex flex-col">
               <div className="flex items-center gap-1">
                 <span className="text-xl font-bold text-white">52,891</span>
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               </div>
               <p className="text-sm text-neutral-500 font-medium">Active Labelers Online</p>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center items-center h-full min-h-[600px] w-full relative">
            <Herocobe/>
        </div>

      </div>
    </section>
  );
}

// --- Helper: Tilt Layer for Background ---
const TiltLayer = ({ children, mouseX, mouseY, depth, className = "" }) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-depth, depth]);
  
  return (
    <motion.div style={{ x, y }} className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  );
};