import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { caseStudies, getCaseStudy, PHASE_ORDER } from "../data";
import styles from "./page.module.css";

// Static export: only the slugs listed in data.tsx exist
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return { title: study ? `${study.title} | Anisa Aulia` : "Case Study" };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const phasesWithContent = new Set(study.methodology?.phases.map((p) => p.name));

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.backArrow} />
          <span>All case studies</span>
        </Link>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.tag}>{study.tag}</span>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.summary}>{study.summary}</p>
            {study.prototypeUrl && (
              <a
                href={study.prototypeUrl}
                className={styles.prototypeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View Prototype</span>
                <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
              </a>
            )}
          </div>
          <img src={study.imageSrc} alt={study.title} className={styles.heroImage} />
        </section>

        {study.glance && (
          <ul className={styles.glance} aria-label="At a glance">
            <li className={`${styles.glass} ${styles.glanceItem}`}>
              <span className={styles.eyebrow}>Problem</span>
              <p>{study.glance.problem}</p>
            </li>
            <li className={`${styles.glass} ${styles.glanceItem}`}>
              <span className={styles.eyebrow}>Solution</span>
              <p>{study.glance.solution}</p>
            </li>
            <li className={`${styles.glass} ${styles.glanceItem}`}>
              <span className={styles.eyebrow}>Result</span>
              <span className={styles.glanceStat}>{study.glance.result.stat}</span>
              <p>{study.glance.result.label}</p>
            </li>
          </ul>
        )}

        {study.meta && (
          <dl className={`${styles.glass} ${styles.meta}`}>
            <div className={styles.metaItem}>
              <dt>My Role</dt>
              <dd>{study.meta.role}</dd>
              <dd className={styles.metaNote}>Team of {study.meta.team}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Tools</dt>
              <dd>{study.meta.tools}</dd>
            </div>
            <div className={styles.metaItem}>
              <dt>Timeframe</dt>
              <dd>{study.meta.timeframe}</dd>
            </div>
          </dl>
        )}

        {(study.problemStatement || study.problem) && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Problem</h2>
            <div className={styles.sectionBody}>
              {study.problemStatement && (
                <p className={styles.lead}>{study.problemStatement}</p>
              )}
              {study.problemHighlights && (
                <ul className={styles.highlights}>
                  {study.problemHighlights.map((item) => (
                    <li key={item.stat} className={`${styles.glass} ${styles.highlight}`}>
                      <span className={styles.highlightStat}>{item.stat}</span>
                      <span className={styles.highlightLabel}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              {study.problem && (
                <div className={styles.prose}>
                  {study.problem.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {study.methodology && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Design Methodology</h2>
            <div className={styles.sectionBody}>
              <div className={styles.prose}>
                <p>{study.methodology.intro}</p>
              </div>

              <ol className={`${styles.glass} ${styles.steps}`}>
                {PHASE_ORDER.map((name, i) => {
                  const ready = phasesWithContent.has(name);
                  const content = (
                    <>
                      <span className={styles.stepIndex}>{i + 1}</span>
                      <span className={styles.stepName}>{name}</span>
                    </>
                  );
                  return (
                    <li key={name} className={ready ? styles.stepReady : styles.stepPending}>
                      {ready ? (
                        <a href={`#${name.toLowerCase()}`} className={styles.stepLink}>
                          {content}
                        </a>
                      ) : (
                        <span className={styles.stepLink}>{content}</span>
                      )}
                    </li>
                  );
                })}
              </ol>

              {study.methodology.phases.map((phase) => (
                <div key={phase.name} id={phase.name.toLowerCase()} className={styles.phase}>
                  <div className={styles.phaseHeader}>
                    <span className={styles.phaseEyebrow}>
                      Phase {PHASE_ORDER.indexOf(phase.name) + 1}
                    </span>
                    <h3 className={styles.phaseTitle}>{phase.name}</h3>
                  </div>
                  {phase.intro && (
                    <div className={styles.prose}>
                      <p>{phase.intro}</p>
                    </div>
                  )}
                  {phase.findings && (
                    <ul className={styles.findings}>
                      {phase.findings.map((finding) => (
                        <li key={finding.stat} className={`${styles.glass} ${styles.finding}`}>
                          <span className={styles.findingStat}>{finding.stat}</span>
                          <p>{finding.text}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {!study.problemStatement && !study.problem && !study.methodology && (
          <div className={`${styles.glass} ${styles.comingSoon}`}>
            <p className={styles.comingSoonTitle}>Full case study coming soon</p>
            <p>I&rsquo;m still writing up the research and design process for this project.</p>
          </div>
        )}
      </div>

      <Footer variant="blue" />
    </main>
  );
}
