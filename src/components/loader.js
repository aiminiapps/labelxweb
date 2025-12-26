'use client';

import { useState, useEffect } from 'react';
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  animate, 
  AnimatePresence 
} from 'motion/react';
import Image from 'next/image';

// --- Sub-component: The "Scanning" Brand Mark ---
const BrandLogo = ({ mouseX, mouseY }) => {
  // Parallax effect for the logo
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center perspective-1000"
    >
      {/* 1. Ambient Glow (Pulsing) */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#FBBF24] blur-[80px] rounded-full opacity-40" 
      />
      
      {/* 2. The Logo Image */}
      <motion.div
        className="relative w-full h-full z-10"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image 
          src="/t-logo.png" 
          alt="LabelX Logo" 
          fill 
          className="object-contain drop-shadow-[0_0_25px_rgba(251,191,36,0.4)]"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

// --- Main Loader ---
const Loader = ({ onComplete }) => {
  const [textIndex, setTextIndex] = useState(0);
  
  // Motion Values for performance (No React Re-renders for counting)
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  
  // Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const phrases = [
    "INITIALIZING NEURAL NET",
    "VERIFYING PROTOCOLS",
    "ESTABLISHING SECURE UPLINK",
    "WELCOME TO LABELX"
  ];

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  useEffect(() => {
    // 1. Hardware-Accelerated Counter
    const controls = animate(count, 100, { 
      duration: 3.8, 
      ease: [0.22, 1, 0.36, 1] // "Cinematic" heavy ease
    });

    // 2. Text Cycler
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev < phrases.length - 1 ? prev + 1 : prev));
    }, 1000);

    // 3. Completion Trigger
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 4000);

    return () => {
      controls.stop();
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [count, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden cursor-wait"
      onMouseMove={handleMouseMove}
      exit={{ 
        y: -1000, 
        opacity: 1, 
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } // "Curtain" lift effect
      }}
    >
      {/* --- Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Horizon Line */}
        <motion.div 
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FBBF24]/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* --- Centerpiece --- */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        
        <BrandLogo mouseX={mouseX} mouseY={mouseY} />

        {/* The Big Number (Driven by MotionValue) */}
        <div className="relative flex items-end overflow-hidden h-24 md:h-32">
          <motion.span className="text-8xl md:text-9xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10 tabular-nums">
            {rounded}
          </motion.span>
          <span className="text-2xl text-[#FBBF24] font-mono mb-6 ml-1">%</span>
        </div>

        {/* Status Text */}
        <div className="h-6 overflow-y-hidden overflow-x-visible relative w-full flex justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={textIndex}
              initial={{ y: 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -20, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="text-xs font-mono tracking-[0.3em] text-[#FBBF24] uppercase  text-nowrap"
            >
              {phrases[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>

      {/* --- Footer Signature --- */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white to-transparent" />
        <span className="text-[9px] font-mono uppercase tracking-widest text-white">System v1.2.0</span>
      </div>

    </motion.div>
  );
};

export default Loader;