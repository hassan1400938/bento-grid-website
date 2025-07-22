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
