import { Link } from "react-router-dom";
import Tetris from "@/components/originkit/ui/footer-02/tetris";
import ScrollReveal from "@/components/ScrollReveal";

function asset(file) {
  return `/originkit/footer-02/${file}`;
}

const LINK_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Patient Database", to: "/database" },
      { label: "Screening & Analysis", to: "/report" },
      { label: "Diagnostic AI", to: "/grading" },
      { label: "Specialist Referral", to: "/specialists" }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "Grading Guide", href: "#features" },
      { label: "How It Works", href: "#main" },
      { label: "Documentation", href: "#" },
      { label: "Support", href: "#" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#privacy" },
      { label: "License", href: "#license" },
      { label: "Terms & Conditions", href: "#terms" }
    ]
  }
];

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com", icon: "x.svg" },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram.svg" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin.svg" }
];

const SOCIAL_SHADOW =
  "0px 17px 2.5px rgba(0,0,0,0), 0px 11px 2px rgba(0,0,0,0.01), 0px 6px 2px rgba(0,0,0,0.05), 0px 3px 1.5px rgba(0,0,0,0.09), 0px 1px 1px rgba(0,0,0,0.1)";

function FooterLink({ link }) {
  const className =
    "relative inline-flex items-center font-sans text-[16px] leading-normal text-white/80 touch-manipulation transition-opacity duration-200 ease before:absolute before:-inset-y-2 before:-inset-x-1 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white desktop-sm:text-[14px] [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:text-white";

  if (link.to) {
    return (
      <Link to={link.to} aria-label={link.label} className={className}>
        {link.label}
      </Link>
    );
  }

  return (
    <a href={link.href} tabIndex={0} aria-label={link.label} className={className}>
      {link.label}
    </a>
  );
}

export function Footer() {
  return (
    <footer
      aria-label="RetinaVision AI footer"
      className="relative isolate mx-auto w-full min-h-[778px] overflow-hidden rounded-[12px] bg-[#212121]"
    >
      <div className="relative z-10 flex flex-col gap-8 px-4 pt-10 pb-[300px] ipad:gap-12 ipad:px-12 ipad:pt-12 ipad:pb-[320px] desktop-sm:flex-row desktop-sm:items-stretch desktop-sm:justify-between desktop-sm:gap-0 desktop-sm:px-14 desktop-sm:pt-[72px] desktop-sm:pb-[300px]">
        <div className="flex w-full flex-col gap-6 ipad:gap-8 desktop-sm:w-[220px] desktop-sm:shrink-0 desktop-sm:justify-between desktop-sm:gap-0">
          <ScrollReveal as="div" blur={8} className="flex flex-col gap-2 ipad:gap-4">
            <p className="font-hedvig text-[24px] leading-[1.1] tracking-[-0.96px] text-white/90">
              RetinaVision AI
            </p>
            <p className="font-sans text-[14px] leading-[1.4] text-[#c2c2c2]">
              Explainable AI diabetic retinopathy screening for rural Primary Health Centres
            </p>
          </ScrollReveal>

          <ul className="flex items-center gap-4" aria-label="Social links">
            {SOCIAL_LINKS.map((social, index) => (
              <li
                key={social.label}
                className="animate-social-slide-up will-change-transform"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  tabIndex={0}
                  className="relative inline-flex size-10 touch-manipulation items-center justify-center rounded-full bg-[#292929] transition-opacity duration-200 ease before:absolute before:inset-[-6px] before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [-webkit-tap-highlight-color:transparent] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-80"
                  style={{ boxShadow: SOCIAL_SHADOW }}
                >
                  <span className="relative size-5 overflow-clip">
                    <img
                      src={asset(social.icon)}
                      alt=""
                      width={20}
                      height={20}
                      className="size-full"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <ScrollReveal
          as="nav"
          aria-label="Footer"
          stagger
          blur={6}
          className="grid w-full grid-cols-2 gap-x-8 gap-y-8 ipad:grid-cols-3 ipad:gap-8 desktop-sm:flex desktop-sm:w-[541px] desktop-sm:shrink-0 desktop-sm:gap-14"
        >
          {LINK_COLUMNS.map((column) => (
            <div key={column.title} className="flex min-w-0 flex-col gap-4 desktop-sm:flex-1">
              <p className="font-hedvig text-[18px] leading-normal text-white">{column.title}</p>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ScrollReveal>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[268px] overflow-hidden">
        <Tetris
          boardColor="#212121"
          colors={["#FDF9ED"]}
          cellSize={20}
          gap={0}
          rounded={20}
          dropSpeed={1}
          movement={2}
          startFilled={true}
        />
      </div>
    </footer>
  );
}
