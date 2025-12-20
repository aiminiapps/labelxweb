'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FaWallet, 
  FaCoins, 
  FaEye,
  FaComments,
  FaHeadphones,
  FaCheckCircle,
  FaQuestion,
  FaArrowRight
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

// --- 1. Simulation Components (The "Bento" Visuals) ---

const WalletSim = () => {
  const [step, setStep] = useState(0); // 0: Idle, 1: Connecting, 2: Connected
  
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050505] border border-white/10 rounded-xl p-5 w-full h-full flex flex-col justify-center gap-4 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#FBBF24]/10 blur-[40px]" />

       <div className="flex items-center gap-3 mb-2 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/20 flex items-center justify-center text-[#FBBF24]">
             <FaWallet className="w-4 h-4" />
          </div>
          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400">Wallet Sync</div>
       </div>

       <div className="space-y-2 relative z-10">
          {/* Mock Wallet Item */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
             <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#E2761B]/20 flex items-center justify-center text-[#E2761B]">
                   <FaWallet className="w-3 h-3" />
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-white font-medium">MetaMask</span>
                    <span className="text-[10px] text-neutral-500">Ether Network</span>
                </div>
             </div>
             {step === 2 ? (
                <FaCheckCircle className="w-4 h-4 text-[#FBBF24]" />
             ) : (
               <div className="w-4 h-4 rounded-full border border-neutral-700" />
             )}
          </div>

          {/* Action Button */}
          <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all duration-500 ${step === 2 ? 'bg-[#FBBF24]/20 text-[#FBBF24] border border-[#FBBF24]/50' : 'bg-white font-bold text-black border border-transparent'}`}>
             {step === 1 ? (
               <span className="flex items-center justify-center gap-2">
                 <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-3 h-3 border-2 border-black/30 border-t-black rounded-full" />
                 Connecting...
               </span>
             ) : step === 2 ? "0x3f...8a91 Connected" : "Connect Wallet"}
          </button>
       </div>
    </div>
  );
};

const TaskSelectorSim = () => {
   const [active, setActive] = useState(0);

   useEffect(() => {
     const timer = setInterval(() => {
        setActive(prev => (prev + 1) % 3);
     }, 2000);
     return () => clearInterval(timer);
   }, []);

   const tasks = [
     { icon: FaEye, label: "Image Labeling", rew: "150 LBLX" },
     { icon: FaComments, label: "Text Analysis", rew: "100 LBLX" },
     { icon: FaHeadphones, label: "Audio Trans.", rew: "200 LBLX" }
   ];

   return (
      <div className="bg-[#050505] border border-white/10 rounded-xl p-5 w-full h-full flex flex-col justify-center relative">
         <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-4 flex justify-between items-center">
            <span>Available Pools</span>
            <span className="flex items-center gap-1 text-[#FBBF24]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] animate-pulse"/> Live
            </span>
         </div>
         <div className="space-y-2">
            {tasks.map((t, i) => (
               <motion.div 
                 key={i}
                 animate={{ 
                    backgroundColor: active === i ? "rgba(251, 191, 36, 0.15)" : "rgba(255, 255, 255, 0.02)",
                    borderColor: active === i ? "rgba(251, 191, 36, 0.3)" : "rgba(255, 255, 255, 0.05)"
                 }}
                 className="flex items-center justify-between p-2.5 rounded-lg border transition-colors"
               >
                  <div className="flex items-center gap-3">
                     <t.icon className={`w-3 h-3 ${active === i ? 'text-[#FBBF24]' : 'text-neutral-600'}`} />
                     <span className={`text-xs font-medium ${active === i ? 'text-white' : 'text-neutral-500'}`}>{t.label}</span>
                  </div>
                  <span className={`text-[10px] font-mono ${active === i ? 'text-[#FBBF24]' : 'text-neutral-600'}`}>{t.rew}</span>
               </motion.div>
            ))}
         </div>
      </div>
   );
};

const PayoutSim = () => {
   const [balance, setBalance] = useState(1240);
   
   useEffect(() => {
     const timer = setInterval(() => {
        setBalance(prev => prev + 150);
     }, 2500);
     return () => clearInterval(timer);
   }, []);

   return (
      <div className="bg-[#050505] border border-white/10 rounded-xl p-5 w-full h-full flex flex-col justify-between relative overflow-hidden">
         <div className="absolute top-0 right-0 p-3 opacity-20">
            <FaCoins className="w-16 h-16 text-[#FBBF24] -rotate-12 translate-x-4 -translate-y-4" />
         </div>
         
         <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1">Total Earned</div>
            <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                <motion.span 
                key={balance}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                >
                {balance.toLocaleString()}
                </motion.span>
                <span className="text-xs font-bold text-[#FBBF24]">LBLX</span>
            </div>
         </div>

         {/* Animated Bars */}
         <div className="h-12 flex items-end gap-1.5 mt-4">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: "10%" }}
                 animate={{ height: `${h}%` }}
                 transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                 className={`flex-1 rounded-t-sm ${i > 6 ? 'bg-[#FBBF24]' : 'bg-[#FBBF24]/20'}`}
               />
            ))}
         </div>
      </div>
   );
};

// --- 2. Main Section ---

const HowItWorksSection = () => {
  const faqs = [
    { q: "Execution Time", a: "Average task completion time is 2-4 minutes. High-throughput workers can clear 30+ tasks/hour." },
    { q: "Reward Structure", a: "Base rate: 100 LBLX/task. Multipliers apply for accuracy streaks and validator roles." },
    { q: "Quality Consensus", a: "Mistakes are flagged by Validator Nodes. No slashing for beginners, only reputation adjustments." },
    { q: "Platform Access", a: "Browser-based interface. Optimized for desktop, but compatible with mobile wallets." }
  ];

  const variants = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="relative w-full py-20 bg-[#000000] overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24">
           <motion.h2 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={variants}
            className="text-4xl md:text-6xl font-medium tracking-tight mb-6"
           >
             Start Earning in <span className="text-[#FBBF24]">3 Steps</span>
           </motion.h2>
           
           <motion.p 
             initial="hidden" whileInView="visible" viewport={{ once: true }}
             variants={variants}
             className="text-lg text-neutral-400 max-w-2xl mx-auto font-light"
           >
             No complex KYC. No waiting periods. Pure decentralized work-to-earn.
           </motion.p>
        </div>

        {/* 3-Column Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
           
           {/* Step 1 */}
           <StepCard 
             stepNum="01"
             title="Connect Wallet"
             desc="Link your Web3 wallet (MetaMask, Phantom) to authenticate. Your wallet acts as your identity and payout address."
             visual={<WalletSim />}
             delay={0}
           />

           {/* Step 2 */}
           <StepCard 
             stepNum="02"
             title="Select Task"
             desc="Browse the curated task pool. Filter by dataset type (Image, Text, Audio) or payout rate. Click to begin."
             visual={<TaskSelectorSim />}
             delay={0.1}
           />

           {/* Step 3 */}
           <StepCard 
             stepNum="03"
             title="Instant Payout"
             desc="Upon consensus verification (usually <10s), LBLX tokens are smart-contract transfered to your wallet."
             visual={<PayoutSim />}
             delay={0.2}
           />

        </div>
      </div>
    </section>
  );
};

// --- Helper Component: Step Card ---

const StepCard = ({ stepNum, title, desc, visual, delay }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8 }}
        className="group relative flex flex-col h-full"
    >
        {/* Visual Container */}
        <div className="h-64 rounded-[32px] bg-[#0A0A0A] border border-white/[0.08] p-2 overflow-hidden relative mb-8 group-hover:border-[#FBBF24]/30 transition-colors duration-500">
            {/* Inner Dark Box */}
            <div className="h-full w-full rounded-[24px] bg-black border border-white/[0.05] overflow-hidden relative">
                {visual}
            </div>
        </div>
        
        {/* Text Content */}
        <div className="px-2">
            <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-light text-neutral-800 font-mono group-hover:text-[#FBBF24]/50 transition-colors duration-500">
                    {stepNum}
                </span>
                <div className="h-px flex-1 bg-white/[0.1]" />
            </div>
            <h3 className="text-2xl font-bold heading text-white mb-3 group-hover:text-[#FBBF24] transition-colors">{title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
                {desc}
            </p>
        </div>
    </motion.div>
);

export default HowItWorksSection;