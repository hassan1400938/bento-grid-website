import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/UpcommingSessions.module.css";

const UpcomingSessions = () => {
  const timelineRef = useRef(null);
  const progressFillRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    const apiKey = "AIzaSyCAllpV5h0oZ0Pklsq4_CBjaCt-8HDhSuY";
    const calendarId = "gronsdodgeball@gmail.com";
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
    const walk = (x - startX.current) * 1.2; // drag speed
    timelineRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleScroll = () => {
    const el = timelineRef.current;
    const percent = (el.scrollLeft / (el.scrollWidth - el.clientWidth)) * 100;
    if (progressFillRef.current) {
      progressFillRef.current.style.width = `${percent}%`;
    }
  };

  return (
    <main className={`${styles.upcomming} ${styles.main}`}>
      <div className={styles.sectionTitle}>UPCOMING SESSIONS</div>
      <p className={styles.subtitle}>Swipe or scroll through upcoming games</p>

      <div className={styles.timelineWrapper}>
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
                <article key={i} className={styles.card} tabIndex={0}>
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
