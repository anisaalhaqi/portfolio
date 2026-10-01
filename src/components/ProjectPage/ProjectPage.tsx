import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import { PHASE_ORDER, type Block, type Project, type TreeNode } from "@/data/projects";
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

type FlowEntry = Extract<Block, { type: "flow" }>["entry"];

// Sign-in flowchart: start, decision, Yes/No branches that rejoin at the end
// screen. Drawn in SVG so arrows and the diamond are exact; a vertical variant
// replaces the wide one on phones so the text stays readable.
function EntryFlow({ entry }: { entry: FlowEntry }) {
  const [signUp, confirm] = entry.no;
  const [logIn] = entry.yes;
  const [decisionA, ...decisionRest] = entry.decision.split(" ");
  const decisionB = decisionRest.join(" ");
  const label = `Sign-in flow: ${entry.start}, then ${entry.decision} If yes, ${logIn}. If no, ${entry.no.join(", then ")}. Both lead to ${entry.end}.`;

  return (
    <>
      <svg className={`${styles.entrySvg} ${styles.entryWide}`} viewBox="70 0 660 284" role="img" aria-label={label}>
        {/* Start, decision and end sit on the center line x=400, so the stem
            into the tab columns below drops straight from the end screen */}
        <FlowDefs id="flow-arrow-wide" />
        <FlowNode kind="action" x={330} y={8} w={140} h={36} text={entry.start} />
        <FlowLine m="flow-arrow-wide" d="M400 44 V70" />
        <polygon className={styles.svgDecision} points="400,72 460,128 400,184 340,128" />
        <text className={styles.svgDecisionText} x="400" y="124">{decisionA}</text>
        <text className={styles.svgDecisionText} x="400" y="140">{decisionB}</text>

        <FlowLine m="flow-arrow-wide" d="M340 128 H304" />
        <text className={styles.svgBranch} x="322" y="118">Yes</text>
        <FlowNode kind="screen" x={182} y={110} w={120} h={36} text={logIn} />

        <FlowLine m="flow-arrow-wide" d="M460 128 H500" />
        <text className={styles.svgBranch} x="480" y="118">No</text>
        <FlowNode kind="screen" x={502} y={110} w={100} h={36} text={signUp} />
        <FlowLine m="flow-arrow-wide" d="M602 128 H620" />
        <FlowNode kind="screen" x={622} y={104} w={104} h={48} text={confirm} />

        <path className={styles.svgLine} d="M242 146 V210 M674 152 V210 M242 210 H674" />
        <FlowLine m="flow-arrow-wide" d="M400 210 V234" />
        <FlowNode kind="screen" x={325} y={236} w={150} h={40} text={entry.end} />
      </svg>

      <svg className={`${styles.entrySvg} ${styles.entryTall}`} viewBox="0 0 340 352" role="img" aria-label={label}>
        <FlowDefs id="flow-arrow-tall" />
        <FlowNode kind="action" x={100} y={8} w={140} h={36} text={entry.start} />
        <FlowLine m="flow-arrow-tall" d="M170 44 V70" />
        <polygon className={styles.svgDecision} points="170,72 230,128 170,184 110,128" />
        <text className={styles.svgDecisionText} x="170" y="124">{decisionA}</text>
        <text className={styles.svgDecisionText} x="170" y="140">{decisionB}</text>

        <FlowLine m="flow-arrow-tall" d="M170 184 V218" />
        <text className={styles.svgBranch} x="186" y="206">Yes</text>
        <FlowNode kind="screen" x={110} y={220} w={120} h={36} text={logIn} />

        <FlowLine m="flow-arrow-tall" d="M230 128 H244" />
        <text className={styles.svgBranch} x="238" y="114">No</text>
        <FlowNode kind="screen" x={246} y={110} w={90} h={36} text={signUp} />
        <FlowLine m="flow-arrow-tall" d="M291 146 V168" />
        <FlowNode kind="screen" x={246} y={170} w={90} h={48} text={confirm} />

        <path className={styles.svgLine} d="M291 218 V280 H170 M170 256 V280" />
        <FlowLine m="flow-arrow-tall" d="M170 280 V302" />
        <FlowNode kind="screen" x={95} y={304} w={150} h={40} text={entry.end} />
      </svg>
    </>
  );
}

// Each SVG gets its own marker id: the hidden variant is display:none, and a
// marker referenced from a hidden SVG would not render in the visible one
function FlowDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" className={styles.svgArrowHead} />
      </marker>
    </defs>
  );
}

function FlowLine({ d, m }: { d: string; m: string }) {
  return <path className={styles.svgLine} d={d} markerEnd={`url(#${m})`} />;
}

// Action = capsule, screen = rectangle; long labels wrap onto two lines
function FlowNode({
  kind,
  x,
  y,
  w,
  h,
  text,
}: {
  kind: "action" | "screen";
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
}) {
  const words = text.split(" ");
  const lines = h > 40 && words.length > 1 ? [words[0], words.slice(1).join(" ")] : [text];
  const cx = x + w / 2;
  const cy = y + h / 2;
  return (
    <g>
      <rect
        className={kind === "action" ? styles.svgAction : styles.svgScreen}
        x={x}
        y={y}
        width={w}
        height={h}
        rx={kind === "action" ? h / 2 : 6}
      />
      {lines.map((line, i) => (
        <text
          key={line}
          className={styles.svgText}
          x={cx}
          y={cy + (i - (lines.length - 1) / 2) * 15 + 4}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

// Nested branch of the tree diagram; each level indents along a guide line
function TreeList({ nodes }: { nodes: TreeNode[] }) {
  return (
    <ul className={styles.treeList}>
      {nodes.map((node) => (
        <li key={node.label} className={styles.treeItem}>
          <span className={styles.treeNode}>{node.label}</span>
          {node.children && <TreeList nodes={node.children} />}
        </li>
      ))}
    </ul>
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

    case "tree":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={styles.tree}>
            <span className={styles.treeRoot}>{block.root}</span>
            <ul className={styles.treeColumns}>
              {block.items.map((section) => (
                <li key={section.label} className={styles.treeColumn}>
                  <span className={styles.treeSection}>{section.label}</span>
                  {section.children && <TreeList nodes={section.children} />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "flow":
      return (
        <div className={styles.block}>
          <BlockTitle title={block.title} />
          <div className={styles.tree}>
            <ul className={styles.legend} aria-label="Legend">
              <li>
                <span className={`${styles.flowAction} ${styles.legendSwatch}`} /> Action
              </li>
              <li>
                <span className={`${styles.flowScreen} ${styles.legendSwatch}`} /> Screen
              </li>
              <li>
                <span className={styles.diamond} /> Decision
              </li>
              <li>
                <span className={styles.legendArrow} aria-hidden="true">→</span> Flow
              </li>
            </ul>

            <EntryFlow entry={block.entry} />

            <ul className={styles.treeColumns}>
              {block.tabs.map((tab) => (
                <li key={tab.label} className={styles.treeColumn}>
                  <span className={`${styles.flowScreen} ${styles.flowTab}`}>{tab.label}</span>
                  <ul className={styles.flowList}>
                    {tab.actions.map((action) => (
                      <li key={action.label} className={styles.flowItem}>
                        {/* Action and the screen it opens, centered on one axis */}
                        <span className={styles.flowGroup}>
                          <span className={styles.flowAction}>{action.label}</span>
                          {action.screen && (
                            <>
                              <span className={styles.flowDown} aria-hidden="true" />
                              <span className={styles.flowScreen}>{action.screen}</span>
                            </>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
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
