'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi2';
import { BiNetworkChart, BiData, BiCheckCircle } from 'react-icons/bi';

const Loader = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  // Workflow Steps Configuration
  const steps = [
    { text: "Initializing Core...", icon: <BiData className="w-6 h-6 text-[#FBBF24]" /> },
    { text: "Syncing Neural Nodes...", icon: <BiNetworkChart className="w-6 h-6 text-[#FBBF24]" /> },
    { text: "Verifying Protocol...", icon: <HiSparkles className="w-6 h-6 text-[#FBBF24]" /> },
    { text: "Access Granted", icon: <BiCheckCircle className="w-6 h-6 text-[#FBBF24]" /> }
  ];

  useEffect(() => {
    // Step sequencer
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 800); // Change step every 800ms

    // Complete loading after all steps
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onComplete, steps.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* --- Background Effects --- */}
      <div className="absolute inset-0 z-0">
        {/* Noise Grain */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
        {/* Central Pulse Glow */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FBBF24] rounded-full blur-[120px]"
        />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm px-6">
        
        {/* Logo / Brand Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0A0A0A] border border-[#FBBF24]/20 flex items-center justify-center shadow-[0_0_30px_-5px_rgba(251,191,36,0.3)]">
             <span className="text-3xl font-bold text-[#FBBF24]">L</span>
          </div>
          {/* Orbiting Particle */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10px] rounded-full border-t border-[#FBBF24]/50 opacity-50"
          />
        </motion.div>

        {/* Dynamic Workflow Text */}
        <div className="h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              {steps[step].icon}
              <span className="text-sm font-mono uppercase tracking-[0.2em] text-[#FBBF24]">
                {steps[step].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-[#FBBF24]"
            initial={{ width: "0%" }}
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
          {/* Moving Shine on bar */}
          <motion.div 
            className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
            animate={{ x: [-100, 400] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Footer Info */}
        <div className="flex justify-between w-full text-[10px] font-mono text-neutral-600 uppercase">
           <span>System: Online</span>
           <span>v2.4.0</span>
        </div>

      </div>
    </motion.div>
  );
};

export default Loader;