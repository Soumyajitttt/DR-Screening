import Hero01 from "../components/originkit/hero-01";
import Features01 from "../components/originkit/features-01";
import Features04 from "../components/originkit/features-04";
import Footer02 from "../components/originkit/footer-02";
import ScrollReveal from "../components/ScrollReveal";

export default function LandingPage() {
  return (
    <>
      {/* Hero already runs its own on-load reveal (motion/react + CSS
          keyframes), so it's left as-is - everything below is off-screen
          at first paint and gets a GSAP ScrollTrigger arrival animation
          the moment it scrolls into view instead. */}
      <Hero01 />

      <ScrollReveal as="div" y={50}>
        <Features01 />
      </ScrollReveal>

      <ScrollReveal as="div" y={50}>
        <Features04 />
      </ScrollReveal>

      <ScrollReveal as="div" y={50}>
        <Footer02 />
      </ScrollReveal>
    </>
  );
}
