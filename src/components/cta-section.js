'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  motion
} from 'motion/react';
import { 
  FaWallet, FaStar, FaQuoteLeft, FaTwitter, FaDiscord, FaGithub
} from 'react-icons/fa';

// --- 1. Lenis Smooth Scroll Setup ---
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
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

// --- 2. Micro-Interaction Icons ---

const drawTransition = {
  duration: 1.2,
  ease: "easeInOut"
};

const AnimatedCheckIcon = ({ className }) => (
  <motion.svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    className={className}
    whileHover="hover"
    initial="initial"
    animate="animate"
  >
    <motion.path 
      d="M20 6L9 17l-5-5" 
      variants={{
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1, transition: drawTransition },
        hover: { pathLength: [1, 0, 1], transition: { duration: 0.8 } } 
      }}
    />
  </motion.svg>
);

const reviews = [
  { name: "Alex R.", role: "Data Scientist", text: "LabelX revolutionized our training data. Quality is unmatched.", tags: ["Speed", "Quality"] },
  { name: "Sarah C.", role: "Earner", text: "Finally, a platform that pays instantly. Made 5000 LBLX this month!", tags: ["Crypto", "Easy"] },
  { name: "James W.", role: "AI Researcher", text: "The diversity of the workforce ensures less bias in our models.", tags: ["Ethical AI"] },
  { name: "Maria G.", role: "Student", text: "Perfect side hustle. I do tasks between classes on my phone.", tags: ["Mobile", "Flex"] },
  { name: "David K.", role: "Tech Lead", text: "API integration for raw data is seamless. Saved us weeks.", tags: ["Dev Friendly"] },
  { name: "Elena P.", role: "Validator", text: "Clean interface. Validating work is actually satisfying here.", tags: ["UI/UX"] },
  { name: "Tom H.", role: "Crypto Native", text: "Love earning crypto directly. No banks, no delays.", tags: ["Web3"] },
  { name: "Lisa M.", role: "Labeler", text: "The community is great and the tasks are actually fun.", tags: ["Community"] },
];

const ReviewCard = ({ review }) => (
  <div className="relative flex-shrink-0 w-[350px] p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-[#FF7A1A]/30 hover:bg-[#0F0F0F] transition-all duration-300 group mx-4">
    <div className="absolute top-6 right-6 text-white/5 group-hover:text-[#FF7A1A]/20 transition-colors">
       <FaQuoteLeft className="w-6 h-6" />
    </div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A1A] to-[#FDD536] flex items-center justify-center text-black font-bold text-sm">
        {review.name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{review.name}</h4>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</p>
      </div>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed mb-4">"{review.text}"</p>
    <div className="flex gap-2">
      {review.tags.map((tag, i) => (
        <span key={i} className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-400 font-mono border border-white/5">
          #{tag}
        </span>
      ))}
    </div>
  </div>
);

const CTASection = () => {
  return (
    <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center bg-black overflow-hidden border-t border-white/5">
       
       {/* Animated Warp Background */}
       <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
             transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A1A]/10 rounded-full blur-[100px]" 
          />
       </div>

       <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h2 
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tighter"
          >
             READY TO <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FDD536] to-[#FF7A1A] animate-gradient-x">
                LAUNCH?
             </span>
          </motion.h2>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col items-center gap-8"
          >
             <p className="text-xl text-gray-400 max-w-xl mx-auto">
                Start earning crypto in minutes. No resume, no interviews, just pure contribution.
             </p>

             <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative px-10 py-5 bg-[#FF7A1A] rounded-full text-black font-bold text-lg overflow-hidden shadow-[0_0_50px_-10px_rgba(255,122,26,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_70px_-10px_rgba(255,122,26,0.7)]">
                   <div className="absolute inset-0 bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                   <span className="relative flex items-center gap-2">
                      Connect Wallet <FaWallet />
                   </span>
                </button>
             </div>
          </motion.div>
       </div>

       {/* Footer Links */}
       <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-[#FF7A1A] to-[#FDD536] flex items-center justify-center text-black font-bold font-mono">
                   L
                </div>
                <span className="text-white font-bold tracking-wide">LabelX</span>
             </div>
             
             <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-[#FF7A1A] transition-colors">Documentation</a>
                <a href="#" className="hover:text-[#FF7A1A] transition-colors">Tokenomics</a>
                <a href="#" className="hover:text-[#FF7A1A] transition-colors">Privacy</a>
             </div>

             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                   <FaTwitter />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                   <FaDiscord />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                   <FaGithub />
                </a>
             </div>
          </div>
       </div>
    </section>
  );
};

export default CTASection;