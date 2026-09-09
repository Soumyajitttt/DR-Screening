import { useNavigate } from "react-router-dom";
import Hero01 from "../components/originkit/hero-01";
import Features01 from "../components/originkit/features-01";
import Footer02 from "../components/originkit/footer-02";
import ScrollReveal from "../components/ScrollReveal";

const STATS = [
  { label: "Diabetic Adults in India", value: "77 Million+" },
  { label: "Prevalence of DR", value: "18%" },
  { label: "Rural Ophthalmologist Ratio", value: "1 : 100,000" },
  { label: "Vision Loss Preventable", value: "90%" }
];

const FLOW_CARDS = [
  {
    title: "1. Patient Database",
    description: "Registry of scanned patients, filters, and addition of new patient records.",
    to: "/database",
    cta: "Open Database"
  },
  {
    title: "2. User Report & Tabs",
    description: "Switch between Image Analysis, Result/Grading, and AI Summary Report.",
    to: "/report",
    cta: "Start Screening"
  },
  {
    title: "3. Diagnostic AI & Grad-CAM",
    description: "Explainable AI breakdown: Grade, Confidence %, and heatmap visualizer.",
    to: "/grading",
    cta: "View Grad-CAM"
  },
  {
    title: "4. Nearest Specialists",
    description: "Locate nearby eye care centers and send encrypted reports directly.",
    to: "/specialists",
    cta: "Refer Patient"
  }
];

export default function LandingPage() {
  const navigate = useNavigate();

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

      <section className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <ScrollReveal as="div" stagger blur={10} className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
              <div className="text-xl font-bold text-sky-600">{stat.value}</div>
              <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </ScrollReveal>

        <ScrollReveal as="div" y={30} className="rounded-lg border border-slate-200 bg-white p-6">
          <ScrollReveal as="h2" blur={8} className="mb-4 text-lg font-semibold text-slate-800">
            Application Flow &amp; Wireframe Sections
          </ScrollReveal>
          <ScrollReveal as="div" stagger delay={0.1} className="grid gap-5 md:grid-cols-2">
            {FLOW_CARDS.map((card) => (
              <div
                key={card.title}
                onClick={() => navigate(card.to)}
                className="flex cursor-pointer flex-col justify-between rounded-lg border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-sky-400 hover:shadow-md"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{card.description}</p>
                </div>
                <span className="mt-4 text-sm font-semibold text-sky-600">{card.cta} &rarr;</span>
              </div>
            ))}
          </ScrollReveal>
        </ScrollReveal>
      </section>

      <ScrollReveal as="div" y={50}>
        <Footer02 />
      </ScrollReveal>
    </>
  );
}
