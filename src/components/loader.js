'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'motion/react';

// --- 1. The Abstract Brand Mark (SVG Path Animation) ---
const BrandLogo = ({ progress }) => {
  // A stylized abstract "L-X" geometric shape
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
      {/* Glow behind logo */}
      <div className="absolute inset-0 bg-[#FBBF24] blur-[80px] opacity-20" />
      
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
        {/* Outer Ring Segment */}
        <motion.path
          d="M 50 10 A 40 40 0 0 1 90 50"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* The "L" Shape */}
        <motion.path
          d="M 35 30 V 70 H 75"
          fill="none"
          stroke="#FBBF24"
          strokeWidth="6"
          strokeLinecap="square"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: progress / 100, opacity: 1 }} // Ties drawing to loading progress
          transition={{ duration: 0.1, ease: "linear" }}
        />
        {/* Decorative Dot */}
        <motion.circle 
          cx="75" cy="25" r="3" 
          fill="#FBBF24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </svg>
    </div>
  );
};

// --- 2. Main Loader ---
const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textStage, setTextStage] = useState(0);
  
  // Luxury Phrases
  const phrases = [
    "INITIALIZING PROTOCOL",
    "VERIFYING CREDENTIALS",
    "ESTABLISHING SECURE LINK",
    "WELCOME TO LABELX"
  ];

  useEffect(() => {
    // 1. Precise Progress Simulation
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Non-linear increment for realism (fast start, slow end)
      const increment = Math.max(1, (100 - currentProgress) / 15);
      currentProgress += increment;
      
      if (currentProgress >= 99.9) {
        currentProgress = 100;
        clearInterval(interval);
      }
      setProgress(currentProgress);
    }, 50);

    // 2. Text Rotation
    const textInterval = setInterval(() => {
      setTextStage(prev => (prev < phrases.length - 1 ? prev + 1 : prev));
    }, 1200);

    // 3. Completion Trigger
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden cursor-wait"
      exit={{ 
        y: -1000, // Cinematic "Curtain Up" exit
        opacity: 1, // Keep opacity to mask content underneath until moved
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
      }}
    >
      {/* --- Background Atmosphere --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fine Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Horizon Light Line */}
        <motion.div 
          className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FBBF24]/30 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        
        {/* Ambient Spotlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.03)_0%,transparent_60%)]" />
      </div>

      {/* --- Main Centerpiece --- */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* 1. The Brand Mark */}
        <div className="mb-12">
          <BrandLogo progress={progress} />
        </div>

        {/* 2. The Big Number (Typography as Art) */}
        <div className="relative overflow-hidden h-24 mb-6 flex items-center justify-center">
          <span className="text-8xl md:text-9xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
            {Math.floor(progress)}
          </span>
          <span className="text-2xl text-[#FBBF24] font-mono mb-auto mt-4 ml-2">%</span>
        </div>

        {/* 3. The Status Text (Fade Swap) */}
        <div className="h-6 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.p
              key={textStage}
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono tracking-[0.3em] text-[#FBBF24] uppercase text-center min-w-[200px]"
            >
              {phrases[textStage]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>

      {/* --- Footer Signature --- */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-center">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#FBBF24]/30 to-transparent" />
      </div>

    </motion.div>
  );
};

export default Loader;