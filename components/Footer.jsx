import React, { useEffect, useState } from "react";
import styles from "../styles/Footer.module.css";
import logo from "../public/assets/logo.svg"; // Adjust the path as needed
import Link from "next/link";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className={`${styles.main} ${styles.footer}`} aria-label="Footer">
      <div className={` relative z-50 ${styles.footerGrid}`}>
        {/* Dodgeball logo */}
        <div className={styles.footerLogo}>
          <Link href="/">
            <img src={logo.src} alt="" />
          </Link>
        </div>

        {/* Company */}
        <nav className={`relative z-50 ${styles.footerLinks}`} aria-label="Company">
          <h4>Company</h4>
          <Link href="#">About</Link>
          <Link href="#">Join Us</Link>
          <Link href="#">Events</Link>
          <Link href="#">FAQ</Link>
        </nav>

        {/* Community */}
        <nav className={styles.footerLinks} aria-label="Community">
          <h4>Community</h4>
          <Link href="#">WhatsApp</Link>
          <Link href="#">Discord</Link>
          <Link href="#">Newsletter</Link>
        </nav>

        {/* Legal */}
        <nav className={styles.footerLinks} aria-label="Legal">
          <h4>Legal</h4>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/code-of-conduct">Rules</Link>
          <Link href="/code-of-conduct">Code of Conduct</Link>
        </nav>

        {/* Contact + social */}
        <div className={`${styles.footerLinks} ${styles.footerContact}`}>
          <h4>Contact</h4>
          <p>
            <Link href="mailto:gronsdodgeball@gmail.com">
              gronsdodgeball@gmail.com
            </Link>
          </p>
          <div className={styles.socialIcons}>
            <Link
              href="https://instagram.com/gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <img
                src="https://cdn.simpleicons.org/instagram/000000"
                alt="Instagram"
                width="28"
                height="28"
              />
            </Link>
            <Link
              href="https://tiktok.com/@gronsdodgeball"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <img
                src="https://cdn.simpleicons.org/tiktok/000000"
                alt="TikTok"
                width="28"
                height="28"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={`relative z-50 ${styles.footerBottom}`}>
        <div>&copy; {year} Gron’s Dodgeball. All rights reserved.</div>
      <div className={styles.paymentIcons} aria-label="Payment Methods">
  <img
    src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/apm/ideal.svg"
    alt="iDEAL"
    width="40"
    height="20"
  />
  <img
    src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/wallets/apple-pay.svg"
    alt="Apple Pay"
    width="40"
    height="20"
  />
  <img
    src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/wallets/google-pay.svg"
    alt="Google Pay"
    width="40"
    height="20"
  />
  <img
    src="https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/cards/visa.svg"
    alt="Visa"
    width="40"
    height="20"
  />
</div>

      </div>
    </footer>
  );
}
