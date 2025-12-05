'use client';

import React, { useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionTemplate, 
  useMotionValue 
} from 'framer-motion';

// --- Icon Components (Inline SVGs to prevent build errors) ---

const BsArrowRight = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
  </svg>
);

const BsPlayFill = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
  </svg>
);

const BsFileEarmarkText = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"/>
  </svg>
);

const BsStars = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
  </svg>
);

// --- Utility Components ---

/**
 * A subtle grid background that reveals itself near the mouse cursor
 */
const SpotlightGrid = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-auto"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-black" />
      
      {/* Aurora Gradients - softer and more premium */}
      <motion.div 
        animate={{ 
          opacity: [0.4, 0.6, 0.4], 
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] bg-green-500/20 mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          opacity: [0.3, 0.5, 0.3], 
          scale: [1, 1.2, 1],
          x: [0, 50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full blur-[120px] bg-emerald-500/10 mix-blend-screen"
      />

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      
      {/* Mouse Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(16, 185, 129, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    </div>
  );
};

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LabelXHero = () => {
  const containerRef = useRef(null);
  
  // Parallax Text with Physics-Based Smoothing (Lenis-feel)
  const { scrollY } = useScroll();
  
  // We use spring physics to dampen the raw scroll value, creating the smooth "fluid" effect
  // typical of libraries like Lenis, but natively in Framer Motion.
  const smoothScrollY = useSpring(scrollY, {
    damping: 25, // Higher damping = less oscillation (more "drifty")
    stiffness: 120, // Lower stiffness = looser connection to scroll
    mass: 0.5 // Heavy feel
  });

  const y1 = useTransform(smoothScrollY, [0, 500], [0, 200]);
  const y2 = useTransform(smoothScrollY, [0, 500], [0, 150]);
  const opacityFade = useTransform(smoothScrollY, [0, 300], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-black selection:bg-green-500/30"
    >
      <SpotlightGrid />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center text-center">
        
        {/* 1. Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.1)] hover:bg-white/[0.08] hover:border-green-500/30 transition-all duration-300 cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-300 tracking-wide uppercase">
              LabelX 2.0 is Live
            </span>
            <span className="w-px h-3 bg-white/20 mx-2" />
            <span className="text-sm text-gray-400 flex items-center gap-1 group-hover:text-white transition-colors">
              Start Earning <BsArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </motion.div>

        {/* 2. Hero Headline */}
        <motion.div
          style={{ y: y2, opacity: opacityFade }}
          className="relative mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tighter text-white leading-[1.1] sm:leading-[1.05]"
          >
            Train AI. <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-gradient-x">
                Get Paid Crypto.
              </span>
              {/* Glow behind text */}
              <div className="absolute -inset-8 bg-green-500/20 blur-[60px] -z-10 opacity-40 rounded-full" />
            </span>
          </motion.h1>
        </motion.div>

        {/* 3. Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          Join the decentralized workforce. Label data for top AI models and receive 
          <span className="text-white font-medium border-b border-green-500/30 pb-0.5"> instant LBLX payouts</span> directly to your wallet.
        </motion.p>

        {/* 4. Creative Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto z-20"
        >
          {/* Primary Button - Magnetic + Glow */}
          <MagneticButton className="w-full sm:w-auto">
            <a href="/?tab=task2" className="block w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full sm:w-auto px-9 py-4.5 bg-white text-black rounded-2xl font-bold text-base overflow-hidden shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]"
              >
                {/* Internal gradient shine */}
                <div className="absolute inset-0 bg-gradient-to-tr from-green-300/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex items-center justify-center gap-2">
                  <span className="p-1 bg-black rounded-full text-white group-hover:bg-green-600 transition-colors duration-300">
                    <BsPlayFill className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                  </span>
                  <span>Start Tasking</span>
                </div>
                
                {/* Continuous Shimmer */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                  className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 opacity-50"
                />
              </motion.button>
            </a>
          </MagneticButton>

          {/* Secondary Button - Glassy */}
          <a href="#docs" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.98 }}
              className="group w-full sm:w-auto px-9 py-4.5 bg-white/[0.02] border border-white/10 text-white rounded-2xl font-medium text-base backdrop-blur-xl transition-all relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="flex items-center justify-center gap-2">
                <BsFileEarmarkText className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                <span>How it Works</span>
              </div>
            </motion.button>
          </a>
        </motion.div>

        {/* 5. Enhanced Dashboard Stats Section */}
        <motion.div
          style={{ y: y1 }} // Smooth physics-based parallax
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 w-full max-w-5xl px-4"
        >
          {/* Glass Card Container */}
          <div className="relative rounded-[32px] border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-2xl p-1 shadow-2xl">
            {/* Ambient Glows */}
            <div className="absolute -top-24 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Top Highlight Line */}
            <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-black/20 rounded-[28px] overflow-hidden">
              {[
                { 
                  label: "Community Earnings", 
                  value: "$2.4M+", 
                  suffix: "Paid Out",
                  color: "text-emerald-400"
                },
                { 
                  label: "Data Points Labeled", 
                  value: "850M+", 
                  suffix: "Total Volume",
                  color: "text-blue-400"
                },
                { 
                  label: "Active Labelers", 
                  value: "12,500+", 
                  suffix: "Global Workforce",
                  color: "text-purple-400"
                }
              ].map((stat, i) => (
                <div key={i} className="group relative p-8 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors duration-500">
                  {/* Hover Spotlight inside card */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/[0.02] to-transparent transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0.9 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2 tracking-tight ${stat.color.replace('text', 'from')}`}
                    >
                      {stat.value}
                    </motion.div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <BsStars className={`w-3 h-3 ${stat.color} opacity-70`} />
                      <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
                        {stat.label}
                      </span>
                    </div>
                    
                    <span className="text-xs text-gray-600 font-medium mt-1 group-hover:text-gray-500 transition-colors">
                      {stat.suffix}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Bottom Highlight Line */}
            <div className="absolute inset-x-12 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>

      </div>

      {/* Decorative Floating Elements */}
      <FloatingParticles />
    </section>
  );
};

// --- Sub-components for Visual Flair ---

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Particle 1 */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[10%] w-32 h-32 rounded-3xl border border-green-500/10 bg-green-500/5 backdrop-blur-[2px] hidden lg:block"
      />
      {/* Particle 2 */}
      <motion.div
        animate={{
          y: [0, 60, 0],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-[5%] w-24 h-24 rounded-full border border-emerald-500/10 bg-emerald-500/5 backdrop-blur-[2px] hidden lg:block"
      />
    </div>
  );
}

export default LabelXHero;