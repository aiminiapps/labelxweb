'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaSpinner } from 'react-icons/fa';

const TasksPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Target URL
  const APP_URL = "https://label-x.vercel.app/?tab=task2";

  return (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <FaSpinner className="text-[#FBBF24] w-8 h-8" />
            </motion.div>
            
            <div className="mt-4 flex flex-col items-center gap-2">
                <span className="text-[#FBBF24] text-xs font-mono uppercase tracking-[0.2em] animate-pulse">
                    Initializing Interface...
                </span>
            </div>
          </div>
        )}
  
        {/* Iframe - Full Screen */}
        <iframe
          src={APP_URL}
          className="w-full h-full border-0 bg-black"
          title="LabelX App Interface"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone; payment; usb; vr; xr-spatial-tracking"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
        />
        
      </div>
  );
};

export default TasksPage;