'use client';

import React, { useState, useEffect } from 'react';
import { 
  motion
} from 'motion/react';
import { 
  FaWallet, 
  FaCoins, 
  FaEye,
  FaComments,
  FaHeadphones,
  FaCheckCircle,
  FaQuestion
} from 'react-icons/fa';

// Wallet Simulation Component
const WalletSim = () => {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setConnecting(true);
      setTimeout(() => {
        setConnected(true);
        setConnecting(false);
        setTimeout(() => {
           setConnected(false);
        }, 3000);
      }, 1500);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050505] border border-white/10 rounded-xl p-4 w-full h-full flex flex-col justify-center gap-3">
       <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
             <FaWallet className="w-4 h-4" />
          </div>
          <div className="text-xs font-semibold text-gray-300">Connect Wallet</div>
       </div>
       <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5">
             <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                   <FaWallet className="w-3 h-3" />
                </div>
                <span className="text-xs text-gray-400">MetaMask</span>
             </div>
             {connected ? (
                <FaCheckCircle className="w-3 h-3 text-green-500" />
             ) : (
               <div className="w-3 h-3 rounded-full border border-gray-600" />
             )}
          </div>
          <button className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${connected ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-blue-600 text-white'}`}>
             {connecting ? (
               <span className="flex items-center justify-center gap-2">
                 <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full" />
                 Connecting...
               </span>
             ) : connected ? "0x3f...8a91" : "Connect"}
          </button>
       </div>
    </div>
  );
};

// Task Selector Simulation
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
      <div className="bg-[#050505] border border-white/10 rounded-xl p-4 w-full h-full flex flex-col justify-center">
         <div className="text-xs font-semibold text-gray-400 mb-3 flex justify-between">
            <span>Select Task</span>
            <span className="text-[#FF7A1A]">Live Feed</span>
         </div>
         <div className="space-y-2">
            {tasks.map((t, i) => (
               <motion.div 
                 key={i}
                 animate={{ 
                    backgroundColor: active === i ? "rgba(255, 122, 26, 0.15)" : "rgba(255, 255, 255, 0.03)",
                    borderColor: active === i ? "rgba(255, 122, 26, 0.3)" : "rgba(255, 255, 255, 0.05)"
                 }}
                 className="flex items-center justify-between p-2 rounded-lg border transition-colors"
               >
                  <div className="flex items-center gap-2">
                     <t.icon className={`w-3 h-3 ${active === i ? 'text-[#FF7A1A]' : 'text-gray-500'}`} />
                     <span className={`text-xs ${active === i ? 'text-white' : 'text-gray-500'}`}>{t.label}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-400">{t.rew}</span>
               </motion.div>
            ))}
         </div>
      </div>
   );
};

// Payout Simulation
const PayoutSim = () => {
   const [balance, setBalance] = useState(1240);
   
   useEffect(() => {
     const timer = setInterval(() => {
        setBalance(prev => prev + 150);
     }, 2500);
     return () => clearInterval(timer);
   }, []);

   return (
      <div className="bg-[#050505] border border-white/10 rounded-xl p-4 w-full h-full flex flex-col justify-center relative overflow-hidden">
         <div className="absolute top-0 right-0 p-2 opacity-50">
            <FaCoins className="w-12 h-12 text-[#FDD536]/10 rotate-12" />
         </div>
         <div className="text-xs text-gray-500 mb-1">Total Earnings</div>
         <div className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <motion.span 
               key={balance}
               initial={{ scale: 1.2, color: "#FDD536" }}
               animate={{ scale: 1, color: "#ffffff" }}
            >
               {balance.toLocaleString()}
            </motion.span>
            <span className="text-xs text-[#FDD536] bg-[#FDD536]/10 px-1.5 py-0.5 rounded">LBLX</span>
         </div>
         <div className="h-10 flex items-end gap-1">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
               <motion.div 
                 key={i}
                 initial={{ height: "10%" }}
                 animate={{ height: `${h}%` }}
                 transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                 className="flex-1 bg-gradient-to-t from-[#FDD536]/20 to-[#FDD536] rounded-t-sm opacity-60"
               />
            ))}
         </div>
      </div>
   );
};

