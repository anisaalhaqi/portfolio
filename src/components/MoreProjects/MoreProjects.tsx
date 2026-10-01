import Link from "next/link";
import { otherProjects, projectHref, type Project } from "@/data/projects";
import styles from "./MoreProjects.module.css";

const HEADINGS = {
  "case-study": { title: "More case studies", allHref: "/#case-studies" },
  ui: { title: "More UI design", allHref: "/#ui-design" },
} as const;

// Quick access to the other projects of the same kind, shown at the end of a
// project page; the first card is the next one in home-page order
const MoreProjects = ({ current }: { current: Project }) => {
  const others = otherProjects(current);
  if (others.length === 0) return null;
  const heading = HEADINGS[current.kind];

  return (
    <section className={styles.more}>
      <div className={styles.header}>
        <h2 className={styles.title}>{heading.title}</h2>
        <Link href={heading.allHref} className={styles.allLink}>
          <span>All work</span>
          <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.allArrow} />
        </Link>
      </div>

      <ul className={styles.grid}>
        {others.map((project) => (
          <li key={project.slug}>
            <Link href={projectHref(project)} className={styles.card}>
              <div className={styles.cover}>
                {project.imageSrc ? (
                  <img src={project.imageSrc} alt="" className={styles.image} />
                ) : (
                  <span className={styles.placeholder}>Cover coming soon</span>
                )}
              </div>
              <div className={styles.content}>
                <span className={styles.tag}>{project.tag}</span>
                <span className={styles.cardTitle}>
                  {project.title}
                  <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrow} />
                </span>
                {typeof project.summary === "string" && (
                  <span className={styles.summary}>{project.summary}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MoreProjects;
