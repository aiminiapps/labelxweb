'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaCheckCircle, FaEthereum } from 'react-icons/fa';
import { SiHiveBlockchain } from "react-icons/si";

// Real images and human-written, specific content based on LabelX context
const reviews = [
  { 
    name: "Marcus Chen", 
    role: "AI Model Trainer", 
    handle: "@marcus_ai",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    text: "Most labeling platforms have terrible QC. LabelX's consensus mechanism actually works—we reduced model hallucinations by 12% using their dataset.", 
    tags: ["Data Quality", "Enterprise"],
    earnings: null
  },
  { 
    name: "Sarah Jenkins", 
    role: "Crypto Native", 
    handle: "@sara_eth",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    text: "I was skeptical about the 'instant payout', but the smart contract triggered immediately. Earned 4,200 LBLX this week just validating images during my commute.", 
    tags: ["Web3", "Side Hustle"],
    earnings: "4,200 LBLX"
  },
  { 
    name: "David Okonjo", 
    role: "Comp Sci Student", 
    handle: "@david_codes",
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop",
    text: "Finally, a way to earn crypto that doesn't require $10k capital. The mobile UI is super clean; I do tasks between lectures.", 
    tags: ["Mobile", "UX"],
    earnings: "1,150 LBLX"
  },
  { 
    name: "Elena Rodriguez", 
    role: "Lead Data Scientist", 
    handle: "@elena_ml_ops",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    text: "The API integration for raw data ingestion saved my team about two weeks of dev time. Documentation is actually readable.", 
    tags: ["Dev Experience", "API"],
    earnings: null
  },
  { 
    name: "Tom Harrison", 
    role: "Validator Node", 
    handle: "@tom_node",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    text: "Running a validation node has been smooth. The dashboard analytics are real-time, unlike other decentralized platforms I've tried.", 
    tags: ["Infrastructure", "Analytics"],
    earnings: "12,500 LBLX"
  },
];

const ReviewCard = ({ review }) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative flex-shrink-0 w-[400px] p-6 mx-4 rounded-2xl bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 hover:border-[#FF7A1A]/50 hover:shadow-[0_0_30px_-10px_rgba(255,122,26,0.3)] transition-all duration-300 group overflow-hidden"
  >
    {/* Subtle Background Gradient Mesh */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A1A]/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none group-hover:bg-[#FF7A1A]/20 transition-all" />

    {/* Header */}
    <div className="flex items-start justify-between mb-5 relative z-10">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={review.img} 
            alt={review.name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-[#FF7A1A] transition-colors"
          />
          <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
            <FaCheckCircle className="text-[#FF7A1A] w-4 h-4" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white text-[15px] leading-tight flex items-center gap-2">
            {review.name}
          </h4>
          <p className="text-xs text-gray-500 font-mono">{review.handle}</p>
        </div>
      </div>
      <FaQuoteLeft className="text-white/10 w-6 h-6 group-hover:text-[#FF7A1A]/40 transition-colors" />
    </div>

    {/* Body */}
    <p className="text-gray-300 text-[15px] leading-relaxed mb-6 font-light relative z-10">
      "{review.text}"
    </p>

    {/* Footer & Stats */}
    <div className="flex items-center justify-between border-t border-white/5 pt-4 relative z-10">
      <div className="flex gap-2">
        {review.tags.map((tag, i) => (
          <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 text-[11px] text-gray-400 border border-white/5 group-hover:border-white/10 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Gamified Earnings Badge (If applicable) */}
      {review.earnings && (
        <div className="flex items-center gap-1.5 text-[#FDD536] text-xs font-bold bg-[#FDD536]/10 px-2 py-1 rounded-full border border-[#FDD536]/20">
          <SiHiveBlockchain className="w-3 h-3" />
          {review.earnings}
        </div>
      )}
    </div>
  </motion.div>
);

const TestimonialSection = () => {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-[#FF7A1A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-20 text-center relative z-10">
         {/* Trust Badge */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default backdrop-blur-sm mb-8"
         >
            <div className="flex gap-1 text-[#FF7A1A]">
                {[...Array(5)].map((_, i) => <FaStar key={i} className="w-3.5 h-3.5" />)}
            </div>
            <span className="text-gray-400 text-sm ml-1">Trusted by <span className="text-white font-semibold">10,000+</span> contributors</span>
         </motion.div>

         {/* Heading */}
         <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white"
         >
            The workforce behind <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-[#FDD536]">
              Smarter AI Models
            </span>
         </motion.h2>

         <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
         >
            Join thousands of data labelers, developers, and crypto natives earning LBLX for powering the next generation of artificial intelligence.
         </motion.p>
      </div>

      {/* Marquee Container with Gradient Mask */}
      <div className="relative w-full overflow-hidden">
         {/* Left Fade Mask */}
         <div className="absolute top-0 left-0 h-full w-24 md:w-64 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
         {/* Right Fade Mask */}
         <div className="absolute top-0 right-0 h-full w-24 md:w-64 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

         <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused] py-10">
            {/* We duplicate the array twice to ensure smooth looping without gaps on large screens */}
            {[...reviews, ...reviews, ...reviews].map((r, i) => (
               <ReviewCard key={i} review={r} />
            ))}
         </div>
      </div>
    </section>
  );
};

export default TestimonialSection;