import Link from "next/link";
import styles from "./page.module.css";
import Footer from "@/components/Footer/Footer";
import ContactCard from "@/components/ContactCard/ContactCard";

const RESUME_URL =
  "https://docs.google.com/document/d/1J8dM-wM57rX83Nr7v8cixy-GKkJYClgmzU_zProBTdc/edit?usp=sharing";

const achievements = [
  { label: "1st Winner", project: "UC Online Redesign", href: "/case-study/ciputra" },
  { label: "1st Runner Up", project: "Titipin", href: "/case-study/titipin" },
  { label: "Gemastik 2026", project: "Temu.in", href: "/case-study/temuin" },
];

// Role, org, and period only; the full details live in the resume
const experience = [
  {
    group: "Work",
    items: [
      {
        role: "UI/UX Designer",
        org: "Kabinet KM ITB",
        period: "Jul 2026 – Present",
      },
      {
        role: "Product Designer",
        org: "Inkubator IT HMIF ITB",
        period: "Jun 2026 – Present",
      },
      {
        role: "UI/UX Design Curriculum Associate",
        org: "Google Developer Groups on Campus ITB",
        period: "May 2026 – Present",
      },
      {
        role: "UI/UX Designer",
        org: "P3RI Salman ITB",
        period: "Jan – Feb 2026",
      },
    ],
  },
  {
    group: "Leadership",
    items: [
      {
        role: "Vice Head of UXVidia Division",
        org: "Arkavidia 11.0",
        period: "May 2026 – Present",
      },
    ],
  },
];

const awards = [
  {
    place: "1st Place",
    title: "Web Redesign Competition",
    by: "Universitas Ciputra",
    project: "Universitas Ciputra Online Web Redesign",
    href: "/case-study/ciputra",
  },
  {
    place: "2nd Place",
    title: "UI/UX Design Competition",
    by: "HMIF Universitas Majalengka",
    project: "Titipin",
    href: "/case-study/titipin",
  },
];

const skillGroups = [
  {
    title: "Research Methods",
    items: [
      "Mixed-Methods Research",
      "User Interviews",
      "Survey Design",
      "Usability Testing",
      "Heuristic Evaluation",
      "Cognitive Task Analysis",
      "Competitive Benchmarking",
      "SUS & SEQ Scoring",
    ],
  },
  {
    title: "Synthesis & Strategy",
    items: [
      "Affinity Map",
      "Empathy Map",
      "User Persona",
      "User Journey Map",
      "Problem–Feature Mapping",
      "Information Architecture",
      "User Flow",
    ],
  },
  {
    title: "UI Design",
    items: [
      "Wireframing",
      "High-Fidelity Prototyping",
      "Design Systems",
      "Micro-interactions",
      "Logo Design",
    ],
  },
  {
    title: "Tools",
    items: ["Figma", "FigJam", "Google Meet", "Google Form"],
  },
  {
    title: "Languages",
    items: ["Indonesian (Native)", "English (Professional Working Proficiency)"],
  },
];

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.hero}>
          <img
            src="/portfolio/icons/profile-picture.png"
            alt="Anisa Aulia"
            className={styles.profileImage}
          />
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>About</p>
            <h1 className={styles.headline}>
              UI/UX Designer &amp; Researcher with a background in Information
              Systems and Technology
            </h1>
            <p className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              Open to UI/UX internships and freelance projects
            </p>
            <ul className={styles.achievements} aria-label="Achievements">
              {achievements.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={styles.chip}>
                    <span className={styles.chipLabel}>{item.label}</span>
                    <span>{item.project}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Bio</h2>
          <div className={styles.sectionBody}>
            <div className={styles.prose}>
              <p>
                I’ve always been naturally curious about how things work and why
                people behave the way they do. For a long time, I found myself
                mentally fixing confusing experiences before I even knew what UX
                design was.
              </p>
              <p>
                Studying Information Systems and Technology at ITB gave that
                curiosity a purpose. I found my sweet spot in UX—a field where
                technical logic meets human empathy. I’ve since dedicated myself
                to mastering the full design cycle, from deep-dive user interviews
                and usability testing to building high-fidelity prototypes in
                Figma.
              </p>
              <p>
                What drives me most is the research. I genuinely enjoy untangling
                messy problems, talking to the people who face them, and
                discovering the patterns that lead to meaningful, data-driven
                solutions.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.sectionBody}>
            {experience.map((group) => (
              <div key={group.group} className={styles.group}>
                <h3 className={styles.groupTitle}>{group.group}</h3>
                <ul className={styles.timeline}>
                  {group.items.map((item) => (
                    <li key={`${item.role}-${item.org}`} className={styles.timelineItem}>
                      <span className={styles.period}>{item.period}</span>
                      <div className={styles.entry}>
                        <p className={styles.role}>{item.role}</p>
                        <p className={styles.org}>{item.org}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <a
              href={RESUME_URL}
              className={styles.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Full details in my resume</span>
              <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
            </a>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Awards</h2>
          <div className={styles.sectionBody}>
            <ul className={styles.timeline}>
              {awards.map((award) => (
                <li key={award.title} className={styles.timelineItem}>
                  <span className={styles.period}>{award.place}</span>
                  <div className={styles.entry}>
                    <p className={styles.role}>{award.title}</p>
                    <p className={styles.org}>by {award.by}</p>
                    <Link href={award.href} className={styles.entryLink}>
                      {award.project}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.sectionBody}>
            {skillGroups.map((group) => (
              <div key={group.title} className={styles.group}>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <ul className={styles.pills}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.pill}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.sectionBody}>
            <ul className={styles.timeline}>
              <li className={styles.timelineItem}>
                <span className={styles.period}>2024 – 2028</span>
                <div className={styles.entry}>
                  <p className={styles.role}>B.E. in Information Systems and Technology</p>
                  <p className={styles.org}>Institut Teknologi Bandung · GPA 3.95/4.00</p>
                </div>
              </li>
              <li className={styles.timelineItem}>
                <span className={styles.period}>Jun – Jul 2026</span>
                <div className={styles.entry}>
                  <p className={styles.role}>ASEAN Summer Programme: Venturing Into Entrepreneurship</p>
                  <p className={styles.org}>Nanyang Technological University, Singapore</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <ContactCard />
      </div>

      <Footer variant="black" />
    </main>
  );
}
