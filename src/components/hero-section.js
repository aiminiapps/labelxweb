'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi2';
import Link from 'next/link';

const LabelXHero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.2 });

  // Smooth parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center"
    >
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #FF7A1A 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-[20%] right-[5%] w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, #FDD536 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-[10%] left-[30%] w-[700px] h-[700px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #FF7A1A 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Mesh Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 122, 26, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 122, 26, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial Fade Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 70%, #000 100%)',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        ref={contentRef}
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32"
      >
        {/* Live Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1 
          }}
          className="flex justify-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative flex items-center justify-center"
            >
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <div className="absolute w-2 h-2 rounded-full bg-green-400 animate-ping" />
            </motion.div>
            <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">
              Live on Binance Smart Chain
            </span>
          </motion.div>
        </motion.div>

        {/* Main Headline - Ultra Large */}
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 0.8, 
              delay: 0.2, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="text-[56px] sm:text-[72px] md:text-[84px] lg:text-[96px] xl:text-[108px] font-bold tracking-[-0.02em] leading-[1.05] mb-0 px-4"
          >
            <motion.span 
              className="block text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Train AI and earn
            </motion.span>
            <motion.span 
              className="block text-white mt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              real crypto rewards.
            </motion.span>
          </motion.h1>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.7, 
            delay: 0.6, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="text-center text-[18px] md:text-[20px] leading-[1.6] text-gray-400 max-w-[680px] mx-auto mb-14 font-normal px-4"
        >
          Label data, complete simple tasks, and receive LBLX tokens directly to your wallet. Get paid for helping build smarter AI.
        </motion.p>

        {/* CTA Buttons - Exact Style from Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.7, 
            delay: 0.75, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-32"
        >
          {/* Primary Button - Green Gradient Style */}
          <Link href="/?tab=task2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 rounded-[16px] text-white font-semibold text-[16px] overflow-hidden shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow"
              style={{
                background: 'linear-gradient(135deg, #0a8f5a 0%, #0d6d4a 100%)',
              }}
            >
              {/* Hover Shine Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                }}
              />
              
              {/* Button Content */}
              <span className="relative flex items-center gap-2.5">
                Get Started
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="inline-flex"
                >
                  <HiArrowRight className="w-5 h-5" strokeWidth={2} />
                </motion.span>
              </span>

              {/* Border Glow on Hover */}
              <motion.div
                className="absolute inset-0 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              />
            </motion.button>
          </Link>

          {/* Secondary Button - Ghost Style */}
          <Link href="#how-it-works">
            <motion.button
              whileHover={{ 
                scale: 1.03,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.97 }}
              className="group relative px-8 py-4 rounded-[16px] text-white font-semibold text-[16px] border-[1.5px] border-white/10 bg-transparent backdrop-blur-sm transition-all duration-300"
            >
              <span className="relative flex items-center gap-2">
                Read Docs
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Section - Clean & Minimal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.8, 
            delay: 0.9, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="relative"
        >
          {/* Divider Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <div className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto pt-16">
            {[
              { 
                value: '50-250', 
                label: 'LBLX per task',
                delay: 1.0
              },
              { 
                value: '10,000+', 
                label: 'Active users',
                delay: 1.1
              },
              { 
                value: 'Instant', 
                label: 'Payouts',
                delay: 1.2
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: stat.delay,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-center group cursor-default"
              >
                <motion.div
                  whileHover={{ scale: 1.08, y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="inline-block"
                >
                  <div className="text-[36px] md:text-[44px] lg:text-[48px] font-bold text-white mb-2 leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-yellow-400 transition-all duration-300">
                    {stat.value}
                  </div>
                </motion.div>
                <div className="text-[14px] md:text-[15px] text-gray-500 font-medium group-hover:text-gray-400 transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Premium Mouse Animation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative flex flex-col items-center gap-2 cursor-pointer group"
        >
          {/* Mouse Icon */}
          <div className="w-[28px] h-[45px] border-[2.5px] border-white/20 rounded-full flex items-start justify-center p-[7px] group-hover:border-white/40 transition-colors">
            <motion.div
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-[3.5px] h-[7px] bg-white/70 rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        }}
      />
    </section>
  );
};

export default LabelXHero;
