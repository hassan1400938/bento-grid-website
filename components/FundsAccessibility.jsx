"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/FundsAccessibility.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FundsAccessibility() {
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const footerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "top 30%",
          scrub: 0.5,
          // markers: true,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=1"
      );

      tl.fromTo(
        cardRefs.current,
        { y: 80, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.25 },
        "-=0.8"
      );

      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalVisible(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openModal = () => {
    setModalVisible(true);
    setSubmitted(false);
    setTimeout(() => {
      nameRef.current?.focus();
      gsap.from(`.${styles.modal} > div`, {
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }, 100);
  };

  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const res = await fetch(form.action, {
      method: form.method,
      headers: { Accept: "application/json" },
      body: data,
    });

    if (res.ok) setSubmitted(true);
    else alert("Oops! There was a problem submitting your form.");
  };

  return (
    <div ref={sectionRef} className="relative z-[50]">
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

      <div className={`${styles.container}  relative z-50`}>
        <div className={styles.sectionTitle} ref={titleRef}>
          Funds & Accessibility
        </div>

        <div className={`${styles.plansWrapper} relative z-60`}>
          <div className={styles.plans}>
            {[
              {
                tag: "Groningen Only",
                title: "Stadjerspas credit",
                price: "€40",
                unit: "/year",
                billed: "Applies to memberships",
                features: [
                  "Applicable on Membership",
                  "Requires active Stadjerspas",
                ],
                link: "https://www.stadjerspas.nl/",
                linkLabel: "Apply",
              },
              {
                tag: "16 & Up",
                title: "Adult Fund",
                price: "€15",
                unit: "/month",
                billed: "Supported by Volwassenenfonds",
                features: [
                  "40 weeks of dodgeball access",
                  "Guided by experienced trainers",
                  "Equipment included",
                  "Community",
                ],
                link: "https://www.volwassenenfonds.nl/",
                linkLabel: "Apply",
              },
              {
                tag: "Age 4–16",
                title: "Youth Fund",
                price: "€5",
                unit: "/month",
                billed: "Via Jeugdfonds Sport & Cultuur",
                features: [
                  "Weekly dodgeball sessions",
                  "Experienced trainers & gear",
                  "Available for ages 4–16",
                ],
                isWaitingList: true,
              },
            ].map((plan, i) => (
              <div
                className={styles.plan}
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <div className={styles.popularTag}>{plan.tag}</div>
                <h2>{plan.title}</h2>
                <div className={styles.price}>
                  {plan.price}
                  <span>{plan.unit}</span>
                </div>
                <div className={styles.billed}>{plan.billed}</div>
                <ul className={styles.features}>
                  {plan.features.map((f, j) => (
                    <li key={j}>{f}</li>
                  ))}
                </ul>
                {plan.isWaitingList ? (
                  <button className={styles.getStarted} onClick={openModal}>
                    Join the waiting list
                  </button>
                ) : (
                  <a
                    className={styles.getStarted}
                    href={plan.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {plan.linkLabel}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.footer}  relative z-50`} ref={footerRef}>
          Not sure where to start? <a href="#faq">See our FAQ</a>
        </div>

        {modalVisible && (
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
            onClick={(e) => {
              if (e.target.classList.contains(styles.modal)) closeModal();
            }}
          >
            <div>
              <button
                className={styles.closeModal}
                onClick={closeModal}
                aria-label="Close waiting list form"
              >
                ×
              </button>
              <h2 id="modalTitle">Join Waiting List</h2>

              {!submitted ? (
                <form
                  id="waitingListForm"
                  action="https://formspree.io/f/mvgrjrzn"
                  method="POST"
                  onSubmit={handleSubmit}
                >
                  <label htmlFor="wl-name">Name</label>
                  <input
                    ref={nameRef}
                    type="text"
                    id="wl-name"
                    name="name"
                    required
                    autoComplete="name"
                  />
                  <label htmlFor="wl-email">Email</label>
                  <input
                    type="email"
                    id="wl-email"
                    name="email"
                    required
                    autoComplete="email"
                  />
                  <label htmlFor="wl-age">Age of player</label>
                  <input
                    type="number"
                    id="wl-age"
                    name="age"
                    required
                    min="1"
                    max="100"
                  />
                  <button type="submit">Submit</button>
                </form>
              ) : (
                <div
                  className={styles.thankYou}
                  id="wl-thankyou"
                  role="alert"
                  tabIndex="0"
                >
                  Thanks for joining the waiting list! We'll be in touch soon.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
