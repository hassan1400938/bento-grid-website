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
