'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

// Component Imports
import Navbar from "@/components/navbar";
import Hero from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import AgentsSection from "@/components/agent-section";
import HowItWorksSection from "@/components/how-works";
import TestimonialSection from "@/components/testimonial-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import Loader from '@/components/loader';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black selection:bg-[#FBBF24]/30 overflow-x-hidden">
      
      {/* AnimatePresence enables the 'exit' prop on the Loader component */}
      <AnimatePresence mode="wait">
        
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-0"
          >
            <Navbar />
            <main>
              <Hero />
              <AboutSection />
              <AgentsSection />
              <HowItWorksSection />
              <TestimonialSection />
              <CTASection />
            </main>
            <Footer />
          </motion.div>
        )}
        
      </AnimatePresence>
      
    </div>
  );
}