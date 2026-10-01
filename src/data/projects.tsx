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
        stages: {
          stage: string;
          action: string;
          feeling: string;
          pain: string;
          // Optional rows, shown only when the journey has them
          touchpoint?: string;
          idea?: string;
        }[];
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
        trait?: string;
        frustrations: string[];
        goals: string[];
        habits?: string[];
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
  // Leave out "before" when there was only one round of testing
  | { type: "metrics"; title?: string; items: { label: string; before?: string; after: string }[] }
  // Numbered steps with an image each, e.g. how the logo evolved
  | {
      type: "process";
      title?: string;
      items: { label: string; text: string; src: string; alt: string }[];
    }
  // Hierarchy diagram, e.g. information architecture: a root, then one
  // column per top-level section with nested children
  | { type: "tree"; title?: string; root: string; items: TreeNode[] }
  // Navigation flow: the sign-in path, then the actions available in each tab.
  // An action with a screen opens that screen.
  | {
      type: "flow";
      title?: string;
      entry: { start: string; decision: string; no: string[]; yes: string[]; end: string };
      tabs: { label: string; actions: { label: string; screen?: string }[] }[];
    }
  // One image beside a list of points, e.g. what a logo means
  | { type: "spotlight"; title?: string; src: string; alt: string; points: string[] }
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

