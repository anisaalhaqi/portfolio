import styles from "./page.module.css";
import CaseStudyCard from "@/components/CaseStudyCard/CaseStudyCard";
import Footer from "@/components/Footer/Footer";

const caseStudies = [
  {
    tag: "1st Winner",
    title: "Web Redesign Ciputra Online University",
    description:
      "Universitas Ciputra Online’s platform is the primary gateway for prospective students. However, the original site suffered from a cluttered information hierarchy and a complex enrollment flow that led to high user drop-off rates.",
    bgColor: "#FFE5D4",
    imageSrc: "/portfolio/icons/redesign-uc.png",
    link: "/case-study/ciputra",
    reverse: false,
  },
  {
    tag: "1st Runner Up",
    title: "Titipin",
    description:
      'A mobile platform designed to streamline campus dining by integrating real-time canteen status, menu management, and a gamified "Spin Wheel" to eliminate decision fatigue. It facilitates a secure peer-to-peer delivery ecosystem within the ITB Ganesha community.',
    bgColor: "#D7FFE9",
    imageSrc: "/portfolio/icons/titipin.png",
    link: "/case-study/titipin",
    reverse: true,
  },
  {
    tag: "Submitted",
    title: "Temu.in",
    description:
      "An SSO ITB-verified marketplace that leverages AI Auto-Listing and Price Suggestion to simplify the reselling of second-hand academic goods. The platform strategically aligns with SDG 12 to promote responsible consumption and reduce user skepticism.",
    bgColor: "#C5FFF7",
    imageSrc: "/portfolio/icons/temuin.png",
    link: "/case-study/temuin",
    reverse: false,
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroTitles}>
            <h1 className={styles.name}>Hi, I'm Anisaa!</h1>
            <p className={styles.role}>
              UI/UX Designer & Researcher based in Bandung
            </p>
          </div>
          <p className={styles.statement}>
            I bridge the gap between complex system logic and human-centered
            design through data-driven research and strategic analysis.
          </p>
          <a
            href="https://docs.google.com/document/d/1J8dM-wM57rX83Nr7v8cixy-GKkJYClgmzU_zProBTdc/edit?usp=sharing"
            className={styles.resumeButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Resume
          </a>
        </div>
      </section>

      <section className={styles.caseStudies}>
        <h2 className={styles.sectionTitle}>Case Studies</h2>
        <div className={styles.cardList}>
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} {...study} />
          ))}
        </div>
      </section>

      <Footer variant="blue" />
    </main>
  );
}
