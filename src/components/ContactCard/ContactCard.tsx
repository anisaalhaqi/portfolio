import styles from "./ContactCard.module.css";

const RESUME_URL =
  "https://docs.google.com/document/d/1J8dM-wM57rX83Nr7v8cixy-GKkJYClgmzU_zProBTdc/edit?usp=sharing";
const LINKEDIN_URL = "https://www.linkedin.com/in/anisa-aulia-alhaqi-39b119388/";
const EMAIL = "anisaalhaqi@gmail.com";

// Closing call to action, shared by the home and about pages so the
// availability text and links only live in one place
const ContactCard = () => (
  <section className={styles.contact}>
    <h2 className={styles.title}>Let’s work together</h2>
    <p className={styles.text}>
      I’m open to UI/UX internships in Bandung or remote, and onsite in January
      2027. I also take on freelance design projects.
    </p>
    <div className={styles.actions}>
      <a href={`mailto:${EMAIL}`} className={styles.primaryButton}>
        Email Me
      </a>
      <a
        href={RESUME_URL}
        className={styles.secondaryLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>View Resume</span>
        <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
      </a>
      <a
        href={LINKEDIN_URL}
        className={styles.secondaryLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>LinkedIn</span>
        <img src="/portfolio/icons/arrow-right-blue.png" alt="" className={styles.arrowImg} />
      </a>
    </div>
  </section>
);

export default ContactCard;
