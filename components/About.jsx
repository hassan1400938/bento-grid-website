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
                <strong>WERE LOOKING FOR THE SAME THING.”</strong>
              </blockquote>

              <p className={styles.intro} ref={introRef}>
                Gron’s Dodgeball began with a few balls, a gym, and a group of
                strangers who quickly found out that laughing together was the
                best workout. Today, we’ve grown into a welcoming community.
                It's full of energy, good vibes, and a love for the fun chaos
                that only dodgeball brings.
              </p>

              <p className={styles.paragraph} ref={whyLoveRef}>
                Why people love playing with us:
              </p>

              <ul className={styles.features}>
                {[
                  {
                    text: "A Real Community:",
                    desc: " We celebrate great catches, laugh at the wild misses, and share high-fives, jokes, and even water bottles.",
                  },
                  {
                    text: "Just Show Up:",
                    desc: " No experience needed. Just bring clean indoor shoes and an open mind. We’ll take care of the rest.",
                  },
                  {
                    text: "Play for Joy:",
                    desc: " We keep score, sure. But the real wins are the bad rhymes, team names, and inside jokes that stick with you.",
                  },
                  {
                    text: "Open to All:",
                    desc: " Weekly games, youth sessions, beginners and veterans. Everyone has a place here, no matter your age or level.",
                  },
                ].map(({ text, desc }, i) => (
                  <li key={i} ref={addToListRefs}>
                    <strong>{text}</strong> {desc}
                  </li>
                ))}
              </ul>

              <p className={styles.paragraph} ref={lastParagraphRef}>
                Gron’s Dodgeball is more than a sport. It's about connection,
                movement, and fun you didn’t know you needed. Whether you're
                competitive, shy, new or just curious, we’ve got room for you.
                Come join us. Your spot is already waiting.
              </p>
            </article>
          </div>
        </main>
      </section>
    </div>
  );
}
