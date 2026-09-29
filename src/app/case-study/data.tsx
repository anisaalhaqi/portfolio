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
  meta?: {
    role: string;
    team: string;
    tools: string;
    timeframe: string;
  };
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
    summary: (
      <>
        Temu.in is an AI-powered internal marketplace verified by ITB’s SSO
        system to facilitate secure second-hand transactions. It features AI
        Auto-Listing and Price Suggestion to reduce the cognitive load and
        skepticism typically associated with reselling academic goods. The
        project is in the development stage, recently{" "}
        <strong>achieving a usability score of 90.8</strong>.
      </>
    ),
    imageSrc: "/portfolio/icons/temuin.png",
    meta: {
      role: "UX + UI Design, Visual Design, Branding, User Flow, Research, Prototyping + Testing",
      team: "3 Designers",
      tools: "Figma, FigJam, Google Meet, Google Form",
      timeframe: "3 weeks",
    },
    problem: [
      <>
        Every year, 5,000+ ITB students transition from the Tahap Persiapan
        Bersama (TPB) into their specialized majors,{" "}
        <strong>leaving behind a massive trail of temporary academic gear</strong>{" "}
        that immediately becomes irrelevant. From foundational textbooks to
        highly specific materials like A2 portfolio bags and expensive poster
        paints for FSRD students, or lab coats and microcontrollers for
        engineering majors, these essential items are{" "}
        <strong>utilized for less than 10% of their total lifespan</strong>{" "}
        before turning into neglected dead stock.
      </>,
      <>
        This massive waste cycle directly compounds the intense economic
        pressure already felt within the campus ecosystem. With the monthly cost
        of living in Bandung soaring to Rp 1.5–3 million and tuition fees
        reaching up to Rp 14.5, an internal survey revealed that{" "}
        <strong>61% of ITB students openly struggle with their financial burdens</strong>
        . Despite this heavy strain, generalist e-commerce platforms{" "}
        <strong>fail to offer a viable solution</strong>, repeatedly burdening
        students with high shipping costs, long logistics delays, and a tedious
        listing process riddle with &ldquo;decision fatigue.&rdquo; Without a
        dedicated internal circular economy, these expensive academic assets end
        up abandoned in boarding houses—creating unnecessary financial friction
        for buyers, friction for sellers, and an accumulation of hazardous waste
        that directly violates the goals of SDG 4 (Quality Education) and SDG 12
        (Responsible Consumption and Production).
      </>,
    ],
    problemHighlights: [
      { stat: "5,000+", label: "ITB students leave TPB gear behind every year" },
      { stat: "<10%", label: "of an academic item’s lifespan is actually used" },
      { stat: "61%", label: "of ITB students struggle with financial burdens" },
    ],
    methodology: {
      intro: (
        <>
          We adopted the <strong>Design Thinking framework</strong> to ensure
          our solutions are deeply rooted in real student needs. This iterative,
          human-centered approach allowed us to continuously refine our designs
          through a loop of empathy, synthesis, prototyping, and testing.
        </>
      ),
      phases: [
        {
          name: "Empathize",
          intro: (
            <>
              We gathered data from <strong>114 ITB students</strong> across{" "}
              <strong>28 majors</strong> to evaluate the scope of campus
              academic supply inefficiencies.
            </>
          ),
          findings: [
            {
              stat: "62.3%",
              text: "The high cost of new academic supplies heavily strains students. 62.3% still purchase new gear despite a vast majority (77.1%) operating on a tight monthly living budget of Rp1,000,000–Rp4,000,000.",
            },
            {
              stat: "93.9%",
              text: "93.9% of students have never attempted to sell their unused academic items. They are heavily deterred by manual promotion, lack of time, and tedious haggling.",
            },
            {
              stat: "69.3%",
              text: "During searches, 69.3% of students struggle to identify the exact technical name of needed tools. Furthermore, 73.7% experience high anxiety regarding hidden product defects and scam accounts.",
            },
            {
              stat: "59%",
              text: "Over 59% of respondents harbor 3 to more than 8 unused academic assets (such as textbooks, lab coats, and microcontrollers) in their limited boarding rooms. Around 89.5% state these items became obsolete immediately after a single semester or course completion.",
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
