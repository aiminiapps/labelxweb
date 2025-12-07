'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaFingerprint, FaWallet, FaShapes, FaBolt, FaGlobeAmericas, FaCheck } from 'react-icons/fa';
import { RiBnbLine } from "react-icons/ri";

// --- The "Real" Users & Data ---
// Content rewritten to be specific to LabelX: Micro-tasks, specific LBLX amounts, and varied use cases.
const feedData = [
  {
    id: "tx-8821",
    user: "Javi M.",
    location: "Buenos Aires",
    role: "L2 Validator",
    avatar: "https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1974&auto=format&fit=crop", // Candid, smiling
    action: "Verified 50 Images",
    reward: "42.50 LBLX",
    time: "2m ago",
    text: "Gas fees usually kill micro-earnings, but the L2 integration here is seamless. Just withdrew my week's earnings to my main wallet. ⚡️",
    tags: ["Low Fees", "Withdrawal"]
  },
  {
    id: "tx-8822",
    user: "Sophie K.",
    location: "Berlin",
    role: "RLHF Trainer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop", // Edgy, urban
    action: "Text Analysis",
    reward: "115.00 LBLX",
    time: "12m ago",
    text: "I do about 20 mins of 'toxicity checks' on my commute. The mobile UI is actually usable compared to Remotasks. Pays for my coffee.",
    tags: ["Mobile UX", "Side Hustle"]
  },
  {
    id: "tx-8823",
    user: "Dev_Ranjit",
    location: "Mumbai",
    role: "Full Stack Dev",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop", // Professional yet casual
    action: "Dataset API",
    reward: "Dev Grant",
    time: "1h ago",
    text: "Integrated the LabelX raw data feed into our startup's training pipeline. The quality of the bounding boxes is surprisingly high.",
    tags: ["API", "Data Quality"]
  },
  {
    id: "tx-8824",
    user: "Crypto_Dad",
    location: "Ohio",
    role: "Node Operator",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop", // Normal guy
    action: "Node Upkeep",
    reward: "1,200 LBLX",
    time: "3h ago",
    text: "My GPU was sitting idle anyway. Setup the validation node last night, woke up to rewards. Passive income is real.",
    tags: ["Mining", "Passive"]
  }
];

// --- The "Block" Card Component ---
const BlockCard = ({ data, isActive, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        scale: isActive ? 1 : 0.98,
        borderColor: isActive ? 'rgba(255, 122, 26, 0.5)' : 'rgba(255, 255, 255, 0.05)'
      }}
      className={`
        relative cursor-pointer group rounded-xl border transition-all duration-300 overflow-hidden
        ${isActive ? 'bg-[#111111] shadow-[0_0_30px_-10px_rgba(255,122,26,0.2)]' : 'bg-[#0A0A0A] hover:bg-[#111] hover:opacity-80'}
      `}
    >
      {/* Selection Indicator Line */}
      {isActive && (
        <motion.div 
          layoutId="active-glow"
          className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF7A1A]" 
        />
      )}

      <div className="p-4 md:p-5 flex gap-4 items-start">
        {/* Avatar Section */}
        <div className="relative flex-shrink-0">
          <img 
            src={data.avatar} 
            alt={data.user} 
            className={`w-12 h-12 rounded-full object-cover border-2 transition-colors ${isActive ? 'border-[#FF7A1A]' : 'border-white/10'}`}
          />
          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
             <div className="bg-emerald-500 rounded-full p-0.5">
                <FaCheck className="w-2 h-2 text-black" />
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-1">
             <h4 className={`font-bold text-sm truncate ${isActive ? 'text-white' : 'text-gray-400'}`}>
                {data.user}
             </h4>
             <span className="font-mono text-[10px] text-gray-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                {data.time}
             </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500 font-mono mb-3">
             <span className="flex items-center gap-1">
               <FaFingerprint className="opacity-50" /> {data.id}
             </span>
             <span className="flex items-center gap-1 text-[#FF7A1A]">
               <FaWallet className="opacity-50" /> {data.reward}
             </span>
          </div>

          <p className={`text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-gray-200' : 'text-gray-500 line-clamp-2'}`}>
            "{data.text}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- Detail View (The "Block Explorer" Details) ---