const HowItWorksSection = () => {
  const faqs = [
    { q: "How Long Does It Take?", a: "Most tasks take 2-10 minutes. You can complete 6-30 tasks per hour." },
    { q: "How Much Can I Earn?", a: "Beginners earn 50-150 LBLX/task. Experts up to 300 LBLX. Avg user earns 500/hr." },
    { q: "What If I Make a Mistake?", a: "No penalties for honest errors. You'll get feedback to improve—no tokens deducted." },
    { q: "Can I Work Anytime?", a: "Yes! Tasks available 24/7. Work from anywhere, on any device." }
  ];

  return (
    <section className="relative w-full py-18 bg-black text-white overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
           <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl heading lg:text-6xl font-bold tracking-tight mb-6"
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

        {/* 3-Column Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
           
           {/* Step 1 Card */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="group relative bg-[#0A0A0A] rounded-3xl border border-white/10 p-2 hover:border-[#FF7A1A]/30 transition-colors duration-500"
           >
              {/* Inner UI Visual */}
              <div className="h-48 rounded-2xl bg-[#0F0F0F] border border-white/5 mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)] transition-shadow duration-500">
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="p-2 h-full">
                    <WalletSim />
                 </div>
              </div>
              
              {/* Content */}
              <div className="px-4 pb-6">
                 <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-3 border border-blue-500/20">
                    STEP 1
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2 heading">Connect Your Wallet</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    Click "Connect Wallet" and approve MetaMask. Takes 10 seconds. No personal info required.
                 </p>
              </div>
           </motion.div>

           {/* Step 2 Card */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="group relative bg-[#0A0A0A] rounded-3xl border border-white/10 p-2 hover:border-[#FF7A1A]/30 transition-colors duration-500"
           >
              <div className="h-48 rounded-2xl bg-[#0F0F0F] border border-white/5 mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_-5px_rgba(255,122,26,0.15)] transition-shadow duration-500">
                 <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A1A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="p-2 h-full">
                    <TaskSelectorSim />
                 </div>
              </div>
              
              <div className="px-4 pb-6">
                 <div className="inline-block px-3 py-1 rounded-full bg-[#FF7A1A]/10 text-[#FF7A1A] text-xs font-bold mb-3 border border-[#FF7A1A]/20">
                    STEP 2
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2 heading">Choose a Task</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    Browse available tasks filtered by type and difficulty. Pick what interests you and start working.
                 </p>
              </div>
           </motion.div>

           {/* Step 3 Card */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="group relative bg-[#0A0A0A] rounded-3xl border border-white/10 p-2 hover:border-[#FDD536]/30 transition-colors duration-500"
           >
              <div className="h-48 rounded-2xl bg-[#0F0F0F] border border-white/5 mb-6 overflow-hidden relative group-hover:shadow-[0_0_30px_-5px_rgba(253,213,54,0.15)] transition-shadow duration-500">
                 <div className="absolute inset-0 bg-gradient-to-b from-[#FDD536]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <div className="p-2 h-full">
                    <PayoutSim />
                 </div>
              </div>
              
              <div className="px-4 pb-6">
                 <div className="inline-block px-3 py-1 rounded-full bg-[#FDD536]/10 text-[#FDD536] text-xs font-bold mb-3 border border-[#FDD536]/20">
                    STEP 3
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2 heading">Get Paid Instantly</h3>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    Submit your work and watch LBLX tokens appear in your wallet instantly. No waiting periods.
                 </p>
              </div>
           </motion.div>

        </div>

        {/* Info Grid (Good to Know) */}
        <div className="mb-8">
           <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 heading">
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
                   <h4 className="font-semibold text-[#FF7A1A] mb-3 text-sm uppercase heading tracking-wide">{faq.q}</h4>
                   <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
           </div>
        </div>
        {/* Final CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative hidden rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#111] to-black border border-white/10 text-center px-6 py-20"
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,122,26,0.15),transparent_70%)]" />
           
           <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className="text-4xl md:text-5xl font-bold mb-6 heading">Ready to Start?</h2>
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

export default HowItWorksSection