import { useEffect, useRef, useState } from "react";
import styles from "../styles/FundsAccessibility.module.css";
import gsap from "gsap";

export default function FundsAccessibility() {
  const [modalVisible, setModalVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef();
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.from(cardRefs.current, {
      opacity: 0,
      y: 30,
      stagger: 0.2,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setModalVisible(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openModal = () => {
    setModalVisible(true);
    setSubmitted(false);
    setTimeout(() => nameRef.current?.focus(), 100);
  };

  const closeModal = () => setModalVisible(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const res = await fetch(form.action, {
      method: form.method,
      headers: { Accept: "application/json" },
      body: data,
    });

    if (res.ok) setSubmitted(true);
    else alert("Oops! There was a problem submitting your form.");
  };

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>Funds & Accessibility</div>

      <div className={styles.plansWrapper}>
        <div className={styles.plans}>
          {[
            {
              tag: "Groningen Only",
              title: "Stadjerspas credit",
              price: "€40",
              unit: "/year",
              billed: "Applies to memberships",
              features: [
                "Applicable on Membership",
                "Requires active Stadjerspas",
              ],
              link: "https://www.stadjerspas.nl/",
              linkLabel: "Apply",
            },
            {
              tag: "16 & Up",
              title: "Adult Fund",
              price: "€15",
              unit: "/month",
              billed: "Supported by Volwassenenfonds",
              features: [
                "40 weeks of dodgeball access",
                "Guided by experienced trainers",
                "Equipment included",
                "Community",
              ],
              link: "https://www.volwassenenfonds.nl/",
              linkLabel: "Apply",
            },
            {
              tag: "Age 4–16",
              title: "Youth Fund",
              price: "€5",
              unit: "/month",
              billed: "Via Jeugdfonds Sport & Cultuur",
              features: [
                "Weekly dodgeball sessions",
                "Experienced trainers & gear",
                "Available for ages 4–16",
              ],
              isWaitingList: true,
            },
          ].map((plan, i) => (
            <div
              className={styles.plan}
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className={styles.popularTag}>{plan.tag}</div>
              <h2>{plan.title}</h2>
              <div className={styles.price}>
                {plan.price}
                <span>{plan.unit}</span>
              </div>
              <div className={styles.billed}>{plan.billed}</div>
              <ul className={styles.features}>
                {plan.features.map((f, j) => (
                  <li key={j}>{f}</li>
                ))}
              </ul>
              {plan.isWaitingList ? (
                <button className={styles.getStarted} onClick={openModal}>
                  Join the waiting list
                </button>
              ) : (
                <a
                  className={styles.getStarted}
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        Not sure where to start? <a href="#faq">See our FAQ</a>
      </div>

      {modalVisible && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          onClick={(e) => {
            if (e.target.classList.contains(styles.modal)) closeModal();
          }}
        >
          <div>
            <button
              className={styles.closeModal}
              onClick={closeModal}
              aria-label="Close waiting list form"
            >
              ×
            </button>
            <h2 id="modalTitle">Join Waiting List</h2>

            {!submitted ? (
              <form
                id="waitingListForm"
                action="https://formspree.io/f/mvgrjrzn"
                method="POST"
                onSubmit={handleSubmit}
              >
                <label htmlFor="wl-name">Name</label>
                <input
                  ref={nameRef}
                  type="text"
                  id="wl-name"
                  name="name"
                  required
                  autoComplete="name"
                />
                <label htmlFor="wl-email">Email</label>
                <input
                  type="email"
                  id="wl-email"
                  name="email"
                  required
                  autoComplete="email"
                />
                <label htmlFor="wl-age">Age of player</label>
                <input
                  type="number"
                  id="wl-age"
                  name="age"
                  required
                  min="1"
                  max="100"
                />
                <button type="submit">Submit</button>
              </form>
            ) : (
              <div
                className={styles.thankYou}
                id="wl-thankyou"
                role="alert"
                tabIndex="0"
              >
                Thanks for joining the waiting list! We'll be in touch soon.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
