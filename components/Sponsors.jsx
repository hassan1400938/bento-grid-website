import { useState, useEffect, useRef } from "react";
import styles from "../styles/Sponsors.module.css";

const sponsors = [
  {
    name: "Sponsor 1",
    description: "Bold community partner.",
    logo: "sponsor1.svg",
    link: "https://sponsor1.com",
  },
  {
    name: "Sponsor 2",
    description: "Active lifestyle support.",
    logo: "sponsor2.svg",
    link: "https://sponsor2.com",
  },
  {
    name: "Sponsor 3",
    description: "Creativity meets action.",
    logo: "sponsor3.svg",
    link: "https://sponsor3.com",
  },
];

export default function Sponsors() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const wrapperRef = useRef(null);

  const handleClick = (index, event) => {
    event.stopPropagation();
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    const handleOutsideClick = () => setExpandedIndex(null);
    document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className={styles.sponsors}>
      <div className={styles.sectionTitle}>OUR SPONSORS</div>
      <div className={styles.content}>
        Click a logo to unfold a little more about our sponsors.
      </div>
      <div className={styles.sponsorLogos} ref={wrapperRef}>
        {sponsors.map((s, i) => (
          <div
            key={s.name}
            className={`${styles.sponsorCard} ${
              expandedIndex === i ? styles.expanded : ""
            }`}
            onClick={(e) => handleClick(i, e)}
          >
            <img src={s.logo} alt={s.name} />
            <div className={styles.sponsorInfo}>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <a href={s.link} target="_blank" rel="noopener noreferrer">
                Visit website →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
