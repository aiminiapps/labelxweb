'use client';

import React from 'react';
import { motion } from 'motion/react';
import { 
  FaFingerprint, 
  FaNetworkWired, 
  FaLayerGroup, 
  FaCodeBranch, 
  FaMemory,
  FaBolt
} from 'react-icons/fa';
import { SiOpencv } from 'react-icons/si';
import { BiRadar } from 'react-icons/bi';

// --- 1. Animation Configurations ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
  },
  hover: {
    y: -5,
    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
    borderColor: 'rgba(251, 191, 36, 0.3)',
    transition: { duration: 0.3 }
  }
};

// --- 2. Micro-Visual Components ---

// A. The "Scanning" Line Effect
const ScannerLine = () => (
  <motion.div 
    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#FBBF24]/50 to-transparent z-20"
    animate={{ top: ['0%', '100%', '0%'], opacity: [0, 1, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  />
);

// B. Active Data Stream (Binary Rain)
const DataStream = () => (
  <div className="flex gap-1 opacity-20 text-[8px] font-mono leading-none select-none overflow-hidden h-full">
    {[...Array(6)].map((_, i) => (
      <motion.div 
        key={i} 
        className="flex flex-col text-[#FBBF24]"
        animate={{ y: [0, -50] }}
        transition={{ duration: 2 + Math.random(), repeat: Infinity, ease: "linear" }}
      >
        {Array.from({length: 20}).map((_, j) => (
          <span key={j} className="mb-1">{Math.random() > 0.5 ? '1' : '0'}</span>
        ))}
      </motion.div>
    ))}
  </div>
);

// C. Pulsing Status Dot
const StatusDot = ({ label = "Active" }) => (
  <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-[#FBBF24]/10 border border-[#FBBF24]/20">
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FBBF24] opacity-75"></span>
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FBBF24]"></span>
    </span>
    <span className="text-[10px] uppercase font-bold tracking-wider text-[#FBBF24]/90">{label}</span>
  </div>
);

// D. Mini Bar Chart Animation
const MicroBarChart = () => (
  <div className="flex items-end gap-1 h-8">
    {[40, 70, 45, 90, 60, 80].map((h, i) => (
      <motion.div
        key={i}
        className="w-1.5 bg-neutral-700 rounded-sm"
        animate={{ 
          height: [`${h}%`, `${h * 0.6}%`, `${h}%`],
          backgroundColor: ['#333', i === 3 ? '#FBBF24' : '#333', '#333'] 
        }}
        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

// --- 3. Card Component ---

const AgentCard = ({ title, role, description, visual, colSpan = "col-span-1", delay = 0 }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className={`group relative flex flex-col justify-between p-6 md:p-8 rounded-[24px] border border-white/[0.08] bg-[#0A0A0A] overflow-hidden ${colSpan}`}
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/[0.05] group-hover:border-[#FBBF24]/30 group-hover:bg-[#FBBF24]/10 transition-colors duration-300">
             {visual.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white heading tracking-tight">{title}</h3>
            <p className="text-xs font-mono text-[#FBBF24]/90 uppercase tracking-wider">{role}</p>
          </div>
        </div>
        <StatusDot label="Online" />
      </div>

      {/* Visual / Graph Area */}
      <div className="relative z-10 mb-6 min-h-[60px] flex items-center">
         {visual.component}
      </div>

      {/* Description & Footer */}
      <div className="relative z-10 mt-auto">
        <p className="text-sm text-neutral-400 leading-relaxed font-light border-t border-white/[0.05] pt-4">
          {description}
        </p>
      </div>

      {/* Corner Accent */}
      {/* <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <FaBolt className="text-[#FBBF24] w-32 h-32 -translate-y-16 translate-x-16 rotate-12 blur-[40px]" />
      </div> */}
    </motion.div>
  );
};

// --- 4. Main Section Component ---

const AgentsSection = () => {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden flex flex-col items-center">
      {/* Industrial Noise Texture */}
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#FBBF24]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1600px] px-6 lg:px-12 flex flex-col gap-12">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tighter leading-[1.1]">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#d97706]">AI Assistants</span>
          </h2>
          <p className="mt-6 text-xl text-neutral-400 font-light max-w-2xl">
            A specialized fleet of automated agents working in the background to validate data, ensure quality, and process payments instantly.
          </p>
        </motion.div>

        {/* The Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          
          {/* Card 1: Validator (Large) */}
          <AgentCard 
            colSpan="lg:col-span-2"
            title="Validator Node X1"
            role="Quality Assurance"
            visual={{
              icon: <FaFingerprint className="text-white w-5 h-5" />,
              component: (
                 <div className="w-full h-16 bg-white/[0.02] rounded-lg border border-white/[0.05] relative overflow-hidden flex items-center px-4 gap-4">
                    <ScannerLine />
                    <MicroBarChart />
                    <div className="flex-1 h-px bg-white/10" />
                    <div className="text-xs font-mono text-[#FBBF24]">99.8% ACCURACY</div>
                 </div>
              )
            }}
            description="Autonomous verification engine that cross-references user submissions against golden datasets to ensure premium model accuracy."
          />

          {/* Card 2: Processor */}
          <AgentCard 
            title="Vector Core"
            role="Data Processing"
            visual={{
              icon: <FaNetworkWired className="text-white w-5 h-5" />,
              component: (
                <div className="relative w-full h-12 flex items-center justify-between overflow-hidden">
                   <DataStream />
                   <BiRadar className="w-8 h-8 text-[#FBBF24]/40 animate-spin-slow" />
                </div>
              )
            }}
            description="Handles raw data ingestion and formats it for specific ML model architectures."
          />

          {/* Card 3: Payout Bot */}
          <AgentCard 
            title="Smart Treasury"
            role="Instant Settlements"
            visual={{
              icon: <FaLayerGroup className="text-white w-5 h-5" />,
              component: (
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full border border-[#FBBF24]/30 flex items-center justify-center">
                        <FaBolt className="w-3 h-3 text-[#FBBF24]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase">Latency</span>
                        <span className="text-sm font-mono text-white">~0.4s</span>
                    </div>
                </div>
              )
            }}
            description="Executes smart contracts to distribute LBLX rewards immediately after verification."
          />

           {/* Card 4: Vision (Large) */}
           <AgentCard 
            title="Oculus Vision"
            role="Computer Vision"
            visual={{
              icon: <SiOpencv className="text-white w-5 h-5" />,
              component: (
                 <div className="w-full relative h-16 bg-black rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Simulated Object Detection Animation */}
                    <motion.div 
                        className="absolute w-8 h-8 border border-[#FBBF24] rounded-sm"
                        animate={{ 
                            x: [-20, 20, -20], 
                            y: [-5, 5, -5],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="absolute top-2 right-2 text-[8px] text-[#FBBF24] font-mono">DETECTING...</div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.05)_1px,transparent_1px)] bg-[size:16px_16px]" />
                 </div>
              )
            }}
            description="Pre-scans image datasets to identify potential objects and suggest bounding boxes for labelers."
          />

          {/* Card 5: Security */}
          <AgentCard 
            colSpan="lg:col-span-2"
            title="Sentinel Shield"
            role="Fraud Prevention"
            visual={{
              icon: <FaCodeBranch className="text-white w-5 h-5" />,
              component: (
                <div className="w-full flex items-center gap-4">
                     {/* Hexagon Mesh Simulation */}
                     <div className="flex gap-2">
                        {[1,2,3].map(i => (
                            <motion.div 
                                key={i}
                                className="w-8 h-8 border border-white/10 bg-white/5 skew-x-12"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                            />
                        ))}
                     </div>
                     <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                     <div className="px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[10px] text-green-400">SECURE</div>
                </div>
              )
            }}
            description="Continuously monitors the network for bot behavior and malicious actors to protect pool integrity."
          />

           {/* Card 6: Memory */}
           <AgentCard 
            title="Context Core"
            role="LLM Memory"
            visual={{
              icon: <FaMemory className="text-white w-5 h-5" />,
              component: (
                <div className="w-full grid grid-cols-4 gap-1">
                    {Array.from({length: 8}).map((_, i) => (
                        <motion.div 
                            key={i}
                            className="h-2 rounded-full bg-white/10"
                            animate={{ backgroundColor: ["rgba(255,255,255,0.1)", "rgba(251,191,36,0.6)", "rgba(255,255,255,0.1)"] }}
                            transition={{ duration: 1.5, delay: i * 0.1, repeat: Infinity }}
                        />
                    ))}
                </div>
              )
            }}
            description="Maintains context windows for text tasks to ensure consistent labeling across long documents."
          />

        </motion.div>
      </div>

       {/* Tailwind Custom Utility for slow spin */}
      <style jsx global>{`
        .animate-spin-slow {
            animation: spin 8s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default AgentsSection;