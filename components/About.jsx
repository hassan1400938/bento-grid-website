"use client";
import styles from "../styles/About.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <main className={styles.main}>
        <div className={styles.sectionTitle}>ABOUT US</div>

        <div className={styles.cardContainer}>
          <article className={styles.card} role="region" aria-label="About us">
            <blockquote className={styles.quote}>
              <strong>“TURNS OUT, A LOT OF OTHERS</strong>
              <strong>WERE LOOKING FOR THE SAME THING.”</strong>
            </blockquote>

            <p className={styles.intro}>
              Gron’s Dodgeball began with a few balls, a gym, and a group of
              strangers...
            </p>

            <p className={styles.paragraph}>Why people love playing with us:</p>

            <ul className={styles.features}>
              <li>
                <strong>A Real Community:</strong> ...
              </li>
              <li>
                <strong>Just Show Up:</strong> ...
              </li>
              <li>
                <strong>Play for Joy:</strong> ...
              </li>
              <li>
                <strong>Open to All:</strong> ...
              </li>
            </ul>

            <p className={styles.paragraph}>
              Gron’s Dodgeball is more than a sport. It's about connection...
            </p>
          </article>
        </div>
      </main>
    </section>
  );
}
