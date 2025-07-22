"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/TermsOfService.module.css";
import '../app/globals.css';
import NavBar from "@/components/NavBar";
const sections = [
  {
    title: "1. What These Terms Cover",
    content: (
      <p>
        These Terms apply to all services offered by Gron’s Dodgeball ("we",
        "us", or "our"). This includes dodgeball sessions, drop-in events, youth
        programs, memberships, and custom experiences.
      </p>
    ),
  },
  {
    title: "2. Who You Are & How You Join",
    content: (
      <>
        <p>You must be at least 16 years old to join our adult programs.</p>
        <p>
          Youth Division is available for participants under 16 with written
          guardian consent.
        </p>
        <p>We reserve the right to verify identity and eligibility.</p>
      </>
    ),
  },
  {
    title: "3. Your Health, Safety & Responsibility",
    content: (
      <>
        <p>
          You play at your own risk. Dodgeball is a physical sport and carries
          some risk of injury.
        </p>
        <p>
          You confirm that you’re physically and medically fit to participate.
        </p>
        <p>
          We do not provide personal insurance. Please arrange your own if
          needed.
        </p>
        <p>
          You release Gron’s Dodgeball and partners from liability for injuries,
          illness, or lost/damaged property.
        </p>
      </>
    ),
  },
  {
    title: "4. Passes & Memberships",
    content: (
      <ul>
        <li>
          Drop-In Pass: Valid for one session within 7 days. Non-refundable.
        </li>
        <li>
          Weekly Warrior Membership: Unlimited Saturday sessions. Minimum
          6-month term. Monthly cancellation possible after that. Missed
          sessions do not carry over.
        </li>
        <li>Youth Passes: Half-Season and Full-Season options available.</li>
        <li>Funded Passes subject to same terms as standard passes.</li>
        <li>No refunds except where required by law.</li>
        <li>Pricing may be adjusted with prior notice.</li>
      </ul>
    ),
  },
  {
    title: "5. Your Conduct on the Court",
    content: (
      <ul>
        <li>Play fair, be kind, and have fun.</li>
        <li>No discrimination, harassment, or aggressive behavior.</li>
        <li>No alcohol, drugs, tobacco, or unapproved gear during sessions.</li>
        <li>
          You’re responsible for proper use of equipment. Damages may be billed.
        </li>
        <li>Breaches may lead to suspension or removal.</li>
      </ul>
    ),
  },
  {
    title: "6. Our Spaces & Venues",
    content: (
      <>
        <p>Respect the rules of all venues we operate in.</p>
        <p>
          Participants are responsible for any damage they cause to facilities
          or equipment.
        </p>
        <p>
          We are not liable for venue-specific incidents or third-party
          policies.
        </p>
      </>
    ),
  },
  {
    title: "7. Closures, Cancellations & Weather",
    content: (
      <>
        <p>Scheduled breaks:</p>
        <ul>
          <li>Spring: Feb 17–23, 2025</li>
          <li>Summer: Jul 14–Aug 24, 2025</li>
          <li>Winter: Dec 22, 2025–Jan 4, 2026</li>
        </ul>
        <p>
          Notify us 24 hours in advance if you can’t attend. No-shows are
          forfeited.
        </p>
        <p>
          We may cancel or reschedule due to venue issues, weather, or Force
          Majeure. We’ll communicate promptly.
        </p>
      </>
    ),
  },
  {
    title: "8. Custom Clinics & Team Events",
    content: (
      <ul>
        <li>
          Custom events require a signed quote and 15% non-refundable deposit
          (€50 minimum).
        </li>
        <li>
          Cancellations: 14+ days deposit retained; less than 14 days full fee
          due.
        </li>
        <li>
          Participant reductions 14+ days ahead get €15 credit per person.
        </li>
        <li>Final balances invoiced after delivery, due in 14 days.</li>
      </ul>
    ),
  },
  {
    title: "9. Your Data & Privacy",
    content: (
      <>
        <p>We respect your privacy and comply with GDPR and Dutch laws.</p>
        <p>
          Your data is used only for service delivery, safety, communication,
          and improvement.
        </p>
        <p>
          You may be photographed or filmed for promotional purposes; opt-out
          available anytime in writing.
        </p>
        <p>Data retained only as long as necessary.</p>
      </>
    ),
  },
  {
    title: "10. Intellectual Property",
    content: (
      <>
        <p>
          All content, visuals, designs, and materials remain exclusive property
          of Gron’s Dodgeball.
        </p>
        <p>Use of materials or logo requires written permission.</p>
      </>
    ),
  },
  {
    title: "11. Payments",
    content: (
      <>
        <p>All payments must be completed before participating.</p>
        <p>We accept iDEAL, credit/debit cards, and other supported methods.</p>
        <p>Failed payments may lead to suspension of access.</p>
      </>
    ),
  },
  {
    title: "12. Right to Refuse or Suspend Access",
    content: (
      <ul>
        <li>
          We may refuse or suspend access for non-payment, breaches, or unsafe
          behavior.
        </li>
        <li>No refunds for violations.</li>
      </ul>
    ),
  },
  {
    title: "13. Language",
    content: (
      <p>
        These Terms are published in English. If translated, the English version
        prevails.
      </p>
    ),
  },
  {
    title: "14. Updates to These Terms",
    content: (
      <p>
        We may revise these Terms from time to time. Updates will be posted on
        our website. Continued participation means acceptance of the latest
        version.
      </p>
    ),
  },
  {
    title: "15. Disputes & Jurisdiction",
    content: (
      <p>
        These Terms are governed by Dutch law. Disputes will be resolved by the
        competent court of the Netherlands. We encourage dialogue and mediation
        first.
      </p>
    ),
  },
  {
    title: "16. Contact Us",
    content: (
      <p>
        Gron’s Dodgeball
        <br />
        <a href="mailto:gronsdodgeball@gmail.com">gronsdodgeball@gmail.com</a>
        <br />
        <a
          href="https://www.gronsdodgeball.nl"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.gronsdodgeball.nl
        </a>
        <br />© 2025 Gron’s Dodgeball. All rights reserved.
      </p>
    ),
  },
];

