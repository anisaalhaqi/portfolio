import type { ReactNode } from "react";

export interface Finding {
  stat: string;
  text: string;
}

export interface Phase {
  name: "Empathize" | "Define" | "Ideate" | "Prototype" | "Test";
  intro?: ReactNode;
  findings?: Finding[];
}

export interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  summary: ReactNode;
  imageSrc: string;
  prototypeUrl?: string;
  glance?: {
    problem: string;
    solution: string;
    result: { stat: string; label: string };
  };
  meta?: {
    role: string;
    team: string;
    tools: string;
    timeframe: string;
  };
  problemStatement?: string;
  problem?: ReactNode[];
  problemHighlights?: { stat: string; label: string }[];
  methodology?: {
    intro: ReactNode;
    phases: Phase[];
  };
}

export const PHASE_ORDER: Phase["name"][] = [
  "Empathize",
  "Define",
  "Ideate",
  "Prototype",
  "Test",
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "ciputra",
    tag: "1st Winner",
    title: "Web Redesign Ciputra Online University",
    summary:
      "Universitas Ciputra Online’s platform is the primary gateway for prospective students. However, the original site suffered from a cluttered information hierarchy and a complex enrollment flow that led to high user drop-off rates.",
    imageSrc: "/portfolio/icons/redesign-uc.png",
  },
  {
    slug: "titipin",
    tag: "1st Runner Up",
    title: "Titipin",
    summary:
      'A mobile platform designed to streamline campus dining by integrating real-time canteen status, menu management, and a gamified "Spin Wheel" to eliminate decision fatigue. It facilitates a secure peer-to-peer delivery ecosystem within the ITB Ganesha community.',
    imageSrc: "/portfolio/icons/titipin.png",
  },
  {
    slug: "temuin",
    tag: "Submitted",
    title: "Temu.in",
    summary:
      "An SSO-verified marketplace for ITB students to resell academic gear, with AI auto-listing and price suggestions. Currently in development.",
    imageSrc: "/portfolio/icons/temuin.png",
    glance: {
      problem:
        "Academic gear goes unused after a single semester, but reselling it on general marketplaces isn’t worth the effort.",
      solution:
        "A campus-only marketplace where AI auto-listing and price suggestions take the work out of selling, and ITB SSO verification builds trust between buyers and sellers.",
      result: { stat: "90.8", label: "usability score in testing" },
    },
    meta: {
      role: "UX + UI Design, Visual Design, Branding, User Flow, Research, Prototyping + Testing",
      team: "3 Designers",
      tools: "Figma, FigJam, Google Meet, Google Form",
      timeframe: "3 weeks",
    },
    problemStatement:
      "ITB students abandon academic gear they barely used, while most can’t afford new gear, and general marketplaces don’t make reselling worth the effort.",
    problemHighlights: [
      { stat: "5,000+", label: "ITB students leave TPB gear behind every year" },
      { stat: "<10%", label: "of an academic item’s lifespan is actually used" },
      { stat: "61%", label: "of ITB students struggle with financial burdens" },
    ],
    methodology: {
      intro: (
        <>
          We adopted the <strong>Design Thinking framework</strong> to ensure
          our solutions are deeply rooted in real student needs, refining our
          designs through a loop of empathy, synthesis, prototyping, and
          testing.
        </>
      ),
      phases: [
        {
          name: "Empathize",
          intro: (
            <>
              We surveyed <strong>114 ITB students across 28 majors</strong> to
              understand how academic supplies are bought, kept, and resold.
            </>
          ),
          findings: [
            {
              stat: "62.3%",
              text: "still purchase new gear despite a vast majority (77.1%) operating on a tight monthly living budget of Rp1,000,000–Rp4,000,000.",
            },
            {
              stat: "93.9%",
              text: "of students have never attempted to sell their unused academic items. They are heavily deterred by manual promotion, lack of time, and tedious haggling.",
            },
            {
              stat: "69.3%",
              text: "of students struggle to identify the exact technical name of needed tools. Furthermore, 73.7% experience high anxiety regarding hidden product defects and scam accounts.",
            },
            {
              stat: "59%",
              text: "of respondents keep 3 to 8+ unused academic items in their boarding rooms, and 89.5% say these became obsolete after a single semester.",
            },
          ],
        },
      ],
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
