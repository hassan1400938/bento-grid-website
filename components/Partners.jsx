"use client";

import { useEffect } from "react";
import styles from "../styles/Partners.module.css";

export default function Partners() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenWidth = window.innerWidth;
      document.getElementById("row1").style.transform = `translateX(${
        (scrollY * -0.5) % screenWidth
      }px)`;
      document.getElementById("row2").style.transform = `translateX(${
        (scrollY * 0.3) % screenWidth
      }px)`;
      document.getElementById("row3").style.transform = `translateX(${
        (scrollY * -0.2) % screenWidth
      }px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rows = {
    row1: ["google.com", "apple.com", "spotify.com", "microsoft.com"],
    row2: ["netflix.com", "twitter.com", "meta.com", "tesla.com", "nike.com"],
    row3: ["discord.com", "stripe.com", "reddit.com", "intel.com", "zoom.us"],
  };

  return (
    <section className={styles.parallaxSection}>
      <div className={styles.partnersTitle}>Partners</div>
      <div className={styles.logoRows}>
        {Object.entries(rows).map(([id, domains]) => (
          <div key={id} id={id} className={styles.rowWrapper}>
            {Array(4)
              .fill(domains)
              .flat()
              .map((domain, i) => (
                <img
                  key={`${id}-${i}`}
                  src={`https://logo.clearbit.com/${domain}`}
                  alt={domain}
                />
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}
