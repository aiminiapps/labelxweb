'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaWifi, FaBatteryFull, FaSignal } from 'react-icons/fa';

const TasksPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // The target URL for the LabelX app
  const APP_URL = "https://label-x.vercel.app/";

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* --- DESKTOP ONLY: Ambient Background --- */}
      {/* These elements are hidden on mobile to save performance and focus */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF7A1A]/5 blur-[120px] rounded-full" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* --- DESKTOP ONLY: Informational Text --- */}
      <div className="hidden md:flex absolute top-12 left-0 right-0 flex-col items-center text-center z-10 pointer-events-none">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">LabelX Workstation</h1>
          <p className="text-gray-500 text-sm">Previewing mobile interface • <span className="text-[#FF7A1A]">Live Connection</span></p>
      </div>


      {/* --- THE CONTAINER (Responsive Logic) --- */}
      {/* Mobile: Fixed full screen (inset-0), z-index high, simple background.
          Desktop: Relative, fixed dimensions (375x812), rounded app shape, shadows.
      */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`
            relative z-20 overflow-hidden bg-black
            
            /* Mobile Styles: Full Screen, No Borders */
            w-full h-[100dvh] md:h-[844px] md:w-[390px]
            fixed inset-0 md:relative md:inset-auto

            /* Desktop Styles: Phone Frame Aesthetics */
            md:rounded-[3rem] 
            md:border-[8px] md:border-[#1a1a1a] 
            md:shadow-[0_0_50px_-10px_rgba(0,0,0,0.5),0_0_0_2px_rgba(255,255,255,0.1)]
            md:ring-1 md:ring-white/5
        `}
      >
        
        {/* --- DESKTOP ONLY: "Dynamic Island" / Notch Area --- */}
        <div className="hidden md:flex absolute top-0 left-0 right-0 h-14 z-50 items-start justify-center pt-3 px-6 pointer-events-none select-none">
            {/* The Notch */}
            <div className="w-28 h-7 bg-black rounded-full absolute top-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 z-20">
               <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" /> {/* Camera Lens */}
               <div className="w-10 h-1.5 rounded-full bg-[#1a1a1a]" /> {/* Speaker */}
            </div>

            {/* Status Bar Icons (Left) */}
            <div className="absolute left-6 top-4 text-[10px] font-bold text-white tracking-wide">
               9:41
            </div>

            {/* Status Bar Icons (Right) */}
            <div className="absolute right-6 top-4 flex gap-1.5 text-white text-[10px]">
               <FaSignal />
               <FaWifi />
               <FaBatteryFull />
            </div>
            
            {/* Gradient Overlay for Status Bar readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-transparent z-10" />
        </div>

        {/* --- Loading State --- */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505] z-30">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <FaSpinner className="text-[#FF7A1A] w-6 h-6" />
            </motion.div>
            <span className="text-gray-500 text-xs mt-3 font-mono animate-pulse">Establishing Uplink...</span>
          </div>
        )}

        {/* --- THE IFRAME --- */}
        <iframe
          src={APP_URL}
          className="w-full h-full border-0 bg-[#050505]"
          title="LabelX App Interface"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />

        {/* --- DESKTOP ONLY: Home Indicator --- */}
        <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-50 pointer-events-none backdrop-blur-md" />
        
      </motion.div>

      {/* --- DESKTOP ONLY: Reflection Glare (For realism) --- */}
      <div className="hidden md:block absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 z-10">
         {/* You can enable this if you want a subtle glass reflection over the screen */}
      </div>

    </div>
  );
};

export default TasksPage;