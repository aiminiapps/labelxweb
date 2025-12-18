'use client';

import React, { useRef, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
} from 'motion/react';
import Link from 'next/link';
import { FaArrowRight, FaWallet, FaPlay } from 'react-icons/fa6';
import { RiRobot2Line, RiSecurePaymentFill } from 'react-icons/ri';
import { HiSparkles } from 'react-icons/hi2';

// --- 1. Lenis Smooth Scroll Setup (Standard for Luxury Sites) ---
const useLenis = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://unpkg.com/@studio-freight/lenis@1.0.29/dist/lenis.min.js";
    script.async = true;
    script.onload = () => {
      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    document.body.appendChild(script);
    return () => {
      if(document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);
};

// --- 2. Animations & Variants ---

// Standardized "Up & Fade" stagger for professional reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] // Apple-style "easeOutExpo"
    } 
  },
};

// --- 3. UI Components ---

const LuxuryBadge = () => (
  <motion.div 
    variants={itemVariants}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FBBF24]/20 bg-[#FBBF24]/5 backdrop-blur-md mb-8 group cursor-default transition-colors hover:border-[#FBBF24]/40"
  >
    <HiSparkles className="text-[#FBBF24] w-4 h-4 animate-pulse" />
    <span className="text-xs font-semibold tracking-[0.2em] text-[#FBBF24] uppercase">
      LabelX 2.0 Protocol
    </span>
  </motion.div>
);

const MovingGradientText = ({ children }) => {
  return (
    <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-[#FCD34D] to-[#D97706] bg-[length:200%_auto] animate-gradient-slow font-semibold">
      {children}
    </span>
  );
};

const MagneticButton = ({ children }) => {
  // Simple magnetic effect wrapper
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
};

// --- 4. Main Hero Component ---

const Hero = () => {
  useLenis();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Refined Parallax: Elements fade and blur out as you scroll down
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);
  const blurEffect = useTransform(scrollY, [0, 600], ['0px', '20px']);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#000000] selection:bg-[#FBBF24]/30"
    >
      {/* Background: "Void" Aesthetic 
        Using a noise texture to prevent banding and add industrial texture 
      */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Subtle Top Spotlight 
        Just a hint of light at the very top to frame the content
      */}
      <div className="absolute top-[-20%] left-0 right-0 h-[500px] bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08)_0%,transparent_70%)] blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: yParallax, opacity: opacityFade, filter: blurEffect }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center pt-20"
      >
        
        {/* Badge */}
        <LuxuryBadge />

        {/* Headline */}
        <div className="relative mb-8">
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.1]">
            Unlock the Value of
          </motion.h1>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-white leading-[1.1]">
            <span className="text-[#333]">Human</span> Intelligence
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 text-xl text-neutral-400 font-light max-w-2xl mx-auto">
            Train AI models and earn real crypto. The first decentralized 
            <br className="hidden md:block"/>
            <MovingGradientText> work-to-earn </MovingGradientText> ecosystem on <MovingGradientText> LabelX</MovingGradientText>.
          </motion.p>
        </div>

        {/* CTA Area */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-5 mt-8 w-full sm:w-auto"
        >
          {/* Primary Button: Solid Yellow */}
          <MagneticButton>
            <Link href="/tasks">
              <button className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#FBBF24] hover:bg-[#FCD34D] text-black rounded-xl font-bold text-lg transition-all shadow-[0_0_0_1px_rgba(251,191,36,0.1)] hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]">
                <FaPlay className="w-3 h-3" />
                <span>Start Earning</span>
              </button>
            </Link>
          </MagneticButton>

          {/* Secondary Button: Clean Glass */}
          <MagneticButton>
            <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] backdrop-blur-md text-white rounded-xl font-medium text-lg transition-all">
              <FaWallet className="w-4 h-4 text-[#FBBF24]" />
              <span>Connect Wallet</span>
              <FaArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </MagneticButton>
        </motion.div>

        {/* Stats / Social Proof (Clean Industrial Look) */}
        <motion.div 
          variants={itemVariants}
          className="mt-24 w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/[0.05] pt-12"
        >
            <StatBox icon={RiRobot2Line} value="2.5M+" label="Tasks Completed" />
            <StatBox icon={RiSecurePaymentFill} value="$1.2M" label="Paid to Users" />
            <StatBox icon={FaWallet} value="0.0s" label="Instant Payout" />
            
            {/* Partners / Ticker Placeholder */}
            <div className="flex items-center justify-center opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
               <span className="text-sm font-mono text-neutral-500 tracking-widest uppercase">Trusted by RiceAI</span>
            </div>
        </motion.div>

      </motion.div>

      {/* Tailwind Config Extension (Add this to your tailwind.config.js for the animation to work) */}
      <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-slow {
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

// --- 5. Sub-components ---

const StatBox = ({ icon: Icon, value, label }) => (
  <div className="flex flex-col items-center justify-center gap-2 group cursor-pointer">
    <div className="p-3 rounded-full bg-white/[0.03] border border-white/[0.05] group-hover:border-[#FBBF24]/20 transition-colors">
      <Icon className="w-5 h-5 text-neutral-400 group-hover:text-[#FBBF24] transition-colors" />
    </div>
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
      <p className="text-xs text-neutral-500 uppercase tracking-wider font-medium mt-1">{label}</p>
    </div>
  </div>
);

export default Hero;