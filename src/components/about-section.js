'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { BiCoinStack } from 'react-icons/bi';
import { HiSparkles } from 'react-icons/hi2';
import { RiTwitterXFill } from "react-icons/ri";
import { FaFingerprint } from "react-icons/fa";

// --- 1. Shared Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  },
};

// --- 2. UI Helpers ---

const Card = ({ children, className = "", noPadding = false }) => (
  <div className={`relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-gradient-to-b from-[#141414] to-[#0A0A0A] ${noPadding ? '' : 'p-8'} ${className}`}>
    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />
    {children}
  </div>
);

const YellowAccent = ({ children }) => (
  <span className="text-[#FBBF24] font-medium drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
    {children}
  </span>
);

// --- 3. Slider Data & Component ---
const sliderData = [
  {
    id: 1,
    title: "IMAGE ANNOTATION BASE",
    description: "Identify objects, segment pixels, and classify scenes to train computer vision models.",
    image: "/slide/1.png"
  },
  {
    id: 2,
    title: "NATURAL LANGUAGE PROCESSING",
    description: "Verify sentiment, correct translations, and generate text for LLM training.",
    image: "/slide/2.png"
  },
  {
    id: 3,
    title: "Start Earning with Tasks",
    description: "No experience needed. No complicated setup. Just connect, choose, and earn.",
    image: "/slide/3.png"
  },
];

const TaskSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % sliderData.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  const sliderVariants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0, filter: 'blur(8px)' }),
    center: { zIndex: 1, x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0, filter: 'blur(8px)' })
  };

  return (
    // CHANGE: Increased min-height here for a taller slider component
    <Card noPadding className="h-full flex flex-col justify-between min-h-[500px] lg:min-h-[700px] relative group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={activeIndex}
            variants={sliderVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }}
            className="absolute inset-0"
          >
             <Image 
                src={sliderData[activeIndex].image}
                alt={sliderData[activeIndex].title}
                fill
                className="object-cover opacity-50 grayscale mix-blend-luminosity group-hover:grayscale-0 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-end pointer-events-none">
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2 mb-2">
             <HiSparkles className="text-[#FBBF24] w-4 h-4" />
             <h4 className="text-xs font-mono text-[#FBBF24] tracking-[0.2em] uppercase">
               Task Model {activeIndex + 1}/{sliderData.length}
             </h4>
          </div>
          <AnimatePresence mode='wait'>
            <motion.h3
                key={sliderData[activeIndex].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-2xl font-bold uppercase text-white mb-2"
            >
                {sliderData[activeIndex].title}
            </motion.h3>
          </AnimatePresence>
           <AnimatePresence mode='wait'>
            <motion.p 
                key={sliderData[activeIndex].description}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-neutral-400 text-sm max-w-[90%] lg:max-w-[70%]"
            >
                {sliderData[activeIndex].description}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2 absolute bottom-8 right-8 z-20 pointer-events-auto">
          <button onClick={prevSlide} className="p-3 rounded-full border border-white/10 bg-black/20 hover:bg-white/10 hover:border-[#FBBF24]/50 text-white transition-all active:scale-95 backdrop-blur-md">
            <FaChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={nextSlide} className="p-3 rounded-full border border-white/10 bg-black/20 hover:bg-white/10 hover:border-[#FBBF24]/50 text-white transition-all active:scale-95 backdrop-blur-md">
            <FaChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};


// --- 4. Main Component ---

const AboutSection = () => {
  return (
    <section className="relative w-full py-32 bg-[#000000] overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        // CHANGE: Increased max-width here for a wider layout
        className="relative z-10 max-w-[1600px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
      >
        
        {/* --- Column 1 --- */}
        <div className="lg:col-span-5 flex flex-col justify-between relative min-h-[40vh] lg:min-h-0">
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-white leading-[1.1] mb-6">
              Web3 Work-to-Earn Ecosystem for <YellowAccent>AI Training</YellowAccent>.
            </h2>
          </motion.div>
          <a href='https://x.com/intent/follow?screen_name=labelxofficial' target='_blank'>
          <motion.div variants={itemVariants} className="hidden lg:block absolute bottom-0 left-0 p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
             <RiTwitterXFill className="text-neutral-400 size-7" />
          </motion.div>
          </a>
        </div>

        {/* --- Column 2 --- */}
        <div className="lg:col-span-3 flex flex-col gap-6 lg:gap-8">
            <motion.div variants={itemVariants} className="flex-1">
                {/* Increased min-height slightly to match taller neighbors */}
                <Card className="h-full flex flex-col items-center text-center justify-center min-h-[350px]">
                    <div className="mb-8 relative">
                         <div className="absolute inset-0 bg-[#FBBF24] blur-[60px] opacity-20 rounded-full"></div>
                        <BiCoinStack className="w-32 h-32 text-[#FBBF24] drop-shadow-[0_10px_20px_rgba(251,191,36,0.25)] relative z-10 transform rotate-12" />
                    </div>
                    <p className="text-neutral-300 leading-relaxed px-4">
                        Anyone with a wallet can integrate and be instantly rewarded with <YellowAccent>LBLX tokens</YellowAccent>.
                    </p>
                </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
                <Card className="flex flex-col gap-4">
                    <div className="p-2 w-fit rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/20">
                        <FaFingerprint className="w-6 h-6 text-[#FBBF24]" />
                    </div>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                        Powered by human intelligence for image labeling and data verification.
                    </p>
                </Card>
            </motion.div>
        </div>

        {/* --- Column 3 (Slider) --- */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            <motion.div variants={itemVariants}>
                 <p className="text-lg lg:text-xl text-white leading-relaxed font-light">
                    The first step to solving the AI data scarcity bottleneck is building a decentralized protocol for structured, high-quality task labeling.
                 </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex-1">
                 <TaskSlider />
            </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default AboutSection;