import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSkills from "@/components/AboutSkills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <AboutSkills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
      {/* Script interaksi frontend lama */}
      <Script src="/js/script.js" strategy="lazyOnload" />
    </>
  );
}
