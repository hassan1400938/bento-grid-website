import React, { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/FAQ.module.css";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "What is Dodgeball?",
    a: "Dodgeball is a fast-paced, team-based sport where you dodge, throw, and catch soft foam balls to eliminate the other team. It's fun, easy to learn, and open to everyone!",
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
    a: "Yes! You can apply for support through the Volwassenenfonds (for adults) or Jeugdfonds (for youth). These make playing affordable for everyone.",
  },
  {
    q: "What if I have a Stadjerspas?",
    a: "We offer a discount through Stadjerspas. Please see Funds & Accessibility for more information.",
  },
  {
    q: "What should I wear?",
    a: "Wear something sporty — indoor shoes, a t-shirt, shorts or joggers, and bring a water bottle. Dodgeballs are provided!",
  },
  {
    q: "Can I bring a friend?",
    a: "Absolutely! Bring a friend to their first session and get a €5 voucher for your next visit.",
  },
  {
    q: "Can I try before committing?",
    a: "Yes! You can join for a single session without a membership. Perfect to try it out!",
  },
  { q: "Is this competitive or just for fun?", a: "Both!" },
  {
    q: "Do you play when it rains?",
    a: "Yes — we go indoors when the weather is bad.",
  },
  { q: "Can I join anytime?", a: "Yes, new players are welcome year-round." },
  {
    q: "Do you offer youth sessions?",
    a: "Yes! Starting in the 2025/2026 season, we’re launching sessions for 4–12 and 12–16 years old.",
  },
  {
    q: "What if I can’t afford a membership?",
    a: "No stress — we’ve got flexible options! If a membership feels like too much, you can always join as a Drop-In Dodger. Need extra support? We partner with the Volwassenen Fonds and Jeugdfonds Sport & Cultuur, which can cover most of your costs. Check out Funds & Accessibility for how it works.",
  },
  {
    q: "Do you have more locations?",
    a: "Not yet — but we’re working on it! We’re busy making plans to bring the dodgeball vibes to more cities across the Netherlands. Stay tuned.",
  },
  {
    q: "What location is the session at?",
    a: "We always aim to play in or near the city centre. Indoor during the colder months, outdoor when it’s sunny. Check the exact spot and time under Upcoming Sessions.",
  },
  {
    q: "Is there more after dodgeball?",
    a: "Yes — we’re more than just a sport. We’re building a community where people meet, connect, and feel welcome. Many stick around after the game — and friendships are part of the fun.",
  },
  {
    q: "Is it like the high school game?",
    a: "Pretty much — but with a sporty twist. It’s the game you remember, just with better balls, smoother rules, and fewer flying shoes. We follow a clear set of rules you’ll learn during your first session, or you can peek at them in our Rules & Code of Conduct.",
  },
  {
    q: "Can I become a trainer?",
    a: "We’d love that! We’re always looking for new trainers — for both adults and youth groups. Got energy, ideas, and a soft spot for foam balls? Email us: gronsdodgeball@gmail.com",
  },
  {
    q: "When did Gron’s Dodgeball start?",
    a: "We started in 2025, right here in Groningen — the first foam dodgeball community in the Netherlands.",
  },
  {
    q: "What does Gron’s Dodgeball stand for?",
    a: "Gron’s is short for Groningen. Dodgeball speaks for itself. Together they stand for fun, movement, and community.",
  },
  {
    q: "How long is a session?",
    a: "Most sessions are 1.5 to 2 hours long. You’ll always get at least 90 minutes of playtime — plus some warm-up and high-fives.",
  },
  {
    q: "How long is a ticket valid?",
    a: "A Drop-In Dodger ticket is valid for 7 days after purchase. Unused tickets cannot be returned or extended (unless you’re sick — see below!).",
  },
  {
    q: "I’m sick and can’t come — what happens to my ticket?",
    a: "Let us know at least 24 hours before your session, and we’ll happily extend your ticket by 7 extra days.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We use Stripe for all payments. You can pay with iDEAL, Apple Pay, Google Pay, or credit card — whatever works for you.",
  },
  {
    q: "Can I join through ACLO?",
    a: "Totally! Through the website of ACLO you can join our special ACLO courses.",
  },
];

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const faqContainerRef = useRef(null);

  useEffect(() => {
    if (!faqContainerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        faqContainerRef.current,
        { scale: 0.8, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: faqContainerRef.current,
            start: "top 90%", // 👈 start animation earlier
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, faqContainerRef);

    return () => ctx.revert();
  }, []);

  const filteredFaqs = useMemo(() => {
    const result = faqs.filter((f) =>
      (f.q + " " + f.a).toLowerCase().includes(search.toLowerCase())
    );
    return showAll ? result : result.slice(0, 6);
  }, [search, showAll]);

  const toggle = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  const handleShowMoreToggle = () => {
    const hiding = showAll;
    setShowAll(!showAll);
    if (hiding && faqContainerRef.current) {
      setTimeout(() => {
        faqContainerRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="relative">
      {/* Top Wave */}

      <div className="absolute -top-[2px] sm:-top-[4px] md:-top-[7px] z-[70] left-0 w-full">
        <svg
          viewBox="0 0 1440 14"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,7
       Q15,3.5 30,7
       T60,7
       T90,7
       T120,7
       T150,7
       T180,7
       T210,7
       T240,7
       T270,7
       T300,7
       T330,7
       T360,7
       T390,7
       T420,7
       T450,7
       T480,7
       T510,7
       T540,7
       T570,7
       T600,7
       T630,7
       T660,7
       T690,7
       T720,7
       T750,7
       T780,7
       T810,7
       T840,7
       T870,7
       T900,7
       T930,7
       T960,7
       T990,7
       T1020,7
       T1050,7
       T1080,7
       T1110,7
       T1140,7
       T1170,7
       T1200,7
       T1230,7
       T1260,7
       T1290,7
       T1320,7
       T1350,7
       T1380,7
       T1410,7
       T1440,7
       L1440,14
       L0,14
       Z"
            fill="#F5E2CF"
          />
        </svg>
      </div>

      {/* Main FAQ Section */}
      <div
        className={`${styles.faq} relative z-50 bg-transparent`}
        ref={faqContainerRef}
      >
        <div className={`${styles.faqContainer} bg-transparent`}>
          <div className={styles.faqHeader}>
            <h1>Frequently Asked Questions</h1>
            <p>Everything you might want to know about the dodgeball fun.</p>
          </div>

          <div className={styles.searchContainer}>
            <div className={styles.searchBox}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.faqContent}>
            {filteredFaqs.map((f, i) => (
              <div
                key={i}
                className={`${styles.faqItem} ${
                  activeIndex === i ? styles.active : ""
                }`}
              >
                <div
                  className={styles.faqQuestion}
                  onClick={() => toggle(i)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{f.q}</h3>
                  <span className={styles.faqIcon}>
                    <i className="fa-solid fa-plus"></i>
                  </span>
                </div>
                <div className={styles.faqAnswer}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>

          <button className={styles.showMoreBtn} onClick={handleShowMoreToggle}>
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </div>
  );
}
