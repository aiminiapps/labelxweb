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
  FaHistory,
  FaQuoteLeft,
  FaTwitter,
  FaDiscord,
  FaGithub
} from 'react-icons/fa';

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

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Data Scientist",
    text: "LabelX has revolutionized how we gather training data. The quality is unmatched and the speed is incredible.",
    initials: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Freelance Labeler",
    text: "Finally, a platform that pays fairly and instantly. I've made over 5,000 LBLX in my first month!",
    initials: "SC"
  },
  {
    name: "James Wilson",
    role: "AI Researcher",
    text: "The diversity of the workforce ensures our models are less biased. Essential for ethical AI development.",
    initials: "JW"
  },
  {
    name: "Maria Garcia",
    role: "Student",
    text: "I do tasks between classes. It's the perfect side hustle that actually teaches me about AI tech.",
    initials: "MG"
  },
  {
    name: "David Kim",
    role: "Tech Lead",
    text: "The API integration for submitting raw data is seamless. We've cut our preprocessing time in half.",
    initials: "DK"
  },
  {
    name: "Elena Popova",
    role: "QA Specialist",
    text: "As a validator, I appreciate the clean interface. It makes checking work efficiently very satisfying.",
    initials: "EP"
  }
];

const TestimonialSection = () => {
  return (
    <section className="relative w-full py-32 bg-[#050505] text-white overflow-hidden border-t border-white/5">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-20">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF7A1A] text-sm font-medium mb-6">
                <FaStar className="w-4 h-4" /> Community Trust
             </div>
             <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Loved by Builders & <span className="text-[#FF7A1A]">Earners</span>
             </h2>
             <div className="flex justify-center items-center gap-2 mb-8">
                <div className="flex text-[#00b67a]">
                   {[1,2,3,4,5].map(i => <FaStar key={i} className="w-6 h-6" />)}
                </div>
                <span className="text-xl font-bold">TrustScore 4.9</span>
                <span className="text-gray-500 text-sm">(2,400+ Reviews)</span>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {testimonials.map((t, i) => (
                <motion.div
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 hover:border-[#FF7A1A]/30 transition-colors duration-300 relative group"
                >
                   <FaQuoteLeft className="absolute top-6 right-6 text-white/5 w-8 h-8 group-hover:text-[#FF7A1A]/10 transition-colors" />
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF7A1A] to-[#FDD536] flex items-center justify-center text-black font-bold text-lg">
                         {t.initials}
                      </div>
                      <div>
                         <h4 className="font-bold text-white">{t.name}</h4>
                         <span className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</span>
                      </div>
                   </div>
                   <p className="text-gray-400 leading-relaxed">"{t.text}"</p>
                </motion.div>
             ))}
          </div>

       </div>
    </section>
  );
};

// --- 10. NEW: CTA Section ---

const CTASection = () => {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
       {/* Background Glow */}
       <div className="absolute inset-0 bg-gradient-to-t from-[#FF7A1A]/10 to-transparent pointer-events-none" />
       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FF7A1A]/20 blur-[120px] rounded-full pointer-events-none" />

       <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight"
          >
             Start Integrating <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-[#FDD536]">
                Today.
             </span>
          </motion.h2>
          
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
             Take your AI projects to the next level with our distributed workforce. 
             Scale faster, label better, and earn crypto while doing it.
          </motion.p>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
             <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:shadow-[0_0_40px_-10px_rgba(255,122,26,0.5)] transition-shadow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A1A] to-[#FDD536] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2 group-hover:text-white transition-colors">
                   Get Started Now <FaArrowRight />
                </span>
             </button>
             <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors">
                Read Documentation
             </button>
          </motion.div>

          <div className="mt-20 pt-10 border-t border-white/5 w-full flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#FF7A1A] flex items-center justify-center text-black font-bold text-xs">L</div>
                <span className="text-white font-bold">LabelX</span>
             </div>
             <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
             </div>
             <div>
                © 2024 LabelX Protocol.
             </div>
          </div>
       </div>
    </section>
  );
};

// --- 11. Main App Component ---

const App = () => {
  useLenis();

  return (
    <main className="bg-black min-h-screen w-full selection:bg-[#FF7A1A]/30">
      <Hero />
      <AboutSection />
      <AgentsSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CTASection />
    </main>
  );
};

export default App;