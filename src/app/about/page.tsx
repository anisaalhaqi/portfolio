import styles from "./page.module.css";
import Footer from "@/components/Footer/Footer";

export default function About() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroLayout}>
            <div className={styles.heroHeader}>
              <img 
                src="/icons/profile-picture.png" 
                alt="Anisa Aulia" 
                className={styles.profileImage} 
              />
              <div className={styles.heroTextContainer}>
                <p className={styles.heroText}>
                  UI/UX Designer & Researcher with a background in Information System and Technology
                </p>
              </div>
            </div>

            <div className={styles.sectionBlock}>
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

            <div className={styles.gridContainer}>
              <div className={styles.skillsColumn}>
                <h2 className={styles.sectionTitle}>Skills</h2>
                <div className={styles.skillEntry}>
                  <p className={styles.skillCategoryHeader}>
                    <span className={styles.skillLabelBold}>UI Design</span>
                    <span className={styles.skillLabelLight}>:</span>
                  </p>
                  <ul className={styles.skillList}>
                    <li>Wireframing</li>
                    <li>High-Fidelity Prototyping</li>
                    <li>Logo</li>
                    <li>Micro-interactions</li>
                    <li>Design System</li>
                  </ul>
                </div>
                <div className={styles.skillEntry}>
                  <p className={styles.skillCategoryHeader}>
                    <span className={styles.skillLabelBold}>UX Research</span>
                    <span className={styles.skillLabelLight}>:</span>
                  </p>
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
                <div className={styles.figmaContainer}>
                  <img src="/icons/figma.png" alt="Figma" className={styles.figmaLogo} />
                  <span className={styles.figmaName}>Figma</span>
                </div>
              </div>
            </div>

            <div className={styles.sectionBlock}>
              <h2 className={styles.sectionTitle}>Education</h2>
              <div className={styles.educationRow}>
                <span className={styles.eduDegree}>Information System and Technology</span>
                <span className={styles.eduSchool}>Institut Teknologi Bandung (2024-2028)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="black" />
    </main>
  );
}