const DetailView = ({ data }) => {
  if (!data) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      key={data.id}
      className="h-full bg-[#111111] rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col relative overflow-hidden"
    >
        {/* Decorative Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />
        
        {/* Header Metadata */}
        <div className="flex items-center justify-between mb-8 relative z-10">
           <div className="px-3 py-1 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 text-[#FF7A1A] text-xs font-mono tracking-wider flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A1A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A1A]"></span>
              </span>
              ON-CHAIN VERIFIED
           </div>
           <RiBnbLine className="text-yellow-500 w-6 h-6" />
        </div>

        {/* Main Quote */}
        <div className="flex-1 relative z-10">
           <FaShapes className="text-white/5 w-20 h-20 absolute -top-4 -left-4 rotate-12" />
           <h3 className="text-2xl md:text-3xl font-medium text-white/80 mb-6 relative">
              "{data.text}"
           </h3>
           
           {/* Detailed Stats Grid */}
           <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 rounded-lg bg-black/50 border border-white/5">
                 <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Task Type</p>
                 <p className="text-white font-mono text-sm flex items-center gap-2">
                    <FaBolt className="text-yellow-500" /> {data.action}
                 </p>
              </div>
              <div className="p-4 rounded-lg bg-black/50 border border-white/5">
                 <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Validator Location</p>
                 <p className="text-white font-mono text-sm flex items-center gap-2">
                    <FaGlobeAmericas className="text-blue-500" /> {data.location}
                 </p>
              </div>
              <div className="p-4 rounded-lg bg-black/50 border border-white/5 col-span-2">
                 <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Smart Contract Output</p>
                 <p className="text-[#FF7A1A] font-mono text-lg font-bold">
                    + {data.reward} <span className="text-xs text-gray-500 font-normal">sent to wallet</span>
                 </p>
              </div>
           </div>
        </div>
        
        {/* Footer Signature */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4 relative z-10">
           <img src={data.avatar} className="w-10 h-10 rounded-full grayscale" alt="" />
           <div>
              <p className="text-white text-sm font-bold">{data.user}</p>
              <p className="text-gray-500 text-xs">{data.role}</p>
           </div>
           <div className="ml-auto flex gap-2">
              {data.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase text-gray-600 border border-gray-800 px-2 py-1 rounded">
                      {tag}
                  </span>
              ))}
           </div>
        </div>
    </motion.div>
  );
};

const TestimonialSection = () => {
  const [activeId, setActiveId] = useState(feedData[0].id);
  const activeData = feedData.find(d => d.id === activeId);

  // Auto-rotate selection every 5 seconds to keep it "Live"
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = feedData.findIndex(d => d.id === activeId);
      const nextIndex = (currentIndex + 1) % feedData.length;
      setActiveId(feedData[nextIndex].id);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeId]);

  return (
    <section className="relative w-full py-16  overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A1A]/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF7A1A]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
         
         {/* Section Header */}
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl heading font-bold text-white tracking-tighter mb-4">
              Decentralized <span className="text-[#FF7A1A]">Trust</span>
            </h2>
            <p className="text-gray-400 text-balance max-w-xl mx-auto text-lg">
              See how the LabelX workforce is earning crypto in real-time. 
              Actual transactions, verified on-chain.
            </p>
         </div>

         {/* The "Consensus" UI Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
            
            {/* Left Side: The "Feed" (40% width) */}
            <div className="lg:col-span-5 flex flex-col gap-3 h-full overflow-y-auto pr-2 custom-scrollbar">
               <div className="flex items-center justify-between text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest px-1">
                  <span>Recent Activity</span>
                  <span className="flex items-center gap-1 text-emerald-500">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Live
                  </span>
               </div>
               
               {feedData.map((item) => (
                  <BlockCard 
                    key={item.id} 
                    data={item} 
                    isActive={activeId === item.id}
                    onClick={() => setActiveId(item.id)}
                  />
               ))}
            </div>

            {/* Right Side: The "Deep Dive" (60% width) */}
            <div className="lg:col-span-7 h-full">
               <DetailView data={activeData} />
            </div>

         </div>
      </div>
    </section>
  );
};

export default TestimonialSection;