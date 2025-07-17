"use client";

import { useState } from "react";
import styles from "../styles/CodeOfConduct.module.css";

const sections = [
  {
    title: "1. Everyone is welcome",
    content: (
      <>
        <p>
          Gron’s Dodgeball is open to everyone aged 16 and up — regardless of
          background, gender identity, skill level, or experience.
        </p>
        <ul>
          <li>
            We treat each other with respect, openness, and without judgment.
          </li>
          <li>Discrimination, bullying, or exclusion will not be tolerated.</li>
        </ul>
      </>
    ),
  },
  {
    title: "2. Respect is key",
    content: (
      <>
        <p>A great atmosphere starts with how we treat one another:</p>
        <ul>
          <li>Be fair and respectful to all players</li>
          <li>Accept the decisions of referees or organizers</li>
          <li>No swearing, or intimidating behavior</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. No (physical) violence – ever",
    content: (
      <>
        <p>Let’s be clear:</p>
        <p>
          Physical or threatening behavior is never acceptable and results in
          suspension or removal.
        </p>
      </>
    ),
  },
  {
    title: "4. Fair play makes better games",
    content: (
      <ul>
        <li>Got hit? You’re out — be honest about it</li>
        <li>Cheating kills the fun for everyone</li>
        <li>Winning is great, but playing fair is more important</li>
      </ul>
    ),
  },
  {
    title: "5. Safety first",
    content: (
      <ul>
        <li>Avoid throwing balls at heads</li>
        <li>No reckless or dangerous play</li>
        <li>Speak up if you feel unsafe</li>
      </ul>
    ),
  },
  {
    title: "6. We're stronger together",
    content: (
      <ul>
        <li>New players are welcomed and supported</li>
        <li>We encourage and uplift each other</li>
        <li>Fun and good vibes are part of every session</li>
      </ul>
    ),
  },
  {
    title: "If the code is broken",
    content: (
      <>
        <ul>
          <li>Warnings may be given</li>
          <li>Temporary suspensions possible</li>
          <li>Repeated or serious violations lead to permanent exclusion</li>
        </ul>
        <p>
          Let’s keep it fun, safe, and positive for everyone. Thanks for being
          part of Gron's Dodgeball!
        </p>
      </>
    ),
  },
];

export default function CodeOfConduct() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <h1 className={styles.heading}>Code of Conduct</h1>

        <div role="region" aria-label="Code of Conduct">
          {sections.map((section, index) => {
            const isOpen = openIndex === index;
            return (
              <section key={index} className={styles.accordionItem}>
                <button
                  className={styles.accordionButton}
                  aria-expanded={isOpen}
                  aria-controls={`sec${index}`}
                  id={`btn${index}`}
                  onClick={() => toggleAccordion(index)}
                >
                  {section.title}
                </button>
                <div
                  id={`sec${index}`}
                  className={`${styles.accordionPanel} ${
                    isOpen ? styles.accordionPanelOpen : ""
                  }`}
                  role="region"
                  aria-labelledby={`btn${index}`}
                  style={{ maxHeight: isOpen ? "500px" : "0" }}
                >
                  {section.content}
                </div>
              </section>
            );
          })}
        </div>

        <section className={styles.quickStart} aria-label="Quick Start Guide">
          <h2 className={styles.quickStartTitle}>
            Quick Start Guide for First-Time Dodgers
          </h2>
          <ul className={styles.quickStartList}>
            <li>
              <strong>Game Start:</strong> Keep one foot on the back line at
              start. Run forward to grab a ball from your side’s corner. Don’t
              cross center line — if you do, you’re OUT.
            </li>
            <li>
              <strong>Getting Someone Out:</strong> Hit them with a ball =
              they’re OUT. Catch a ball = thrower is OUT & one teammate returns.
              Block with your ball — ball stays live, so be alert.
            </li>
            <li>
              <strong>Keep the Game Moving:</strong> If your team has more
              balls, you have 10 seconds to throw. After 5 seconds, ref counts.
              No throw in 10 seconds? You lose your balls to other team.
            </li>
            <li>
              <strong>Common Mistakes to Avoid:</strong> False starts: 2
              warnings → play with 5 players. Stepping over center line = OUT.
              No cheating, swearing, or dangerous throws — you get carded.
            </li>
            <li>
              <strong>Cards = Penalties:</strong> Yellow Card = 5 min time-out.
              Red Card = out of game + next 2 matches. 4 yellow cards = match
              over.
            </li>
            <li>
              <strong>The Ref is the Boss:</strong> Referee makes calls. Protest
              up to 2 times/match — only coach can protest.
            </li>
          </ul>
          <p className={styles.quickStartParagraph}>
            See the full official rules in the{" "}
            <a
              className={styles.quickStartLink}
              href="https://worlddodgeballfederation.com/wdbf-content/uploads/2024/03/WDBF-Dodgeball-Rules-2024.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              World Dodgeball Federation PDF
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
