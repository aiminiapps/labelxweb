'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner, FaWifi, FaBatteryFull, FaSignal } from 'react-icons/fa';

const TasksPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  // Target URL
  const APP_URL = "https://label-x.vercel.app/";

  // --- Real-Time Clock Logic ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime(); // Initial call
    const timer = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex items-center justify-center">
      
      {/* --- BACKGROUND (UNCHANGED) --- */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF7A1A]/5 blur-[120px] rounded-full" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* --- DESKTOP INFO TEXT --- */}
      <div className="hidden md:flex absolute top-12 left-0 right-0 flex-col items-center text-center z-10 pointer-events-none">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">LabelX Workstation</h1>
          <p className="text-gray-500 text-sm">Previewing mobile interface • <span className="text-[#FF7A1A]">Live Connection</span></p>
      </div>

      {/* --- THE PHONE CHASSIS WRAPPER --- */}
      {/* This wrapper creates the Titanium Frame and Physical Buttons */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative sm:w-fit w-full z-20 md:p-[3px] md:rounded-[55px] md:bg-gradient-to-b md:from-[#635f5c] md:via-[#4a4644] md:to-[#635f5c] md:shadow-[0_0_0_1px_rgba(0,0,0,0.5),0_20px_50px_-10px_rgba(0,0,0,0.5)]"
      >
        
        {/* --- PHYSICAL BUTTONS (Desktop Only) --- */}
        <div className="hidden md:block">
            {/* Left Side: Action & Volume */}
            <div className="absolute -left-[2px] top-[120px] w-[3px] h-7 bg-[#3a3735] rounded-l-md shadow-inner" /> {/* Action Button */}
            <div className="absolute -left-[2px] top-[170px] w-[3px] h-12 bg-[#3a3735] rounded-l-md shadow-inner" /> {/* Vol Up */}
            <div className="absolute -left-[2px] top-[230px] w-[3px] h-12 bg-[#3a3735] rounded-l-md shadow-inner" /> {/* Vol Down */}
            
            {/* Right Side: Power */}
            <div className="absolute -right-[2px] top-[190px] w-[3px] h-20 bg-[#3a3735] rounded-r-md shadow-inner" /> {/* Power */}
            
            {/* Antenna Bands (Subtle details on the frame) */}
            <div className="absolute top-[80px] left-0 w-[2px] h-[3px] bg-[#2a2827]" />
            <div className="absolute top-[80px] right-0 w-[2px] h-[3px] bg-[#2a2827]" />
            <div className="absolute bottom-[80px] left-0 w-[2px] h-[3px] bg-[#2a2827]" />
            <div className="absolute bottom-[80px] right-0 w-[2px] h-[3px] bg-[#2a2827]" />
        </div>

        {/* --- INNER BEZEL (Black border between titanium and screen) --- */}
        <div className="relative w-full h-full md:w-[380px] md:h-[820px] bg-black md:rounded-[50px] md:border-[6px] md:border-black overflow-hidden shadow-inner">
            
            {/* --- DESKTOP ONLY: Dynamic Island & Status Bar --- */}
            <div className="hidden md:flex absolute top-0 left-0 right-0 h-14 z-50 justify-between items-start px-8 pt-4 pointer-events-none select-none">
                {/* Time (Live) */}
                <div className="text-[14px] font-semibold text-white tracking-wide w-20">
                   {currentTime || '9:41'}
                </div>

                {/* The Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-full flex items-center justify-center z-20">
                   <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-between px-3">
                       <div className="w-2 h-2 rounded-full bg-[#0a0a0a] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" /> {/* FaceID Sensor */}
                       <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a] ring-1 ring-[#333]" /> {/* Camera Lens */}
                   </div>
                </div>

                {/* Status Icons */}
                <div className="flex items-center gap-1.5 text-white w-20 justify-end">
                   <FaSignal className="w-3.5 h-3.5" />
                   <FaWifi className="w-3.5 h-3.5" />
                   <FaBatteryFull className="w-4 h-4" />
                </div>
            </div>

            {/* --- LOADING STATE --- */}
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
              className="w-full h-[100dvh] md:h-full border-0 bg-[#050505]"
              title="LabelX App Interface"
              onLoad={() => setIsLoading(false)}
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; payment; usb; vr; xr-spatial-tracking"
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
            />

            {/* --- DESKTOP ONLY: Home Indicator --- */}
            <div className="hidden md:block absolute bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white rounded-full z-50 pointer-events-none opacity-80 mix-blend-difference" />
            
        </div>
      </motion.div>
    </div>
  );
};

export default TasksPage;