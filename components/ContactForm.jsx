import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/ContactForm.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  // Refs for main container, form, thank you message
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const thankYouRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate container scale and fade in on scroll
      gsap.fromTo(
        containerRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate form inputs and submit button on form mount
  useEffect(() => {
    if (submitted) return; // skip if submitted

    if (formRef.current) {
      const inputs = formRef.current.querySelectorAll("input, textarea");

      gsap.fromTo(
        inputs,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [submitted]);

  // Animate thank-you message on show
  useEffect(() => {
    if (!submitted) return;

    if (thankYouRef.current) {
      gsap.fromTo(
        thankYouRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="relative">
      <div className="absolute -top-[3px] sm:-top-[4px] md:-top-[7px] z-[70] left-0 w-full">
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

      <div
        className={`${styles.container} ${styles.contact} relative z-50`}
        ref={containerRef}
      >
        <a href="https://rfdd.ru/" target="_blank" rel="noreferrer">
          <div className={styles.logoHeader}></div>
        </a>

        <div className={styles.sectionTitle}>CONTACT US</div>

        {!submitted ? (
          <form
            id="form"
            className={styles.form}
            action="https://formspree.io/f/xovwnnpe"
            method="POST"
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              style={{ opacity: 0 }}
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
              style={{ opacity: 0 }}
            />
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              required
              style={{ opacity: 0 }}
            />
            <input type="hidden" name="_subject" value="Contact Form Website" />
            <input
              type="submit"
              id="submit"
              className={styles.submit}
              value="Send"
              style={{ opacity: 0 }}
            />
          </form>
        ) : (
          <div
            id="thankyou-message"
            className={styles.thankyou}
            ref={thankYouRef}
          >
            <h2>Thank you for your message!</h2>
            <button
              id="send-another"
              className={styles.submit}
              onClick={() => setSubmitted(false)}
            >
              Send another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
