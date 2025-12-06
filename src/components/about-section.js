'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue,
  animate,
  useInView
} from 'motion/react';
import { FaCoins, FaUser } from 'react-icons/fa6';
import { IoShieldCheckmarkOutline } from 'react-icons/io5';
import { RiListCheck2 } from "react-icons/ri";
import { TbWallet } from "react-icons/tb";
import { GiProcessor } from "react-icons/gi";
import { MdOutlineBuild } from "react-icons/md";
import { RiTwitterXFill } from "react-icons/ri";
import Link from 'next/link';


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
      
      {/* Refined Background Mesh */}
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
      
      {/* Interactive Mouse Spotlight */}
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
      
      {/* Vignette */}
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

// --- 6. About Section (Bento Grid) ---

const BentoCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={`group relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#0F0F0F] p-8 hover:bg-[#141414] transition-colors duration-500 ${className}`}
  >
    {/* Internal Glow Effect */}
    <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(255,122,26,0.06),transparent_100%)] z-0" />
    <div className="relative z-10 flex flex-col h-full">{children}</div>
  </motion.div>
);

const AboutSection = () => {
  return (
    <section className="relative w-full py-32 bg-black text-white overflow-hidden">
      {/* Divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl heading md:text-5xl font-bold tracking-tight mb-6"
            >
              What is <span className="text-[#FF7A1A]">LabelX?</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-gray-300/80 leading-relaxed"
            >
              LabelX is a platform where you earn real cryptocurrency by helping train artificial intelligence. 
              Think of it as getting paid to teach computers how to see, understand, and think better. 
              Every time you label an image, review text, or verify data, you're making AI smarter and 
              getting LBLX tokens sent straight to your wallet.
            </motion.p>
          </div>
          <Link href='https://x.com/AI_UR_Alfredo' target='_blank'>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-colors text-sm font-medium group"
            >
            Follow on <RiTwitterXFill size={20} className="text-[#FF7A1A] group-hover:translate-x-1 transition-transform" />
          </motion.div>
        </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Card 1: Large Left - Why We Built This */}
          <BentoCard className="md:col-span-2 min-h-[400px]">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-[#FF7A1A]/10 text-[#FF7A1A]">
                    <MdOutlineBuild size={23} />
                  </div>
                  <h3 className="text-2xl font-semibold heading">Why We Built This</h3>
                </div>
                <p className="text-gray-300/80 text-base leading-relaxed max-w-xl">
                  AI is everywhere from your phone's camera to voice assistants. But someone has to teach these systems how to work. 
                  That's where you come in. We believe the people doing the actual work should get paid fairly and instantly.
                </p>
              </div>
              
{/* Premium Stable Visual - Teaching AI Illustration */}
<div className="relative h-48 mt-8 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-black/60 to-[#FF7A1A]/5">
                {/* Ambient Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,122,26,0.15),transparent_60%)]" />
                
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(rgba(255,122,26,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,26,0.1) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
                
                <div className="absolute inset-0 flex items-center justify-center px-8">
                  <div className="flex gap-16 items-center">
                    {/* People/Workers Section */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A1A]/20 to-[#FF7A1A]/5 border border-[#FF7A1A]/30 flex items-center justify-center shadow-lg shadow-[#FF7A1A]/10">
                          <FaUser className="w-6 h-6 text-[#FF7A1A]" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A1A]/20 to-[#FF7A1A]/5 border border-[#FF7A1A]/30 flex items-center justify-center shadow-lg shadow-[#FF7A1A]/10">
                          <FaUser className="w-6 h-6 text-[#FF7A1A]" />
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7A1A]/20 to-[#FF7A1A]/5 border border-[#FF7A1A]/30 flex items-center justify-center shadow-lg shadow-[#FF7A1A]/10">
                          <FaUser className="w-6 h-6 text-[#FF7A1A]" />
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-400 tracking-wider">TRAINERS</div>
                    </div>

                    {/* Connection Lines */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-px bg-gradient-to-r from-[#FF7A1A]/50 to-[#FF7A1A]/20" />
                      <div className="w-20 h-px bg-gradient-to-r from-[#FF7A1A]/30 to-[#FF7A1A]/10" />
                      <div className="w-20 h-px bg-gradient-to-r from-[#FF7A1A]/50 to-[#FF7A1A]/20" />
                    </div>

                    {/* AI Brain Center */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#FF7A1A]/20 blur-2xl rounded-full" />
                        <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-[#FF7A1A]/30 to-[#FF7A1A]/10 border border-[#FF7A1A]/40 flex items-center justify-center shadow-2xl shadow-[#FF7A1A]/20">
                          <GiProcessor className="w-12 h-12 text-[#FF7A1A]" />
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-400 tracking-wider">AI SYSTEM</div>
                    </div>

                    {/* Connection Lines */}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-20 h-px bg-gradient-to-r from-[#FF7A1A]/20 to-green-500/50" />
                      <div className="w-20 h-px bg-gradient-to-r from-[#FF7A1A]/10 to-green-500/30" />
                      <div className="w-20 h-px bg-gradient-to-r from-[#FF7A1A]/20 to-green-500/50" />
                    </div>

                    {/* Payment Section */}
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10">
                          <span className="text-green-400 text-xl font-bold">$</span>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 flex items-center justify-center shadow-lg shadow-green-500/10">
                          <span className="text-green-400 text-xl font-bold">$</span>
                        </div>
                      </div>
                      <div className="text-xs font-medium text-green-400 tracking-wider">INSTANT PAY</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Large Right - Step 1 */}
          <BentoCard className="md:col-span-1 min-h-[400px]" delay={0.1}>
            <div className="h-full flex flex-col">
               <div className="mb-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                    <TbWallet className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400/80 border border-blue-500/20 px-2 py-1 rounded-full">Step 1</span>
                </div>
                <h3 className="text-2xl font-semibold heading mb-2">Connect Your Wallet</h3>
                <p className="text-gray-300/80">Link MetaMask or any Web3 wallet in seconds. No complicated signup forms.</p>
              </div>

              {/* Wallet UI Mockup */}
              <div className="mt-8 relative w-full aspect-[4/3] bg-[#1A1A1A] rounded-xl border border-white/5 p-4 flex flex-col gap-3 shadow-2xl">
                <div className="flex justify-between items-center mb-2">
                   <div className="w-12 h-2 rounded-full bg-white/10" />
                   <div className="w-4 h-4 rounded-full bg-green-500/20" />
                </div>
                <div className="h-24 rounded-lg border border-[#FF8533]/30 flex items-center justify-center">
                   <span className="text-[#FF8533] font-mono text-sm">0x3f...8a91</span>
                </div>
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg"
                >
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400 font-bold">Connected</span>
                </motion.div>
              </div>
            </div>
          </BentoCard>

          {/* Bottom Row */}
          
          {/* Card 3: Step 2 */}
          <BentoCard className="min-h-[300px]" delay={0.2}>
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                   <RiListCheck2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400/80 border border-purple-500/20 px-2 py-1 rounded-full">Step 2</span>
              </div>
              <h3 className="text-xl font-semibold heading mb-2">Pick a Task</h3>
              <p className="text-gray-300/80 text-sm mb-6">Browse available jobs label images, verify text, check data quality.</p>
              
              {/* Task UI Visual */}
              <div className="mt-auto relative space-y-2">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-orange-500' : 'bg-gray-500'}`} />
                      <div className="w-16 h-2 rounded-full bg-white/10" />
                    </div>
                    <div className="w-8 h-4 rounded bg-white/5" />
                  </motion.div>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Step 3 */}
          <BentoCard className="min-h-[300px]" delay={0.3}>
             <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-[#FDD536]/10 text-[#FDD536]">
                   <FaCoins className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FDD536]/80 border border-[#FDD536]/20 px-2 py-1 rounded-full">Step 3</span>
              </div>
              <h3 className="text-xl heading font-semibold mb-2">Get Paid Instantly</h3>
              <p className="text-gray-300/80 text-sm mb-6">LBLX tokens hit your wallet immediately. Trade or hold.</p>
              
              {/* Payment Visual */}
              <div className="mt-auto h-32 relative bg-[#1A1A1A] rounded-xl border border-[#FDD536]/10 overflow-hidden flex items-end">
                <div className="absolute top-3 left-3">
                  <span className="text-xs text-gray-500">Earnings</span>
                  <div className="text-lg font-bold text-[#FDD536]">+ 450.00 LBLX</div>
                </div>
                {/* Graph */}
                <div className="flex items-end justify-between w-full px-2 pb-2 gap-1 h-16">
                   {[40, 60, 45, 80, 70, 90, 100].map((h, i) => (
                     <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + (i * 0.05) }}
                      className="w-full bg-[#FDD536]/20 hover:bg-[#FDD536] transition-colors rounded-t-sm"
                     />
                   ))}
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Fairness/No Middlemen (Extra card to complete grid) */}
          <BentoCard className="min-h-[300px] md:col-span-1" delay={0.4}>
            <div className="flex flex-col h-full">
               <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-2xl bg-red-500/10 text-red-400">
                    <IoShieldCheckmarkOutline className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl heading font-semibold">No Middlemen</h3>
                </div>
                <p className="text-gray-300/80 text-sm mb-6">
                  Traditional companies keep the profits. We believe in direct rewards for your effort.
                </p>
                <div className="mt-10 flex justify-center py-6">
                   <div className="relative">
                      <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full" />
                      <div className="relative flex items-center gap-4 bg-black/40 px-4 py-2 rounded-xl border border-red-500/20">
                         <span className="text-sm line-through text-gray-500">Fees</span>
                         <span className="text-lg font-bold text-white">0%</span>
                      </div>
                   </div>
                </div>
            </div>
          </BentoCard>

        </div>
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

export default AboutSection;