import AboutSection from "@/components/about-section";
import AgentsSection from "@/components/agent-section";
import TestimonialSection from "@/components/cta-section";
import Hero from "@/components/hero-section";
import HowItWorksSection from "@/components/how-works";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-black selection:bg-[#FF7A1A]/30">
      <Hero/>
      <AboutSection/>
      <AgentsSection/>
      <HowItWorksSection/>
      <TestimonialSection/>
    </div>
  );
}
