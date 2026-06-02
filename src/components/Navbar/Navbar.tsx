"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img src="/icons/logo.png" alt="saa.design" className={styles.logoImg} />
        </Link>
        <div className={styles.links}>
          <Link 
            href="/" 
            className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
          <a 
            href="https://docs.google.com/document/d/1J8dM-wM57rX83Nr7v8cixy-GKkJYClgmzU_zProBTdc/edit?usp=sharing" 
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
          <Link 
            href="/about" 
            className={`${styles.link} ${pathname === "/about" ? styles.active : ""}`}
          >
            About
          </Link>
          <a 
            href="https://www.linkedin.com/in/anisa-aulia-alhaqi-39b119388/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <img src="/icons/linkedin-white.png" alt="LinkedIn" className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
