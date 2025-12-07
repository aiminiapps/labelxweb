import AboutSection from "@/components/about-section";
import AgentsSection from "@/components/agent-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import Hero from "@/components/hero-section";
import HowItWorksSection from "@/components/how-works";
import Navbar from "@/components/navbar";
import TestimonialSection from "@/components/testimonial-section";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-black selection:bg-[#FF7A1A]/30">
      <Navbar/>
      <Hero/>
      <AboutSection/>
      <AgentsSection/>
      <HowItWorksSection/>
      <TestimonialSection/>
      <CTASection/>
      <Footer/>
    </div>
  );
}