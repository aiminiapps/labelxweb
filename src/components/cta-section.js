'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';
import Link from 'next/link';
import { RiTwitterXFill } from "react-icons/ri";


// --- 1. 3D Particle Network Sphere ---

function ParticleGlobe(props) {
  const ref = useRef();
  // Generate 5000 random points on a sphere surface
  const sphere = useMemo(() => {
      const points = new Float32Array(5000 * 3);
      for (let i = 0; i < 5000; i++) {
        const theta = THREE.MathUtils.randFloatSpread(360); 
        const phi = THREE.MathUtils.randFloatSpread(360); 

        // Radius between 1.2 and 1.5 for a slight "shell" thickness
        const radius = 1.2 + Math.random() * 0.3;

        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(theta);

        points[i * 3] = x;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = z;
      }
      return points;
  }, []);

  // Rotate the sphere frame by frame
  useFrame((state, delta) => {
    // Base rotation
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // Optional: Subtle pulsing scale
    const t = state.clock.getElapsedTime();
    ref.current.scale.setScalar(1 + Math.sin(t / 1.5) / 20);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#FBBF24" // LabelX Brand Yellow
          size={0.015}    // Adjust point size
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending} // Makes overlapping dots glow brighter
        />
      </Points>
    </group>
  );
}

// --- 2. UI Content Components ---

const MagneticButton = ({ children }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative z-10 inline-block"
    >
      {children}
    </motion.div>
);

// --- 3. Main CTA Section ---

const CTASection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section 
        className="relative w-full h-[85vh] min-h-[600px] bg-[#020202] overflow-hidden flex items-center justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
    >
       {/* Background Ambience */}
       <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
       
      {/* --- Layer 1: The 3D Canvas Background --- */}
      <div className={`absolute inset-0 z-0 transition-transform duration-1000 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}>
        {/* A subtle radial gradient behind the sphere to make it pop */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.08)_0%,#000000_60%)] z-0 pointer-events-none" />
        
        <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <ParticleGlobe />
          {/* Disabling zoom to keep the layout stable, allowing rotation */}
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={hovered} autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      {/* --- Layer 2: Content Overlay --- */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pointer-events-none flex flex-col items-center">
        
        {/* Eyebrow Tagline */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-6 flex flex-col items-center"
        >
            <div className="w-12 h-0.5 bg-[#FBBF24]/70 mb-4"></div>
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-neutral-400">
                Global. Fast. Rewarding.
            </span>
        </motion.div>

        {/* Main Headline (Adapted for LabelX based on image reference) */}
        <motion.h2
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tighter leading-[1.1] mb-10 drop-shadow-2xl"
        >
          The Central Nervous System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] to-[#d97706] glow-text">Decentralized AI.</span>
        </motion.h2>

        {/* CTA Button (Pointer events re-enabled) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="pointer-events-auto"
        >
            <MagneticButton>
                <Link href="https://x.com/intent/follow?screen_name=labelxofficial" target='_blank'>
                <button className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-[#FBBF24] hover:bg-[#FCD34D] text-black rounded-full font-bold text-lg transition-all shadow-[0_0_40px_-5px_rgba(251,191,36,0.4)] hover:shadow-[0_0_60px_-5px_rgba(251,191,36,0.6)] overflow-hidden">
                    {/* Internal light sweep effect */}
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 group-hover:animate-shine" />
                    
                    <RiTwitterXFill className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 scale-125" />
                    <span>Follow Us</span>
                </button>
                </Link>
            </MagneticButton>
        </motion.div>

      </div>
      
      {/* Custom Tailwind Styles for Glow and Shine */}
      <style jsx global>{`
        .glow-text {
            text-shadow: 0 0 30px rgba(251, 191, 36, 0.3);
        }
        @keyframes shine {
            100% { left: 150%; }
        }
        .animate-shine {
            animation: shine 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTASection;