import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={`${styles.main} ${styles.footer}`} aria-label="Footer">
      <div className={styles.footerGrid}>
        <div className={styles.footerLogo}>
          <img
            src="https://via.placeholder.com/150x50?text=Gron's+Dodgeball"
            alt="Logo van Gron’s Dodgeball"
          />
        </div>

        <nav className={styles.footerLinks} aria-label="Company">
          <h4>Company</h4>
          <a href="#">About</a>
          <a href="#">Join Us</a>
          <a href="#">Events</a>
          <a href="#">FAQ</a>
        </nav>

        <nav className={styles.footerLinks} aria-label="Community">
          <h4>Community</h4>
          <a href="#">WhatsApp</a>
          <a href="#">Discord</a>
          <a href="#">Newsletter</a>
        </nav>

        <nav className={styles.footerLinks} aria-label="Legal">
          <h4>Legal</h4>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Rules</a>
          <a href="#">Code of Conduct</a>
        </nav>

        <div className={`${styles.footerLinks} ${styles.footerContact}`}>
          <h4>Contact</h4>
          <p>
            <a href="mailto:gronsdodgeball@gmail.com">
              gronsdodgeball@gmail.com
            </a>
          </p>
          <div className={styles.socialIcons}>
            <a
              href="https://www.instagram.com/gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @gronsdodgeball"
            >
              <img
                src="https://via.placeholder.com/28x28?text=IG"
                alt="Instagram-logo"
              />
            </a>
            <a
              href="https://www.tiktok.com/@gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok @gronsdodgeball"
            >
              <img
                src="https://via.placeholder.com/28x28?text=TT"
                alt="TikTok-logo"
              />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div>&copy; {year} Gron’s Dodgeball. All rights reserved.</div>
        <div
          className={styles.paymentIcons}
          aria-label="Supported payment methods"
        >
          <img
            src="https://via.placeholder.com/40x20?text=iDEAL"
            alt="iDEAL betaalmethode"
          />
          <img
            src="https://via.placeholder.com/40x20?text=Apple"
            alt="Apple Pay logo"
          />
          <img
            src="https://via.placeholder.com/40x20?text=Google"
            alt="Google Pay logo"
          />
          <img
            src="https://via.placeholder.com/40x20?text=Card"
            alt="Creditcard logo"
          />
        </div>
      </div>
    </footer>
  );
}
