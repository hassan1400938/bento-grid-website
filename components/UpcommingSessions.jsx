"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/UpcommingSessions.module.css";

gsap.registerPlugin(ScrollTrigger);

const UpcomingSessions = () => {
  const timelineRef = useRef(null);
  const progressFillRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const cardRefs = useRef([]);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const timeMin = new Date().toISOString();

    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
          calendarId
        )}/events?key=${apiKey}&maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${timeMin}`
      );
      const data = await res.json();
      setSessions(data.items || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("nl-NL", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Amsterdam",
    });

  // 🎯 Smooth drag-to-scroll using gsap
  const handleMouseDown = (e) => {
    isDragging.current = true;
    timelineRef.current.classList.add(styles.dragging);
    startX.current = e.pageX - timelineRef.current.offsetLeft;
    scrollLeft.current = timelineRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    timelineRef.current.classList.remove(styles.dragging);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    timelineRef.current.classList.remove(styles.dragging);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;

    // Smooth scroll with gsap
    gsap.to(timelineRef.current, {
      scrollLeft: scrollLeft.current - walk,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleScroll = () => {
    const el = timelineRef.current;
    const percent = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${percent}%`;
    }
  };

  // 🎬 Animate on scroll
  useEffect(() => {
    if (!timelineRef.current) return;

    gsap.fromTo(
      timelineRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    gsap.fromTo(
      cardRefs.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 85%",
        },
      }
    );
  }, [sessions]);

  return (
    <main className={`${styles.upcomming} ${styles.main}`}>
      <div className={`${styles.sectionTitle}  relative z-50`}>
        UPCOMING SESSIONS
      </div>
      <p className={`${styles.subtitle}  relative z-50`}>
        Swipe or scroll through upcoming games
      </p>

      <div className={`${styles.timelineWrapper}  relative z-50`}>
        <section
          ref={timelineRef}
          className={styles.timeline}
          role="region"
          aria-label="Upcoming dodgeball sessions timeline"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
        >
          {sessions.length === 0 ? (
            <p className={styles.noSessions}>Loading sessions...</p>
          ) : (
            sessions.map((event, i) => {
              const start = new Date(event.start.dateTime || event.start.date);
              const end = new Date(
                event.end?.dateTime || start.getTime() + 2 * 60 * 60 * 1000
              );
              const title = event.summary || "Dodgeball Session";
              const locationQuery = event.location || "Groningen";
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                locationQuery
              )}`;
              const isACLO = title.toLowerCase().includes("aclo");
              const isSummerBreak = title
                .toLowerCase()
                .includes("summer break");
              const isKardingerweg = locationQuery
                .toLowerCase()
                .includes("kardingerweg");

              return (
                <article
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className={styles.card}
                  tabIndex={0}
                >
                  <div className={styles.dateRow}>
                    <div className={styles.dateSmall}>{formatDate(start)}</div>
                    {isKardingerweg ? (
                      <div className={styles.rsvpPill}>Outdoors</div>
                    ) : isACLO ? (
                      <div className={styles.rsvpPill}>RSVP only</div>
                    ) : isSummerBreak ? (
                      <div className={styles.rsvpPill}>No Dodge</div>
                    ) : null}
                  </div>
                  <div className={styles.timeInfo}>
                    {formatTime(start)}
                    {event.start.dateTime ? " – " + formatTime(end) : ""}
                  </div>
                  <div className={styles.titlePill}>{title}</div>
                  <div className={styles.cardFooter}>
                    {!isSummerBreak && (
                      <a
                        href={mapsUrl}
                        className={styles.location}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Click for route
                      </a>
                    )}
                    <div className={styles.iconGroup}>
                      {!isSummerBreak && !isACLO && (
                        <>
                          <a
                            href="https://scan.gronsdodgeball.nl/payment/form?payment_link=plink_1RNuWuKPJsqZGRQAFNGt76Oz"
                            className={styles.iconBtn}
                            aria-label="Buy ticket"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            🛒
                          </a>
                          <button className={styles.iconBtn} aria-label="Share">
                            🔗
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </section>

        <div className={styles.progressBar} aria-hidden="true">
          <div className={styles.progressFill} ref={progressFillRef}></div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
          Swipe to scroll
        </div>
      </div>
    </main>
  );
};

export default UpcomingSessions;
