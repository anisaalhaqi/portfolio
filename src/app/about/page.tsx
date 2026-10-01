import Link from "next/link";
import styles from "./page.module.css";
import Footer from "@/components/Footer/Footer";

const RESUME_URL =
  "https://docs.google.com/document/d/1J8dM-wM57rX83Nr7v8cixy-GKkJYClgmzU_zProBTdc/edit?usp=sharing";
const LINKEDIN_URL = "https://www.linkedin.com/in/anisa-aulia-alhaqi-39b119388/";
const EMAIL = "anisaalhaqi@gmail.com";

const achievements = [
  { label: "1st Winner", project: "UC Online Redesign", href: "/case-study/ciputra" },
  { label: "1st Runner Up", project: "Titipin", href: "/case-study/titipin" },
  { label: "Gemastik 2026", project: "Temu.in", href: "/case-study/temuin" },
];

const skillGroups = [
  {
    title: "UI Design",
    items: [
      "Wireframing",
      "High-Fidelity Prototyping",
      "Logo",
      "Micro-interactions",
      "Design System",
    ],
  },
  {
    title: "UX Research",
    items: [
      "User Interviews",
      "Survey Design",
      "Usability Testing",
      "SUS & SEQ Scoring",
      "Heuristic Evaluation",
      "Affinity Map",
      "User Persona",
      "User Journey Map",
      "User Flow",
      "Features Benchmark & UI Design",
      "Problem Feature Mapping",
    ],
  },
  {
    title: "Tools",
    items: ["Figma", "FigJam", "Google Meet", "Google Form"],
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
              System and Technology
            </h1>
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
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.sectionBody}>
            {skillGroups.map((group) => (
              <div key={group.title} className={styles.skillGroup}>
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
            <div className={styles.education}>
              <p className={styles.degree}>Information System and Technology</p>
              <p className={styles.school}>Institut Teknologi Bandung · 2024–2028</p>
            </div>
          </div>
        </section>

        <section className={`${styles.glass} ${styles.contact}`}>
          <h2 className={styles.contactTitle}>Let’s work together</h2>
          <p className={styles.contactText}>
            Have a project or a role in mind? I’d love to hear about it.
          </p>
          <div className={styles.actions}>
            <a href={`mailto:${EMAIL}`} className={styles.primaryButton}>
              Email Me
            </a>
            <a
              href={RESUME_URL}
              className={styles.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Resume</span>
              <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
            </a>
            <a
              href={LINKEDIN_URL}
              className={styles.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
            </a>
          </div>
        </section>
      </div>

      <Footer variant="black" />
    </main>
  );
}
