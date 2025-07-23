"use client";

import { useState, useEffect, useRef } from "react";
import styles from "../styles/Clinics.module.css";
import NavBar from "@/components/NavBar";
import "../app/globals.css";
import Footer from "@/components/Footer";

export default function ClinicsPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [customDuration, setCustomDuration] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const canvasRef = useRef(null); // ✅ canvas ref

  // ✅ Canvas noise effect (same as YouthPage)
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

   const drawNoise = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  const dotCount = 4000;
  for (let i = 0; i < dotCount; i++) {
    const x = Math.random() * w;
    const y = Math.random() * h;
    const radius = Math.random() * 2 + 0.5;
    const alpha = Math.random() * 0.2 + 0.1; // keep low alpha

    const r = Math.floor(200 + Math.random() * 55); // brighter range
    const g = Math.floor(200 + Math.random() * 55);
    const b = Math.floor(200 + Math.random() * 55);

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

    let hasStarted = false;

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;
      setShowCanvas(true);
      animationFrame = requestAnimationFrame(loop);
      window.removeEventListener("scroll", startAnimation);
      window.removeEventListener("wheel", startAnimation);
    };

    window.addEventListener("scroll", startAnimation);
    window.addEventListener("wheel", startAnimation);

    // fallback in case scroll never happens
    const timeout = setTimeout(startAnimation, 3000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("scroll", startAnimation);
      window.removeEventListener("wheel", startAnimation);
    };
  }, []);

  // ✅ Set min date on mount
  useEffect(() => {
    const minDate = new Date().toISOString().split("T")[0];
    const dateInput = document.getElementById("date");
    if (dateInput) dateInput.min = minDate;
  }, []);

  const adjustTime = (minutes) => {
    const input = document.getElementById("timeInput");
    if (!input.value) input.value = "09:00";
    let [h, m] = input.value.split(":").map(Number);
    let total = h * 60 + m + minutes;
    total = Math.max(540, Math.min(1260, total));
    const newH = String(Math.floor(total / 60)).padStart(2, "0");
    const newM = String(total % 60).padStart(2, "0");
    input.value = `${newH}:${newM}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const participants = parseInt(form.participants.value);
    if (participants < 15) {
      alert("Minimum of 15 participants required.");
      return;
    }

    if (
      form.duration.value === "custom" &&
      form.customDuration.value.trim().length < 5
    ) {
      alert("Please describe your custom duration.");
      return;
    }

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setShowThankYou(true);
      form.reset();
      setCustomDuration(false);
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  };

  return (
    <>
      <div
        className={`${styles.clinics} top-0 left-0 flex flex-col items-center text-black w-full overflow-auto h-full`}
      >
          <canvas
         ref={canvasRef}
         className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${
           showCanvas ? "opacity-[1]" : "opacity-0"
         }`}
         style={{ mixBlendMode: "multiply" }}
       />
        <NavBar />

        <div
          className={`${styles.container} ${
            showThankYou ? styles.noOutline : ""
          }`}
        >
          {/* ✅ Canvas with fade-in opacity */}

          {!showThankYou && (
            <div id="form-section">
              <h1 className={styles.h1}>Clinics & Team Building</h1>
              <form
                className={styles.form}
                method="POST"
                action="https://formspree.io/f/mwpbdbvd"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="_redirect" value="thank-you.html" />

                <div>
                  <label htmlFor="groupType">Group Type</label>
                  <select
                    id="groupType"
                    name="groupType"
                    required
                    className={styles.select}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="private">Private</option>
                    <option value="business">Business</option>
                    <option value="school">School / Club</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date">Preferred Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    required
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="timeInput">Preferred Start Time</label>
                  <div className={styles.timePicker}>
                    <button type="button" onClick={() => adjustTime(-15)}>
                      –
                    </button>
                    <input
                      type="time"
                      id="timeInput"
                      name="time"
                      required
                      step="900"
                    />
                    <button type="button" onClick={() => adjustTime(15)}>
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="participants">Number of Participants</label>
                  <input
                    type="number"
                    id="participants"
                    name="participants"
                    required
                    min="15"
                    placeholder="Minimum 15"
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="duration">Session Duration</label>
                  <select
                    id="duration"
                    name="duration"
                    required
                    className={styles.select}
                    onChange={(e) =>
                      setCustomDuration(e.target.value === "custom")
                    }
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="1.5">1.5 hours</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="custom">Custom</option>
                  </select>
                  {customDuration && (
                    <input
                      type="text"
                      id="customDuration"
                      name="customDuration"
                      placeholder="Describe your request"
                      required
                      className={styles.customDurationInput}
                    />
                  )}
                </div>

                <div>
                  <label htmlFor="contactName">Contact Name</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className={styles.input}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">Email Address</label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    required
                    className={styles.input}
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Book Now
                </button>
              </form>
            </div>
          )}

          {showThankYou && (
            <div className={styles.thankYou} role="alert" aria-live="polite">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                fill="none"
                stroke="#0d0c0b"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <h1>Thank you for your booking!</h1>
              <p>
                We’ve received your request and will get back to you shortly.
              </p>
              <button
                className={styles.backBtn}
                onClick={() => setShowThankYou(false)}
              >
                ← Back to form
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
