import styles from "./page.module.css";
import Footer from "@/components/Footer/Footer";

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <img 
              src="/icons/profile-picture.png" 
              alt="Anisa Aulia" 
              className={styles.profileImage} 
            />
            <p className={styles.heroText}>
              UI/UX Designer & Researcher with a background in Information System and Technology
            </p>
          </div>
        </div>
      </section>

      <section className={styles.bio}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Bio</h2>
          <div className={styles.bioText}>
            <p>
              I’ve always been naturally curious about how things work and why people behave the way they do. For a long time, I found myself mentally fixing confusing experiences before I even knew what UX design was.
            </p>
            <p>
              Studying Information Systems and Technology at ITB gave that curiosity a purpose. I found my sweet spot in UX—a field where technical logic meets human empathy. I’ve since dedicated myself to mastering the full design cycle, from deep-dive user interviews and usability testing to building high-fidelity prototypes in Figma.
            </p>
            <p>
              What drives me most is the research. I genuinely enjoy untangling messy problems, talking to the people who face them, and discovering the patterns that lead to meaningful, data-driven solutions.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.skills}>
        <div className={styles.container}>
          <div className={styles.skillsGrid}>
            <div className={styles.skillsColumn}>
              <h2 className={styles.sectionTitle}>Skills</h2>
              <div className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>UI Design:</h3>
                <ul className={styles.skillList}>
                  <li>Wireframing</li>
                  <li>High-Fidelity Prototyping</li>
                  <li>Logo</li>
                  <li>Micro-interactions</li>
                  <li>Design System</li>
                </ul>
              </div>
              <div className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>UX Research:</h3>
                <ul className={styles.skillList}>
                  <li>User Interviews</li>
                  <li>Survey Design</li>
                  <li>Usability Testing</li>
                  <li>SUS & SEQ Scoring</li>
                  <li>Heuristic Evaluation</li>
                  <li>Affinity Map</li>
                  <li>User Persona</li>
                  <li>User Journey Map</li>
                  <li>User Flow</li>
                  <li>Features Benchmark & UI Design</li>
                  <li>Problem Feature Mapping</li>
                </ul>
              </div>
            </div>

            <div className={styles.toolsColumn}>
              <h2 className={styles.sectionTitle}>Design Tools</h2>
              <div className={styles.figmaTool}>
                <img src="/icons/figma.png" alt="Figma" className={styles.toolIcon} />
                <span className={styles.toolName}>Figma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.education}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.educationItem}>
            <span className={styles.degree}>Information System and Technology</span>
            <span className={styles.school}>Institut Teknologi Bandung (2024-2028)</span>
          </div>
        </div>
      </section>

      <Footer variant="black" />
    </main>
  );
}
