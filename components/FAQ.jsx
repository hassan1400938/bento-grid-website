"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/FAQ.module.css";

const initialFaqs = [
  {
    q: "What is Dodgeball?",
    a: "Dodgeball is a fast-paced, team-based sport where you dodge, throw, and catch soft foam balls to eliminate the other team.",
  },
  {
    q: "What is the average age of the players?",
    a: "Our players range from 4 to 50 years old. We welcome youth, students, professionals, and everyone in between.",
  },
  {
    q: "When and where do you play?",
    a: "We play on Saturday morning / afternoons. In winter we’re indoors, and if the weather is good, we play outside.",
  },
  {
    q: "How much does it cost?",
    a: "We offer day passes and memberships. Prices are kept accessible, and funds are available if needed.",
  },
  {
    q: "Do you offer any financial support?",
    a: "Yes! You can apply for support through the Volwassenenfonds (for adults) or Jeugdfonds (for youth).",
  },
  {
    q: "What if I have a Stadjerspas?",
    a: "We offer a discount through Stadjerspas. Please see Funds & Accessibility for more information.",
  },
  {
    q: "What should I wear?",
    a: "Wear something sporty — indoor shoes, a t-shirt, shorts or joggers, and bring a water bottle.",
  },
  {
    q: "Can I bring a friend?",
    a: "Absolutely! A familiar face on court makes it even more fun.",
  },
  {
    q: "Can I try before committing?",
    a: "Yes! You can join for a single session without a membership. Perfect to try it out!",
  },
  { q: "Is this competitive or just for fun?", a: "Both!" },
  {
    q: "Do you play when it rains?",
    a: "Yes, we go indoors when the weather is bad.",
  },
  { q: "Can I join anytime?", a: "Yes, new players are welcome year-round." },
  {
    q: "Do you offer youth sessions?",
    a: "Yes! Starting in the 2025/2026 season, we’re launching sessions for 4 to 18 years old.",
  },
  {
    q: "What if I can’t afford a membership?",
    a: "No stress, we’ve got flexible options and partner funds to help.",
  },
  { q: "Do you have more locations?", a: "Not yet, but we’re working on it!" },
  {
    q: "What location are the sessions at?",
    a: "We aim to play in or near the city centre. Indoor during colder months, outdoor when it’s sunny.",
  },
  {
    q: "Is there more after dodgeball?",
    a: "Yes, we’re having a community where people meet and connect after the games.",
  },
  {
    q: "Is it like the high school game?",
    a: "Pretty much, but with a sporty twist.",
  },
  {
    q: "Can I become a trainer?",
    a: "We’re always looking for new trainers, for both adults and youth groups. Please contact us.",
  },
  {
    q: "When did Gron’s Dodgeball start?",
    a: "We started in 2025, in Groningen, the first foam dodgeball community in the Netherlands.",
  },
  {
    q: "What does Gron’s Dodgeball stand for?",
    a: "Gron’s is short for Groningen. Dodgeball speaks for itself. Together it stands for fun, movement, and community.",
  },
  { q: "How long is a session?", a: "All sessions are 90+ minutes long." },
  {
    q: "How long is a ticket valid?",
    a: "A Drop-In Dodger ticket is valid for 7 days after purchase.",
  },
  {
    q: "I’m sick and can’t come, what happens to my ticket?",
    a: "Let us know 24h in advance, and we’ll extend it by 7 days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We use Stripe, pay with iDEAL, Apple Pay, Google Pay, or credit card.",
  },
  {
    q: "Can I join through ACLO?",
    a: "Yes! Through the ACLO site you can join our courses.",
  },
];

const translations = {
  prijs: "cost",
  locatie: "location",
  trainer: "trainer",
  kleding: "wear",
  vriend: "friend",
  sessie: "session",
  jeugd: "youth",
  weer: "weather",
  proef: "try",
  korting: "discount",
  betaling: "payment",
  aanmelden: "join",
};

export default function FaqPage() {
  const [faqs, setFaqs] = useState(initialFaqs);
  const [showAll, setShowAll] = useState(false);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const translateQuery = (q) => {
    for (const [nl, en] of Object.entries(translations)) {
      if (q.toLowerCase().includes(nl)) return en;
    }
    return q;
  };

  const handleSearch = (e) => {
    const query = translateQuery(e.target.value);
    setSearch(query);
    const results = initialFaqs.filter((faq) =>
      (faq.q + faq.a).toLowerCase().includes(query.toLowerCase())
    );
    setFaqs(results);
    setShowAll(true);
    setShowForm(results.length === 0);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch("https://formspree.io/f/xovwnnpe", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setSearch("");
      setFaqs(initialFaqs);
      setShowAll(false);
    }, 5000);
  };

  return (
    <div className={styles.faq}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Frequently Asked Questions</h1>
          <p>Everything you might want to know about the dodgeball fun.</p>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="What are you looking for?"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className={styles.faqList}>
          {(showAll ? faqs : faqs.slice(0, 5)).map((faq, i) => (
            <details key={i} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                {faq.q}
                <span className={styles.toggle}>+</span>
              </summary>
              <div className={styles.faqAnswer}>{faq.a}</div>
            </details>
          ))}
        </div>

        {showForm && !submitted && (
          <form className={styles.form} onSubmit={handleFormSubmit}>
            <p>We couldn’t find your question. Ask us directly:</p>
            <input name="name" placeholder="Your Name" required />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              required
            />
            <textarea name="message" placeholder="Your question" required />
            <button type="submit">Send</button>
          </form>
        )}

        {submitted && (
          <div className={styles.thankYou}>
            Thank you for your question! We'll get back to you soon.
          </div>
        )}

        {faqs.length > 5 && (
          <button
            className={styles.showMore}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Show fewer questions" : "Show all questions"}
          </button>
        )}
      </div>
    </div>
  );
}
