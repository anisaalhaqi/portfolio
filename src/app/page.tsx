import Link from "next/link";
import styles from "./page.module.css";
import CaseStudyCard from "@/components/CaseStudyCard/CaseStudyCard";
import UIProjectCard from "@/components/UIProjectCard/UIProjectCard";
import OtherWorkList from "@/components/OtherWorkList/OtherWorkList";
import ContactCard from "@/components/ContactCard/ContactCard";
import Footer from "@/components/Footer/Footer";
import { projectHref, projects } from "@/data/projects";
import { otherWork } from "@/data/otherWork";

const uiProjects = projects.filter((project) => project.kind === "ui");

// Proof points shown under the hero, each linking to its case study
const achievements = [
  { label: "1st Winner", project: "UC Online Redesign", href: "/case-study/ciputra" },
  { label: "1st Runner Up", project: "Titipin", href: "/case-study/titipin" },
  { label: "Gemastik 2026", project: "Temu.in", href: "/case-study/temuin" },
];

const caseStudies = [
  {
    tag: "Gemastik 2026",
    title: "Temu.in",
    description:
      "An AI-powered marketplace designed to simplify the reselling of second-hand academic goods by integrating AI Auto-Listing, Price Suggestion, and SSO ITB verification to reduce user skepticism. It promotes responsible consumption within the ITB community, in line with SDG 12.",
    bgColor: "#C5FFF7",
    imageSrc: "/portfolio/icons/temuin.png",
    link: "/case-study/temuin",
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
    tag: "1st Winner",
    title: "Web Redesign Ciputra Online University",
    description:
      "A website redesign aimed at simplifying the path to enrollment by restructuring a cluttered information hierarchy and streamlining a complex enrollment flow to reduce user drop-off. It reshapes the primary digital gateway for prospective students of Universitas Ciputra Online.",
    bgColor: "#FFE5D4",
    imageSrc: "/portfolio/icons/redesign-uc.png",
    link: "/case-study/ciputra",
    reverse: false,
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            Anisa Aulia · UI/UX Designer &amp; Researcher, Bandung
          </p>
          <h1 className={styles.headline}>
            I bridge the gap between complex system logic and{" "}
            <span className={styles.highlight}>human-centered design</span>{" "}
            through data-driven research and strategic analysis
          </h1>
          <div className={styles.actions}>
            <a href="#case-studies" className={styles.primaryButton}>
              View Work
            </a>
            <a
              href="https://docs.google.com/document/d/1J8dM-wM57rX83Nr7v8cixy-GKkJYClgmzU_zProBTdc/edit?usp=sharing"
              className={styles.secondaryLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Resume</span>
              <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
            </a>
          </div>
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

      <section id="case-studies" className={styles.caseStudies}>
        <h2 className={styles.sectionTitle}>Case Studies</h2>
        <div className={styles.cardList}>
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} {...study} />
          ))}
        </div>
      </section>

      {uiProjects.length > 0 && (
        <section id="ui-design" className={styles.caseStudies}>
          <h2 className={styles.sectionTitle}>UI Design</h2>
          <div className={styles.uiGrid}>
            {uiProjects.map((project) => (
              <UIProjectCard
                key={project.slug}
                tag={project.tag}
                title={project.title}
                summary={typeof project.summary === "string" ? project.summary : ""}
                imageSrc={project.imageSrc}
                link={projectHref(project)}
              />
            ))}
          </div>
        </section>
      )}

      {otherWork.length > 0 && (
        <section id="other-work" className={styles.caseStudies}>
          <h2 className={styles.sectionTitle}>Research &amp; Other Work</h2>
          <OtherWorkList items={otherWork} />
        </section>
      )}

      <div className={styles.contactWrap}>
        <ContactCard />
      </div>

      <Footer variant="blue" />
    </main>
  );
}
