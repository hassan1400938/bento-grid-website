"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

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

const ReviewCard = ({ name, text }) => (
  <div style={styles.card}>
    <p style={styles.cardText}>“{text}”</p>
    <div style={styles.cardFooter}>
      <strong style={styles.cardFooterStrong}>{name}</strong>
      <span style={styles.cardFooterSpan}>Groningen</span>
    </div>
  </div>
);

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
  const containerRef = useRef(null);

  // Manual drag values
  const dragX1 = useMotionValue(0);
  const dragX2 = useMotionValue(0);

  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Only runs on client
    setWindowWidth(window.innerWidth);

    // Optional: update on resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split reviews
  const half = Math.ceil(reviews.length / 2);
  const row1 = [...reviews.slice(0, half)];
  const row2 = [...reviews.slice(half)];
  row1.splice(Math.floor(row1.length / 2), 0, { isWriteCard: true });

  return (
    <div className="relative z-[50]" ref={containerRef}>
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
          {/* ✅ Top Row - Only drag, no scroll effect */}
          <div style={styles.marqueeOuter}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              style={{ ...styles.marqueeInner, x: dragX1 }}
            >
              {row1.map((r, i) =>
                r.isWriteCard ? (
                  <WriteReviewCard key="write" />
                ) : (
                  <ReviewCard key={`r1-${i}`} {...r} />
                )
              )}
            </motion.div>
          </div>

          {/* ✅ Bottom Row - Only drag, no scroll effect */}
          <div style={styles.marqueeOuter}>
            <motion.div
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              style={{
                ...styles.marqueeInner,
                x: dragX2,
              }}
            >
              {row2.map((r, i) => (
                <ReviewCard key={`r2-${i}`} {...r} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  section: {
    minHeight: "100vh",
    padding: "64px 16px",
    textAlign: "center",
    background: "#0d0c0b",
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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
    userSelect: "none",
    cursor: "grab",
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
