"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    name: "Cindy",
    text: "I really love being part of this dodgeball community! Everyone is super friendly and welcoming.",
  },
  {
    name: "Tijmen",
    text: "I had such a great day!! I loved dodgeball in high-school, and I was just as fanatic as then.",
  },
  {
    name: "Lotte",
    text: "I had such a fun and active day. It's a great way to meet new people while doing something sporty.",
  },
  {
    name: "Lucas",
    text: "Joining as a complete beginner, I still felt welcome. There's a good balance of games and coaching.",
  },
  {
    name: "Anastasia",
    text: "I had such a fun time! It was a great way to get active and meet some really lovely people.",
  },
  {
    name: "Daniel",
    text: "Didn’t think I’d get into dodgeball again haha, but it’s seriously the highlight of my week now!",
  },
  {
    name: "Evelina",
    text: "I usually stay quiet in groups but this felt so safe and fun!!! Honestly one of the best things I’ve joined.",
  },
  {
    name: "Marva",
    text: "Came alone and was sooo nervous, but I felt at home right away!",
  },
  {
    name: "James",
    text: "This group really came out of nowhere but has quickly become the main event of my week.",
  },
  {
    name: "Jeffrey",
    text: "Super fun dodgeball club! It reminds me of gym class in school. Very welcoming and chill vibe.",
  },
];

// ✅ Review card
const ReviewCard = ({ name, text }) => (
  <div style={styles.card}>
    <p style={styles.cardText}>“{text}”</p>
    <div style={styles.cardFooter}>
      <strong style={styles.cardFooterStrong}>{name}</strong>
      <span style={styles.cardFooterSpan}>Groningen</span>
    </div>
  </div>
);

// ✅ Write a review card
const WriteReviewCard = () => (
  <div
    style={{
      ...styles.card,
      background: "#e4f7eb",
      border: "2px dashed #0d0c0b",
    }}
  >
    <p style={styles.cardText}>
      <strong>Want to share your experience?</strong> <br />
      We'd love to hear from you!
    </p>
    <button style={styles.writeButton}>Write a Review</button>
  </div>
);

export default function Reviews() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const containerRef = useRef(null);

  const half = Math.ceil(reviews.length / 2);
  const row1 = [...reviews.slice(0, half)];
  const row2 = [...reviews.slice(half)];

  useEffect(() => {
    const r1 = row1Ref.current;
    const r2 = row2Ref.current;

    const row1Width = r1.scrollWidth;
    const row2Width = r2.scrollWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // ⬅️ start earlier
        end: "bottom top",
        scrub: 0.6,
      },
    });

    // ✅ Scroll entire row width minus visible part
    tl.to(r1, { x: row1Width - r1.parentElement.clientWidth, ease: "none" }, 0);
    tl.to(
      r2,
      { x: -(row2Width - r2.parentElement.clientWidth), ease: "none" },
      0
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="relative z-[50]" ref={containerRef}>
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
            fill="#111111"
          />
        </svg>
      </div>

      <section style={styles.section}>
        <div className="px-4">
          <div style={styles.stars}>★★★★★</div>
          <div style={styles.subheading}>What others say</div>
          <div style={styles.title}>Experiences from our Dodgers</div>
          <div style={styles.subtitle}>
            A sport that <strong style={{ color: "white" }}>connects</strong>. A
            community that{" "}
            <strong style={{ color: "white" }}>makes you smile</strong>.
          </div>
        </div>

        <div style={styles.marqueeWrapper}>
          <div style={styles.marqueeOuter}>
            <div style={styles.marqueeInner} ref={row1Ref}>
              <WriteReviewCard />
              {row1.map((r, i) => (
                <ReviewCard key={`r1-${i}`} {...r} />
              ))}
            </div>
          </div>

          <div style={styles.marqueeOuter}>
            <div style={styles.marqueeInner} ref={row2Ref}>
              {row2.map((r, i) => (
                <ReviewCard key={`r2-${i}`} {...r} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    padding: "64px 0px",
    textAlign: "center",
    background: "#0d0c0b",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
  },
  stars: {
    color: "#f57f3b",
    fontSize: 20,
    marginBottom: 8,
  },
  subheading: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 12,
    color: "#bbb",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#ccc",
    marginBottom: 40,
  },
  marqueeWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 30,
  },
  marqueeOuter: {
    overflow: "hidden",
    width: "100%",
  },
  marqueeInner: {
    display: "flex",
    gap: 16,
    width: "max-content",
    alignItems: "stretch",
  },
  card: {
    background: "#fefaf1",
    color: "#0d0c0b",
    padding: "20px 22px",
    borderRadius: 24,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 160,
    minWidth: 240,
    maxWidth: 400,
    flexShrink: 0,
    textAlign: "left",
  },
  cardText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: 18,
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 13,
    lineHeight: 1.2,
    color: "#888",
  },
  cardFooterStrong: {
    color: "#0d0c0b",
    fontSize: 14,
  },
  cardFooterSpan: {
    fontSize: 13,
  },
  writeButton: {
    background: "#0d0c0b",
    color: "#fff",
    border: "none",
    padding: "12px 16px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
};
