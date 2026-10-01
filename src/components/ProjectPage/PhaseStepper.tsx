"use client";

import { useEffect, useState } from "react";
import styles from "./ProjectPage.module.css";

interface PhaseStepperProps {
  phases: { name: string; ready: boolean }[];
}

// Sticky Design Thinking stepper that highlights the phase being read
const PhaseStepper = ({ phases }: PhaseStepperProps) => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = phases
      .filter((p) => p.ready)
      .map((p) => ({ name: p.name, el: document.getElementById(p.name.toLowerCase()) }))
      .filter((t): t is { name: string; el: HTMLElement } => t.el !== null);
    if (targets.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // A phase counts as current once its top passes a line about a third
      // down the viewport, below the navbar and the sticky stepper
      const line = window.innerHeight * 0.35;
      let current: string | null = null;
      for (const t of targets) {
        if (t.el.getBoundingClientRect().top <= line) current = t.name;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [phases]);

  return (
    <nav className={styles.stepsWrap} aria-label="Design Thinking phases">
      <ol className={`${styles.glass} ${styles.steps}`}>
        {phases.map(({ name, ready }, i) => {
          const isActive = name === active;
          const stateClass = !ready
            ? styles.stepPending
            : isActive
              ? styles.stepActive
              : styles.stepReady;
          const content = (
            <>
              <span className={styles.stepIndex}>{i + 1}</span>
              <span className={styles.stepName}>{name}</span>
            </>
          );
          return (
            <li key={name} className={stateClass}>
              {ready ? (
                <a
                  href={`#${name.toLowerCase()}`}
                  className={styles.stepLink}
                  aria-current={isActive ? "step" : undefined}
                >
                  {content}
                </a>
              ) : (
                <span className={styles.stepLink}>{content}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default PhaseStepper;
