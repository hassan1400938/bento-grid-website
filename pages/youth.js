import { useEffect, useRef, useState } from "react";
import styles from "../styles/Youth.module.css";
import NavBar from "@/components/NavBar";
import "../app/globals.css";
import Footer from "@/components/Footer";
export default function YouthPage() {
  const [showInfo, setShowInfo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);

  const canvasRef = useRef(null);
  const wordsRef = useRef([]);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const modalRef = useRef(null);

  // ✅ Canvas noise animation effect
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

  // ✅ Animate words + handle escape
  useEffect(() => {
    const timeout = setTimeout(() => {
      wordsRef.current.forEach((el) => el?.classList.add(styles.active));
      subtextRef.current?.classList.add(styles.active);
      ctaRef.current?.classList.add(styles.active);
    }, 200);

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (modalOpen) closeModal();
        else if (showInfo) setShowInfo(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen, showInfo]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    document.getElementById("waitingListForm")?.reset();
  };

  return (
    <>
      <main className={`${styles.app} ${styles.youth}`}>
        {/* ✅ Canvas with working opacity */}
         <canvas
  ref={canvasRef}
  className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${
    showCanvas ? "opacity-[1]" : "opacity-0"
  }`}
  style={{ mixBlendMode: "multiply" }}
/>
        <NavBar />
        <section
          className={`${styles.intro} ${!showInfo ? "" : styles.hidden}`}
        >
          <h1 className={styles.word} ref={(el) => (wordsRef.current[0] = el)}>
            Dodgeball
          </h1>
          <h1 className={styles.word} ref={(el) => (wordsRef.current[1] = el)}>
            Youth
          </h1>
          <h1 className={styles.word} ref={(el) => (wordsRef.current[2] = el)}>
            Is Here
          </h1>
          <p className={styles.subtext} ref={subtextRef}>
            Ages 4–12 & 12–16 · Groningen
          </p>
          <button
            ref={ctaRef}
            className={styles.cta}
            onClick={() => setShowInfo(true)}
          >
            Discover More
          </button>
        </section>

        <section
          className={`${styles.info} ${showInfo ? styles.active : ""}`}
          hidden={!showInfo}
        >
          <h2>Why Parents Choose Our Program</h2>
          <p>
            Youth dodgeball in Groningen is about more than just fun. It’s a
            space for kids to move, play, and grow in a safe and inspiring
            environment.
          </p>

          <div className={styles.features}>
            {[
              [
                "Age-specific Groups",
                "Sessions tailored for ages 4–12 & 12–16, so every child feels included and challenged.",
              ],
              [
                "Teamwork & Social Play",
                "Every session is built around trust, movement, and fun. No pressure, just joy.",
              ],
              [
                "Professional Trainers",
                "Our coaches know how to engage, motivate, and support young athletes.",
              ],
              [
                "Clean Indoor Facility",
                "Top equipment, safe floors, and a clean environment, so you can relax while they play.",
              ],
              [
                "40-Week Program",
                "Weekly dodgeball throughout the year, with breaks during holidays.",
              ],
              [
                "Parent Viewing Area",
                "Our location includes a spot for parents to watch.",
              ],
            ].map(([title, desc], i) => (
              <div className={styles.feature} key={i}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            <button onClick={() => setShowInfo(false)}>Back</button>
            <button onClick={openModal}>Join Waiting List</button>
          </div>
        </section>

        <div
          className={`${styles.modalOverlay} ${modalOpen ? styles.active : ""}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          tabIndex="-1"
          ref={modalRef}
          onClick={(e) => e.target === modalRef.current && closeModal()}
        >
          <div className={styles.modalContent}>
            <button
              className={styles.modalClose}
              onClick={closeModal}
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 id="modalTitle">Join Waiting List</h3>
            <form
              id="waitingListForm"
              action="https://formspree.io/f/mvgrjrzn"
              method="POST"
            >
              <label htmlFor="name">Full Name *</label>
              <input id="name" name="name" type="text" required />

              <label htmlFor="email">Email Address *</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="age">Player Age *</label>
              <select id="age" name="age" required>
                <option value="" disabled>
                  Select age range
                </option>
                <option value="4-12">4-12</option>
                <option value="12-16">12-16</option>
              </select>

              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
