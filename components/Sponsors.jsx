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
    d="
      M0,7
      C10,4 20,10 30,7
      C40,5 50,9 60,7
      C70,6 80,8 90,7
      C100,5 110,9 120,7
      C130,6 140,8 150,7
      C160,4 170,10 180,7
      C190,6 200,8 210,7
      C220,5 230,9 240,7
      C250,6 260,8 270,7
      C280,4 290,10 300,7
      C310,5 320,9 330,7
      C340,6 350,8 360,7
      C370,5 380,9 390,7
      C400,6 410,8 420,7
      C430,4 440,10 450,7
      C460,5 470,9 480,7
      C490,6 500,8 510,7
      C520,5 530,9 540,7
      C550,6 560,8 570,7
      C580,4 590,10 600,7
      C610,6 620,8 630,7
      C640,5 650,9 660,7
      C670,6 680,8 690,7
      C700,4 710,10 720,7
      C730,5 740,9 750,7
      C760,6 770,8 780,7
      C790,5 800,9 810,7
      C820,6 830,8 840,7
      C850,4 860,10 870,7
      C880,5 890,9 900,7
      C910,6 920,8 930,7
      C940,5 950,9 960,7
      C970,6 980,8 990,7
      C1000,4 1010,10 1020,7
      C1030,5 1040,9 1050,7
      C1060,6 1070,8 1080,7
      C1090,5 1100,9 1110,7
      C1120,6 1130,8 1140,7
      C1150,4 1160,10 1170,7
      C1180,5 1190,9 1200,7
      C1210,6 1220,8 1230,7
      C1240,5 1250,9 1260,7
      C1270,6 1280,8 1290,7
      C1300,4 1310,10 1320,7
      C1330,5 1340,9 1350,7
      C1360,6 1370,8 1380,7
      C1390,5 1400,9 1410,7
      C1420,6 1430,8 1440,7
      C1420,6 1430,8 1440,7
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
