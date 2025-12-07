'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  motion
} from 'motion/react';
import {  FaStar, FaQuoteLeft } from 'react-icons/fa';

const reviews = [
  { name: "Alex R.", role: "Data Scientist", text: "LabelX revolutionized our training data. Quality is unmatched.", tags: ["Speed", "Quality"] },
  { name: "Sarah C.", role: "Earner", text: "Finally, a platform that pays instantly. Made 5000 LBLX this month!", tags: ["Crypto", "Easy"] },
  { name: "James W.", role: "AI Researcher", text: "The diversity of the workforce ensures less bias in our models.", tags: ["Ethical AI"] },
  { name: "Maria G.", role: "Student", text: "Perfect side hustle. I do tasks between classes on my phone.", tags: ["Mobile", "Flex"] },
  { name: "David K.", role: "Tech Lead", text: "API integration for raw data is seamless. Saved us weeks.", tags: ["Dev Friendly"] },
  { name: "Elena P.", role: "Validator", text: "Clean interface. Validating work is actually satisfying here.", tags: ["UI/UX"] },
  { name: "Tom H.", role: "Crypto Native", text: "Love earning crypto directly. No banks, no delays.", tags: ["Web3"] },
  { name: "Lisa M.", role: "Labeler", text: "The community is great and the tasks are actually fun.", tags: ["Community"] },
];

const ReviewCard = ({ review }) => (
  <div className="relative flex-shrink-0 w-[350px] p-6 rounded-2xl bg-[#0A0A0A] border border-white/5 hover:border-[#FF7A1A]/30 hover:bg-[#0F0F0F] transition-all duration-300 group mx-4">
    <div className="absolute top-6 right-6 text-white/5 group-hover:text-[#FF7A1A]/20 transition-colors">
       <FaQuoteLeft className="w-6 h-6" />
    </div>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7A1A] to-[#FDD536] flex items-center justify-center text-black font-bold text-sm">
        {review.name.charAt(0)}
      </div>
      <div>
        <h4 className="font-bold text-white text-sm">{review.name}</h4>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{review.role}</p>
      </div>
    </div>
    <p className="text-gray-400 text-sm leading-relaxed mb-4">"{review.text}"</p>
    <div className="flex gap-2">
      {review.tags.map((tag, i) => (
        <span key={i} className="px-2 py-1 rounded bg-white/5 text-[10px] text-gray-400 font-mono border border-white/5">
          #{tag}
        </span>
      ))}
    </div>
  </div>
);

const TestimonialSection = () => {
  return (
    <section className="relative w-full py-32 bg-black overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#FF7A1A] text-sm font-medium mb-6"
         >
            <FaStar className="w-4 h-4" /> 
            <span className="text-gray-300">TrustScore</span> 
            <span className="font-bold text-white">4.9/5</span>
         </motion.div>
         <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Used by <span className="text-[#FF7A1A]">Thousands</span>
         </h2>
         <p className="text-gray-400">Join the fastest growing decentralized AI workforce.</p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden mask-linear-fade">
         <div className="flex w-max animate-marquee hover:pause-marquee">
            {[...reviews, ...reviews].map((r, i) => (
               <ReviewCard key={i} review={r} />
            ))}
         </div>
      </div>
    </section>
  );
};

export default TestimonialSection;