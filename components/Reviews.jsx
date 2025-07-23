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

// ✅ Write a review card (neutral style)
const WriteReviewCard = () => (
  <div style={{ ...styles.card, background: "#fefaf1", border: "none" }}>
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

  // ✅ Split into two rows and inject WriteReviewCard into row1
  const half = Math.ceil(reviews.length / 2);
  const row1 = [...reviews.slice(0, half)];
  const row2 = [...reviews.slice(half)];

  // ✅ Insert WriteReviewCard in middle of row1
  row1.splice(Math.floor(row1.length / 2), 0, { isWriteCard: true });

useEffect(() => {
  const r1 = row1Ref.current;
  const r2 = row2Ref.current;

  const row1Width = r1.scrollWidth;
  const row2Width = r2.scrollWidth;
  const containerWidth = r1.parentElement.clientWidth;

  // Start row1 completely offscreen to the left
  gsap.set(r1, { x: -row1Width });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom top",
      scrub: 0.6,
    },
  });

  // Move row1 into view from -row1Width to 0
  tl.to(r1, {
    x: 0,
    ease: "none",
  }, 0);

  // Animate row2 from right to left as usual
  tl.to(r2, {
    x: -(row2Width - containerWidth),
    ease: "none",
  }, 0);

  return () => tl.kill();
}, []);

  return (
    <div className="relative z-[50]" ref={containerRef}>
      <div className="absolute -top-[2px] sm:-top-[4px] md:-top-[7px] z-[70] left-0 w-full">
        <svg viewBox="0 0 1440 14" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0,7 C10,4 20,10 30,7 C40,5 50,9 60,7 C70,6 80,8 90,7 C100,5 110,9 120,7 C130,6 140,8 150,7 C160,4 170,10 180,7 C190,6 200,8 210,7 C220,5 230,9 240,7 C250,6 260,8 270,7 C280,4 290,10 300,7 C310,5 320,9 330,7 C340,6 350,8 360,7 C370,5 380,9 390,7 C400,6 410,8 420,7 C430,4 440,10 450,7 C460,5 470,9 480,7 C490,6 500,8 510,7 C520,5 530,9 540,7 C550,6 560,8 570,7 C580,4 590,10 600,7 C610,6 620,8 630,7 C640,5 650,9 660,7 C670,6 680,8 690,7 C700,4 710,10 720,7 C730,5 740,9 750,7 C760,6 770,8 780,7 C790,5 800,9 810,7 C820,6 830,8 840,7 C850,4 860,10 870,7 C880,5 890,9 900,7 C910,6 920,8 930,7 C940,5 950,9 960,7 C970,6 980,8 990,7 C1000,4 1010,10 1020,7 C1030,5 1040,9 1050,7 C1060,6 1070,8 1080,7 C1090,5 1100,9 1110,7 C1120,6 1130,8 1140,7 C1150,4 1160,10 1170,7 C1180,5 1190,9 1200,7 C1210,6 1220,8 1230,7 C1240,5 1250,9 1260,7 C1270,6 1280,8 1290,7 C1300,4 1310,10 1320,7 C1330,5 1340,9 1350,7 C1360,6 1370,8 1380,7 C1390,5 1400,9 1410,7 C1420,6 1430,8 1440,7 L1440,14 L0,14 Z"
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
            A sport that <strong style={{ color: "white" }}>connects</strong>. A community that{" "}
            <strong style={{ color: "white" }}>makes you smile</strong>.
          </div>
        </div>

        <div style={styles.marqueeWrapper}>
          <div style={styles.marqueeOuter}>
            <div style={styles.marqueeInner} ref={row1Ref}>
              {row1.map((r, i) =>
                r.isWriteCard ? <WriteReviewCard key="write" /> : <ReviewCard key={`r1-${i}`} {...r} />
              )}
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
