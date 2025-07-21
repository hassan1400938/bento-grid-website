"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/PricingPlans.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPlans() {
  const [activeTab, setActiveTab] = useState("adult");
  const containerRef = useRef(null);
  const adultRef = useRef([]);
  const youthRef = useRef([]);
  const tl = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous timeline if any
    if (tl.current) {
      tl.current.kill();
      tl.current = null;
    }

    tl.current = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 100%",
        end: "top 0%",
        scrub: 1.2,
        toggleActions: "play none none none",
        // markers: true, // toggle off after testing
      },
    });

    tl.current
      .fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(
        activeTab === "adult" ? adultRef.current : youthRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.8"
      );
  }, []);

  // Animate tab change with smooth fade out/in + stagger fade in
  useEffect(() => {
    const cardsToHide =
      activeTab === "adult" ? youthRef.current : adultRef.current;
    const cardsToShow =
      activeTab === "adult" ? adultRef.current : youthRef.current;

    // Fade out other tab cards
    gsap.to(cardsToHide, {
      opacity: 0,
      y: 40,
      duration: 0.4,
      ease: "power2.in",
      pointerEvents: "none",
      stagger: 0.1,
    });

    // Fade in active tab cards after a slight delay
    gsap.fromTo(
      cardsToShow,
      { opacity: 0, y: 40, pointerEvents: "auto" },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        pointerEvents: "auto",
        delay: 0.45,
      }
    );
  }, [activeTab]);

  return (
    <div className="relative">
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
            fill="#F5E2CF"
          />
        </svg>
      </div>

      <div
        className={`${styles.pricingPlan}  relative z-50`}
        ref={containerRef}
      >
        <div className={`${styles.sectionTitle}  relative z-50`}>
          TICKETS &amp; MEMBERSHIPS
        </div>

        <div className={`${styles.toggle}  relative z-50`}>
          <button
            className={activeTab === "adult" ? styles.active : ""}
            onClick={() => setActiveTab("adult")}
          >
            Adult
          </button>
          <button
            className={activeTab === "youth" ? styles.active : ""}
            onClick={() => setActiveTab("youth")}
          >
            Youth
          </button>
        </div>

        <div className={`${styles.plansWrapper}  relative z-50`}>
          {/* Adult Plans */}
          <div
            className={`${styles.plans} ${
              activeTab === "adult" ? styles.active : styles.inactive
            }`}
          >
            {[
              {
                title: "DROP-IN DODGER",
                price: "12,50",
                billing: "Per session",
                features: [
                  "1x Saturday training",
                  "All skill levels welcome",
                  "Includes equipment use",
                ],
                link: "https://scan.gronsdodgeball.nl/payment/form?payment_link=plink_1RNuWuKPJsqZGRQAFNGt76Oz",
                button: "Join now",
                tag: null,
              },
              {
                title: "WEEKLY WARRIOR",
                price: "40",
                billing: "Per month",
                features: [
                  "Unlimited Saturday sessions",
                  "All skill levels welcome",
                  "All equipment use",
                  "Community",
                  "Save €10",
                ],
                link: "https://scan.gronsdodgeball.nl/payment/form?payment_link=plink_1RN0fXKPJsqZGRQAMFyhLYnm",
                button: "Become a Warrior",
                tag: "BEST DEAL",
              },
              {
                title: "DODGEBALL LEGEND",
                price: "15",
                billing: "Per month",
                features: [
                  "All access to sessions",
                  "Support via Adult Sport Fund",
                  "Same benefits as Warrior plan",
                  "Fully Confidential",
                ],
                link: "https://www.volwassenenfonds.nl/app/uploads/2024/12/VF_form_deelnemerskaart_contributie2024.pdf",
                button: "Join via fund",
                tag: "DISCOUNTED",
                extraClass: styles.legend,
              },
            ].map((plan, i) => (
              <div
                key={i}
                ref={(el) => (adultRef.current[i] = el)}
                className={`${styles.plan} ${plan.extraClass || ""}`}
              >
                {plan.tag && (
                  <div className={styles.popularTag}>{plan.tag}</div>
                )}
                <h2>{plan.title}</h2>
                <div className={styles.price}>
                  {plan.price}
                  <span>€ (EUR)</span>
                </div>
                <div className={styles.billed}>{plan.billing}</div>
                <ul className={styles.features}>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a
                  className={styles.getStarted}
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.button}
                </a>
              </div>
            ))}
          </div>

          {/* Youth Plans */}
          <div
            className={`${styles.plans} ${
              activeTab === "youth" ? styles.active : styles.inactive
            }`}
          >
            {[
              {
                title: "SEASONAL PASS",
                price: "300",
                billing: "Per season",
                features: [
                  "40 weeks of dodgeball",
                  "All levels (ages 4–12)",
                  "Guided by experienced trainers",
                  "Includes indoor location",
                  "All equipment provided",
                ],
                button: "Join the waiting list",
                tag: "AGE: 4–12",
              },
              {
                title: "SEASONAL PASS",
                price: "335",
                billing: "Per season",
                features: [
                  "40 weeks of dodgeball",
                  "All levels (ages 12–16)",
                  "Guided by experienced trainers",
                  "Includes indoor location",
                  "All equipment provided",
                ],
                button: "Join the waiting list",
                tag: "AGE: 12–16",
              },
              {
                title: "DODGEBALL LEGEND",
                price: "5",
                billing: "Per month",
                features: [
                  "Access to weekly youth sessions",
                  "Guided by experienced trainers",
                  "Fund-supported membership",
                  "Fully Confidential",
                ],
                button: "Join the waiting list",
                tag: "ALL YOUTH",
                extraClass: styles.legend,
              },
            ].map((plan, i) => (
              <div
                key={i}
                ref={(el) => (youthRef.current[i] = el)}
                className={`${styles.plan} ${plan.extraClass || ""}`}
              >
                {plan.tag && (
                  <div className={styles.popularTag}>{plan.tag}</div>
                )}
                <h2>{plan.title}</h2>
                <div className={styles.price}>
                  {plan.price}
                  <span>€ (EUR)</span>
                </div>
                <div className={styles.billed}>{plan.billing}</div>
                <ul className={styles.features}>
                  {plan.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <button className={styles.getStarted}>{plan.button}</button>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.footer}   relative z-50`}>
          Transaction fees included. Payments secured by <strong>Stripe</strong>
        </div>
      </div>
    </div>
  );
}
