"use client";

import type { ReactNode } from "react";
import { useRevealOnce } from "@/components/useRevealOnce";

// Client-only list wrapper, so MoreProjects stays a server component and the
// project data isn't shipped to the browser
const RevealGrid = ({ className, children }: { className: string; children: ReactNode }) => {
  const ref = useRevealOnce<HTMLUListElement>();
  return (
    <ul ref={ref} className={className}>
      {children}
    </ul>
  );
};

export default RevealGrid;
