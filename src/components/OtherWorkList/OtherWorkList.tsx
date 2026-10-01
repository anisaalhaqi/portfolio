import type { OtherWork } from "@/data/otherWork";
import styles from "./OtherWorkList.module.css";

const OtherWorkList = ({ items }: { items: OtherWork[] }) => (
  <ul className={styles.list}>
    {items.map((item) => {
      const content = (
        <>
          <span className={styles.type}>{item.type}</span>
          <span className={styles.text}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.summary}>{item.summary}</span>
          </span>
          {item.href ? (
            <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrow} />
          ) : (
            <span className={styles.soon}>Link coming soon</span>
          )}
        </>
      );

      return (
        <li key={item.title}>
          {item.href ? (
            <a
              href={item.href}
              className={`${styles.row} ${styles.linkRow}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
              <span className={styles.visuallyHidden}> (opens in a new tab)</span>
            </a>
          ) : (
            <div className={styles.row}>{content}</div>
          )}
        </li>
      );
    })}
  </ul>
);

export default OtherWorkList;
