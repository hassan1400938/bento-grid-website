"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../styles/Sponsors.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo1 from "../public/assets/partners/050.svg";
import logo2 from "../public/assets/partners/ACLO.png";
import logo3 from "../public/assets/partners/DBN.png";

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  {
    name: "Sponsor 1",
    description: "Bold community partner.",
    logo: logo1.src,
    link: "https://sponsor1.com",
  },
  {
    name: "Sponsor 2",
    description: "Active lifestyle support.",
    logo: logo2.src,
    link: "https://sponsor2.com",
  },
  {
    name: "Sponsor 3",
    description: "Creativity meets action.",
    logo: logo3.src,
    link: "https://sponsor3.com",
  },
];

export default function Sponsors() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);

  const handleClick = (index, event) => {
    event.stopPropagation();
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  useEffect(() => {
    const handleOutsideClick = () => setExpandedIndex(null);
    document.body.addEventListener("click", handleOutsideClick);
    return () => document.body.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Clear previous animations
    gsap.killTweensOf(cardRefs.current);

    // Animate cards on scroll
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              markers: false, // set to true to debug
            },
            delay: i * 0.2,
          }
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Animate expansion (scale + fade) when expandedIndex changes
  useEffect(() => {
    if (expandedIndex === null) return;

    const card = cardRefs.current[expandedIndex];
    if (!card) return;

    gsap.fromTo(
      card.querySelector(`.${styles.sponsorInfo}`),
      { autoAlpha: 0, y: 20 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, [expandedIndex]);

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen z-[50]">
      <div className="absolute -top-[2px] sm:-top-[4px] md:-top-[7px] z-[70] left-0 w-full">
        <svg
          viewBox="0 0 1440 14"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,7
       Q15,3.5 30,7
       T60,7
       T90,7
       T120,7
       T150,7
       T180,7
       T210,7
       T240,7
       T270,7
       T300,7
       T330,7
       T360,7
       T390,7
       T420,7
       T450,7
       T480,7
       T510,7
       T540,7
       T570,7
       T600,7
       T630,7
       T660,7
       T690,7
       T720,7
       T750,7
       T780,7
       T810,7
       T840,7
       T870,7
       T900,7
       T930,7
       T960,7
       T990,7
       T1020,7
       T1050,7
       T1080,7
       T1110,7
       T1140,7
       T1170,7
       T1200,7
       T1230,7
       T1260,7
       T1290,7
       T1320,7
       T1350,7
       T1380,7
       T1410,7
       T1440,7
       L1440,14
       L0,14
       Z"
            fill="#F5E2CF"
          />
        </svg>
      </div>

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
              ref={(el) => (cardRefs.current[i] = el)}
              style={{ transformOrigin: "center center" }}
            >
              <img src={s.logo} alt={s.name} />
              <div className={styles.sponsorInfo} style={{ opacity: 0 }}>
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
    </div>
  );
}
