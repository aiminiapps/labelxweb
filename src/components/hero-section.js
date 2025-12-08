'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  useMotionTemplate, 
  useMotionValue,
  animate,
  useInView
} from 'motion/react';
import Link from 'next/link';

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

// --- 2. Micro-Interaction Icons (Draw Animations) ---

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

const AnimatedArrowRight = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <motion.path 
      d="M5 12h14" 
      initial={{ pathLength: 0 }} 
      animate={{ pathLength: 1 }} 
      transition={{ duration: 0.8, delay: 0.2 }} 
    />
    <motion.path 
      d="M12 5l7 7-7 7" 
      initial={{ pathLength: 0 }} 
      animate={{ pathLength: 1 }} 
      transition={{ duration: 0.8, delay: 0.4 }} 
    />
  </svg>
);

const AnimatedPlayIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);

const AnimatedDocIcon = ({ className }) => {
  const variants = {
    hover: { pathLength: 1, opacity: 1 },
    rest: { pathLength: 1, opacity: 0.7 }
  };
  
  return (
    <motion.svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      className={className}
      whileHover="hover"
      initial="rest"
    >
      <motion.path 
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" 
        variants={{ hover: { pathLength: [1, 0.8, 1] } }} 
      />
      <motion.path 
        d="M14 2v6h6" 
        variants={{ hover: { pathLength: [1, 0, 1], transition: { delay: 0.1 } } }}
      />
      <motion.path 
        d="M16 13H8" 
        variants={{ hover: { pathLength: [1, 0, 1], transition: { delay: 0.2 } } }}
      />
      <motion.path 
        d="M16 17H8" 
        variants={{ hover: { pathLength: [1, 0, 1], transition: { delay: 0.3 } } }}
      />
      <motion.path 
        d="M10 9H8" 
        variants={{ hover: { pathLength: [1, 0, 1], transition: { delay: 0.4 } } }}
      />
    </motion.svg>
  );
};

// --- 3. Animated Counter Component ---

