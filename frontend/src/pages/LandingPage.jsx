import { useNavigate } from "react-router-dom";

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
    <section>
      <div>
        <h1>AI Diabetic Retinopathy Screening</h1>
        <p>
          A field-tested, explainable AI solution designed for portable fundus cameras across rural Primary
          Healthcare Centres (PHCs) in India.
        </p>

        <div>
          <button onClick={() => navigate("/database")}>Access Patient Database</button>
          <button onClick={() => navigate("/report")}>Start Image Analysis</button>
          <button onClick={() => navigate("/specialists")}>Referral Network</button>
        </div>

        <div>
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div>{stat.value}</div>
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>Application Flow &amp; Wireframe Sections</h2>
        <div>
          {FLOW_CARDS.map((card) => (
            <div key={card.title} onClick={() => navigate(card.to)}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <span>{card.cta} &rarr;</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
