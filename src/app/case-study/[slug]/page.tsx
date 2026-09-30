import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { caseStudies, getCaseStudy, PHASE_ORDER, type Block } from "../data";
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
            {study.figmaUrl && (
              <a
                href={study.figmaUrl}
                className={styles.prototypeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View in Figma</span>
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

        {study.youtubeId && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Demo</h2>
            <div className={`${styles.glass} ${styles.video}`}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${study.youtubeId}?rel=0`}
                title={`${study.title} demo video`}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
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
                  {phase.blocks.map((block, i) => (
                    <PhaseBlock key={i} block={block} />
                  ))}
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

function BlockTitle({ title }: { title?: string }) {
  return title ? <h4 className={styles.blockTitle}>{title}</h4> : null;
}

function PhaseBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "text":
      return (
        <div className={styles.prose}>
          <p>{block.content}</p>
        </div>
      );

    case "findings":
      return (
        <ul className={styles.findings}>
          {block.items.map((item) => (
            <li key={item.stat} className={`${styles.glass} ${styles.finding}`}>
              <span className={styles.findingStat}>{item.stat}</span>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      );

    case "quotes":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={styles.quotes}>
            {block.items.map((item) => (
              <figure key={item.name} className={`${styles.glass} ${styles.quote}`}>
                <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
                <figcaption>
                  <span className={styles.quoteName}>{item.name}</span>
                  <span className={styles.quoteRole}>{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      );

    case "cards":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <ul className={styles.cards}>
            {block.items.map((item) => (
              <li key={item.title} className={`${styles.glass} ${styles.card}`}>
                <p className={styles.cardTitle}>{item.title}</p>
                <p>{item.text}</p>
                {block.fixLabel && (
                  <div className={styles.cardFix}>
                    <span className={styles.eyebrow}>{block.fixLabel}</span>
                    {item.fix ? (
                      <p>{item.fix}</p>
                    ) : (
                      <p className={styles.placeholderText}>Details coming soon</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      );

    case "statement":
      return (
        <div className={`${styles.glass} ${styles.statement}`}>
          <span className={styles.eyebrow}>{block.label}</span>
          <p>{block.text}</p>
        </div>
      );

    case "list":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <ol className={styles.numbered}>
            {block.items.map((item, i) => (
              <li key={i} className={`${styles.glass} ${styles.numberedItem}`}>
                <span className={styles.numberedIndex}>{i + 1}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "mapping":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={`${styles.glass} ${styles.mapping}`}>
            <div className={styles.mappingHead} aria-hidden="true">
              <span>Problem</span>
              <span />
              <span>Feature</span>
            </div>
            <ul>
              {block.items.map((item) => (
                <li key={item.problem} className={styles.mappingRow}>
                  <span className={styles.mappingProblem}>{item.problem}</span>
                  <img src="/portfolio/icons/arrow-right-blue.png" alt="leads to" className={styles.mappingArrow} />
                  <span className={styles.mappingFeature}>{item.feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "metrics":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <ul className={styles.metrics}>
            {block.items.map((item) => (
              <li key={item.label} className={`${styles.glass} ${styles.metric}`}>
                <span className={styles.eyebrow}>{item.label}</span>
                <span className={styles.metricAfter}>{item.after}</span>
                <span className={styles.metricBefore}>from {item.before} in iteration 1</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "images":
      return (
        <div className={block.items.length > 1 ? styles.imageGrid : undefined}>
          {block.items.map((item) => (
            <figure key={item.caption} className={styles.figure}>
              {item.src ? (
                <img src={item.src} alt={item.caption} className={styles.figureImage} />
              ) : (
                <div className={styles.figurePlaceholder}>Image coming soon</div>
              )}
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      );
  }
}
