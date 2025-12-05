import AboutSection from "@/components/about-section";
import Hero from "@/components/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Hero/>
      <AboutSection/>
    </div>
  );
}
