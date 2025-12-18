import AboutSection from "@/oldlandingpage/components/about-section";
import AgentsSection from "@/oldlandingpage/components/agent-section";
import CTASection from "@/oldlandingpage/components/cta-section";
import Footer from "@/oldlandingpage/components/footer";
import Hero from "@/oldlandingpage/components/hero-section";
import HowItWorksSection from "@/oldlandingpage/components/how-works";
import Navbar from "@/oldlandingpage/components/navbar";
import TestimonialSection from "@/oldlandingpage/components/testimonial-section";

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