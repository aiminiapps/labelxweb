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
  useInView,
  AnimatePresence
} from 'framer-motion';
// Using standard react-icons/fa for maximum compatibility
import { 
  FaWallet, 
  FaBrain, 
  FaCoins, 
  FaCheckDouble, 
  FaUsers, 
  FaArrowRight, 
  FaRocket, 
  FaShieldAlt,
  FaEye,
  FaComments,
  FaHeadphones,
  FaLayerGroup,
  FaBolt,
  FaChartLine,
  FaCode,
  FaTerminal,
  FaLink,
  FaMousePointer,
  FaCheckCircle,
  FaClock,
  FaGlobeAmericas,
  FaQuestion,
  FaStar,
  FaHistory
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
        ease: [0.16, 1, 0.3, 1],
        onUpdate(value) {
          let formatted;
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
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15]"
      />
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

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: "Connect Your Wallet",
      desc: "Click 'Connect Wallet' and approve MetaMask (or any Web3 wallet). Takes 10 seconds. No email, no password, no personal info required.",
      details: ["Supports MetaMask, Trust Wallet", "One-click connection", "Secure blockchain auth"],
      icon: FaLink,
      color: "blue"
    },
    {
      id: 2,
      title: "Choose a Task",
      desc: "Browse available tasks filtered by type, difficulty, and reward. Pick what interests you—images, text, audio, or verification work.",
      details: ["See estimated time per task", "View LBLX reward upfront", "Filter by skill level"],
      icon: FaMousePointer,
      color: "purple"
    },
    {
      id: 3,
      title: "Complete & Get Paid",
      desc: "Follow the simple instructions, submit your work, and watch LBLX tokens appear in your wallet instantly. No waiting.",
      details: ["Real-time blockchain confirmation", "Instant wallet update", "Start next task immediately"],
      icon: FaCheckCircle,
      color: "green"
    }
  ];

  const faqs = [
    { q: "How Long Does It Take?", a: "Most tasks take 2-10 minutes. You can complete 6-30 tasks per hour." },
    { q: "How Much Can I Earn?", a: "Beginners earn 50-150 LBLX/task. Experts up to 400 LBLX. Avg user earns 1,500/hr." },
    { q: "What If I Make a Mistake?", a: "No penalties for honest errors. You'll get feedback to improve—no tokens deducted." },
    { q: "Can I Work Anytime?", a: "Yes! Tasks available 24/7. Work from anywhere, on any device." }
  ];

  return (
    <section className="relative w-full py-32 bg-black text-white overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF7A1A] text-sm font-medium mb-6"
           >
             <FaClock className="w-4 h-4" /> Quick Start Guide
           </motion.div>
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
           >
             Start Earning in <span className="text-[#FF7A1A]">3 Simple Steps</span>
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg text-gray-400 max-w-2xl mx-auto"
           >
             No experience needed. No complicated setup. Just connect, choose, and earn.
           </motion.p>
        </div>

        {/* Timeline Steps */}
        <div className="relative mb-32">
          {/* Vertical Line for Desktop */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-24">
             {steps.map((step, index) => (
               <motion.div 
                 key={step.id}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6, delay: index * 0.2 }}
                 className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
               >
                 {/* Number Bubble */}
                 <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/20 flex items-center justify-center z-10 hidden md:flex">
                    <span className="text-[#FF7A1A] font-bold font-mono">0{step.id}</span>
                 </div>

                 {/* Visual/Icon Side */}
                 <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                    <div className={`relative w-full max-w-sm aspect-video rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center group overflow-hidden ${index % 2 === 1 ? 'md:justify-start' : ''}`}>
                       {/* Animated Glow */}
                       <div className={`absolute inset-0 opacity-20 bg-gradient-to-tr from-${step.color}-500/30 to-transparent group-hover:opacity-40 transition-opacity`} />
                       <step.icon className={`w-16 h-16 text-${step.color}-400 relative z-10 group-hover:scale-110 transition-transform duration-500`} />
                    </div>
                 </div>

                 {/* Text Content Side */}
                 <div className="w-full md:w-1/2 pl-16 md:pl-0 text-left">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#FF7A1A]/20 text-[#FF7A1A] text-sm border border-[#FF7A1A]/30">{step.id}</span>
                      {step.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                       {step.desc}
                    </p>
                    <ul className="space-y-2">
                       {step.details.map((detail, i) => (
                         <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${step.color}-500`} />
                            {detail}
                         </li>
                       ))}
                    </ul>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>

        {/* Info Grid (Good to Know) */}
        <div className="mb-32">
           <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <FaQuestion className="text-[#FF7A1A]" /> Good to Know
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:bg-[#111] transition-colors"
                >
                   <h4 className="font-semibold text-[#FF7A1A] mb-3 text-sm uppercase tracking-wide">{faq.q}</h4>
                   <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Trust Stats Bar */}
        <div className="w-full py-8 border-y border-white/5 bg-white/[0.02] flex flex-wrap justify-center gap-8 md:gap-16 mb-24">
            {[
               { icon: FaUsers, text: "10,000+ Active Users" },
               { icon: FaGlobeAmericas, text: "$2.4M+ Paid Out" },
               { icon: FaStar, text: "4.8/5 Community Rating" },
               { icon: FaHistory, text: "98% Satisfaction" }
            ].map((stat, i) => (
               <div key={i} className="flex items-center gap-3 text-gray-400 font-medium">
                  <stat.icon className="text-[#FF7A1A]" />
                  <span>{stat.text}</span>
               </div>
            ))}
        </div>

        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#111] to-black border border-white/10 text-center px-6 py-20"
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,26,0.15),transparent_70%)]" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start?</h2>
             <p className="text-xl text-gray-400 mb-10">Join the workforce of the future. Connect your wallet and start earning crypto in minutes.</p>
             
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button className="w-full sm:w-auto px-8 py-4 bg-[#FF7A1A] text-black font-bold rounded-xl hover:bg-[#ff8f3d] transition-colors shadow-[0_0_30px_rgba(255,122,26,0.3)]">
                  Connect Wallet Now
               </button>
               <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors">
                  Try Demo Task
               </button>
             </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
};

// --- Helper Components ---

const StatItem = ({ value, suffix, label, sub, color, iconColor, prefix = "" }) => (
  <div className="group relative p-8 flex flex-col items-center justify-center hover:bg-white/[0.02] transition-colors duration-500">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/[0.03] to-transparent transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 flex flex-col items-center">
      <div className={`text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b ${color} to-white/60 mb-2 tracking-tight`}>
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

export default HowItWorksSection;