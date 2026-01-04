'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

// --- 1. Decrypting Text Utility (For status updates) ---
const ScrambleText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; 
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono tracking-[0.2em]">{display}</span>;
};

// --- 2. The Project Logo (SVG Animation) ---
const LogoAnimator = ({ mouseX, mouseY }) => {
  // 3D Tilt Logic
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);

  // Brand Color from your SVG
  const GOLD = "#F0B90C"; 

  // Animation Variants
  const outlineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  const fillVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, delay: 1.2, ease: "easeOut" } // Fill happens after drawing
    }
  };

  const innerShapeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 1.8 + (i * 0.1), // Staggered "punch" effect
        duration: 0.4, 
        type: "spring",
        bounce: 0.4
      }
    })
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-48 h-48 md:w-64 md:h-64 perspective-1000"
    >
      {/* Ambient Glow Behind */}
      <motion.div 
        className="absolute inset-0 rounded-full blur-[80px]"
        style={{ backgroundColor: GOLD }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <svg 
        viewBox="0 0 1300 1300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        {/* LAYER 1: The Outer Shield 
           We use two paths: one for the stroke (drawing) and one for the fill.
        */}
        <motion.path
          d="M673.5 100H626.5C323.02 100 77 346.02 77 649.5C77 952.98 323.02 1199 626.5 1199H673.5C976.98 1199 1223 952.98 1223 649.5C1223 346.02 976.98 100 673.5 100Z"
          stroke={GOLD}
          strokeWidth="20"
          strokeLinecap="round"
          fill="transparent"
          variants={outlineVariants}
          initial="hidden"
          animate="visible"
        />
        
        <motion.path
          d="M673.5 100H626.5C323.02 100 77 346.02 77 649.5C77 952.98 323.02 1199 626.5 1199H673.5C976.98 1199 1223 952.98 1223 649.5C1223 346.02 976.98 100 673.5 100Z"
          fill={GOLD}
          variants={fillVariants}
          initial="hidden"
          animate="visible"
        />

        {/* LAYER 2: The Inner Black Shapes
           These "punch out" the gold.
        */}
        <motion.g initial="hidden" animate="visible">
          <motion.path 
            custom={1}
            variants={innerShapeVariants}
            d="M375.116 1020.89C387.531 1033.31 407.746 1033.31 420.161 1020.89L656.111 784.941L762.321 891.086C774.736 903.501 794.886 903.501 807.366 891.086C819.781 878.671 819.781 858.521 807.366 846.041L655.786 694.461L375.051 975.911C362.701 988.326 362.701 1008.48 375.116 1020.89Z" 
            fill="black" 
          />
          <motion.path 
            custom={2}
            variants={innerShapeVariants}
            d="M797.682 645.514L921.702 521.494C934.182 509.079 934.182 488.864 921.702 476.449C909.287 464.034 889.137 463.969 876.722 476.384L707.332 645.124L974.417 912.209C986.832 924.624 1006.98 924.624 1019.46 912.209C1031.88 899.794 1031.88 879.644 1019.46 867.164L797.682 645.514Z" 
            fill="black" 
          />
          <motion.path 
            custom={3}
            variants={innerShapeVariants}
            d="M932.36 279.046C919.945 266.631 899.795 266.631 887.315 279.046L659.295 507.066L535.99 383.826C523.575 371.411 503.425 371.411 491.01 383.826C478.595 396.241 478.595 416.391 491.01 428.871L659.425 597.286L932.36 324.156C944.775 311.676 944.775 291.526 932.36 279.046Z" 
            fill="black" 
          />
          <motion.path 
            custom={4}
            variants={innerShapeVariants}
            d="M390.002 828.88C402.417 841.295 422.567 841.295 435.047 828.88L568.687 695.305L568.752 695.37L613.797 650.39L325.587 362.245C313.172 349.83 293.022 349.83 280.542 362.245C268.127 374.66 268.127 394.81 280.542 407.225L523.512 650.195L390.002 783.9C377.522 796.315 377.522 816.465 390.002 828.88Z" 
            fill="black" 
          />
          <motion.path 
            custom={5}
            variants={innerShapeVariants}
            d="M940.292 409.306C953.747 395.851 975.652 395.851 989.107 409.306C1002.56 422.761 1002.56 444.666 989.107 458.121C975.652 471.576 953.747 471.576 940.292 458.121C926.772 444.666 926.772 422.826 940.292 409.306Z" 
            fill="black" 
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};

// --- 3. Main Loader Component ---
const Loader = ({ onComplete }) => {
  const [statusText, setStatusText] = useState("INITIALIZING");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  useEffect(() => {
    // Text Status Sequence
    const sequence = [
      { text: "ESTABLISHING UPLINK", delay: 800 },
      { text: "VERIFYING PROTOCOL", delay: 2000 },
      { text: "ACCESS GRANTED", delay: 3200 }
    ];

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => setStatusText(text), delay);
    });

    // Completion Trigger
    const timer = setTimeout(() => {
      onComplete?.();
    }, 4500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden cursor-wait"
      onMouseMove={handleMouseMove}
      exit={{ 
        y: -1000, 
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
    >
      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        
        {/* Interactive Logo */}
        <LogoAnimator mouseX={mouseX} mouseY={mouseY} />

        {/* Loading Indicator */}
        <div className="flex flex-col items-center gap-4">
          {/* Status Text (Scramble Effect) */}
          <div className="h-6 text-[#F0B90C] text-xs md:text-sm font-bold">
            <ScrambleText text={statusText} />
          </div>

          {/* Thin Progress Line */}
          <div className="w-32 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#F0B90C]"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
            {/* Light Shine moving across bar */}
            <motion.div 
              className="absolute inset-y-0 w-10 bg-white/50 blur-sm"
              animate={{ x: [-40, 160] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

      </div>

      {/* Footer System Info */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30 text-white">
        <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
        <span className="text-[10px] font-mono tracking-widest">SECURE CONNECTION</span>
      </div>

    </motion.div>
  );
};

export default Loader;