"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/About.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardContainerRef = useRef(null);
  const quoteRef = useRef(null);
  const introRef = useRef(null);
  const whyLoveRef = useRef(null);
  const listItemRefs = useRef([]);
  const lastParagraphRef = useRef(null);

  useEffect(() => {
    listItemRefs.current = []; // clear list on re-render
  }, []);

  const addToListRefs = (el) => {
    if (el && !listItemRefs.current.includes(el)) {
      listItemRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 30%",
          scrub: 1.2,
        },
      });

      // Card animation
      gsap.from(cardContainerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Inner content stagger
      gsap
        .timeline({
          scrollTrigger: {
            trigger: cardContainerRef.current,
            start: "top 75%",
          },
        })
        .from(quoteRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.6,
        })
        .from(
          introRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          whyLoveRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "-=0.4"
        )
        .from(
          listItemRefs.current,
          {
            opacity: 0,
            y: 15,
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.4"
        )
        .from(
          lastParagraphRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative z-[50] ">
      {/* Decorative Top Curve */}

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
            fill="#F1EEE7"
          />
        </svg>
      </div>

      <section className={styles.about}>
        <main className={styles.main}>
          {/* Section Title */}
          <h2 ref={titleRef} className={styles.sectionTitle}>
            ABOUT US
          </h2>

          {/* Card Content */}
          <div className={styles.cardContainer} ref={cardContainerRef}>
            <article className={styles.card} aria-label="About Us Info">
              <blockquote className={styles.quote} ref={quoteRef}>
                <strong>“TURNS OUT, A LOT OF OTHERS</strong>
                <br />
                <strong>WERE LOOKING FOR THE SAME THING.”</strong>
              </blockquote>

              <p className={styles.intro} ref={introRef}>
                Gron’s Dodgeball began with a few balls, a gym, and a group of
                strangers...
              </p>

              <p className={styles.paragraph} ref={whyLoveRef}>
                Why people love playing with us:
              </p>

              <ul className={styles.features}>
                {[
                  {
                    text: "A Real Community:",
                    desc: " Friendships form on and off the court.",
                  },
                  {
                    text: "Just Show Up:",
                    desc: " No teams, no pressure, just fun.",
                  },
                  {
                    text: "Play for Joy:",
                    desc: " Reignite your playful spirit.",
                  },
                  {
                    text: "Open to All:",
                    desc: " Everyone is welcome, no experience needed.",
                  },
                ].map(({ text, desc }, i) => (
                  <li key={i} ref={addToListRefs}>
                    <strong>{text}</strong> {desc}
                  </li>
                ))}
              </ul>

              <p className={styles.paragraph} ref={lastParagraphRef}>
                Gron’s Dodgeball is more than a sport. It's about connection,
                laughter, and rediscovering the joy of community.
              </p>
            </article>
          </div>
        </main>
      </section>
    </div>
  );
}
