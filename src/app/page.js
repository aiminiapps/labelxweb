import AboutSection from "@/components/about-section";
import AgentsSection from "@/components/agent-section";
import Hero from "@/components/hero-section";
import HowItWorksSection from "@/components/how-works";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <AboutSection/>
      <AgentsSection/>
      <HowItWorksSection/>
    </div>
  );
}
