"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/PrivacyPolicy.module.css";
import "../app/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <ul>
        <li>
          Personal Identification: Name, email, phone, birthdate, address.
        </li>
        <li>Payment Information for fees and purchases.</li>
        <li>Technical Data: IP, browser, access times.</li>
        <li>Event Participation Data: Attendance, performance, feedback.</li>
        <li>Media: Photos/videos during events, with consent.</li>
      </ul>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul>
        <li>Manage dodgeball sessions and events.</li>
        <li>Process payments and registrations.</li>
        <li>Communicate updates and promotions.</li>
        <li>Improve services and customer experience.</li>
        <li>Comply with legal obligations and protect rights.</li>
      </ul>
    ),
  },
  {
    title: "3. Sharing Your Information",
    content: (
      <p>
        We do not share personal data with third parties unless required by law,
        to protect our rights, or with your consent. Anonymized data may be
        shared for statistics.
      </p>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <p>
        We implement industry-standard measures to protect your data, but cannot
        guarantee absolute security.
      </p>
    ),
  },
  {
    title: "5. Your Rights",
    content: (
      <ul>
        <li>Access, correct, or delete your personal info.</li>
        <li>Withdraw consent for data processing.</li>
        <li>Request data copy in portable format.</li>
        <li>Lodge complaint with supervisory authority if needed.</li>
      </ul>
    ),
  },
  {
    title: "6. Data Retention",
    content: (
      <p>
        We keep personal info only as long as necessary for the stated purposes,
        legal compliance, or dispute resolution.
      </p>
    ),
  },
  {
    title: "7. Updates to This Policy",
    content: (
      <p>
        We may update this policy periodically. The latest version is always on
        our website.
      </p>
    ),
  },
  {
    title: "8. Contact Us",
    content: (
      <p>
        Questions or requests? Contact us at:
        <br />
        <a href="mailto:gronsdodgeball@gmail.com">gronsdodgeball@gmail.com</a>
      </p>
    ),
  },
  {
    title: "9. Consent",
    content: (
      <>
        <p>
          By participating in our events or using our services, you consent to
          the collection and use of your personal information as described in
          this Privacy Policy.
        </p>
        <p>Thank you for trusting and supporting Gron’s Dodgeball.</p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  const panelRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const canvasRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // ✅ Noise Canvas Effect
 useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const dpr = window.devicePixelRatio || 1;
    
      const setSize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        canvas.style.width = w + "px";
        canvas.style.height = h + "px";
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        ctx.scale(dpr, dpr);
      };
      setSize();
      window.addEventListener("resize", setSize);
    
      let animationFrame;
      let lastDraw = 0;
      const fps = 12;
      const interval = 1000 / fps;
      let isAnimating = false;
      let inactivityTimeout;
    
      const drawNoise = () => {
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        ctx.clearRect(0, 0, w, h);
    
        const dotCount = 1000;
      for (let i = 0; i < dotCount; i++) {
  const x = Math.random() * w;
  const y = Math.random() * h;
  const radius = Math.random() * 0.5 + 0.5;
  const alpha = Math.random() * 0.2 + 0.1;

  // Randomly pick black or orange
  const isOrange = Math.random() < 0.5; // 50% chance
  let r, g, b;

  if (isOrange) {
    r = 255;
    g = 165;
    b = 0;
  } else {
    r = 0;
    g = 0;
    b = 0;
  }

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
  ctx.fill();
}

      };
    
      const loop = (now) => {
        if (now - lastDraw > interval) {
          drawNoise();
          lastDraw = now;
        }
        animationFrame = requestAnimationFrame(loop);
      };
    
      const startAnimation = () => {
        if (!isAnimating) {
          isAnimating = true;
          setShowCanvas(true);
          animationFrame = requestAnimationFrame(loop);
        }
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(stopAnimation, 30); // stop if no activity for 800ms
      };
    
      const stopAnimation = () => {
        if (isAnimating) {
          cancelAnimationFrame(animationFrame);
          isAnimating = false;
        }
      };
    
      // Events that trigger animation
      const handleUserActivity = () => {
        startAnimation();
      };
    
      window.addEventListener("mousemove", handleUserActivity);
      window.addEventListener("scroll", handleUserActivity);
      window.addEventListener("wheel", handleUserActivity);
    
      // Draw one static frame at start
      drawNoise();
    
      return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(inactivityTimeout);
        window.removeEventListener("resize", setSize);
        window.removeEventListener("mousemove", handleUserActivity);
        window.removeEventListener("scroll", handleUserActivity);
        window.removeEventListener("wheel", handleUserActivity);
      };
    }, []);

  return (
    <>
      <div className="text-black top-0 h-full w-full left-0">
           <canvas
  ref={canvasRef}
  className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${
    showCanvas ? "opacity-[1]" : "opacity-0"
  }`}
  style={{ mixBlendMode: "multiply" }}
/>
        <NavBar />
        <div className={styles.bodyWrapper}>
          {/* ✅ Canvas background */}

          <main className={styles.main}>
            <h1 className={styles.title}>Privacy Policy</h1>

            <div
              className={styles.accordion}
              role="region"
              aria-label="Privacy Policy"
            >
              {sections.map((section, index) => (
                <section className={styles.accordionItem} key={index}>
                  <button
                    className={styles.accordionButton}
                    aria-expanded={activeIndex === index}
                    aria-controls={`sec${index}`}
                    id={`btn${index}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    {section.title}
                  </button>
                  <div
                    className={`${styles.accordionPanel} ${
                      activeIndex === index ? styles.accordionPanelOpen : ""
                    }`}
                    id={`sec${index}`}
                    role="region"
                    aria-labelledby={`btn${index}`}
                    ref={(el) => (panelRefs.current[index] = el)}
                    style={{
                      maxHeight:
                        activeIndex === index && panelRefs.current[index]
                          ? panelRefs.current[index].scrollHeight + "px"
                          : null,
                    }}
                    tabIndex={0}
                  >
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
