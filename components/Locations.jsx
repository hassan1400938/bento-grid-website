"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Locations.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOCATIONS = [
  {
    name: "Groningen",
    desc: "Where it all started — a growing hub of dodgeball energy and fun.",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.034727891509!2d6.563734315859589!3d53.21938337997797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c9cd1c7839e5a5%3A0x400f7d1c6978b30!2sGroningen!5e0!3m2!1sen!2snl!4v1620000000000!5m2!1sen!2snl",
    fallback: "https://maps.app.goo.gl/WbDs1m1ttMfNjoUk9",
  },
  {
    name: "Leeuwarden",
    tag: "COMING SOON",
    desc: "Frisian flair meets team spirit. Dodgeball is rolling in soon!",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2382.034727891509!2d5.799913315859589!3d53.20123337997797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c8f4544b1e5b5d%3A0x400f7d1c6978b30!2sLeeuwarden!5e0!3m2!1sen!2snl!4v1620000000000!5m2!1sen!2snl",
    fallback: "https://maps.app.goo.gl/SDCr96G3vLPLq9g97",
  },
  {
    name: "Utrecht",
    tag: "COMING SOON",
    desc: "Central, energetic, and ready to play — we're coming for you.",
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19510.11728464429!2d5.1095992!3d52.0907374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c66f4339d34d07%3A0x400f7d1c6978b30!2sUtrecht!5e0!3m2!1sen!2snl!4v1620000000000!5m2!1sen!2snl",
    fallback: "https://maps.app.goo.gl/JsUtMm1fShnULVF68",
  },
];

export default function Locations() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cardRefs = useRef([]);
  const modalRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xjkrqpyl", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => setModalOpen(false), 2000);
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      alert("Error submitting form.");
    }
  };

  useEffect(() => {
    // Animate each card on scroll
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 50, scale: 0.95 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
              markers: false, // change to true to debug
            },
            delay: i * 0.15,
          }
        );
      });
    }, cardRefs);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate modal open/close fade in/out
    if (modalOpen && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { autoAlpha: 0, scale: 0.9 },
        { autoAlpha: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [modalOpen]);

  return (
    <div className={`${styles.locations} relative z-[50]`}>
      <div className="absolute -top-[3px] sm:-top-[4px] md:-top-[7px] z-[70] left-0 w-full">
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

      <div className={styles.locations}>
        <div className={styles.page}>
          <h2 className={styles.sectionTitle}>OUR LOCATIONS</h2>

          <div className={styles.plans}>
            {LOCATIONS.map((loc, i) => (
              <div
                key={i}
                className={styles.card}
                ref={(el) => (cardRefs.current[i] = el)}
                style={{ transformOrigin: "center center" }}
              >
                {loc.tag && <div className={styles.tag}>{loc.tag}</div>}
                <h3 className={styles.city}>{loc.name}</h3>
                <div className={styles.map}>
                  <iframe
                    src={loc.src}
                    loading="lazy"
                    allowFullScreen
                    className={styles.iframe}
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <div className={styles.fallback}>
                    <p>Interactive map couldn't load</p>
                    <a href={loc.fallback} target="_blank" rel="noreferrer">
                      View {loc.name} on Google Maps
                    </a>
                  </div>
                </div>
                <p className={styles.desc}>{loc.desc}</p>
              </div>
            ))}

            <div className={`${styles.card} ${styles.request}`}>
              <h3>Your City Next?</h3>
              <p>
                Want dodgeball in your town? Let us know where we should launch
                next.
              </p>
              <button
                className={styles.button}
                onClick={() => {
                  setSubmitted(false);
                  setModalOpen(true);
                }}
              >
                Request a City
              </button>
            </div>
          </div>

          {modalOpen && (
            <div
              className={styles.modalOverlay}
              onClick={(e) =>
                e.target === e.currentTarget && setModalOpen(false)
              }
            >
              <div className={styles.modal} ref={modalRef}>
                <span
                  className={styles.close}
                  onClick={() => setModalOpen(false)}
                >
                  &times;
                </span>
                <h3 className={styles.modalTitle}>Request a New Location</h3>
                {!submitted ? (
                  <form className={styles.form} onSubmit={onSubmit}>
                    <label className={styles.label} htmlFor="city">
                      City Name*
                    </label>
                    <input
                      className={styles.input}
                      id="city"
                      name="city"
                      type="text"
                      required
                      placeholder="Which city should we expand to?"
                    />
                    <button className={styles.submit} type="submit">
                      Submit Request
                    </button>
                  </form>
                ) : (
                  <div className={styles.success}>
                    Thank you! Your request has been submitted.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
