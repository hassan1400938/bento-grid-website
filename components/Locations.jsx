// Locations.jsx
import React, { useState } from "react";
import styles from "../styles/Locations.module.css";

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

  return (
    <div className={styles.locations}>
      <div className={styles.page}>
        <h2 className={styles.sectionTitle}>OUR LOCATIONS</h2>

        <div className={styles.plans}>
          {LOCATIONS.map((loc, i) => (
            <div key={i} className={styles.card}>
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
            onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          >
            <div className={styles.modal}>
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
  );
}
