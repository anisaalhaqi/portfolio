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
  // Column headings default to Problem and Feature; id and role tag a row, e.g. T1 and buyer or seller
  | {
      type: "mapping";
      title?: string;
      labels?: [string, string];
      items: { id?: string; problem: string; feature: string; role?: string }[];
    }
  // Functional requirements, each collapsible: the user goal, the tasks to
  // reach it, and how the interaction is designed
  | {
      type: "requirements";
      title?: string;
      items: {
        id: string;
        title: string;
        role: string;
        goal: string;
        tasks: string[];
        interaction: string;
        metaphor?: string;
        pain?: string;
        screens: string[];
        usability?: string[];
        ux?: string[];
      }[];
    }
  // Leave out "before" when there was only one round of testing
  | {
      type: "metrics";
      title?: string;
      items: { label: string; before?: string; after: string; target?: string }[];
    }
  // Short label and value pairs, e.g. the setup of a usability test
  | { type: "facts"; title?: string; items: { label: string; value: string }[] }
  // Task scenarios behind one collapsible row, grouped by user role
  | {
      type: "tasks";
      title: string;
      groups: { label: string; items: { id: string; text: string }[] }[];
    }
  // One collapsible row per change, showing the screen before and after it.
  // The first row starts open. Leave before or after empty to show a placeholder.
  | {
      type: "compare";
      title?: string;
      items: {
        id: string;
        title: string;
        role?: string;
        before?: string;
        after?: string;
        beforeAlt: string;
        afterAlt: string;
      }[];
    }
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
  // Rows of a screenshot beside the decision it shows. Leave src empty to show
  // a placeholder until the image is exported.
  | {
      type: "showcase";
      title?: string;
      items: { title: string; text: string; src?: string; alt: string }[];
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
  // "stack" shows each image full width, for large diagrams; "phones" keeps
  // portrait phone screens small, side by side.
  | {
      type: "images";
      title?: string;
      layout?: "grid" | "stack" | "phones";
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
  // Deployed site; the note says when visitors can't see everything, e.g. a login
  live?: { url: string; note?: string };
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
    tag: "FindIT UGM 2026",
    title: "Temu.in",
    summary:
      "A campus marketplace for ITB students to resell academic gear, with ITB SSO verification, AI auto-listing, and price suggestions. Two rounds of usability testing raised the SUS score from 72.5 to 90.8.",
    imageSrc: "/portfolio/Temu.in/Cover%20Temu.in.webp",
    figmaUrl:
      "https://www.figma.com/proto/VPCpLjxOEDtbpgJ6szwpxV/Temu.in---FindIT?node-id=1646-38350&t=Kbuw14pB2Y5h9k0K-0&scaling=scale-down&content-scaling=fixed&page-id=1646%3A36011&starting-point-node-id=1646%3A38319&show-proto-sidebar=1",
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
              title: "Functional requirements",
              content:
                "We broke the features into functional requirements, each with a user goal, the tasks to reach it, and the interaction type behind its screens.",
            },
            {
              type: "requirements",
              items: [
                {
                  id: "F01",
                  title: "ITB identity verification",
                  role: "Buyer & seller",
                  goal: "Prove they are an ITB student, so outsiders can’t use the app.",
                  tasks: [
                    "Sign up with an ITB account through Microsoft SSO",
                    "Agree to the terms and conditions",
                    "Complete and check the profile",
                  ],
                  interaction: "Instructing",
                  metaphor: "Showing a student ID at the campus gate before going in.",
                  pain: "Microsoft Authenticator sometimes doesn’t send the code, and sign-in fails for users who haven’t changed their email password.",
                  screens: ["Onboarding", "Terms and conditions", "Profile", "Edit profile"],
                  usability: ["Efficient", "Easy to learn", "Safe"],
                  ux: ["Credible", "Reassuring"],
                },
                {
                  id: "F02",
                  title: "AI auto-listing",
                  role: "Seller",
                  goal: "List an unused item without researching prices or typing its condition by hand.",
                  tasks: [
                    "Choose a category and photograph the item",
                    "Check the AI analysis: item name, condition, and suggested price",
                    "Add usage duration and a description",
                    "Choose a pickup method and publish",
                  ],
                  interaction: "Instructing",
                  pain: "Sellers don’t know what price to set, and explaining every defect by hand is a chore.",
                  screens: ["Choose category", "Take photo", "Preview", "Item details", "Pickup method"],
                },
                {
                  id: "F03",
                  title: "Search, filters, and catalog",
                  role: "Buyer",
                  goal: "Find the item they need within their budget, even without knowing its name.",
                  tasks: [
                    "Search by name, or by photo with the camera",
                    "Filter by category and condition",
                    "Sort by price, and choose a campus",
                  ],
                  interaction: "Instructing",
                  metaphor: "Walking store aisles with clear category labels.",
                  pain: "Users know the item by a different name, or don’t know its name at all.",
                  screens: [
                    "Home & categories",
                    "Text search",
                    "Camera search",
                    "Text results",
                    "Camera results",
                    "Filtered by condition",
                    "Filtered by category",
                    "Favorites",
                  ],
                  usability: ["Effective", "Efficient", "Easy to learn"],
                  ux: ["Satisfying", "Engaging"],
                },
                {
                  id: "F04",
                  title: "Price negotiation",
                  role: "Buyer",
                  goal: "Get the item at a fair price through an offer or a bid.",
                  tasks: [
                    "Send a price offer to the seller",
                    "Accept the seller’s counter-offer, or send one back",
                    "Track the status and history of offers until a price is agreed",
                  ],
                  interaction: "Conversing",
                  metaphor: "Haggling at a market stall.",
                  pain: "Slow sellers stall the purchase, and buyers lose interest.",
                  screens: [
                    "Make an offer",
                    "Counter-offer",
                    "Offer details",
                    "Bid history",
                    "Place a bid",
                    "Review bid",
                    "Bid status",
                    "My offers",
                  ],
                  usability: ["Efficient", "Good utility"],
                  ux: ["Engaging"],
                },
                {
                  id: "F05",
                  title: "In-app chat",
                  role: "Buyer",
                  goal: "Confirm the item’s condition before meeting, so there’s no regret after buying.",
                  tasks: [
                    "Open a chat from the product page",
                    "Ask about the item’s condition",
                    "Arrange a meet-up time when the seller delivers",
                  ],
                  interaction: "Conversing",
                  metaphor: "Talking at a stall without swapping phone numbers.",
                  pain: "Unresponsive sellers slow the purchase down.",
                  screens: ["Chat list", "Conversation"],
                  usability: ["Safe"],
                  ux: ["Trustworthy"],
                },
                {
                  id: "F06",
                  title: "Checkout and delivery",
                  role: "Buyer",
                  goal: "Buy the item and agree on a delivery method that suits both sides.",
                  tasks: [
                    "Buy now, or add the item to the cart",
                    "Choose a payment method",
                    "Choose a campus meet-up or courier delivery",
                    "Pay before the timer runs out",
                    "Track the order until the item arrives",
                  ],
                  interaction: "Instructing",
                  metaphor: "A cashier, then a parcel counter.",
                  pain: "Last-minute plans force meet-ups to be rescheduled, and free time is hard to match.",
                  screens: [
                    "Product details",
                    "Cart",
                    "Payment & total",
                    "Delivery & confirmation",
                    "Payment timer",
                    "Payment result",
                    "Order status",
                    "Live tracking",
                  ],
                  usability: ["Efficient", "Safe", "Good utility"],
                  ux: ["Reassuring", "Trust"],
                },
                {
                  id: "F07",
                  title: "Reviews and ratings",
                  role: "Buyer",
                  goal: "Help sellers build a reputation, so other buyers know who to trust.",
                  tasks: [
                    "Review the seller’s behaviour during the transaction",
                    "Rate and review the product",
                  ],
                  interaction: "Instructing",
                  metaphor: "Signing a guestbook after a visit.",
                  pain: "Once the item arrives, buyers tend to forget to leave a review.",
                  screens: ["Ratings & reviews", "Write a review", "Report a review"],
                  usability: ["Efficient", "Easy to remember"],
                  ux: ["Satisfying", "Engaging"],
                },
                {
                  id: "F08",
                  title: "Notifications",
                  role: "Buyer",
                  goal: "Know where every order and offer stands without checking each one.",
                  tasks: [
                    "Get real-time updates on orders and delivery",
                    "Get updates on price offers",
                  ],
                  interaction: "Exploring",
                  metaphor: "An inbox that keeps every receipt.",
                  screens: ["All notifications", "Transaction status", "Offer status"],
                  usability: ["Efficient", "Safe"],
                  ux: ["Reassuring"],
                },
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
                  src: "/portfolio/Temu.in/logo-making/option%201.webp",
                  alt: "First logo option: an eye with eyelashes",
                },
                {
                  label: "Exploring again",
                  text: "To keep it gender-neutral, we went back to sketching wordmarks built from the name itself.",
                  src: "/portfolio/Temu.in/logo-making/brainstorm.webp",
                  alt: "Hand-drawn sketches of Temu.in wordmarks",
                },
                {
                  label: "Final logo",
                  text: "Chosen after gathering opinions from several people, including potential users.",
                  // Copy of "final logo.webp" with uneven transparent margins trimmed,
                  // so it sits centered in its frame
                  src: "/portfolio/Temu.in/logo-making/final-logo.webp",
                  alt: "Final Temu.in logo: the wordmark inside a magnifying glass",
                },
              ],
            },
            {
              type: "spotlight",
              title: "What the final logo means",
              src: "/portfolio/Temu.in/logo-making/final-logo.webp",
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
              title: "Wireframes",
              content:
                "We built wireframes to set the information hierarchy and layout before moving to high-fidelity designs. Shown here are three of the key screens.",
            },
            {
              type: "images",
              layout: "phones",
              items: [
                { caption: "Home", src: "/portfolio/Temu.in/wireframes/Wireframe%20-%20Home.png" },
                { caption: "Product detail", src: "/portfolio/Temu.in/wireframes/Wireframe%20-%20Detail%20Produk.png" },
                { caption: "Activity", src: "/portfolio/Temu.in/wireframes/Wireframe%20-%20Aktivitas.png" },
              ],
            },
            {
              type: "showcase",
              title: "Design principles applied",
              items: [
                {
                  title: "Law of Proximity",
                  text: "Product photo, price, and seller rating sit together in one card with consistent spacing, so they read as a single unit.",
                  src: "/portfolio/Temu.in/design-principles/Law%20of%20Proximity.png",
                  alt: "Product card with the photo, price, and seller rating grouped together",
                },
                {
                  title: "Hick’s Law",
                  text: "The long listing form is split into short, AI-assisted steps, cutting the choices users face at once.",
                  src: "/portfolio/Temu.in/design-principles/Hick's%20Law.png",
                  alt: "Listing form split into short AI-assisted steps",
                },
                {
                  title: "Miller’s Law",
                  text: "Filters show a small set of categories instead of dozens of faculties at once.",
                  src: "/portfolio/Temu.in/design-principles/Miller's%20Law.png",
                  alt: "Filter sheet showing a small set of categories",
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
              type: "facts",
              items: [
                {
                  label: "Method",
                  value: "Moderated think-aloud and interview, online with Figma and Google Meet",
                },
                {
                  label: "Participants",
                  value:
                    "ITB students aged 18 to 23. Test 1: 7 people (3 buyers, 4 sellers). Test 2: 6 people (3 buyers, 3 sellers)",
                },
                { label: "Tasks", value: "13 scenarios: 7 for buyers and 6 for sellers" },
              ],
            },
            {
              type: "metrics",
              items: [
                { label: "SUS score", before: "72.5", after: "90.8", target: "above 78" },
                { label: "SEQ score", before: "6.27", after: "6.61", target: "above 5.5" },
                { label: "Success rate", before: "98.9%", after: "100%", target: "at least 80%" },
              ],
            },
            {
              type: "tasks",
              title: "See the 13 task scenarios",
              groups: [
                {
                  label: "Buyer",
                  items: [
                    { id: "B01", text: "You need a microcontroller but don’t know its exact name. Search the catalog with camera search." },
                    { id: "B02", text: "Add one microcontroller listing to favorites and to the cart. Test 2: favorites only." },
                    { id: "B03", text: "Follow that seller and check their overall rating." },
                    { id: "B04", text: "Search for a lab coat with the search bar, add it to favorites and the cart, then make an offer on it. Test 2: cart only." },
                    { id: "B05", text: "Order both items to ITB Ganesha, with meetup delivery and cash on delivery. Test 2: the lab coat only." },
                    { id: "B06", text: "Go to Favorites, filter items by availability, then search for the lab coat." },
                    { id: "B07", text: "Mark all notifications as read." },
                  ],
                },
                {
                  label: "Seller",
                  items: [
                    { id: "J01", text: "You have a lab coat you no longer use. Upload it and try to sell it." },
                    { id: "J02", text: "Mark the lab coat offer notification as read, then open the buyer’s profile and read their reviews." },
                    { id: "J03", text: "Counter the offer with Rp31,000." },
                    { id: "J04", text: "Give a review to the customer who bought the lab coat." },
                    { id: "J05", text: "Change the lab coat’s status to “Sold”." },
                    { id: "J06", text: "Complete your own profile." },
                  ],
                },
              ],
            },
            {
              type: "mapping",
              title: "Usability test 1: what we changed",
              labels: ["Tester feedback", "What we changed"],
              items: [
                {
                  id: "T1",
                  role: "Buyer & seller",
                  problem: "Counter and Decline were hidden behind “More”, and the offer didn’t show how far it was from the price",
                  feature: "Accept, Decline, and Counter now sit together in one card, with a note on how much lower the offer is",
                },
                {
                  id: "T2",
                  role: "Buyer",
                  problem: "The cart was inside Favorites, but users looked for it on the home page",
                  feature: "A cart icon in the home header. Favorites left the header and now show as a row on the home page",
                },
                {
                  id: "T3",
                  role: "Buyer",
                  problem: "Photos had only small dots to browse them, and “Used for 1 semester” told too little",
                  feature: "Arrows to slide through several photos, and a date range for how long the item has been used",
                },
                {
                  id: "T4",
                  role: "Buyer & seller",
                  problem: "Reviews could only be given through chat, profiles didn’t show when the user was last active, and the “Status” filter was unclear",
                  feature: "A button on the profile to give a review, a “last active” line, and the filter renamed to “Availability”",
                },
                {
                  id: "T5",
                  role: "Seller",
                  problem: "“Sold” was hidden behind the three-dot icon",
                  feature: "The main button on the seller’s product page now changes the status, replacing item performance",
                },
              ],
            },
            {
              type: "compare",
              title: "Usability test 1: before and after",
              items: [
                {
                  id: "T1",
                  title: "Accept, Decline, and Counter in one card",
                  role: "Buyer & seller",
                  before: "/portfolio/Temu.in/testing/T1%20-%20Initial.png",
                  after: "/portfolio/Temu.in/testing/T1%20-%20Update.png",
                  beforeAlt: "Offer card in Activity with only “Lainnya” (More) and “Terima” (Accept) buttons",
                  afterAlt: "Offer card with “Terima” (Accept), “Tawar Balik” (Counter), and “Tolak” (Decline) buttons, and a note that the offer is Rp10,000 below the original price",
                },
                {
                  id: "T2",
                  title: "Cart on the home page",
                  role: "Buyer",
                  before: "/portfolio/Temu.in/testing/T2%20-%20Initial.png",
                  after: "/portfolio/Temu.in/testing/T2%20-%20Update.png",
                  beforeAlt: "Home page with a favorites icon in the header and no cart",
                  afterAlt: "Home page with a cart icon in the header and a row of favorite items",
                },
                {
                  id: "T3",
                  title: "Photo arrows and a usage date range",
                  role: "Buyer",
                  before: "/portfolio/Temu.in/testing/T3%20-%20Initial.png",
                  after: "/portfolio/Temu.in/testing/T3%20-%20Update.png",
                  beforeAlt: "Product page with small photo dots and “Dipakai selama 1 semester” (used for 1 semester)",
                  afterAlt: "Product page with left and right photo arrows and “Pemakaian Sept 2024–Juli 2025” (used Sept 2024 to July 2025)",
                },
                {
                  id: "T4",
                  title: "Review button, last active time, and the Availability filter",
                  role: "Buyer & seller",
                  before: "/portfolio/Temu.in/testing/T4%20-%20Initial.png",
                  after: "/portfolio/Temu.in/testing/T4%20-%20Update.png",
                  beforeAlt: "Buyer profile with a rating, listings, and a “Status” filter, but no way to leave a review",
                  afterAlt: "Buyer profile with “Terakhir aktif 10 jam yang lalu” (last active 10 hours ago), a “Berikan Ulasan” (Give a review) button under the rating, and a “Ketersediaan” (Availability) filter",
                },
                {
                  id: "T5",
                  title: "Status button on the seller’s product page",
                  role: "Seller",
                  before: "/portfolio/Temu.in/testing/T5%20-%20Initial.png",
                  after: "/portfolio/Temu.in/testing/T5%20-%20Update.png",
                  beforeAlt: "Seller’s product page with “Lihat Performa” (View performance) as the main button",
                  afterAlt: "Seller’s product page with “Ubah Status Barang” (Change item status) as the main button",
                },
              ],
            },
            {
              type: "mapping",
              title: "Usability test 2: what we changed",
              labels: ["Tester feedback", "What we changed"],
              items: [
                {
                  id: "U1",
                  role: "Buyer",
                  problem: "Notifications took one tap each to clear",
                  feature: "A “Mark all as read” option on the notifications page",
                },
              ],
            },
            {
              type: "compare",
              title: "Usability test 2: before and after",
              items: [
                {
                  id: "U1",
                  title: "Mark all as read in notifications",
                  role: "Buyer",
                  before: "/portfolio/Temu.in/testing/U1%20-%20Initial.png",
                  after: "/portfolio/Temu.in/testing/U1%20-%20Update.png",
                  beforeAlt: "Notifications page with no option to mark all as read",
                  afterAlt: "Notifications page with “Tandai Baca Semua” (Mark all as read) above the list",
                },
              ],
            },
          ],
        },
      ],
    },
  },
  {
    slug: "km-itb-shortener",
    kind: "ui",
    tag: "KM ITB",
    title: "KM ITB Link Shortener",
    imageSrc: "/portfolio/KM%20ITB/Cover%20KM%20ITB.webp",
    summary:
      "A revamp of KM ITB’s internal link shortener, where each kemenkoan creates short links on the official KM ITB domain and admins manage every account and link.",
    live: {
      url: "https://km.itb.ac.id/s/",
      note: "Internal tool: everything past the login page needs a KM ITB account.",
    },
    meta: {
      role: "UI Design, UX Writing, Design Handoff",
      team: "1 Designer",
      tools: "Figma",
      timeframe: "3 months",
    },
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "text",
            content:
              "Each kemenkoan under the KM ITB cabinet shares one account. After logging in, they paste a long URL, pick an alias, and get a short link for forms, documents, and events. The revamp brings the shortener in line with the KM ITB website and makes it work on desktop and mobile.",
          },
          {
            type: "columns",
            title: "Who uses it",
            items: [
              {
                title: "Kemenkoan account",
                points: [
                  "Creates short links with a custom alias",
                  "Copies, opens, or deletes its own links",
                  "Only sees links made by its own account",
                ],
              },
              {
                title: "Administrator",
                points: [
                  "Sees every account and every link",
                  "Activates, deactivates, or deletes links",
                  "Creates and edits kemenkoan accounts",
                ],
              },
              {
                title: "Link visitor",
                points: [
                  "Opens a short link and lands on the target URL",
                  "Sees an info page if the link is missing or inactive",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Pages & States",
        blocks: [
          {
            type: "metrics",
            items: [
              { label: "Pages", after: "8" },
              { label: "States", after: "41" },
              { label: "Toast notifications", after: "23" },
            ],
          },
          {
            type: "text",
            content:
              "Every error, empty, and loading state in the spec has its own screen, so developers don’t have to guess.",
          },
          {
            type: "tree",
            root: "KM ITB Link Shortener",
            items: [
              {
                label: "Login",
                children: [
                  { label: "Default" },
                  { label: "Password shown" },
                  { label: "Password hidden" },
                  { label: "Empty field" },
                  { label: "Invalid input" },
                  { label: "Inactive account" },
                  { label: "Authentication error pop-up" },
                  { label: "Account problem pop-up" },
                ],
              },
              {
                label: "Shortener",
                children: [
                  { label: "Default" },
                  { label: "Filled" },
                  { label: "Link created and copied" },
                  { label: "Empty field" },
                  { label: "Alias already taken" },
                  { label: "Creation failed pop-up" },
                ],
              },
              {
                label: "History",
                children: [
                  { label: "Default" },
                  { label: "Search filled" },
                  { label: "No search results" },
                  { label: "No links yet" },
                  { label: "Loading" },
                  { label: "Confirm delete" },
                  { label: "Session expired" },
                  { label: "+ 5 toasts" },
                ],
              },
              {
                label: "Profile",
                children: [
                  { label: "Default" },
                  { label: "Photo uploading" },
                  { label: "Confirm log out" },
                  { label: "Session expired" },
                  { label: "Failed to load" },
                  { label: "+ 4 toasts" },
                ],
              },
              {
                label: "Admin",
                children: [
                  {
                    label: "Dashboard",
                    children: [
                      { label: "Default" },
                      { label: "Profile dropdown" },
                      { label: "Kemenkoan filter" },
                      { label: "Filter applied" },
                      { label: "No search results" },
                      { label: "No links yet" },
                      { label: "Confirm delete" },
                      { label: "Confirm deactivate" },
                      { label: "Confirm activate" },
                      { label: "+ 6 toasts" },
                    ],
                  },
                  {
                    label: "Account management",
                    children: [
                      { label: "Default" },
                      { label: "Confirm activate or deactivate" },
                      { label: "Edit account" },
                      { label: "Add account" },
                      { label: "Empty field" },
                      { label: "Unsaved changes" },
                      { label: "+ 8 toasts" },
                    ],
                  },
                ],
              },
              {
                label: "Visitor pages",
                children: [{ label: "Link not found" }, { label: "Link inactive" }],
              },
            ],
          },
        ],
      },
      {
        title: "Design Decisions",
        blocks: [
          {
            type: "showcase",
            items: [
              {
                title: "Preview the short link before creating it",
                text: "Based on TinyURL, the form shows the final link as the user types an alias, so they know what they’ll share before submitting.",
                src: "/portfolio/KM%20ITB/Design%20Decision%201%20-%20KM%20ITB.webp",
                alt: "Shortener form with the short link previewed in pink under the alias field",
              },
              {
                title: "Status as a toggle, with a confirmation",
                text: "A link or account is either active or inactive, so a toggle fits. Every switch asks for confirmation first, in case the admin taps it by accident.",
                src: "/portfolio/KM%20ITB/Design%20Decision%202%20-%20KM%20ITB.webp",
                alt: "Admin table with status toggles and a pop-up asking to confirm deactivating a link",
              },
              {
                title: "Warn before losing unsaved changes",
                text: "Closing the add or edit account modal asks first, and explains that the changes will be lost.",
                src: "/portfolio/KM%20ITB/Design%20Decision%203%20-%20KM%20ITB.webp",
                alt: "Cancel changes pop-up over the edit account modal",
              },
              {
                title: "Initials instead of a personal photo",
                text: "One account belongs to a whole kemenkoan, so the default avatar uses the first letters of the first and last words of the ministry’s name.",
                src: "/portfolio/KM%20ITB/Design%20Decision%204%20-%20KM%20ITB.webp",
                alt: "Profile card with a KK initials avatar for Kementerian Kewirausahaan",
              },
            ],
          },
        ],
      },
      {
        title: "Handoff Notes",
        blocks: [
          {
            type: "text",
            content:
              "I annotated how each kind of feedback behaves, so it stays consistent across pages.",
          },
          {
            type: "cards",
            items: [
              {
                title: "Toasts",
                text: "Bottom right, 24px from the screen edge. A toast closes after 4 seconds or when the user taps the close icon. Users can keep clicking other elements while it’s open.",
              },
              {
                title: "Confirmation pop-ups",
                text: "Centered, used for actions like log out. They close only through the close icon, Cancel, or the confirm button, so an accidental click outside doesn’t change anything.",
              },
              {
                title: "Blocking pop-ups",
                text: "Session expired and failed to load have no close icon on purpose. The user has to log in again or reload to keep using the app, so the only way out is the button.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "kemenwir-merch-store",
    kind: "ui",
    tag: "Inkubator IT ITB",
    title: "Kementerian Kewirausahaan KM ITB Merch Store",
    imageSrc: "/portfolio/Kemenwir/Cover%20Kemenwir.webp",
    summary:
      "An online store for KM ITB merchandise, with checkout through Midtrans, pick-up or delivery, and an admin side for products and orders.",
    meta: {
      role: "UI Design, Design System",
      team: "2 Designers",
      tools: "Figma",
      timeframe: "2 weeks",
    },
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            type: "text",
            content:
              "Kementerian Kewirausahaan KM ITB sells merchandise to students and the public. Buyers browse the catalog, pay through Midtrans, and either get the order shipped or pick it up on campus. Admins manage products and update each order’s status by hand. I designed three of the features, plus the shared design system.",
          },
          {
            type: "columns",
            title: "My scope",
            items: [
              {
                title: "Account",
                points: [
                  "Register as a student or the public",
                  "Log in with email or Google",
                ],
              },
              {
                title: "Catalog",
                points: [
                  "Search, filter, and product detail for buyers",
                  "Product management for admins",
                ],
              },
              {
                title: "Order tracking",
                points: [
                  "Order timeline and pick-up QR code for buyers",
                  "Order list, QR scanning, and status updates for admins",
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Design System",
        blocks: [
          {
            type: "text",
            content:
              "The client had no brand guidelines, only a color palette with red as the primary color. Red usually means error, so I set rules to keep primary actions and dangerous actions apart.",
          },
          {
            type: "cards",
            items: [
              {
                title: "Buttons",
                text: "Red fill for primary, red outline for secondary, and blue fill for CTAs. Each page has only one primary button.",
              },
              {
                title: "Dangerous actions",
                text: "Delete and other destructive actions use a darker red than the primary, so they don’t read as the main action.",
              },
              {
                title: "Status chips",
                text: "Yellow for pre-order, green for ready stock, dark red for sold out, and gray for everything else.",
              },
              {
                title: "Filter chips and dropdowns",
                text: "Filter chips are gray by default and primary red when selected. Dropdown items turn pink on hover.",
              },
            ],
          },
        ],
      },
      {
        title: "Pages & States",
        blocks: [
          {
            type: "tree",
            root: "Kementerian Kewirausahaan KM ITB",
            items: [
              {
                label: "Account",
                children: [
                  { label: "Log in" },
                  {
                    label: "Register",
                    children: [
                      { label: "Select role" },
                      { label: "Personal details" },
                      { label: "Shipping address" },
                      { label: "Summary" },
                      { label: "Terms pop-up" },
                    ],
                  },
                ],
              },
              {
                label: "Catalog",
                children: [
                  { label: "Default" },
                  { label: "Search results" },
                  { label: "No search results" },
                  { label: "Filter panel" },
                  { label: "Filter applied" },
                ],
              },
              {
                label: "Product detail",
                children: [{ label: "Default" }, { label: "Size chart pop-up" }],
              },
              {
                label: "My orders",
                children: [
                  { label: "Order list" },
                  { label: "Delivery timeline" },
                  { label: "Pick-up QR code" },
                  { label: "Cancelled" },
                ],
              },
              {
                label: "Admin",
                children: [
                  {
                    label: "Product management",
                    children: [
                      { label: "Product table" },
                      { label: "No products yet" },
                      { label: "Add product" },
                      { label: "Edit product" },
                      { label: "Confirm delete" },
                    ],
                  },
                  {
                    label: "Order management",
                    children: [
                      { label: "Order table" },
                      { label: "Scan QR" },
                      { label: "Order detail" },
                      { label: "Update status" },
                      { label: "Receipt" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Design Decisions",
        blocks: [
          {
            type: "showcase",
            items: [
              {
                title: "Registration split into steps",
                text: "Registering asks for far more than logging in: role, personal details, and shipping addresses. I split it into steps so the card stays as small as a login card. The address step takes one address, and more can be added on the summary, so no step gets crowded.",
                src: "/portfolio/Kemenwir/Design%20Decision%201%20-%20Kemenwir.webp",
                alt: "Registration card on step 1 of 3, personal details, with Google sign-up above the form",
              },
              {
                title: "Color swatches, from admin form to catalog",
                text: "When adding a product, the admin enters a hex code for each color, or ticks a checkbox if the product has no color variants. Buyers then see a dot of the exact color on every color chip, in the filter and on the product page, instead of guessing from a name like “sage”.",
                src: "/portfolio/Kemenwir/Design%20Decision%202%20-%20Kemenwir.webp",
                alt: "Add product form with a hex code field for each color and a no-color-variants checkbox",
              },
              {
                title: "Filter count on the filter button",
                text: "Based on Shopee. After applying filters, the button shows how many are active, so buyers know the catalog is filtered once the panel closes.",
                src: "/portfolio/Kemenwir/Design%20Decision%203%20-%20Kemenwir.webp",
                alt: "Catalog with the filter button showing three active filters",
              },
              {
                title: "A way out when a QR code fails",
                text: "At pick-up, a successful scan shows the order ID and buyer’s name, with a button to open the order. If the code isn’t recognized, the admin can type the order ID or scan again.",
                src: "/portfolio/Kemenwir/Design%20Decision%204%20-%20Kemenwir.webp",
                alt: "Scan failed pop-up with Scan again and Type order ID buttons",
              },
            ],
          },
        ],
      },
    ],
  },
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
