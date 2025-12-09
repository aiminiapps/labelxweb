'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  motion, 
  animate,
  useInView,
  AnimatePresence
} from 'motion/react';
import { 
  FaArrowRight, 
  FaEye,
  FaComments,
  FaHeadphones,
  FaLayerGroup,
  FaCode,
  FaTerminal
} from 'react-icons/fa';
import { GrValidate } from "react-icons/gr";
import { BsBarChartLine } from "react-icons/bs";
import { FaNetworkWired } from "react-icons/fa6";

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


const agents = [
  {
    id: 'vision',
    name: 'Vision Agent',
    icon: FaEye,
    color: '#FF7A1A',
    specialty: 'Image & Object Labeling',
    desc: 'Helps you identify and label objects in images with precision.',
    tasks: ['Product catalog labeling', 'Object detection tasks', 'Image quality verification'],
    earning: '50-150 LBLX',
    difficulty: 'Beginner',
    stats: { accuracy: '99.2%', volume: '500+ daily' }
  },
  {
    id: 'language',
    name: 'Language Agent',
    icon: FaComments,
    color: '#3B82F6',
    specialty: 'Text & Sentiment Analysis',
    desc: 'Assists with text classification, sentiment tagging, and language verification.',
    tasks: ['Text categorization', 'Sentiment labeling', 'Spam detection'],
    earning: '75-200 LBLX',
    difficulty: 'Intermediate',
    stats: { accuracy: '98.5%', volume: '400+ daily' }
  },
  {
    id: 'audio',
    name: 'Audio Agent',
    icon: FaHeadphones,
    color: '#A855F7',
    specialty: 'Speech & Sound Recognition',
    desc: 'Helps transcribe audio, label sound types, and verify speech-to-text accuracy.',
    tasks: ['Audio transcription', 'Speaker identification', 'Accent tagging'],
    earning: '100-250 LBLX',
    difficulty: 'Intermediate',
    stats: { accuracy: '97.8%', volume: '200+ daily' }
  },
  {
    id: 'validator',
    name: 'Data Validator',
    icon: GrValidate,
    color: '#10B981',
    specialty: 'Quality Control & Verification',
    desc: 'Reviews and verifies work from other labelers. Ensures high-quality datasets.',
    tasks: ['Double-checking labels', 'Dataset accuracy audits', 'Consensus verification'],
    earning: '125-250 LBLX',
    difficulty: 'Advanced',
    stats: { accuracy: '99.9%', volume: '300+ daily' }
  },
  {
    id: 'multi',
    name: 'Multi-Modal Agent',
    icon: FaLayerGroup,
    color: '#FDD536',
    specialty: 'Complex Multi-Task Projects',
    desc: 'Handles advanced tasks that combine images, text, and context.',
    tasks: ['Video annotation', 'Document understanding', 'Complex scene labeling'],
    earning: '150-300 LBLX',
    difficulty: 'Expert',
    stats: { accuracy: '96.5%', volume: '100+ daily' }
  }
];

