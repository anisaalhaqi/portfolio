import Link from "next/link";
import styles from "./CaseStudyCard.module.css";

interface CaseStudyCardProps {
  tag: string;
  title: string;
  description: string;
  bgColor: string;
  imageSrc: string;
  link: string;
  reverse?: boolean;
}

const CaseStudyCard = ({
  tag,
  title,
  description,
  bgColor,
  imageSrc,
  link,
  reverse = false,
}: CaseStudyCardProps) => {
  return (
    <div className={`${styles.card} ${reverse ? styles.reverse : ""}`}>
      <div className={styles.content}>
        <div className={styles.tag}>{tag}</div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={link} className={styles.button}>
          <span>View Case Study</span>
          <img src="/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
        </Link>
      </div>
      <div className={styles.imageContainer} style={{ backgroundColor: bgColor }}>
        <div className={styles.blurCircle1}></div>
        <div className={styles.blurCircle2}></div>
        <img src={imageSrc} alt={title} className={styles.image} />
      </div>
    </div>
  );
};

export default CaseStudyCard;
