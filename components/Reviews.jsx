// // DodgeballReviews.jsx
// import React, { useEffect, useRef } from "react";
// import styles from "../styles/Reviews.module.css";

// const reviews = [
//   {
//     name: "Cindy",
//     text: "I really love being part of this dodgeball community! Everyone is super friendly and welcoming.",
//   },
//   {
//     name: "Tijmen",
//     text: "I had such a great day!! I loved dodgeball in high-school, and I was just as fanatic as then.",
//   },
//   {
//     name: "Lotte",
//     text: "I had such a fun and active day. It's a great way to meet new people while doing something sporty.",
//   },
//   {
//     name: "Lucas",
//     text: "Joining as a complete beginner, I still felt welcome. There's a good balance of games and coaching.",
//   },
//   {
//     name: "Anastasia",
//     text: "I had such a fun time! It was a great way to get active and meet some really lovely people.",
//   },
//   {
//     name: "Daniel",
//     text: "Didn’t think I’d get into dodgeball again haha, but it’s seriously the highlight of my week now!",
//   },
//   {
//     name: "Evelina",
//     text: "I usually stay quiet in groups but this felt so safe and fun!!! Honestly one of the best things I’ve joined.",
//   },
//   {
//     name: "Marva",
//     text: "Came alone and was sooo nervous, but I felt at home right away!",
//   },
//   {
//     name: "James",
//     text: "This group really came out of nowhere but has quickly become the main event of my week.",
//   },
//   {
//     name: "Jeffrey",
//     text: "Super fun dodgeball club! It reminds me of gym class in school. Very welcoming and chill vibe.",
//   },
// ];

// const ReviewCard = ({ name, text }) => (
//   <div className={styles.card}>
//     <p>“{text}”</p>
//     <div className={styles.footer}>
//       <strong>{name}</strong>
//       <span>Groningen</span>
//     </div>
//   </div>
// );

// export default function Reviews() {
//   const scroll1 = useRef(null);
//   const scroll2 = useRef(null);

//   const half = Math.ceil(reviews.length / 2);
//   const row1 = [...reviews.slice(0, half), ...reviews.slice(0, half)];
//   const row2 = [...reviews.slice(half), ...reviews.slice(half)];

//   useEffect(() => {
//     const centerScroll = (ref) => {
//       if (ref.current) {
//         ref.current.scrollLeft =
//           (ref.current.scrollWidth - ref.current.clientWidth) / 2;
//       }
//     };
//     requestAnimationFrame(() => {
//       centerScroll(scroll1);
//       centerScroll(scroll2);
//     });
//   }, []);

//   return (
//     <div className={styles.reviews}>
//       <section className={styles.section}>
//         <div className={styles.stars}>★★★★★</div>
//         <div className={styles.subheading}>What others say</div>
//         <h2 className={styles.title}>Experiences from our Dodgers</h2>
//         <div className={styles.subtitle}>
//           A sport that <strong>connects</strong>. A community that{" "}
//           <strong>makes you smile</strong>.
//         </div>

//         <div className={styles.scroll} ref={scroll1}>
//           <div className={styles.inner}>
//             {row1.map((r, i) => (
//               <ReviewCard key={i} {...r} />
//             ))}
//           </div>
//         </div>

//         <div className={styles.scroll} ref={scroll2}>
//           <div className={`${styles.inner} ${styles.offset}`}>
//             {row2.map((r, i) => (
//               <ReviewCard key={i} {...r} />
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useEffect, useRef } from "react";

const reviews = [
  {
    name: "Cindy",
    text: "I really love being part of this dodgeball community! Everyone is super friendly and welcoming.",
  },
  {
    name: "Tijmen",
    text: "I had such a great day!! I loved dodgeball in high-school, and I was just as fanatic as then.",
  },
  {
    name: "Lotte",
    text: "I had such a fun and active day. It's a great way to meet new people while doing something sporty.",
  },
  {
    name: "Lucas",
    text: "Joining as a complete beginner, I still felt welcome. There's a good balance of games and coaching.",
  },
  {
    name: "Anastasia",
    text: "I had such a fun time! It was a great way to get active and meet some really lovely people.",
  },
  {
    name: "Daniel",
    text: "Didn’t think I’d get into dodgeball again haha, but it’s seriously the highlight of my week now!",
  },
  {
    name: "Evelina",
    text: "I usually stay quiet in groups but this felt so safe and fun!!! Honestly one of the best things I’ve joined.",
  },
  {
    name: "Marva",
    text: "Came alone and was sooo nervous, but I felt at home right away!",
  },
  {
    name: "James",
    text: "This group really came out of nowhere but has quickly become the main event of my week.",
  },
  {
    name: "Jeffrey",
    text: "Super fun dodgeball club! It reminds me of gym class in school. Very welcoming and chill vibe.",
  },
];

