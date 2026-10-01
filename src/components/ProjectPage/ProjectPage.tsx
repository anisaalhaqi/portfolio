import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { PHASE_ORDER, type Block, type Project } from "@/data/projects";
import PhaseStepper from "./PhaseStepper";
import styles from "./ProjectPage.module.css";

const BACK_LINK = {
  "case-study": { href: "/#case-studies", label: "All case studies" },
  ui: { href: "/#ui-design", label: "All UI design" },
} as const;

// Shared layout for case studies and UI projects; sections render only when
// the project has data for them
export default function ProjectPage({ project: study }: { project: Project }) {
  const phasesWithContent = new Set(study.methodology?.phases.map((p) => p.name));
  const back = BACK_LINK[study.kind];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href={back.href} className={styles.backLink}>
          <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.backArrow} />
          <span>{back.label}</span>
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
          {study.imageSrc ? (
            <img src={study.imageSrc} alt={study.title} className={styles.heroImage} />
          ) : (
            <div className={`${styles.heroImage} ${styles.figurePlaceholder}`}>
              Cover image coming soon
            </div>
          )}
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
            {/* Desktop: title and a vertical phase nav share the sticky left column */}
            <div className={styles.sectionAside}>
              <h2 className={styles.sectionTitle}>Design Methodology</h2>
              <PhaseStepper
                phases={PHASE_ORDER.map((name) => ({
                  name,
                  ready: phasesWithContent.has(name),
                }))}
              />
            </div>
            <div className={styles.sectionBody}>
              <div className={styles.prose}>
                <p>{study.methodology.intro}</p>
              </div>

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

        {study.sections?.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.sectionBody}>
              {section.blocks.map((block, i) => (
                <PhaseBlock key={i} block={block} />
              ))}
            </div>
          </section>
        ))}

        {!study.problemStatement && !study.problem && !study.methodology && !study.sections && (
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
      // A titled text block opens a new sub-part of the phase
      return (
        <div className={block.title ? `${styles.block} ${styles.subsection}` : undefined}>
          <BlockTitle title={block.title} />
          <div className={styles.prose}>
            <p>{block.content}</p>
          </div>
        </div>
      );

    case "columns":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={styles.cards}>
            {block.items.map((item) => (
              <div key={item.title} className={styles.card}>
                <p className={styles.cardTitle}>{item.title}</p>
                <ul className={styles.bullets}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );

    case "empathy":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          {block.items.map((map) => (
            <div key={map.label} className={styles.empathy}>
              <span className={styles.mapLabel}>{map.label}</span>
              <div className={styles.empathyGrid}>
                {(
                  [
                    ["Says", map.says],
                    ["Thinks", map.thinks],
                    ["Does", map.does],
                    ["Feels", map.feels],
                  ] as const
                ).map(([quadrant, points]) => (
                  <div key={quadrant} className={styles.quadrant}>
                    <span className={styles.eyebrow}>{quadrant}</span>
                    <ul className={styles.bullets}>
                      {points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "journey":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          {block.items.map((journey) => (
            <div key={journey.label} className={styles.journey}>
              <span className={styles.mapLabel}>{journey.label}</span>
              {/* Scrolls sideways on narrow screens instead of squeezing the columns */}
              <div className={styles.journeyScroll}>
                <table className={styles.journeyTable}>
                  <thead>
                    <tr>
                      <th scope="col">
                        <span className={styles.visuallyHidden}>Row</span>
                      </th>
                      {journey.stages.map((s) => (
                        <th key={s.stage} scope="col">
                          {s.stage}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Actions</th>
                      {journey.stages.map((s) => (
                        <td key={s.stage}>{s.action}</td>
                      ))}
                    </tr>
                    <tr className={styles.feelingRow}>
                      <th scope="row">Feeling</th>
                      {journey.stages.map((s) => (
                        <td key={s.stage}>{s.feeling}</td>
                      ))}
                    </tr>
                    <tr>
                      <th scope="row">Pain points</th>
                      {journey.stages.map((s) => (
                        <td key={s.stage}>{s.pain}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      );

    case "personas":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          {block.items.map((persona) => (
            <article key={persona.name} className={`${styles.glass} ${styles.persona}`}>
              <div className={styles.personaProfile}>
                <div className={styles.avatar} aria-hidden="true">
                  {persona.name[0]}
                </div>
                <span className={styles.mapLabel}>{persona.role}</span>
                <p className={styles.personaName}>
                  {persona.name}, {persona.age}
                </p>
                <p className={styles.personaProgram}>{persona.program}</p>
                <p className={styles.personaTrait}>{persona.trait}</p>
              </div>
              <div className={styles.personaDetails}>
                <p className={styles.personaBio}>{persona.bio}</p>
                <div className={styles.personaLists}>
                  <div>
                    <span className={styles.eyebrow}>Frustrations</span>
                    <ul className={styles.bullets}>
                      {persona.frustrations.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className={styles.eyebrow}>Goals &amp; needs</span>
                    <ul className={styles.bullets}>
                      {persona.goals.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      );

    case "findings":
      return (
        <ul className={styles.findings}>
          {block.items.map((item) => (
            <li key={item.stat} className={styles.finding}>
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
              <figure key={item.name} className={styles.quote}>
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
              <li key={item.title} className={styles.card}>
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
              <li key={i} className={styles.numberedItem}>
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
          <div className={styles.mapping}>
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

    case "process":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <ol className={styles.process}>
            {block.items.map((step, i) => (
              <li key={step.label} className={styles.processStep}>
                <div className={styles.processImage}>
                  <img src={step.src} alt={step.alt} />
                </div>
                <span className={styles.eyebrow}>
                  {i + 1}. {step.label}
                </span>
                <p className={styles.processText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "spotlight":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={styles.spotlight}>
            <div className={styles.spotlightImage}>
              <img src={block.src} alt={block.alt} />
            </div>
            <ul className={`${styles.bullets} ${styles.spotlightPoints}`}>
              {block.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "benchmark":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <ul className={styles.benchmark}>
            {block.items.map((group) => (
              <li key={group.category} className={styles.benchmarkGroup}>
                <span className={styles.eyebrow}>{group.category}</span>
                <p className={styles.benchmarkReason}>{group.reason}</p>
                <ul className={styles.logos}>
                  {group.logos.map((logo) => (
                    <li key={logo.name} className={styles.logo}>
                      <span className={styles.logoTile}>
                        <img src={logo.src} alt="" className={styles.logoImg} />
                      </span>
                      <span className={styles.logoName}>{logo.name}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );

    case "images": {
      const stack = block.layout === "stack";
      const layoutClass = stack
        ? styles.imageStack
        : block.items.length > 1
          ? styles.imageGrid
          : undefined;
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={layoutClass}>
            {block.items.map((item) => (
              <figure key={item.caption} className={styles.figure}>
                {item.src ? (
                  <img src={item.src} alt={item.caption} className={styles.figureImage} />
                ) : (
                  <div
                    className={`${styles.figurePlaceholder} ${stack ? styles.figurePlaceholderWide : ""}`}
                  >
                    Image coming soon
                  </div>
                )}
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
    }
  }
}
