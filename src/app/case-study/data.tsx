import type { ReactNode } from "react";

// A phase is a list of blocks; each block type has its own layout on the page
export type Block =
  | { type: "text"; content: ReactNode }
  | { type: "findings"; items: { stat: string; text: string }[] }
  | { type: "quotes"; title?: string; items: { quote: string; name: string; role: string }[] }
  // With fixLabel set, each card also shows its fix, or a placeholder until one is written
  | {
      type: "cards";
      title?: string;
      fixLabel?: string;
      items: { title: string; text: string; fix?: string }[];
    }
  | { type: "statement"; label: string; text: string }
  | { type: "list"; title: string; items: string[] }
  | { type: "mapping"; title?: string; items: { problem: string; feature: string }[] }
  | { type: "metrics"; title?: string; items: { label: string; before: string; after: string }[] }
  // Leave src empty to show a placeholder until the image is exported
  | { type: "images"; items: { caption: string; src?: string }[] };

export interface Phase {
  name: "Empathize" | "Define" | "Ideate" | "Prototype" | "Test";
  blocks: Block[];
}

export interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  summary: ReactNode;
  imageSrc: string;
  figmaUrl?: string;
  youtubeId?: string;
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
      "A website redesign aimed at simplifying the path to enrollment by restructuring a cluttered information hierarchy and streamlining a complex enrollment flow to reduce user drop-off. It reshapes the primary digital gateway for prospective students of Universitas Ciputra Online.",
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
    tag: "Gemastik 2026",
    title: "Temu.in",
    summary:
      "An SSO-verified marketplace for ITB students to resell academic gear, with AI auto-listing and price suggestions. Currently in development.",
    imageSrc: "/portfolio/icons/temuin.png",
    figmaUrl: "https://www.figma.com/design/SQtmDbAQDuEDAEzmrF6MwS/Temu.in---Gemastik?node-id=78-30116",
    youtubeId: "6BsO53MYzQU",
    glance: {
      problem:
        "Academic gear goes unused after a single semester, but reselling it on general marketplaces isn’t worth the effort.",
      solution:
        "A campus-only marketplace where AI writes the listing from a photo, suggests a fair price, and flags visible defects, while ITB SSO verification builds trust between buyers and sellers.",
      result: { stat: "90.8", label: "SUS score, up from 72.5" },
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
          blocks: [
            {
              type: "text",
              content: (
                <>
                  We surveyed <strong>114 ITB students across 28 majors</strong>{" "}
                  to understand how academic supplies are bought, kept, and
                  resold.
                </>
              ),
            },
            {
              type: "findings",
              items: [
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
                  text: "of respondents keep 3 or more unused academic items in their boarding rooms, and 89.5% say these went unused right after the course ended.",
                },
              ],
            },
            {
              type: "text",
              content: (
                <>
                  To validate the survey, we <strong>interviewed 7 ITB students</strong>{" "}
                  to dig into the root causes.
                </>
              ),
            },
            {
              type: "quotes",
              items: [
                {
                  quote:
                    "I have TPB books and a lab coat I don’t use anymore, but I don’t know where to sell them since my network is just friends in my major. Honestly, I can’t be bothered researching prices or replying to chats one by one to explain the condition. I just want to snap a photo and let the system handle the pricing.",
                  name: "Ara, 19",
                  role: "Seller",
                },
                {
                  quote:
                    "Finding second-hand academic gear is hard and it’s easy to get scammed. I once bought a book that looked great in the photos, but the inside was damaged. For specific tools like the ones FSRD needs, I sometimes don’t even know what they’re called. We really need a platform that verifies student accounts so we feel safe!",
                  name: "Keisha, 20",
                  role: "Buyer",
                },
              ],
            },
            {
              type: "images",
              items: [
                { caption: "Empathy map" },
                { caption: "Affinity map" },
                { caption: "User personas" },
                { caption: "User journey map" },
              ],
            },
          ],
        },
        {
          name: "Define",
          blocks: [
            {
              type: "cards",
              title: "Problem statements",
              items: [
                {
                  title: "Kevin, the seller",
                  text: "needs a practical way to describe an item’s condition and set a fair price, because typing details by hand is a chore and market prices are unclear, so his unused academic gear just piles up in his room.",
                },
                {
                  title: "Jessica, the buyer",
                  text: "needs an objective way to verify an item’s physical condition, because she worries about defects that go unnoticed or are hidden by sellers, so she avoids buying preloved and borrows instead, even though it feels awkward.",
                },
              ],
            },
            {
              type: "statement",
              label: "Goal",
              text: "Create a practical, transparent, and trustworthy way to circulate academic goods through an AI-powered, student-only marketplace, removing the busywork for sellers and the skepticism buyers feel toward preloved items.",
            },
          ],
        },
        {
          name: "Ideate",
          blocks: [
            {
              type: "list",
              title: "How might we…",
              items: [
                "create an AI-powered listing system, so sellers don’t have to research prices or describe an item’s condition by hand?",
                "create an objective condition check, so buyers can see every defect up front without inspecting the item again and again?",
                "create a campus-only marketplace, so students can find the gear they need quickly and safely without sharing personal details on social media?",
              ],
            },
            {
              type: "mapping",
              title: "Problem–feature mapping",
              items: [
                { problem: "No time or energy to list items", feature: "AI auto-listing & upload" },
                { problem: "Unclear market prices", feature: "Price suggestions based on item condition" },
                { problem: "Fear of receiving a damaged item", feature: "Automatic defect detection, reviews & ratings" },
                { problem: "Scattered information on campus", feature: "Search, filters & a central catalog" },
                { problem: "Unsafe communication", feature: "In-app chat & offers, ITB SSO verification" },
                { problem: "Limited logistics and mobility", feature: "COD or courier delivery options" },
                { problem: "No updates on availability", feature: "Real-time order status alerts" },
              ],
            },
            {
              type: "text",
              content: (
                <>
                  We <strong>benchmarked 7 competitor platforms</strong> across
                  three categories to find the flows users already know, then used
                  the results to shape the information architecture and
                  navigation.
                </>
              ),
            },
            {
              type: "images",
              items: [
                { caption: "Information architecture" },
                { caption: "Navigation flow" },
              ],
            },
          ],
        },
        {
          name: "Prototype",
          blocks: [
            {
              type: "text",
              content:
                "We built wireframes to set the information hierarchy and layout, then refined them into high-fidelity designs guided by UX laws and usability heuristics.",
            },
            {
              type: "images",
              items: [
                { caption: "Wireframes" },
                { caption: "High-fidelity screens" },
              ],
            },
            {
              type: "cards",
              title: "Design principles applied",
              items: [
                {
                  title: "Law of Proximity",
                  text: "Product photo, price, and seller rating sit together in one card with consistent spacing, so they read as a single unit.",
                },
                {
                  title: "Hick’s Law",
                  text: "The long listing form is split into short, AI-assisted steps, cutting the choices users face at once.",
                },
                {
                  title: "Miller’s Law",
                  text: "Filters show a small set of categories instead of dozens of faculties at once.",
                },
                {
                  title: "Consistency and Standards",
                  text: "A blue primary color and a bottom navigation bar on every page, so users never have to relearn the app.",
                },
                {
                  title: "User Control and Freedom",
                  text: "Undo, delete, and edit options in the cart and listing drafts, so a mistake never means starting over.",
                },
              ],
            },
          ],
        },
        {
          name: "Test",
          blocks: [
            {
              type: "text",
              content: (
                <>
                  We ran scenario-based <strong>usability testing over 2 iterations</strong>.
                  The second iteration met every KPI set in our testing plan.
                </>
              ),
            },
            {
              type: "metrics",
              items: [
                { label: "SUS score", before: "72.5", after: "90.8" },
                { label: "SEQ score", before: "6.27", after: "6.61" },
                { label: "Success rate", before: "98.8%", after: "100%" },
              ],
            },
            {
              type: "cards",
              title: "What testers told us",
              fixLabel: "What we changed",
              items: [
                {
                  title: "Counter-offer and decline were hard to find",
                  text: "Both were tucked behind a “More” button. Users expected Accept, Counter, and Decline side by side.",
                },
                {
                  title: "The cart icon was hard to find",
                  text: "Following a competitor, we placed the cart inside Favorites. Users expected it on the home page.",
                },
                {
                  title: "The offer flow wasn’t explicit",
                  text: "There was no field to enter an offer amount, so users felt they had no control over the price.",
                },
                {
                  title: "Notifications were tiring to clear",
                  text: "Without “Mark all as read”, users had to open every message just to clear the badge.",
                },
                {
                  title: "Reviews didn’t look tappable",
                  text: "The reviews section on profiles had no visual cue that it opens the full testimonials.",
                },
              ],
            },
            {
              type: "images",
              items: [{ caption: "Before and after iteration" }],
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