export default function TermsOfService() {
  const [openIndex, setOpenIndex] = useState(null);
  const canvasRef = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    let frameId;
    let last = 0;
    const fps = 12;
    const interval = 1000 / fps;

    const drawNoise = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = "#f1eee7";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const r = Math.random() * 2 + 0.5;
        const a = Math.random() * 0.3 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${a})`;
        ctx.fill();
      }
    };

    const loop = (time) => {
      if (time - last > interval) {
        drawNoise();
        last = time;
      }
      frameId = requestAnimationFrame(loop);
    };

    setShowCanvas(true);
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <div className="text-black top-0 h-full w-full left-0 overflow-hidden">
         <canvas
        ref={canvasRef}
        className={`${styles.fullscreenCanvas}`}
        style={{
          opacity: showCanvas ? 0.05 : 0,
          mixBlendMode: "normal",
          transition: "opacity 0.7s ease-in-out",
        }}
      />
      <NavBar />
      <div className={styles.bodyWrapper}>
        <main className={styles.main}>
          <h1 className={styles.title}>Terms of Service</h1>
          <div role="region" aria-label="Terms of Service">
            {sections.map((section, index) => (
              <section className={styles.accordionItem} key={index}>
                <button
                  className={styles.accordionButton}
                  aria-expanded={openIndex === index}
                  aria-controls={`sec${index}`}
                  id={`btn${index}`}
                  onClick={() => handleToggle(index)}
                >
                  {section.title}
                </button>
                <div
                  className={`${styles.accordionPanel} ${
                    openIndex === index ? styles.accordionPanelOpen : ""
                  }`}
                  id={`sec${index}`}
                  role="region"
                  aria-labelledby={`btn${index}`}
                  style={{
                    maxHeight: openIndex === index ? "1000px" : "0px",
                  }}
                  tabIndex={openIndex === index ? 0 : -1}
                >
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      </div>
    </>
  );
}
