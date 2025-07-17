"use client";

import { useState, useEffect } from "react";
import styles from "../styles/Clinics.module.css";

export default function ClinicsPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [customDuration, setCustomDuration] = useState(false);

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
    <div
      className={`${styles.container} ${showThankYou ? styles.noOutline : ""}`}
    >
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
                onChange={(e) => setCustomDuration(e.target.value === "custom")}
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
          <p>We’ve received your request and will get back to you shortly.</p>
          <button
            className={styles.backBtn}
            onClick={() => setShowThankYou(false)}
          >
            ← Back to form
          </button>
        </div>
      )}
    </div>
  );
}
