import styles from "./Footer.module.css";

interface FooterProps {
  variant?: "blue" | "black";
}

const Footer = ({ variant = "blue" }: FooterProps) => {
  const themeClass = variant === "blue" ? styles.blue : styles.black;

  return (
    <footer className={`${styles.footer} ${themeClass}`}>
      <div className={styles.divider}></div>
      <div className={styles.container}>
        <div className={styles.text}>
          <span>© 2026 Anisa Aulia | Get In Touch </span>
          <a href="mailto:anisaalhaqi@gmail.com" className={styles.email}>
            anisaalhaqi@gmail.com
          </a>
        </div>
        <a 
          href="https://www.linkedin.com/in/anisa-aulia-alhaqi-39b119388/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.socialLink}
        >
          <img src="/icons/linkedin-blue.png" alt="LinkedIn" className={styles.socialIcon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
