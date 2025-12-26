'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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

  // You can also add a safety timeout here if you want
  // e.g., to ensure it loads even if the loader callback fails
  useEffect(() => {
     // Optional: Check if user has visited before to skip loader?
     // For now, we play it every reload for the cool factor.
  }, []);

  return (
    <div className="min-h-screen bg-black selection:bg-[#FBBF24]/30">
      
      {/* AnimatePresence handles the exit animation of the Loader */}
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
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