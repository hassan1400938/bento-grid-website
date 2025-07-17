import React, { useState } from "react";
import styles from "../styles/ContactForm.module.css";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

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
    <div className={`${styles.container} ${styles.contact}`}>
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
        >
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            required
          />
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            required
          />
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            required
          />
          <input type="hidden" name="_subject" value="Contact Form Website" />
          <input
            type="submit"
            id="submit"
            className={styles.submit}
            value="Send"
          />
        </form>
      ) : (
        <div id="thankyou-message" className={styles.thankyou}>
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
  );
}
