// components/PrivacyPolicy.jsx
import { useState, useRef } from "react";
import styles from "../styles/PrivacyPolicy.module.css";

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

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={styles.bodyWrapper}>
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
  );
}
