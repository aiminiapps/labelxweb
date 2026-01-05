'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';

// --- 1. Utility: Cybernetic Scrambler ---
const ScrambleText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_//[]";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3; 
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className="font-mono tracking-[0.25em]">{display}</span>;
};

// --- 2. The Constructivist Logo Animation ---
const LogoConstruct = ({ mouseX, mouseY }) => {
  // Parallax Tilt
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Logo Paths (From your SVG)
  const paths = {
    L: "M0 75.4306C0 68.3016 0 61.8854 0 54.8633H33.5611C33.9863 107.191 33.5284 159.34 33.7573 212.166H134.048C134.768 223.18 134.637 233.589 134.408 245.067C89.5943 245.209 45.2715 244.853 0 245.138C0 188.248 0 132.214 0 75.4306Z",
    a: "M286.512 244.721H254.194C253.998 240.444 253.769 236.059 253.507 230.641C250.596 232.709 248.044 234.313 245.656 236.202C226.423 251.529 187.922 253.098 168.459 241.05C162.081 237.093 156.128 232.495 151.973 225.829C142.651 210.787 146.347 186.976 160.151 176.033C165.581 171.755 171.927 168.298 178.305 166.159C185.567 163.699 193.385 163.165 201.563 161.739C217.362 159.493 232.507 161.418 247.685 162.559C249.418 162.701 251.119 162.88 252.755 163.058C255.895 153.647 250.432 142.776 243.727 138.783C234.469 133.294 224.493 132.296 214.287 132.795C199.993 133.472 186.647 138.142 173.17 145.021C168.165 137.963 163.128 130.799 157.73 123.206C159.235 122.066 160.315 120.961 161.59 120.283C187.497 106.31 214.778 101.962 243.17 107.522C250.171 108.913 257.105 112.121 263.418 115.828C278.4 124.632 286.316 139.175 286.741 157.426M200.876 223.619C202.642 223.833 204.376 224.225 206.109 224.225C219.782 224.475 232.801 222.336 244.283 213.246C252.591 206.688 255.306 198.311 252.787 187.796C252.231 187.439 251.872 187.047 251.479 187.011C236.759 186.37 222.039 185.3 207.32 185.336C200.843 185.372 194.203 186.976 188.576 191.325C178.436 199.095 178.96 213.033 189.852 219.449C192.927 221.267 196.427 222.122 200.876 223.619Z",
    b: "M463.87 182.758C462.104 220.47 435.412 247.882 401.197 248.666C383.043 249.094 366.884 243.996 352.491 231.984C352 231.592 351.379 231.378 350.005 230.594C349.645 235.406 349.318 239.755 348.958 244.567H315.691V53.9356C326.715 53.7217 337.575 53.793 348.86 53.8643C349.678 76.9268 348.729 99.5616 349.383 123.444C377.842 101.059 406.431 98.3852 435.249 118.168C456.543 132.747 465.113 155.061 463.87 182.758ZM352.425 197.23C362.991 216.122 382.846 222.039 400.739 217.94C411.664 215.444 421.216 209.777 426.417 198.477C432.665 184.861 432.501 170.745 426.809 156.808C424.421 150.998 420.496 146.578 415.655 142.942C399.921 131.143 377.58 132.926 363.318 143.441C356.58 148.396 351.15 155.204 349.547 163.866C347.552 174.666 347.355 185.823 352.425 197.23Z",
    e: "M521.115 207.46C537.83 223.856 556.998 225.175 577.246 220.256C585.653 218.224 593.503 214.482 600.7 208.173C606.326 215.373 611.592 222.074 617.088 229.061C611.363 235.548 604.396 239.113 597.2 241.75C570.41 251.517 543.456 252.444 517.255 239.826C496.287 229.702 481.928 212.699 478.624 187.177C475.189 160.55 483.465 138.45 503.124 122.018C528.507 100.809 574.139 98.0998 602.008 122.553C618.985 137.452 628.406 161.798 625.429 186.607C588.073 187.177 550.554 186.465 512.741 186.785C512.446 195.59 515.947 201.649 521.115 207.46ZM514.18 163.224H592.457C591.835 153.849 588.629 147.433 582.055 141.73C565.896 127.65 538.092 128.184 522.652 143.227C517.386 148.324 512.839 154.241 514.18 163.224Z",
    l: "M647.934 148.898V54.4023H681.364C682.672 59.7848 682.836 237.334 681.462 244.713H647.934V148.898Z",
    // Grouping the complex X parts
    x1: "M775.046 299.284C779.593 304.238 786.953 304.238 791.5 299.284L877.758 205.287L916.585 247.598C921.132 252.553 928.492 252.553 933.039 247.598C937.585 242.643 937.585 234.623 933.039 229.668L877.627 169.285L775.014 281.39C770.5 286.309 770.532 294.329 775.046 299.284Z",
    x2: "M929.566 149.722L974.903 100.318C979.45 95.3633 979.45 87.3074 974.903 82.3527C970.357 77.398 962.997 77.398 958.45 82.3527L896.496 149.58L994.137 255.981C998.684 260.936 1006.04 260.936 1010.59 255.981C1015.14 251.026 1015.14 243.006 1010.59 238.051L929.566 149.722Z",
    x3: "M978.803 3.71602C974.256 -1.23867 966.896 -1.23867 962.349 3.71602L878.97 94.5759L833.895 45.4567C829.348 40.502 821.988 40.502 817.441 45.4567C812.895 50.4114 812.895 58.4316 817.441 63.3863L879.035 130.506L978.835 21.6813C983.349 16.6909 983.35 8.67072 978.803 3.71602Z",
    x4: "M780.509 222.755C785.056 227.709 792.416 227.709 796.962 222.755L845.799 169.536L845.832 169.572L862.285 151.642L756.957 36.8645C752.41 31.9098 745.051 31.9098 740.504 36.8645C735.957 41.8192 735.957 49.8394 740.504 54.794L829.346 151.607L780.509 204.825C775.962 209.78 775.962 217.836 780.509 222.755Z",
    dot: "M981.676 55.615C986.615 50.2325 994.597 50.2325 999.503 55.615C1004.44 60.9974 1004.44 69.6948 999.503 75.0773C994.564 80.4597 986.583 80.4597 981.676 75.0773C976.769 69.6948 976.769 60.9974 981.676 55.615Z"
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-[340px] h-[100px] md:w-[500px] md:h-[150px] perspective-1000 flex items-center justify-center"
    >
      <svg 
        viewBox="0 0 1014 303" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_30px_rgba(251,191,36,0.3)]"
      >
        {/* GROUP 1: The Text "LABEL" - Draws first */}
        <motion.g>
          {['L', 'a', 'b', 'e', 'l'].map((key, i) => (
            <motion.path
              key={key}
              d={paths[key]}
              stroke="#F5F5F5" // Start with clean white wireframe
              strokeWidth="1.5"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1, 
                opacity: 1,
                fill: "#FFFFFF", // Fills white
                strokeWidth: 0
              }}
              transition={{ 
                duration: 2, 
                delay: i * 0.15, // Staggered draw
                ease: "easeInOut",
                fill: { delay: 1.5 + (i * 0.1), duration: 0.8 } 
              }}
            />
          ))}
        </motion.g>

        {/* GROUP 2: The "X" Icon - The Hero Element */}
        <motion.g>
          {['x1', 'x2', 'x3', 'x4', 'dot'].map((key, i) => (
            <motion.path
              key={key}
              d={paths[key]}
              stroke="#FBBF24" // LabelX Yellow Wireframe
              strokeWidth="2"
              fill="transparent"
              initial={{ pathLength: 0, opacity: 0, scale: 0.9, transformOrigin: "center" }}
              animate={{ 
                pathLength: 1, 
                opacity: 1, 
                scale: 1,
                fill: "#FBBF24", // Fills Yellow
                strokeWidth: 0
              }}
              transition={{ 
                duration: 1.5, 
                delay: 1.2 + (i * 0.1), // Starts drawing after text starts
                ease: "circOut",
                fill: { delay: 2.2, duration: 0.5, ease: "easeOut" }
              }}
            />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
};

// --- 3. Main Loader Component ---
const Loader = ({ onComplete }) => {
  const [statusText, setStatusText] = useState("SYSTEM_BOOT");
  const [progress, setProgress] = useState(0);
  
  // Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  useEffect(() => {
    // Progress Simulation
    const progressInterval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(progressInterval);
                return 100;
            }
            return prev + Math.random() * 3;
        });
    }, 50);

    // Status Text Sequence
    const sequence = [
      { text: "INITIALIZING_NEURAL_NET", delay: 800 },
      { text: "SYNCING_DATALAYER", delay: 2000 },
      { text: "LABELX_PROTOCOL_READY", delay: 3500 }
    ];

    sequence.forEach(({ text, delay }) => {
      setTimeout(() => setStatusText(text), delay);
    });

    // Completion Trigger
    const timer = setTimeout(() => {
      onComplete?.();
    }, 4500);

    return () => {
        clearInterval(progressInterval);
        clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000000] overflow-hidden cursor-wait"
      onMouseMove={handleMouseMove}
      exit={{ 
        opacity: 0,
        scale: 1.1,
        filter: "blur(20px)",
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* Background Texture - Clean & Premium */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        
        {/* The Interactive Logo */}
        <div className="mb-12">
            <LogoConstruct mouseX={mouseX} mouseY={mouseY} />
        </div>

        {/* Minimalist Data Readout */}
        <div className="flex flex-col items-center gap-6 w-64 md:w-80">
          
          {/* Progress Bar Container */}
          <div className="w-full h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden relative">
            {/* The Bar */}
            <motion.div 
              className="absolute inset-y-0 left-0 bg-[#FBBF24]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
            {/* The Head Glow */}
            <motion.div 
               className="absolute top-1/2 -translate-y-1/2 w-20 h-4 bg-[#FBBF24] blur-[10px]"
               style={{ left: `${progress - 20}%` }}
            />
          </div>

          {/* Text Info */}
          <div className="w-full flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
            <span className="text-[#FBBF24]">
                <ScrambleText text={statusText} />
            </span>
            <span>{Math.floor(progress)}%</span>
          </div>

        </div>

      </div>

      {/* Footer Version Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-[9px] font-mono text-white tracking-[0.5em]"
      >
        V.1.0.2 // SECURE
      </motion.div>

    </motion.div>
  );
};

export default Loader;