"use client";

import Link from "next/link";
import { useRevealOnce } from "@/components/useRevealOnce";
import styles from "./UIProjectCard.module.css";

interface UIProjectCardProps {
  tag: string;
  title: string;
  summary: string;
  imageSrc?: string;
  link: string;
}

const UIProjectCard = ({ tag, title, summary, imageSrc, link }: UIProjectCardProps) => {
  const cardRef = useRevealOnce<HTMLAnchorElement>();

  return (
    <Link ref={cardRef} href={link} className={styles.card}>
      <div className={styles.cover}>
        {imageSrc ? (
          <img src={imageSrc} alt="" className={styles.image} />
        ) : (
          <span className={styles.placeholder}>Cover image coming soon</span>
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.tag}>{tag}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
        <span className={styles.more}>
          <span>View Project</span>
          <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
        </span>
      </div>
    </Link>
  );
};

export default UIProjectCard;
