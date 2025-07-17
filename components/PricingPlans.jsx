// components/PricingPlans.jsx
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/PricingPlans.module.css";
import gsap from "gsap";

export default function PricingPlans() {
  const [activeTab, setActiveTab] = useState("adult");
  const plansRef = useRef(null);

  useEffect(() => {
    if (plansRef.current) {
      gsap.fromTo(
        plansRef.current.querySelectorAll(`.${styles.plan}`),
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  return (
    <div className={styles.pricingPlan}>
      <div className={styles.sectionTitle}>TICKETS & MEMBERSHIPS</div>
      <div className={styles.toggle}>
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

      <div className={styles.plansWrapper}>
        <div
          className={`${styles.plans} ${
            activeTab === "adult" ? styles.active : ""
          }`}
          ref={activeTab === "adult" ? plansRef : null}
        >
          {/* Adult Plans */}
          <div className={styles.plan}>
            <h2>DROP-IN DODGER</h2>
            <div className={styles.price}>
              12,50<span>€ (EUR)</span>
            </div>
            <div className={styles.billed}>Per session</div>
            <ul className={styles.features}>
              <li>1x Saturday training</li>
              <li>All skill levels welcome</li>
              <li>Includes equipment use</li>
            </ul>
            <a
              className={styles.getStarted}
              href="https://scan.gronsdodgeball.nl/payment/form?payment_link=plink_1RNuWuKPJsqZGRQAFNGt76Oz"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join now
            </a>
          </div>

          <div className={styles.plan}>
            <div className={styles.popularTag}>BEST DEAL</div>
            <h2>WEEKLY WARRIOR</h2>
            <div className={styles.price}>
              40<span>€ (EUR)</span>
            </div>
            <div className={styles.billed}>Per month</div>
            <ul className={styles.features}>
              <li>Unlimited Saturday sessions</li>
              <li>All skill levels welcome</li>
              <li>All equipment use</li>
              <li>Community</li>
              <li>Save €10</li>
            </ul>
            <a
              className={styles.getStarted}
              href="https://scan.gronsdodgeball.nl/payment/form?payment_link=plink_1RN0fXKPJsqZGRQAMFyhLYnm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Become a Warrior
            </a>
          </div>

          <div className={`${styles.plan} ${styles.legend}`}>
            <div className={styles.popularTag}>DISCOUNTED</div>
            <h2>DODGEBALL LEGEND</h2>
            <div className={styles.price}>
              15<span>€ (EUR)</span>
            </div>
            <div className={styles.billed}>Per month</div>
            <ul className={styles.features}>
              <li>All access to sessions</li>
              <li>Support via Adult Sport Fund</li>
              <li>Same benefits as Warrior plan</li>
              <li>Fully Confidential</li>
            </ul>
            <a
              className={styles.getStarted}
              href="https://www.volwassenenfonds.nl/app/uploads/2024/12/VF_form_deelnemerskaart_contributie2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join via fund
            </a>
          </div>
        </div>

        <div
          className={`${styles.plans} ${
            activeTab === "youth" ? styles.active : ""
          }`}
          ref={activeTab === "youth" ? plansRef : null}
        >
          {/* Youth Plans */}
          <div className={styles.plan}>
            <div className={styles.popularTag}>AGE: 4–12</div>
            <h2>SEASONAL PASS</h2>
            <div className={styles.price}>
              300<span>€ (EUR)</span>
            </div>
            <div className={styles.billed}>Per season</div>
            <ul className={styles.features}>
              <li>40 weeks of dodgeball</li>
              <li>All levels (ages 4–12)</li>
              <li>Guided by experienced trainers</li>
              <li>Includes indoor location</li>
              <li>All equipment provided</li>
            </ul>
            <button className={styles.getStarted}>Join the waiting list</button>
          </div>

          <div className={styles.plan}>
            <div className={styles.popularTag}>AGE: 12–16</div>
            <h2>SEASONAL PASS</h2>
            <div className={styles.price}>
              335<span>€ (EUR)</span>
            </div>
            <div className={styles.billed}>Per season</div>
            <ul className={styles.features}>
              <li>40 weeks of dodgeball</li>
              <li>All levels (ages 12–16)</li>
              <li>Guided by experienced trainers</li>
              <li>Includes indoor location</li>
              <li>All equipment provided</li>
            </ul>
            <button className={styles.getStarted}>Join the waiting list</button>
          </div>

          <div className={`${styles.plan} ${styles.legend}`}>
            <div className={styles.popularTag}>ALL YOUTH</div>
            <h2>DODGEBALL LEGEND</h2>
            <div className={styles.price}>
              5<span>€ (EUR)</span>
            </div>
            <div className={styles.billed}>Per month</div>
            <ul className={styles.features}>
              <li>Access to weekly youth sessions</li>
              <li>Guided by experienced trainers</li>
              <li>Fund-supported membership</li>
              <li>Fully Confidential</li>
            </ul>
            <button className={styles.getStarted}>Join the waiting list</button>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        Transaction fees included. Payments secured by <strong>Stripe</strong>
      </div>
    </div>
  );
}
