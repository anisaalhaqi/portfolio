"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

// Time constant of the ring's chase. ~3x this is when it has visually caught up
// (about 150ms), fast enough to feel attached, slow enough to read as motion.
const RING_TAU = 0.05;
const INTERACTIVE = "a, button, [role='button'], summary, label";
// Below this relative luminance a background counts as dark (the brand blue
// #4875C8 is ~0.19, the light surfaces and glass cards are ~0.9+)
const DARK_LUMINANCE = 0.4;

const channel = (c: number) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};

// Walk up from the hovered element to the first mostly opaque background
// color and report whether it is dark enough to need a white cursor
const sitsOnDark = (start: Element | null) => {
  for (let el = start; el && el !== document.documentElement; el = el.parentElement) {
    const match = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
    if (!match) continue;
    const [r, g, b, a = 1] = match.map(Number);
    if (a < 0.5) continue;
    const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    return luminance < DARK_LUMINANCE;
  }
  return false;
};

const Cursor = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!root || !dot || !ring) return;

    // Mouse and trackpad only; keep the system cursor for touch and forced colors
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const forcedColors = window.matchMedia("(forced-colors: active)");
    if (!finePointer.matches || forcedColors.matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const target = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let frame = 0;
    let lastTime = 0;
    let started = false;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = (time: number) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 1 / 60;
      lastTime = time;
      // Frame-rate independent exponential approach: no overshoot, no bounce
      const k = 1 - Math.exp(-dt / RING_TAU);
      ringPos.x += (target.x - ringPos.x) * k;
      ringPos.y += (target.y - ringPos.y) * k;
      place(ring, ringPos.x, ringPos.y);

      const settled =
        Math.abs(target.x - ringPos.x) < 0.1 && Math.abs(target.y - ringPos.y) < 0.1;
      if (settled) {
        frame = 0;
        lastTime = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.x = e.clientX;
      target.y = e.clientY;

      if (!started) {
        started = true;
        document.documentElement.classList.add("custom-cursor");
      }
      if (!("visible" in root.dataset)) {
        // Coming back into view: start the ring at the pointer instead of
        // flying in from wherever it was hidden
        ringPos.x = target.x;
        ringPos.y = target.y;
        place(ring, ringPos.x, ringPos.y);
      }

      // The dot is what the user steers, so it tracks 1:1 with no easing
      place(dot, target.x, target.y);
      root.dataset.visible = "";

      if (reduceMotion.matches) {
        ringPos.x = target.x;
        ringPos.y = target.y;
        place(ring, ringPos.x, ringPos.y);
      } else if (!frame) {
        frame = requestAnimationFrame(tick);
      }
    };

    const onOver = (e: PointerEvent) => {
      const el = e.target as Element | null;
      if (el?.closest?.(INTERACTIVE)) root.dataset.hover = "";
      else delete root.dataset.hover;
      if (sitsOnDark(el)) root.dataset.onDark = "";
      else delete root.dataset.onDark;
    };

    const onDown = () => {
      root.dataset.pressed = "";
    };
    const onUp = () => {
      delete root.dataset.pressed;
    };
    // relatedTarget is null when the pointer leaves the window or enters an
    // iframe (the demo video), where this page stops receiving pointer events
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) delete root.dataset.visible;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerout", onOut);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerout", onOut);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <div ref={ringRef} className={styles.follower}>
        <div className={styles.ring} />
      </div>
      <div ref={dotRef} className={styles.follower}>
        <div className={styles.dot} />
      </div>
    </div>
  );
};

export default Cursor;