const Counter = ({ from = 0, to, duration = 2.5, suffix = "" }) => {
  const nodeRef = useRef();
  const inView = useInView(nodeRef, { once: true, margin: "-20px" });
  
  useEffect(() => {
    const node = nodeRef.current;
    if (inView) {
      const controls = animate(from, to, {
        duration,
        ease: [0.16, 1, 0.3, 1], // Custom EaseOut
        onUpdate(value) {
          let formatted;
          // Cleaner number formatting logic
          if (value % 1 === 0) {
            formatted = value.toFixed(0);
          } else {
            formatted = value.toFixed(1);
          }
          formatted = Number(formatted).toLocaleString('en-US');
          node.textContent = formatted + suffix;
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef} className="tabular-nums" />;
};

// --- 4. Utility Components ---

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
      
      {/* Refined Background Mesh 
        Using the new Orange/Yellow theme 
        Primary: #FF7A1A, Secondary: #FDD536
      */}
      <motion.div 
        animate={{ 
          opacity: [0.2, 0.3, 0.2], 
          scale: [1, 1.05, 1],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] left-[10%] w-[800px] h-[800px] rounded-full blur-[130px] bg-[#FF7A1A]/10 mix-blend-screen"
      />
      <motion.div 
        animate={{ 
          opacity: [0.15, 0.25, 0.15], 
          scale: [1, 1.1, 1],
          x: [0, 40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[5%] right-[10%] w-[600px] h-[600px] rounded-full blur-[130px] bg-[#FDD536]/10 mix-blend-screen"
      />

      {/* Crisp Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15]"
      />
      
      {/* Interactive Mouse Spotlight - Using Primary Orange */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              500px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 122, 26, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* Vignette & Bottom Fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent h-full w-full pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent h-32 w-full pointer-events-none" />
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
    // Reduced magnetism slightly for cleaner feel
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

// --- 5. Main Hero Component ---

const Hero = () => {
  // Initialize Lenis within the component
  useLenis();
  
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  // Refined Parallax Physics
  // Increased damping for "heavier" feel, adjusted transforms to keep elements in view properly
  const smoothScrollY = useSpring(scrollY, {
    damping: 30,    // Smoother stop
    stiffness: 100, 
    mass: 0.8       // Heavier feel
  });

  const y1 = useTransform(smoothScrollY, [0, 500], [0, 50]); 
  
  // Text moves up slightly faster than scroll to create depth
  const y2 = useTransform(smoothScrollY, [0, 500], [0, -50]); 
  
  // Fade out logic remains the same
  const opacityFade = useTransform(smoothScrollY, [0, 400], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[110vh] flex flex-col items-center justify-center overflow-hidden bg-black selection:bg-[#FF7A1A]/30"
    >
      <SpotlightGrid />

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 flex flex-col items-center text-center">
        
        {/* Badge - Updated Colors */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md shadow-[0_0_20px_rgba(255,122,26,0.15)] hover:bg-white/[0.08] hover:border-[#FF7A1A]/30 transition-all duration-300 cursor-pointer group">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A1A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A1A]"></span>
            </span>
            <span className="text-sm font-medium text-[#FF7A1A] tracking-wide uppercase">
              LabelX 2.0 Live
            </span>
            <span className="w-px h-3 bg-white/20 mx-2" />
            <span className="text-sm text-gray-400 flex items-center gap-1 group-hover:text-white transition-colors">
              Start Earning <AnimatedArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          style={{ y: y2, opacity: opacityFade }}
          className="relative mb-8"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl heading sm:text-7xl md:text-8xl lg:text-[7rem] font-bold tracking-tighter text-white leading-[1.1] sm:leading-[1.05]"
          >
            Train AI 
            <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FF8533] to-[#FDD536] animate-gradient-x bg-[length:200%_auto]">
                Get Paid Crypto.
              </span>
              {/* Glow Behind Text */}
              <div className="absolute -inset-8 bg-[#FF7A1A]/20 blur-[90px] -z-10 opacity-30 rounded-full" />
            </span>
          </motion.h1>
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base text-balance md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light tracking-wide"
        >
          Join the decentralized workforce. Label data for top AI models and receive 
          <span className="text-white font-medium border-b border-[#FF7A1A]/30 pb-0.5 mx-1">instant LBLX payouts</span> 
          directly to your wallet.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto z-20"
        >
          {/* Primary Button */}
          <MagneticButton className="w-full sm:w-auto">
            <Link href='/tasks'>
            <button className="group relative w-full sm:w-auto px-9 py-4 bg-white text-black rounded-2xl font-bold text-base overflow-hidden shadow-[0_0_40px_-10px_rgba(255,122,26,0.4)]">
              {/* Internal shine using Primary color */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A1A]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center justify-center gap-2">
                <span className="p-1 bg-black rounded-full text-white group-hover:bg-[#FF7A1A] transition-colors duration-300">
                  <AnimatedPlayIcon className="w-3 h-3 translate-x-0.5" />
                </span>
                <span>Start Tasking</span>
              </div>
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 2 }}
                className="absolute inset-0 w-2/3 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-12 opacity-50 pointer-events-none"
              />
            </button>
            </Link>
          </MagneticButton>

          {/* Secondary Button */}
          <Link href='https://label-x.gitbook.io/label-x-docs/' target='_blank'>
          <button className="group w-full sm:w-auto px-9 py-4 bg-white/[0.02] border border-white/10 text-white rounded-2xl font-medium text-base backdrop-blur-xl transition-all relative overflow-hidden hover:bg-white/[0.05]">
            <div className="flex items-center justify-center gap-3">
              <AnimatedDocIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
              <span>How it Works</span>
            </div>
          </button>
          </Link>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          style={{ y: y1 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 w-full max-w-5xl px-4"
        >
          <div className="relative rounded-[32px] border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-2xl p-1 shadow-2xl overflow-hidden">
            {/* Ambient Background Glows - Adjusted for Theme */}
            <div className="absolute -top-32 left-0 w-96 h-96 bg-[#FF7A1A]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-32 right-0 w-96 h-96 bg-[#FDD536]/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5 bg-black/40 rounded-[28px] overflow-hidden">
              <StatItem 
                value={2.4} 
                suffix="M+" 
                label="Community Earnings" 
                sub="Paid Out" 
                // Primary Gradient
                color="from-[#FF7A1A]" 
                iconColor="text-[#FF7A1A]"
                prefix="$"
              />
              <StatItem 
                value={850} 
                suffix="M+" 
                label="Data Points" 
                sub="Total Volume" 
                // Secondary Gradient
                color="from-[#FDD536]" 
                iconColor="text-[#FDD536]"
              />
              <StatItem 
                value={12.5} 
                suffix="K+" 
                label="Active Labelers" 
                sub="Global Workforce" 
                // Success/Accent (Keeping subtle or using Primary)
                // Let's use Primary Darker or a mix
                color="from-[#FF8533]" 
                iconColor="text-[#FF8533]"
              />
            </div>
          </div>
        </motion.div>

      </div>
      
      {/* Floating Particles for Depth */}
      <FloatingParticles />
    </section>
  );
};

// --- Helper Components ---

const StatItem = ({ value, suffix, label, sub, color, iconColor, prefix = "" }) => (
  <div className="group relative p-8 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors duration-500">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/[0.03] to-transparent transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 flex flex-col items-center">
      <div className={`text-4xl md:text-5xl font-bold text-white/80 mb-2 tracking-tight`}>
        {prefix}<Counter from={0} to={value} suffix={suffix} />
      </div>
      
      <div className="flex items-center gap-2 mt-1">
        <AnimatedCheckIcon className={`w-4 h-4 ${iconColor} opacity-80`} />
        <span className="text-sm font-semibold text-gray-300 uppercase tracking-widest">
          {label}
        </span>
      </div>
      
      <span className="text-xs text-gray-600 font-medium mt-1 group-hover:text-gray-500 transition-colors">
        {sub}
      </span>
    </div>
  </div>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        y: [0, -40, 0],
        opacity: [0.1, 0.3, 0.1],
        rotate: [0, 45, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-[#FF7A1A]/5 blur-[40px]"
    />
    <motion.div
      animate={{
        y: [0, 60, 0],
        opacity: [0.1, 0.2, 0.1],
        rotate: [0, -30, 0]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/3 right-[5%] w-48 h-48 rounded-full bg-[#FDD536]/5 blur-[40px]"
    />
  </div>
);

// Exporting as Hero as requested
export default Hero;