export interface TreeNode {
  label: string;
  children?: TreeNode[];
}

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
    timeframe?: string;
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
    figmaUrl:
      "https://www.figma.com/proto/7oZmRwqo3iFgluxTTGRrYH/UI-UX---Unma?node-id=623-8295&t=7tcBchAf3dcLXSmm-1&scaling=scale-down&content-scaling=fixed&page-id=5%3A34&starting-point-node-id=361%3A443",
    glance: {
      problem:
        "Students with back-to-back classes skip meals because they can’t tell which canteens are open, what they sell, or how long the queue is.",
      solution:
        "A campus food app with real-time canteen status and menus, food delivery between students, and a Spin Wheel that picks a canteen or dish when choosing feels exhausting.",
      result: { stat: "87.03", label: "SUS score in usability testing" },
    },
    meta: {
      role: "UI/UX Design, User Research, Usability Testing",
      team: "3 Designers",
      tools: "Figma, Google Meet",
    },
    problemStatement:
      "Packed class schedules leave ITB students skipping meals, while canteen menus, opening hours, and queues stay invisible until they walk there.",
    problemHighlights: [
      { stat: "84.6%", label: "of surveyed students buy food around campus often or very often" },
      { stat: "38%", label: "of university students report disordered eating, and 57% of them skip meals regularly" },
      { stat: "16.4×", label: "higher risk of dyspepsia for people who eat irregularly" },
    ],
    methodology: {
      intro: (
        <>
          We used the <strong>Design Thinking framework</strong>, iterating
          through empathy, definition, ideation, prototyping, and testing to
          keep refining the solution.
        </>
      ),
      phases: [
        {
          name: "Empathize",
          blocks: [
            {
              type: "text",
              content:
                "To understand how ITB Ganesha students buy food between classes, we started with a user research plan.",
            },
            {
              type: "columns",
              title: "User research plan",
              items: [
                {
                  title: "Research goals",
                  points: [
                    "Explore the challenges students face when looking for food around campus",
                    "Explore what students do when they need to eat during a packed academic schedule",
                  ],
                },
                {
                  title: "Target participants",
                  points: [
                    "Aged 18–30, male and female",
                    "Students at ITB Ganesha with access to digital apps",
                    "Regularly buy food at canteens or food stalls around campus",
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "Survey",
              content: (
                <>
                  We ran an online survey with students from{" "}
                  <strong>10 of ITB’s 12 faculties</strong>, most of them aged
                  19–20.
                </>
              ),
            },
            {
              type: "findings",
              items: [
                {
                  stat: "84.6%",
                  text: "buy food around campus often or very often, yet 80% stick to canteens within 400 m of their lecture building.",
                },
                {
                  stat: "65.4%",
                  text: "know where the canteens are, but still feel unsure about the menus at ones they rarely visit (3.23 out of 5).",
                },
                {
                  stat: "3.19/5",
                  text: "is how confused students feel, on average, when choosing what to eat or where to go.",
                },
                {
                  stat: "19.2%",
                  text: "ask a friend to buy food for them when their schedule is too packed to go.",
                },
              ],
            },
            {
              type: "text",
              title: "Interviews",
              content: (
                <>
                  We then <strong>interviewed 5 students</strong> to dig into their
                  habits and struggles when buying food on campus.
                </>
              ),
            },
            {
              type: "quotes",
              items: [
                {
                  quote:
                    "I usually hear about a canteen’s menu from friends, but they don’t know the details either. When class is close, I just go to the nearest one. Once I went to the Labtek V canteen and the queue reached outside, so I didn’t buy anything.",
                  name: "Illona, 20",
                  role: "ITB student",
                },
                {
                  quote:
                    "With back-to-back classes, it’s hard to find time to eat. If I can’t make it, I don’t eat at all. I usually walk to a canteen just to see if it’s open, and when it’s closed after walking that far, it feels like a waste of time.",
                  name: "Keisha, 19",
                  role: "ITB student",
                },
              ],
            },
            {
              type: "text",
              title: "Empathy map",
              content:
                "We mapped these insights into an empathy map to see what students say, think, do, and feel when getting food on campus.",
            },
            {
              type: "empathy",
              items: [
                {
                  label: "Student",
                  says: [
                    "“It’s so annoying to walk all the way there and find the stall closed.”",
                    "“Can I put in an order if anyone’s going to the canteen?”",
                    "“Ganyang is good, but it’s so far. I can’t be bothered to walk.”",
                  ],
                  thinks: [
                    "“Rather than be late for class because of the queue, I’d rather not eat at all.”",
                    "“I’m scared to try a new canteen when I don’t know its prices.”",
                    "“Going to a canteen far from my lecture building drains my energy and time.”",
                  ],
                  does: [
                    "Picks canteens within 400 m, even if they aren’t a favorite, to make it to class",
                    "Asks friends about a canteen’s menu",
                    "Walks to a canteen just to see if it’s open",
                  ],
                  feels: [
                    "Afraid of losing their break just waiting for food",
                    "Drained just from choosing what to eat",
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "User journey map",
              content:
                "We traced a student’s journey from feeling hungry to finishing a meal, to see where it breaks down and where an idea could help.",
            },
            {
              type: "journey",
              items: [
                {
                  label: "Student",
                  stages: [
                    {
                      stage: "Awareness",
                      action: "Feels hungry and realizes their class schedule is packed",
                      touchpoint: "None",
                      feeling: "Worried 😟",
                      pain: "Can’t buy food in person because time is short",
                      idea: "Food delivery between students",
                    },
                    {
                      stage: "Consideration",
                      action: "Picks a canteen and decides what to eat",
                      touchpoint: "Social media",
                      feeling: "Neutral 😐",
                      pain: "Confused about where to eat or what to buy",
                      idea: "A Spin Wheel to pick a place or dish, and menu info for every canteen",
                    },
                    {
                      stage: "Order",
                      action: "Buys food at a canteen, or asks a friend to buy it",
                      touchpoint: "Talking to the seller, cash or QRIS, menu board",
                      feeling: "Worried 😟",
                      pain: "The canteen is closed without notice",
                      idea: "Real-time canteen status",
                    },
                    {
                      stage: "Waiting",
                      action: "Queues and pays, or waits for a friend to bring the food",
                      touchpoint: "The physical queue",
                      feeling: "Frustrated 😣",
                      pain: "Long queues",
                      idea: "Food delivery between students",
                    },
                    {
                      stage: "Post-Experience",
                      action: "Eats, if the canteen was open and the dish was available",
                      touchpoint: "Canteen table, classroom",
                      feeling: "Satisfied 😊",
                      pain: "None",
                      idea: "None",
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
              title: "User persona",
              content:
                "We distilled the research into one persona to keep a busy student’s needs in view.",
            },
            {
              type: "personas",
              items: [
                {
                  name: "Keisha",
                  age: 19,
                  program: "STEI-K ITB",
                  role: "Student",
                  bio: "A fourth-semester student busy with both academic and non-academic activities. She usually buys food on campus because she has no time to pack lunch, but sometimes can’t buy anything at all because of a packed schedule or a canteen that suddenly closes.",
                  trait: "Cares most about distance and queue time.",
                  frustrations: [
                    "Canteens close without notice, even after she’s walked there",
                    "Breaks between classes are so short that queuing eats up her rest",
                    "Wants to try a new canteen but doesn’t know its menu",
                  ],
                  goals: [
                    "Buy food without going in person, especially from canteens far from her lecture building, so she can eat more regularly",
                  ],
                  habits: [
                    "Buys food on campus on every class day",
                    "Tends to skip meals between classes",
                    "Only goes to canteens close to her lecture building",
                    "Bored with the menu at her usual canteens",
                  ],
                },
              ],
            },
            {
              type: "cards",
              title: "Problem statements",
              items: [
                {
                  title: "Menus and opening hours",
                  text: "Keisha needs a catalog of canteen menus around ITB Ganesha and their opening status, because she feels unsure at canteens she rarely visits and has walked to canteens that turned out to be closed without notice.",
                },
                {
                  title: "Food delivery on campus",
                  text: "Keisha needs an affordable, easy-to-use food delivery service within campus, because her packed schedule makes it hard to keep regular mealtimes.",
                },
                {
                  title: "Choosing what to eat",
                  text: "Keisha needs recommendations for where and what to eat, because she often spends too long deciding.",
                },
              ],
            },
            {
              type: "list",
              title: "Hypotheses",
              items: [
                "If Keisha can browse canteen menus and opening status, then she’ll be more willing to try canteens she rarely visits and buy food more efficiently.",
                "If Keisha can use an affordable, easy-to-use delivery service on campus, then she can still eat her favorite food without sacrificing class time or her break.",
                "If Keisha gets recommendations for where and what to eat, then she’ll save time choosing.",
              ],
            },
            {
              type: "text",
              content: "Together, these shaped a single goal to design toward.",
            },
            {
              type: "statement",
              label: "Goal",
              text: "An app for ordering from and learning about canteens around ITB Ganesha, with centralized menus, real-time opening status, a Spin Wheel, and food delivery between students, so students with packed schedules can get food without leaving class and with less effort deciding what to eat.",
            },
            {
              type: "text",
              content:
                "We then reframed the problems as opportunities to guide ideation.",
            },
            {
              type: "list",
              title: "How might we…",
              items: [
                "build a fully integrated, real-time canteen information system, so students no longer have to check opening status or menus in person?",
                "remove the risk of skipping meals during a packed schedule with a fast, easy food delivery service between students?",
                "turn choosing food from confusing and tiring into instant and fun, with an interactive recommendation feature?",
              ],
            },
          ],
        },
        {
          name: "Ideate",
          blocks: [
            {
              type: "text",
              title: "SWOT analysis",
              content: (
                <>
                  To check the app’s feasibility, we ran a SWOT analysis. Titipin
                  landed in the <strong>Aggressive Strategy</strong> quadrant of
                  the SPACE matrix (IFAS 1.7, EFAS 0.6), meaning strong internal
                  strengths and large market opportunities.
                </>
              ),
            },
            {
              type: "columns",
              items: [
                {
                  title: "Strengths",
                  points: [
                    "Centralized food information, with menus and prices",
                    "Real-time canteen opening status",
                    "A Spin Wheel that eases decision fatigue",
                  ],
                },
                {
                  title: "Weaknesses",
                  points: [
                    "Status and menu accuracy depends on how active users are",
                    "The number of couriers depends on students’ free time",
                  ],
                },
                {
                  title: "Opportunities",
                  points: [
                    "Packed schedules create demand for food delivery",
                    "Students already buy food for each other (titip)",
                    "Room to connect with campus programs that digitize canteens",
                  ],
                },
                {
                  title: "Threats",
                  points: [
                    "Sellers may not keep their information up to date",
                    "Students may only use the app situationally",
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "Competitor analysis",
              content: (
                <>
                  We compared <strong>Grab and Gojek</strong> with a SWOT lens.
                  We borrowed Grab’s loyalty model (cashback and points) to keep
                  users motivated, adapted Gojek’s strong bond with Indonesian
                  users to our persona, and kept their standard reviews and
                  ratings to build trust between students. Gojek’s heavy app on
                  low-end phones reminded us to keep Titipin minimal and
                  intuitive.
                </>
              ),
            },
            {
              type: "text",
              title: "Problem–feature mapping",
              content:
                "Every root cause traces back to one problem: students skip meals and risk their health because they don’t have time to go to the canteen.",
            },
            {
              type: "mapping",
              items: [
                {
                  problem: "Packed class schedules",
                  feature: "Food delivery between students, scheduled and group orders, canteen crowd tracking",
                },
                {
                  problem: "Confusion over where or what to eat",
                  feature: "Spin Wheel, nearby canteens, reviews & feedback",
                },
                {
                  problem: "No central information on canteen menus",
                  feature: "Menus, locations, and prices for every canteen",
                },
                { problem: "Unclear opening status", feature: "Real-time opening status" },
                { problem: "Price sensitivity", feature: "Reward points" },
              ],
            },
            {
              type: "text",
              title: "User flow",
              content: "We charted the paths users take through the app, from opening it to ordering and rating food.",
            },
            {
              type: "images",
              layout: "stack",
              items: [{ caption: "User flow" }],
            },
            {
              type: "text",
              title: "Information architecture",
              content: "We then structured how information is organized across the app’s screens.",
            },
            {
              type: "images",
              layout: "stack",
              items: [{ caption: "Information architecture" }],
            },
          ],
        },
        {
          name: "Prototype",
          blocks: [
            {
              type: "text",
              title: "Wireframes and high fidelity",
              content:
                "We turned the user flow and information architecture into wireframes, then refined them into high-fidelity screens, referencing Material Design for an intuitive Android experience.",
            },
            {
              type: "images",
              items: [{ caption: "Wireframes" }, { caption: "High-fidelity screens" }],
            },
            {
              type: "cards",
              title: "Key features",
              items: [
                {
                  title: "Food delivery between students",
                  text: "Order food that another student delivers, schedule it ahead, or order for a group, and check how crowded a canteen is in real time.",
                },
                {
                  title: "Spin Wheel and nearby canteens",
                  text: "Get a random canteen or dish in seconds, see the canteens closest to you, and read reviews from other students.",
                },
                {
                  title: "Menus, locations, and prices",
                  text: "Details for every canteen in one place.",
                },
                {
                  title: "Real-time opening status",
                  text: "Know whether a canteen is open before walking there.",
                },
                {
                  title: "Reward points",
                  text: "Earn points after spending a set amount.",
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
                  We ran <strong>moderated usability tests with 4 ITB Ganesha students</strong>{" "}
                  on the Figma prototype over Google Meet, asking them to think out
                  loud through 4 scenarios.
                </>
              ),
            },
            {
              type: "metrics",
              items: [
                { label: "SUS score", after: "87.03" },
                { label: "SEQ score", after: "6.875" },
                { label: "Success rate", after: "81.25%" },
              ],
            },
            {
              type: "cards",
              title: "Scenarios",
              items: [
                {
                  title: "Track an ongoing order",
                  text: "Find order history and show the details of the current order. 3 of 4 participants completed it.",
                },
                {
                  title: "Reorder with “Buy again”",
                  text: "Reorder yesterday’s food from a past order. Only 2 of 4 completed it, the hardest task in the test.",
                },
                {
                  title: "Let the Spin Wheel decide",
                  text: "Use the Spin Wheel to pick a canteen, then a dish. All 4 participants completed it.",
                },
                {
                  title: "Find a quiet, well-rated canteen",
                  text: "Find a canteen with low crowd levels and a rating of at least 4. All 4 participants completed it.",
                },
              ],
            },
          ],
        },
      ],
    },
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
              type: "tree",
              root: "Temu.in",
              items: [
                {
                  label: "Home",
                  children: [
                    { label: "Location filter, chat, and cart" },
                    { label: "Search bar" },
                    { label: "Product categories" },
                    { label: "Favorites" },
                    { label: "Product recommendations" },
                  ],
                },
                {
                  label: "Activity",
                  children: [
                    {
                      label: "Filter by status",
                      children: [
                        { label: "Waiting Confirmation" },
                        { label: "Waiting Payment" },
                        { label: "On Progress" },
                        { label: "Canceled" },
                        { label: "Completed" },
                      ],
                    },
                    {
                      label: "Filter by transaction type",
                      children: [{ label: "Sell" }, { label: "Buy" }],
                    },
                  ],
                },
                {
                  label: "Sell",
                  children: [
                    { label: "Choose category" },
                    { label: "Take photo", children: [{ label: "Photo tips" }] },
                    {
                      label: "Preview",
                      children: [{ label: "Retake" }, { label: "Upload (CTA)" }],
                    },
                    {
                      label: "Item details",
                      children: [
                        { label: "Photos" },
                        { label: "AI analysis" },
                        { label: "Item name" },
                        { label: "Usage duration" },
                        { label: "Price" },
                        { label: "Authenticity" },
                        { label: "Description" },
                      ],
                    },
                    { label: "Pickup method" },
                  ],
                },
                {
                  label: "Notifications",
                  children: [
                    {
                      label: "Filter by role",
                      children: [{ label: "As seller" }, { label: "As buyer" }],
                    },
                  ],
                },
                {
                  label: "Profile",
                  children: [
                    {
                      label: "Profile overview",
                      children: [
                        { label: "Name" },
                        { label: "Address" },
                        { label: "Rating" },
                        { label: "Member since" },
                      ],
                    },
                    { label: "Edit profile (CTA)" },
                    { label: "Share profile" },
                    { label: "Settings" },
                    { label: "Profile insights" },
                    { label: "Listed products" },
                  ],
                },
              ],
            },
            {
              type: "text",
              title: "Navigation",
              content: "Finally, we charted the paths users take as they move through the app.",
            },
            {
              type: "flow",
              entry: {
                start: "Open app",
                decision: "Has an account?",
                no: ["Sign up", "Email confirmation"],
                yes: ["Log in"],
                end: "Welcome screen",
              },
              tabs: [
                {
                  label: "Home",
                  actions: [
                    { label: "Search items by text or photo" },
                    { label: "Choose search location" },
                    { label: "View favorite products", screen: "Favorites" },
                    { label: "View notification history", screen: "Notifications" },
                    { label: "View catalog recommendations" },
                    { label: "View item categories" },
                    { label: "View cart", screen: "Cart" },
                    { label: "View chat history", screen: "Chat" },
                  ],
                },
                {
                  label: "Activity",
                  actions: [
                    { label: "View messages" },
                    { label: "Track activity by status" },
                    { label: "View notifications" },
                  ],
                },
                {
                  label: "Sell",
                  actions: [
                    { label: "Upload or photograph an item" },
                    { label: "Choose item category" },
                    { label: "Edit or replace item photos" },
                    { label: "Add item details" },
                    { label: "Choose delivery preference" },
                    { label: "Choose the seller’s campus location" },
                    { label: "Preview the item listing" },
                  ],
                },
                {
                  label: "Notifications",
                  actions: [{ label: "View all notifications" }],
                },
                {
                  label: "Profile",
                  actions: [{ label: "View item catalog" }, { label: "Edit profile details" }],
                },
              ],
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
                  text: "Chosen after gathering opinions from several people, including potential users.",
                  // Copy of "final logo.png" with uneven transparent margins trimmed,
                  // so it sits centered in its frame
                  src: "/portfolio/Temu.in/logo-making/final-logo.png",
                  alt: "Final Temu.in logo: the wordmark inside a magnifying glass",
                },
              ],
            },
            {
              type: "spotlight",
              title: "What the final logo means",
              src: "/portfolio/Temu.in/logo-making/final-logo.png",
              alt: "Final Temu.in logo",
              points: [
                "A chat bubble, because buyers and sellers talk directly to agree on a deal",
                "A magnifying glass, since the app is about finding the right item and the right person",
                "A smile, which reflects the satisfaction of a good deal on both sides",
                "A container that holds second-hand goods, so each item gets a second life",
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

// Display order of case studies, matching the home page. Projects not listed
// here (e.g. UI projects) keep their order in the array above.
const CASE_STUDY_ORDER = ["temuin", "titipin", "ciputra"];

// The other projects of the same kind, starting with the one after `current`
// and wrapping around, so the first card is always the natural "next" one
export function otherProjects(current: Project, limit = 2) {
  const sameKind = projects.filter((p) => p.kind === current.kind);
  const rank = (p: Project) => {
    const i = CASE_STUDY_ORDER.indexOf(p.slug);
    return i === -1 ? CASE_STUDY_ORDER.length + sameKind.indexOf(p) : i;
  };
  const ordered = [...sameKind].sort((a, b) => rank(a) - rank(b));
  const start = ordered.findIndex((p) => p.slug === current.slug);
  return [...ordered.slice(start + 1), ...ordered.slice(0, start)].slice(0, limit);
}
