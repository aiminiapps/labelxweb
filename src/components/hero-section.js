'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { FaTelegramPlane, FaArrowRight, FaCheckCircle, FaRobot } from 'react-icons/fa';
import { BsStars, BsLightningChargeFill } from 'react-icons/bs';

// --- internal component: Magnetic Button ---
const MagneticButton = ({ children, className = "", onClick, variant = "primary" }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });
  const { x, y } = position;

  // Variant styles
  const baseStyles = "relative z-10 flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-[#FFD60A] text-[#000000] hover:shadow-[0_0_40px_rgba(255,214,10,0.4)]",
    glass: "bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/20"
  };

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// --- Main Hero Component ---
export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Scroll Parallax for the Background (moves slower than foreground)
  const yBg = useTransform(scrollY, [0, 1000], [0, 300]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    let x = (clientX - left) / width - 0.5;
    let y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[110vh] bg-[#000000] overflow-hidden flex flex-col justify-center items-center font-sans"
    >
      
      {/* 1. Dynamic Background & Glows */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
        {/* Top Right Yellow/Orange Glow */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#FFD60A]/10 rounded-full blur-[120px]" />
        {/* Bottom Left Purple/Blue Glow */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#5856D6]/20 rounded-full blur-[100px]" />
        {/* Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 2. Left Column: Text & CTA */}
        <motion.div style={{ y: yText }} className="space-y-8 max-w-2xl">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[#FFD60A] animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-white/80 font-medium">Live on Telegram</span>
          </motion.div>

          {/* Headline */}
          <div className="relative">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 1, 0.2, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]"
            >
              Label Data. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD60A] to-[#FF9500]">
                Earn Crypto.
              </span>
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-neutral-400 max-w-lg leading-relaxed"
          >
            Transform your spare time into tokenized rewards. Complete micro-missions, validate AI data, and climb the leaderboard—all within Telegram.
          </motion.p>

          {/* Buttons */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
             className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <MagneticButton variant="primary">
              <FaTelegramPlane className="text-xl" />
              <span>Launch App</span>
            </MagneticButton>
            <MagneticButton variant="glass">
              <span>View Missions</span>
              <FaArrowRight />
            </MagneticButton>
          </motion.div>

          {/* Social Proof / Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex items-center gap-6 pt-8 border-t border-white/5"
          >
            <div>
              <h4 className="text-2xl font-bold text-white">50k+</h4>
              <p className="text-sm text-neutral-500">Active Labelers</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <h4 className="text-2xl font-bold text-white">1.2M</h4>
              <p className="text-sm text-neutral-500">Missions Done</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 3. Right Column: The "Glass" Interface Visual */}
        <div className="relative h-[600px] w-full hidden lg:flex items-center justify-center perspective-[2000px]">
          
          {/* Floating Card 1 (Main Interface) */}
          <Card3D mouseX={mouseX} mouseY={mouseY} depth={20} className="relative z-20 w-[380px] bg-neutral-900/80 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl p-6 overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD60A] to-[#FF9500]" />
             
             {/* Header */}
             <div className="flex justify-between items-center mb-8">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <BsStars className="text-[#FFD60A]" />
                 </div>
                 <div>
                   <h3 className="text-white font-bold text-sm">Text Classification</h3>
                   <p className="text-xs text-neutral-400">Mission #4092</p>
                 </div>
               </div>
               <span className="text-[#FFD60A] text-xs font-mono border border-[#FFD60A]/20 px-2 py-1 rounded">+50 PTS</span>
             </div>

             {/* Content Mock */}
             <div className="space-y-3 mb-8">
                <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                <div className="h-24 w-full bg-black/40 rounded-xl border border-white/5 p-4 text-neutral-400 text-sm leading-relaxed">
                   "Analyze the sentiment of this crypto market update: 'Bitcoin consolidates as volume spikes...'"
                </div>
             </div>

             {/* Action Buttons Mock */}
             <div className="grid grid-cols-2 gap-3">
               <div className="h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400 text-sm font-medium">Positive</div>
               <div className="h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-sm font-medium">Negative</div>
             </div>
          </Card3D>

          {/* Floating Card 2 (Rewards - Behind) */}
          <Card3D mouseX={mouseX} mouseY={mouseY} depth={10} className="absolute top-20 right-10 z-10 w-[280px] bg-[#1a1a1a]/90 border border-white/10 rounded-3xl backdrop-blur-md p-5 shadow-2xl grayscale opacity-60">
             <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-sm font-bold">Reward Pool</h4>
                <BsLightningChargeFill className="text-white" />
             </div>
             <div className="h-20 bg-black/50 rounded-xl mb-3" />
             <div className="h-2 w-2/3 bg-white/20 rounded-full" />
          </Card3D>

          {/* Floating Elements (Orbs/Icons) */}
          <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={40} className="absolute top-10 left-10 text-[#FFD60A] text-4xl">
            <BsStars />
          </FloatingIcon>
          <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={-30} className="absolute bottom-20 right-20 text-[#5856D6] text-3xl opacity-80">
            <FaRobot />
          </FloatingIcon>

        </div>
      </div>
    </section>
  );
}

// --- Helper: 3D Tilt Card ---
function Card3D({ children, mouseX, mouseY, depth, className }) {
  const x = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-depth, depth]);
  
  // Subtle rotation based on mouse
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]); 
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  return (
    <motion.div style={{ x, y, rotateX, rotateY }} className={className}>
      {children}
    </motion.div>
  );
}

// --- Helper: Floating Icon ---
function FloatingIcon({ children, mouseX, mouseY, depth, className }) {
  const x = useTransform(mouseX, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-depth, depth]);

  return (
    <motion.div 
      style={{ x, y }} 
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}