const AgentsSection = () => {
  const [selectedAgentId, setSelectedAgentId] = useState('vision');
  const activeAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <section className="relative w-full py-16  text-white overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl heading lg:text-6xl font-bold tracking-tight mb-6"
          >
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-[#FDD536]">AI Assistants</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-400 text-balance"
          >
            Smart agents that help you complete tasks faster, earn more, and master data labeling. 
            Each specialist is trained for specific work choose your partner.
          </motion.p>
        </div>

        {/* Top Features Row (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: FaNetworkWired, title: "Work Faster", desc: "Agents pre-analyze data, cutting work time by 50%." },
            { icon: BsBarChartLine, title: "Track Progress", desc: "Real-time stats on accuracy and earnings per agent." },
            { icon: FaCode, title: "Learn as You Go", desc: "Each agent teaches you techniques to level up." }
          ].map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/5 text-white group-hover:text-[#FF7A1A] transition-colors">
                  <feat.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-lg heading">{feat.title}</h4>
              </div>
              <p className="text-sm text-gray-400 pl-[52px]">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* MAIN AGENT CONSOLE (The Dashboard Look) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">
          
          {/* Left Sidebar: Agent Selection */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 bg-[#0A0A0A] rounded-3xl border border-white/10 p-2 flex flex-col gap-2 overflow-y-auto custom-scrollbar"
          >
            <div className="px-4 py-4 text-xs font-mono text-gray-500 uppercase tracking-widest border-b border-white/5 mb-2">
              Select Agent Module
            </div>
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left group relative overflow-hidden ${
                  selectedAgentId === agent.id 
                    ? 'bg-white/[0.08] border border-white/10' 
                    : 'hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                {selectedAgentId === agent.id && (
                  <motion.div 
                    layoutId="active-agent-glow"
                    className="absolute inset-0 bg-gradient-to-r from-[#FF7A1A]/10 to-transparent opacity-100"
                  />
                )}
                <div 
                  className={`relative p-3 rounded-lg transition-colors ${
                    selectedAgentId === agent.id ? 'bg-[#FF7A1A] text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'
                  }`}
                >
                  <agent.icon className="w-5 h-5" />
                </div>
                <div className="relative z-10">
                  <h4 className={`font-semibold heading ${selectedAgentId === agent.id ? 'text-white' : 'text-gray-300'}`}>
                    {agent.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">{agent.difficulty} • {agent.earning}</p>
                </div>
                {selectedAgentId === agent.id && (
                  <div className="ml-auto relative z-10">
                    <div className="w-2 h-2 rounded-full bg-[#00FF94] shadow-[0_0_8px_#00FF94]" />
                  </div>
                )}
              </button>
            ))}
            
            {/* Promo / CTA in sidebar */}
            <div className="mt-auto p-4 rounded-xl bg-gradient-to-b from-[#FF7A1A]/10 to-transparent border border-[#FF7A1A]/20 mx-2 mb-2">
              <h5 className="text-[#FF7A1A] text-sm font-bold mb-1">No Subscription</h5>
              <p className="text-xs text-gray-400">All agents are free. Level up to unlock expert tiers.</p>
            </div>
          </motion.div>

          {/* Right Panel: Agent Details Console */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8 bg-[#0F0F0F] rounded-3xl border border-white/10 overflow-hidden flex flex-col relative"
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0A0A0A]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                   <div className="w-3 h-3 rounded-full bg-red-500/20" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                   <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="ml-4 px-3 py-1 rounded-md bg-black border border-white/10 text-xs font-mono text-gray-400 flex items-center gap-2">
                   <FaTerminal className="w-3 h-3" /> agent_config.json
                </div>
              </div>
              <div className="text-xs text-gray-500 font-mono">Run Mode: ACTIVE</div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeAgent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col"
                >
                  <div className="flex items-start justify-between mb-8">
                     <div>
                       <h3 className="text-3xl heading font-bold text-white mb-2">{activeAgent.name}</h3>
                       <p className="text-lg text-gray-400 max-w-lg">{activeAgent.desc}</p>
                     </div>
                     <div className="hidden sm:flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20">
                        <activeAgent.icon className="w-8 h-8" />
                     </div>
                  </div>

                  {/* Code Block Style Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 font-mono text-sm">
                       <div className="text-gray-500 mb-2">// Configuration</div>
                       <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-purple-400">specialty</span>
                          <span className="text-gray-300">"{activeAgent.specialty}"</span>
                       </div>
                       <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-blue-400">difficulty</span>
                          <span className="text-gray-300">"{activeAgent.difficulty}"</span>
                       </div>
                       <div className="flex justify-between py-1">
                          <span className="text-green-400">earning_rate</span>
                          <span className="text-[#FF7A1A]">{activeAgent.earning}</span>
                       </div>
                    </div>

                    <div className="p-5 rounded-xl bg-black/40 border border-white/5 font-mono text-sm">
                       <div className="text-gray-500 mb-2">// Performance_Metrics</div>
                       <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">accuracy_score</span>
                          <span className="text-white">{activeAgent.stats.accuracy}</span>
                       </div>
                       <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">daily_tasks</span>
                          <span className="text-white">{activeAgent.stats.volume}</span>
                       </div>
                       <div className="flex justify-between py-1">
                          <span className="text-gray-400">status</span>
                          <span className="text-green-400 flex items-center gap-2">
                             <span className="relative flex h-2 w-2">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                             </span>
                             ONLINE
                          </span>
                       </div>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <h4 className="text-sm font-semibold text-gray-300 uppercase heading tracking-wider mb-4">Optimized For</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeAgent.tasks.map((task, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
                           {task}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                </motion.div>
              </AnimatePresence>

              {/* Background Glow specific to agent color */}
              <motion.div 
                animate={{ 
                  background: `radial-gradient(600px circle at 100% 100%, ${activeAgent.color}15, transparent 60%)` 
                }}
                className="absolute inset-0 pointer-events-none transition-colors duration-500"
              />
            </div>
            
            {/* Console Footer */}
            <div className="p-4 bg-black/60 border-t border-white/5 flex justify-between items-center backdrop-blur-sm">
               <div className="flex gap-4 text-xs text-gray-500 font-mono">
                  <span>Ln 42, Col 12</span>
                  <span className='hidden sm:block'>UTF-8</span>
                  <span className='hidden sm:block'>JavaScript</span>
               </div>
               <button className="px-4 py-1.5 rounded-lg bg-[#FF7A1A] text-black text-xs font-bold hover:bg-[#ff9040] transition-colors flex items-center gap-2">
                  DEPLOY AGENT <FaArrowRight />
               </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AgentsSection;