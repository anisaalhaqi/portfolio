import type { ReactNode } from "react";

// A phase is a list of blocks; each block type has its own layout on the page
export type Block =
  | { type: "text"; title?: string; content: ReactNode }
  // Side-by-side cards, each with a heading and bullet points
  | { type: "columns"; title?: string; items: { title: string; points: string[] }[] }
  | {
      type: "empathy";
      title?: string;
      items: { label: string; says: string[]; thinks: string[]; does: string[]; feels: string[] }[];
    }
  | {
      type: "journey";
      title?: string;
      items: {
        label: string;
        stages: { stage: string; action: string; feeling: string; pain: string }[];
      }[];
    }
  | {
      type: "personas";
      title?: string;
      items: {
        name: string;
        age: number;
        program: string;
        role: string;
        bio: string;
        trait: string;
        frustrations: string[];
        goals: string[];
      }[];
    }
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
  // Numbered steps with an image each, e.g. how the logo evolved
  | {
      type: "process";
      title?: string;
      items: { label: string; text: string; points?: string[]; src: string; alt: string }[];
    }
  // Competitor groups for benchmarking, each with why it was chosen
  | {
      type: "benchmark";
      title?: string;
      items: { category: string; reason: string; logos: { name: string; src: string }[] }[];
    }
  // Leave src empty to show a placeholder until the image is exported.
  // "stack" shows each image full width, for large diagrams.
  | {
      type: "images";
      title?: string;
      layout?: "grid" | "stack";
      items: { caption: string; src?: string }[];
    };

export interface Phase {
  name: "Empathize" | "Define" | "Ideate" | "Prototype" | "Test";
  blocks: Block[];
}

export type ProjectKind = "case-study" | "ui";

// URL prefix for each kind of project (without the /portfolio base path)
export const KIND_PATH: Record<ProjectKind, string> = {
  "case-study": "/case-study",
  ui: "/ui-design",
};

export interface Project {
  slug: string;
  kind: ProjectKind;
  tag: string;
  title: string;
  summary: ReactNode;
  // Leave empty to show a placeholder until the cover image is ready
  imageSrc?: string;
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
  // Free-form sections, each with a title on the left and blocks on the right.
  // UI projects are built entirely from these.
  sections?: { title: string; blocks: Block[] }[];
}

export const PHASE_ORDER: Phase["name"][] = [
  "Empathize",
  "Define",
  "Ideate",
  "Prototype",
  "Test",
];

