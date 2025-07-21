"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/CodeOfConduct.module.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Everyone is welcome",
    content: (
      <>
        <p>
          Gron’s Dodgeball is open to everyone aged 16 and up — regardless of
          background, gender identity, skill level, or experience.
        </p>
        <ul>
          <li>
            We treat each other with respect, openness, and without judgment.
          </li>
          <li>Discrimination, bullying, or exclusion will not be tolerated.</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Respect is key",
    content: (
      <>
        <p>A great atmosphere starts with how we treat one another:</p>
        <ul>
          <li>Be fair and respectful to all players</li>
          <li>Accept the decisions of referees or organizers</li>
          <li>No swearing, or intimidating behavior</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. No (physical) violence – ever",
    content: (
      <>
        <p>Let’s be clear:</p>
        <p>
          Physical or threatening behavior is never acceptable and results in
          suspension or removal.
        </p>
      </>
    ),
  },
  {
    title: "4. Fair play makes better games",
    content: (
      <ul>
        <li>Got hit? You’re out — be honest about it</li>
        <li>Cheating kills the fun for everyone</li>
        <li>Winning is great, but playing fair is more important</li>
      </ul>
    ),
  },
  {
    title: "5. Safety first",
    content: (
      <ul>
        <li>Avoid throwing balls at heads</li>
        <li>No reckless or dangerous play</li>
        <li>Speak up if you feel unsafe</li>
      </ul>
    ),
  },
  {
    title: "6. We're stronger together",
    content: (
      <ul>
        <li>New players are welcomed and supported</li>
        <li>We encourage and uplift each other</li>
        <li>Fun and good vibes are part of every session</li>
      </ul>
    ),
  },
  {
    title: "If the code is broken",
    content: (
      <>
        <ul>
          <li>Warnings may be given</li>
          <li>Temporary suspensions possible</li>
          <li>Repeated or serious violations lead to permanent exclusion</li>
        </ul>
        <p>
          Let’s keep it fun, safe, and positive for everyone. Thanks for being
          part of Gron's Dodgeball!
        </p>
      </>
    ),
  },
];

export default function CodeOfConduct() {
  const [openIndex, setOpenIndex] = useState(null);
  const canvasRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // ✅ Canvas Noise Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setSize();
    window.addEventListener("resize", setSize);

    let animationFrame;
    let lastDraw = 0;
    const fps = 12;
    const interval = 1000 / fps;

    const drawNoise = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = "#f1eee7";
      ctx.fillRect(0, 0, w, h);

      const dotCount = 4000;
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 2 + 0.5;
        const alpha = Math.random() * 0.3 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fill();
      }
    };

    const loop = (now) => {
      if (now - lastDraw > interval) {
        drawNoise();
        lastDraw = now;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    setShowCanvas(true);
    animationFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <>
      <NavBar />
      <div className="fixed top-0 h-full w-full left-0 overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`${styles.fullscreenCanvas}`}
          style={{
            opacity: showCanvas ? 0.05 : 0,
            mixBlendMode: "normal",
            transition: "opacity 0.7s ease-in-out",
          }}
        />
        <div className={styles.wrapper}>
          {/* ✅ Canvas background */}

          <main className={styles.container}>
            <h1 className={styles.heading}>Code of Conduct</h1>

            <div role="region" aria-label="Code of Conduct">
              {sections.map((section, index) => {
                const isOpen = openIndex === index;
                return (
                  <section key={index} className={styles.accordionItem}>
                    <button
                      className={styles.accordionButton}
                      aria-expanded={isOpen}
                      aria-controls={`sec${index}`}
                      id={`btn${index}`}
                      onClick={() => toggleAccordion(index)}
                    >
                      {section.title}
                    </button>
                    <div
                      id={`sec${index}`}
                      className={`${styles.accordionPanel} ${
                        isOpen ? styles.accordionPanelOpen : ""
                      }`}
                      role="region"
                      aria-labelledby={`btn${index}`}
                      style={{ maxHeight: isOpen ? "500px" : "0" }}
                    >
                      {section.content}
                    </div>
                  </section>
                );
              })}
            </div>

            <section
              className={styles.quickStart}
              aria-label="Quick Start Guide"
            >
              <h2 className={styles.quickStartTitle}>
                Quick Start Guide for First-Time Dodgers
              </h2>
              <ul className={styles.quickStartList}>
                <li>
                  <strong>Game Start:</strong> Keep one foot on the back line at
                  start. Run forward to grab a ball from your side’s corner.
                  Don’t cross center line — if you do, you’re OUT.
                </li>
                <li>
                  <strong>Getting Someone Out:</strong> Hit them with a ball =
                  they’re OUT. Catch a ball = thrower is OUT & one teammate
                  returns. Block with your ball — ball stays live, so be alert.
                </li>
                <li>
                  <strong>Keep the Game Moving:</strong> If your team has more
                  balls, you have 10 seconds to throw. After 5 seconds, ref
                  counts. No throw in 10 seconds? You lose your balls to other
                  team.
                </li>
                <li>
                  <strong>Common Mistakes to Avoid:</strong> False starts: 2
                  warnings → play with 5 players. Stepping over center line =
                  OUT. No cheating, swearing, or dangerous throws — you get
                  carded.
                </li>
                <li>
                  <strong>Cards = Penalties:</strong> Yellow Card = 5 min
                  time-out. Red Card = out of game + next 2 matches. 4 yellow
                  cards = match over.
                </li>
                <li>
                  <strong>The Ref is the Boss:</strong> Referee makes calls.
                  Protest up to 2 times/match — only coach can protest.
                </li>
              </ul>
              <p className={styles.quickStartParagraph}>
                See the full official rules in the{" "}
                <a
                  className={styles.quickStartLink}
                  href="https://worlddodgeballfederation.com/wdbf-content/uploads/2024/03/WDBF-Dodgeball-Rules-2024.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  World Dodgeball Federation PDF
                </a>
                .
              </p>
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
