'use client';

import React from 'react';
import { motion } from 'motion/react';
import { FaQuoteLeft, FaDiscord } from 'react-icons/fa';
import { HiCheckBadge } from 'react-icons/hi2';
import { RiTwitterXFill } from "react-icons/ri";

// --- 1. Data: The "Network Signals" ---
const testimonials = [
  {
    id: 1,
    handle: "@crypto_kai",
    wallet: "0x71...3A92",
    earnings: "1,240 LBLX",
    role: "Validator Node",
    text: "The most reliable work-to-earn protocol I've used. The tasks are structured perfectly for quick labeling, and the instant payouts to MetaMask are a game changer.",
    platform: "twitter"
  },
  {
    id: 2,
    handle: "Sarah_AI",
    wallet: "0x89...B211",
    earnings: "850 LBLX",
    role: "Image Annotator",
    text: "Finally, a platform that doesn't hide behind points systems. You label data, you get crypto. The UI is incredibly smooth and feels premium.",
    platform: "discord"
  },
  {
    id: 3,
    handle: "DeFi_Dad",
    wallet: "0x12...99CC",
    earnings: "3,100 LBLX",
    role: "Power User",
    text: "LabelX has replaced my other side hustles. It's actually contributing to real AI models, which makes the work feel meaningful. Solid infrastructure.",
    platform: "twitter"
  },
  {
    id: 4,
    handle: "Web3_Builder",
    wallet: "0x44...11FF",
    earnings: "4,500 LBLX",
    role: "Dataset Verifier",
    text: "Impressive latency on the validation engine. My tasks get approved in seconds. This is how decentralized labor should work.",
    platform: "discord"
  },
  {
    id: 5,
    handle: "NFT_Collector",
    wallet: "0x55...88EE",
    earnings: "920 LBLX",
    role: "Labeler",
    text: "Cleanest dashboard in the space. Dark mode is perfect for late-night grinding. Love the transparency on reward calculations.",
    platform: "twitter"
  }
];

// --- 2. Sub-Components ---

const UserBadge = ({ platform }) => (
  <div className={`p-2 rounded-full ${platform === 'twitter' ? 'bg-[#1DA1F2]/10 text-[#ffff]' : 'bg-[#5865F2]/10 text-[#5865F2]'} border border-white/5`}>
    {platform === 'twitter' ? <RiTwitterXFill className="w-3 h-3" /> : <FaDiscord className="w-3 h-3" />}
  </div>
);

const TestimonialCard = ({ data }) => (
  <div className="w-[400px] flex-shrink-0 p-6 rounded-[24px] border border-white/[0.08] bg-[#0A0A0A] hover:bg-[#111] transition-colors duration-300 group relative overflow-hidden">
    {/* Glow Effect on Hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.08)_0%,transparent_70%)] pointer-events-none" />

    {/* Header */}
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1A1A1A] to-black border border-white/10 flex items-center justify-center">
            <span className="text-sm font-bold text-white/40">{data.handle[0].toUpperCase()}</span>
        </div>
        <div>
            <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white">{data.handle}</h4>
                <HiCheckBadge className="text-[#FBBF24] w-3 h-3" />
            </div>
            <p className="text-[10px] text-neutral-500 font-mono tracking-wide uppercase">{data.role}</p>
        </div>
      </div>
      <UserBadge platform={data.platform} />
    </div>

    {/* Content */}
    <div className="relative z-10 mb-6">
        <FaQuoteLeft className="text-white/10 w-4 h-4 mb-2" />
        <p className="text-sm text-neutral-300 leading-relaxed font-light">
            "{data.text}"
        </p>
    </div>

    {/* Footer: Wallet & Earnings */}
    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex flex-col">
            <span className="text-[10px] text-neutral-500 uppercase">Wallet ID</span>
            <span className="text-xs font-mono text-white/70">{data.wallet}</span>
        </div>
        <div className="flex flex-col items-end">
            <span className="text-[10px] text-neutral-500 uppercase">Total Earned</span>
            <span className="text-xs font-mono text-[#FBBF24] font-bold">{data.earnings}</span>
        </div>
    </div>
  </div>
);

// --- 3. Main Component ---

const TestimonialSection = () => {
  return (
    <section className="relative w-full py-20 bg-black overflow-hidden flex flex-col items-center">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="relative z-10 w-full max-w-[1600px] flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 px-6">
            <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-medium text-white tracking-tight mb-4"
            >
                Trusted by the <span className="text-[#FBBF24]">Decentralized</span> Workforce
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-neutral-400 max-w-lg mx-auto text-balance text-sm md:text-base font-light"
            >
                Join thousands of users verifying data and earning rewards daily across the LabelX protocol.
            </motion.p>
        </div>

        {/* Infinite Marquee Slider */}
        <div className="w-full relative overflow-hidden mask-image-fade">
            {/* Gradient Masks for edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] py-4 pl-4">
                {/* Render signals twice for seamless loop */}
                {[...testimonials, ...testimonials].map((item, idx) => (
                    <TestimonialCard key={`${item.id}-${idx}`} data={item} />
                ))}
            </div>
        </div>

      </div>

      {/* Tailwind Utility for Marquee Animation */}
      <style jsx global>{`
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        .animate-marquee {
            animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;