export const projects: Project[] = [
  {
    slug: "ciputra",
    kind: "case-study",
    tag: "1st Winner",
    title: "Web Redesign Ciputra Online University",
    summary:
      "A website redesign aimed at simplifying the path to enrollment by restructuring a cluttered information hierarchy and streamlining a complex enrollment flow to reduce user drop-off. It reshapes the primary digital gateway for prospective students of Universitas Ciputra Online.",
    imageSrc: "/portfolio/icons/redesign-uc.png",
  },
  {
    slug: "titipin",
    kind: "case-study",
    tag: "1st Runner Up",
    title: "Titipin",
    summary:
      'A mobile platform designed to streamline campus dining by integrating real-time canteen status, menu management, and a gamified "Spin Wheel" to eliminate decision fatigue. It facilitates a secure peer-to-peer delivery ecosystem within the ITB Ganesha community.',
    imageSrc: "/portfolio/icons/titipin.png",
  },
  {
    slug: "temuin",
    kind: "case-study",
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
              content:
                "To hear first-hand how students buy and sell academic gear on campus, and where it goes wrong, we started with a user research plan.",
            },
            {
              type: "columns",
              title: "User research plan",
              items: [
                {
                  title: "Research goals",
                  points: [
                    "Find the gaps in how ITB students buy and sell academic needs",
                    "Explore how students search for, buy, and sell academic items, especially when time is short and the need is urgent",
                    "Identify pain points in today’s transactions",
                    "Understand what students expect from a digital platform for academic items",
                  ],
                },
                {
                  title: "Target participants",
                  points: [
                    "Aged 18–23, mostly female",
                    "Students from every ITB campus",
                    "Both active and inactive in looking for and buying academic needs",
                    "Have bought, or tend to buy, academic items, new or second-hand",
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "Survey",
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
              title: "Interviews",
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
              type: "text",
              title: "Empathy map",
              content:
                "We then mapped these insights into empathy maps to see what sellers and buyers say, think, do, and feel when getting academic gear.",
            },
            {
              type: "empathy",
              items: [
                {
                  label: "Seller",
                  says: [
                    "“I tried posting it on my IG story, but nobody replied.”",
                    "“I’m afraid it’ll get damaged if I keep it too long.”",
                    "“I don’t know what price to set. It was so expensive when I bought it.”",
                  ],
                  thinks: [
                    "“Better not to sell it at all than explain every stain and scribble.”",
                    "“It’s a shame to sell it cheap, but if it’s pricey it won’t sell.”",
                  ],
                  does: [
                    "Relies on a small circle of friends",
                    "Lets items pile up and gather dust",
                    "Sells at a loss just to get rid of it, unsure of the market price",
                  ],
                  feels: [
                    "Uncomfortable with unused items piling up",
                    "Afraid of being scammed, or of items being stolen if left at the honesty canteen",
                    "Guilty that expensive items are just for display",
                  ],
                },
                {
                  label: "Buyer",
                  says: [
                    "“New gear is so expensive, I’d rather borrow from a senior.”",
                    "“I fell for a hardcover in the photo, but the pages were crooked when it arrived.”",
                    "“Sellers only show up at the start of the semester.”",
                  ],
                  thinks: [
                    "“Is this really a student? Hope it’s not a fake account.”",
                    "“I need it for lab tomorrow, but finding an active seller is so hard.”",
                  ],
                  does: [
                    "Scrolls through messy WhatsApp and X groups by hand",
                    "Ends up buying new, even for brief use, after failing to find a preloved item in time",
                  ],
                  feels: [
                    "Annoyed at checking prices across many shops and accounts",
                    "Awkward about borrowing from seniors again and again",
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "User journey map",
              content:
                "To see how their emotions shift from start to finish, we traced each side’s journey step by step.",
            },
            {
              type: "journey",
              items: [
                {
                  label: "Seller",
                  stages: [
                    {
                      stage: "Awareness",
                      action: "Notices academic items piling up in their room",
                      feeling: "Uneasy 😟",
                      pain: "The pile feels cramped and makes them feel guilty",
                    },
                    {
                      stage: "Preparation",
                      action: "Checks market prices on Shopee or X, then writes a description by hand",
                      feeling: "Frustrated 😫",
                      pain: "The pile feels cramped and makes them feel guilty",
                    },
                    {
                      stage: "Promotion",
                      action: "Posts on IG Story, the class WhatsApp group, or a spreadsheet",
                      feeling: "Tired, uncertain 🥲",
                      pain: "Reach is limited to close friends",
                    },
                    {
                      stage: "Nego & Trust",
                      action: "Replies to chats asking about the condition",
                      feeling: "Wary 🤨",
                      pain: "No clear identity, and a fear of receiving a dud",
                    },
                    {
                      stage: "Outcome",
                      action: "Gives it to a junior or just leaves it",
                      feeling: "Resigned 😔",
                      pain: "The item never turns into money, though it cost a lot",
                    },
                  ],
                },
                {
                  label: "Buyer",
                  stages: [
                    {
                      stage: "Need",
                      action: "Realizes they need a lab tool or TPB book, but new ones are too expensive",
                      feeling: "Anxious 😰",
                      pain: "A limited allowance, while lab tools and books are very expensive",
                    },
                    {
                      stage: "Searching",
                      action: "Scrolls WhatsApp groups and X, or asks seniors one by one",
                      feeling: "Confused 😵",
                      pain: "Items get buried in spam chats, or no active seller turns up",
                    },
                    {
                      stage: "Verification",
                      action: "Asks for detailed photos or videos through DMs",
                      feeling: "Skeptical 🤨",
                      pain: "Unclear photos and seasonal sellers raise the fear of a dud",
                    },
                    {
                      stage: "Nego & Meet Up",
                      action: "Arranges a COD meetup on campus to check the item and pay",
                      feeling: "Worried 😟",
                      pain: "Reluctant to share a personal WhatsApp number with strangers",
                    },
                    {
                      stage: "Outcome",
                      action: "Gets the item, not always as expected, or ends up buying new",
                      feeling: "Satisfied but tired 😔",
                      pain: "Feels money was wasted on expensive items barely used",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "Define",
          blocks: [
            {
              type: "text",
              title: "User personas",
              content:
                "We distilled the research into two personas, one for each side of the marketplace, to keep their needs in view.",
            },
            {
              type: "personas",
              items: [
                {
                  name: "Kevin",
                  age: 21,
                  program: "Informatics ITB ’24",
                  role: "Seller",
                  bio: "Has 21 TPB books and a lab coat piling up in his boarding room since last year. He tried selling through his class spreadsheet, but it was unreliable and drew few buyers.",
                  trait: "Practical, dislikes time-wasting processes, and values efficiency.",
                  frustrations: [
                    "Can’t be bothered typing and explaining an item’s condition to many people, again and again",
                    "Unsure what price to set, afraid of going too high or too low",
                    "Wastes time comparing prices on other e-commerce sites",
                    "Bothered by the pile of items, but too lazy to actually sell them",
                  ],
                  goals: [
                    "Automatic price suggestions, so there’s no manual research",
                    "Automated listing, so uploading an item is instant",
                    "Data security, with one email per account",
                    "A Want To Buy (WTB) feature to see buyers’ requests directly",
                  ],
                },
                {
                  name: "Jessica",
                  age: 20,
                  program: "Product Design ITB ’24",
                  role: "Buyer",
                  bio: "Often needs specific drawing tools, like paints and A2 bags, that are expensive but barely used. She wants to buy preloved, but sellers are very seasonal.",
                  trait: "Spends 5 hours a day on social media, and is selective about price and reviews before buying.",
                  frustrations: [
                    "Afraid of being misled about condition, so she often asks sellers for photos with sticky notes",
                    "Afraid of fake or scam accounts",
                    "Often doesn’t know a tool’s technical name, so she guesses or uses Google Lens",
                    "Forced to buy expensive new items when no used ones turn up in time",
                  ],
                  goals: [
                    "A Verified Student feature for safety",
                    "Full transparency on defects and how long an item was used",
                    "Smart search",
                    "Flexible delivery, plus mediation if something goes wrong",
                  ],
                },
              ],
            },
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
              type: "text",
              content: "Solving both problems at once gave us a single goal to design toward.",
            },
            {
              type: "statement",
              label: "Goal",
              text: "Create a practical, transparent, and trustworthy way to circulate academic goods through an AI-powered, student-only marketplace, removing the busywork for sellers and the skepticism buyers feel toward preloved items.",
            },
            {
              type: "text",
              content:
                "We then reframed the problems as opportunities, to steer ideation toward the features that matter most.",
            },
            {
              type: "list",
              title: "How might we…",
              items: [
                "create an AI-powered listing system, so sellers don’t have to research prices or describe an item’s condition by hand?",
                "create an objective condition check, so buyers can see every defect up front without inspecting the item again and again?",
                "create a campus-only marketplace, so students can find the gear they need quickly and safely without sharing personal details on social media?",
              ],
            },
          ],
        },
        {
          name: "Ideate",
          blocks: [
            {
              type: "text",
              content:
                "To connect each problem to what Temu.in offers, we traced every root cause to a solution and a feature.",
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
              title: "Benchmarking",
              content: (
                <>
                  To find the flows users already know, we{" "}
                  <strong>benchmarked 7 competitor platforms</strong>, grouped
                  into three categories by how closely they match Temu.in’s
                  business model and users.
                </>
              ),
            },
            {
              type: "benchmark",
              items: [
                {
                  category: "Primary",
                  reason: "Same business model: peer-to-peer marketplaces for second-hand goods.",
                  logos: [
                    { name: "OLX", src: "/portfolio/Temu.in/benchmarking-logo/OLX.webp" },
                    { name: "Carousell", src: "/portfolio/Temu.in/benchmarking-logo/carousell.webp" },
                  ],
                },
                {
                  category: "Secondary",
                  reason: "Same user persona: buy-and-sell platforms used mostly by the same people Temu.in is designed for.",
                  logos: [
                    { name: "Tokopedia", src: "/portfolio/Temu.in/benchmarking-logo/Tokopedia.webp" },
                    { name: "Instagram", src: "/portfolio/Temu.in/benchmarking-logo/instagram.webp" },
                  ],
                },
                {
                  category: "Others",
                  reason: "Same business model, different user persona: second-hand marketplaces abroad.",
                  logos: [
                    { name: "eBay", src: "/portfolio/Temu.in/benchmarking-logo/eBay.webp" },
                    { name: "Mercari", src: "/portfolio/Temu.in/benchmarking-logo/Mercari.webp" },
                    { name: "Depop", src: "/portfolio/Temu.in/benchmarking-logo/Depop.webp" },
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "Information architecture",
              content:
                "Building on the benchmarking, we structured the information architecture so students can reach buying and selling quickly, with a simpler hierarchy.",
            },
            {
              type: "images",
              layout: "stack",
              items: [{ caption: "Information architecture" }],
            },
            {
              type: "text",
              title: "Navigation",
              content: "Finally, we charted the paths users take as they move through the app.",
            },
            {
              type: "images",
              layout: "stack",
              items: [{ caption: "Navigation flow" }],
            },
          ],
        },
        {
          name: "Prototype",
          blocks: [
            {
              type: "text",
              title: "Branding",
              content: (
                <>
                  We named it <strong>Temu.in</strong>, from the Indonesian word{" "}
                  <em>temu</em> (to meet, to find), hoping people can find each
                  other: sellers meet the students who need their items, and
                  buyers find sellers offering them at an affordable price.
                </>
              ),
            },
            {
              type: "process",
              items: [
                {
                  label: "First direction",
                  text: "An eye, to show how buyers and sellers find each other. Feedback said it felt made for women, though the app is for everyone.",
                  src: "/portfolio/Temu.in/logo-making/option%201.png",
                  alt: "First logo option: an eye with eyelashes",
                },
                {
                  label: "Exploring again",
                  text: "To keep it gender-neutral, we went back to sketching wordmarks built from the name itself.",
                  src: "/portfolio/Temu.in/logo-making/brainstorm.png",
                  alt: "Hand-drawn sketches of Temu.in wordmarks",
                },
                {
                  label: "Final logo",
                  text: "Chosen after gathering opinions from several people, including potential users. Its shape carries four ideas:",
                  points: [
                    "A chat bubble, because buyers and sellers talk directly to agree on a deal",
                    "A magnifying glass, since the app is about finding the right item and the right person",
                    "A smile, which reflects the satisfaction of a good deal on both sides",
                    "A container that holds second-hand goods, so each item gets a second life",
                  ],
                  // Copy of "final logo.png" with uneven transparent margins trimmed,
                  // so it sits centered in its frame
                  src: "/portfolio/Temu.in/logo-making/final-logo.png",
                  alt: "Final Temu.in logo: the wordmark inside a magnifying glass",
                },
              ],
            },
            {
              type: "text",
              title: "Wireframes and high fidelity",
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
  ...[1, 2].map((n): Project => uiPlaceholder(`ui-project-${n}`, `UI Project ${n}`)),
];

// Template content for a UI project; copy it and replace the text when the real
// project is ready
function uiPlaceholder(slug: string, title: string): Project {
  return {
    slug,
    kind: "ui",
    tag: "UI Design",
    title,
    summary: "A one-line description of the product and who it’s for.",
    meta: {
      role: "UI Design, Visual Design",
      team: "1 Designer",
      tools: "Figma",
      timeframe: "TBD",
    },
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "text",
            content:
              "Describe the brief in two or three sentences: who the product is for, what it needs to help them do, and any constraints you designed around.",
          },
        ],
      },
      {
        title: "Key Screens",
        blocks: [
          {
            type: "images",
            items: [
              { caption: "Home" },
              { caption: "Detail" },
              { caption: "Flow" },
              { caption: "Settings" },
            ],
          },
        ],
      },
      {
        title: "Design Decisions",
        blocks: [
          {
            type: "cards",
            items: [
              {
                title: "Decision about hierarchy",
                text: "What you decided, and the user need or principle behind it.",
              },
              {
                title: "Decision about navigation",
                text: "What you decided, and the user need or principle behind it.",
              },
              {
                title: "Decision about accessibility",
                text: "What you decided, and the user need or principle behind it.",
              },
              {
                title: "Decision about visual style",
                text: "What you decided, and the user need or principle behind it.",
              },
            ],
          },
        ],
      },
      {
        title: "Before & After",
        blocks: [
          {
            type: "images",
            items: [{ caption: "Before" }, { caption: "After" }],
          },
        ],
      },
    ],
  };
}

export function getProject(kind: ProjectKind, slug: string) {
  return projects.find((project) => project.kind === kind && project.slug === slug);
}

export function projectHref(project: Project) {
  return `${KIND_PATH[project.kind]}/${project.slug}`;
}