function ReviewCard({ name, text }) {
  return (
    <div style={styles.card}>
      <p style={styles.cardText}>“{text}”</p>
      <div style={styles.cardFooter}>
        <strong style={styles.cardFooterStrong}>{name}</strong>
        <span style={styles.cardFooterSpan}>Groningen</span>
      </div>
    </div>
  );
}

function AddReviewCard() {
  const cardRef = useRef(null);

  useEffect(() => {
    const form = cardRef.current.querySelector("form");
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get("name").trim();
      const text = formData.get("text").trim();

      if (!name || !text) return;

      try {
        const response = await fetch("https://formspree.io/f/xnnzaqnd", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });

        if (response.ok) {
          cardRef.current.innerHTML = `
            <p style='font-size:16px;font-weight:500;line-height:1.5;'>“${text}”</p>
            <div style='display:flex;flex-direction:column;align-items:flex-start;font-size:13px;line-height:1.2;color:#888;'>
              <strong style='color:#0d0c0b;font-size:14px;'>${name}</strong>
              <span>Thank you for your experience!</span>
            </div>
          `;
        } else {
          alert("Something went wrong. Please try again.");
        }
      } catch (err) {
        alert("Network error. Please try again later.");
      }
    });
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        ...styles.card,
        border: "1px solid var(--text)",
        boxShadow: "none",
      }}
    >
      <form style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontWeight: 600, fontSize: 15 }}>Add your experience</div>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
          style={styles.input}
        />
        <textarea
          name="text"
          placeholder="Write your experience..."
          required
          style={styles.textarea}
        ></textarea>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const firstHalf = reviews.slice(0, half).concat(reviews.slice(0, half));
  const secondHalf = reviews.slice(half).concat(reviews.slice(half));

  return (
    <section style={styles.section}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');`}</style>
      <div style={styles.stars}>★★★★★</div>
      <div style={styles.subheading}>What others say</div>
      <div style={styles.title}>Experiences from our Dodgers</div>
      <div style={styles.subtitle}>
        A sport that <strong style={{ color: "white" }}>connects</strong>. A
        community that{" "}
        <strong style={{ color: "white" }}>makes you smile</strong>.
      </div>

      <div style={styles.scrollContainer}>
        <div style={styles.scrollInner}>
          {firstHalf.map((r, i) => (
            <ReviewCard key={`r1-${i}`} name={r.name} text={r.text} />
          ))}
        </div>
      </div>

      <div style={styles.scrollContainer}>
        <div style={{ ...styles.scrollInner, marginLeft: 80 }}>
          {secondHalf.map((r, i) => {
            const insertAt = 4;
            if (i === insertAt) {
              return [
                <AddReviewCard key="form" />,
                <ReviewCard key={`r2-${i}`} name={r.name} text={r.text} />,
              ];
            }
            return <ReviewCard key={`r2-${i}`} name={r.name} text={r.text} />;
          })}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: "64px 24px",
    textAlign: "center",
    background: "#0d0c0b",
    color: "#0d0c0b",
    fontFamily: "'Inter', sans-serif",
  },
  stars: {
    color: "#f57f3b",
    fontSize: 20,
    marginBottom: 8,
  },
  subheading: {
    textTransform: "uppercase",
    fontWeight: 600,
    fontSize: 12,
    color: "#bbb",
    letterSpacing: 1,
    marginBottom: 6,
  },
  title: {
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: 10,
    color: "white",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#ccc",
    marginBottom: 40,
  },
  scrollContainer: {
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    marginBottom: 24,
    padding: "0 32px",
  },
  scrollInner: {
    display: "flex",
    gap: 16,
    width: "max-content",
  },
  card: {
    background: "#fefaf1",
    color: "#0d0c0b",
    padding: "20px 22px",
    borderRadius: 24,
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: 160,
    minWidth: 240,
    maxWidth: 420,
    flexShrink: 0,
    textAlign: "left",
  },
  cardText: {
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.6,
    marginBottom: 18,
  },
  cardFooter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: 13,
    lineHeight: 1.2,
    color: "#888",
  },
  cardFooterStrong: {
    color: "#0d0c0b",
    fontSize: 14,
  },
  cardFooterSpan: {
    fontSize: 13,
  },
  input: {
    fontFamily: "inherit",
    fontSize: 14,
    padding: "6px 10px",
    borderRadius: 10,
    border: "1px solid #0d0c0b",
    background: "#fefaf1",
  },
  textarea: {
    fontFamily: "inherit",
    fontSize: 14,
    padding: "6px 10px",
    borderRadius: 10,
    border: "1px solid #0d0c0b",
    background: "#fefaf1",
    height: 36,
    resize: "none",
  },
  button: {
    alignSelf: "flex-start",
    background: "#f57f3b",
    color: "white",
    fontWeight: 600,
    fontSize: 13,
    padding: "6px 12px",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
  },
};
