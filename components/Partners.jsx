"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../styles/Partners.module.css";

// Importing local partner logos
import logo1 from "../public/assets/partners/050.svg";
import logo2 from "../public/assets/partners/ACLO.png";
import logo3 from "../public/assets/partners/DBN.png";
import logo4 from "../public/assets/partners/DBW.png";
import logo5 from "../public/assets/partners/SJC.png";
import logo6 from "../public/assets/partners/SSP.svg";
import logo7 from "../public/assets/partners/SVC.png";
import logo8 from "../public/assets/partners/USC.png";
import logo9 from "../public/assets/partners/WDF.png";

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const sectionRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none none",
            markers: false,
          },
        }
      );

      rowsRef.current.forEach((row) => {
        if (!row) return;
        gsap.fromTo(
          row.querySelectorAll("img"),
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: row,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play reverse play reverse",
              markers: false,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenWidth = window.innerWidth;

      const r1 = document.getElementById("row1");
      const r2 = document.getElementById("row2");
      const r3 = document.getElementById("row3");

      if (r1)
        r1.style.transform = `translateX(${(scrollY * -0.5) % screenWidth}px)`;
      if (r2)
        r2.style.transform = `translateX(${(scrollY * 0.3) % screenWidth}px)`;
      if (r3)
        r3.style.transform = `translateX(${(scrollY * -0.2) % screenWidth}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const rows = {
    row1: [logo1, logo2, logo3],
    row2: [logo1, logo3, logo6],
    row3: [logo7, logo8, logo9],
  };

  return (
    <div ref={sectionRef} className="relative z-50">
      {/* Divider */}
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
            fill="#111111"
          />
        </svg>
      </div>

      <section className={`${styles.parallaxSection}`}>
        <div className={styles.partnersTitle}>Partners</div>
        <div className={styles.logoRows}>
          {Object.entries(rows).map(([id, images], i) => (
            <div
              key={id}
              id={id}
              className={`${styles.rowWrapper} flex items-center justify-center`}
              ref={(el) => (rowsRef.current[i] = el)}
            >
              {Array(4)
                .fill(images)
                .flat()
                .map((img, j) => (
                  <img
                    key={`${id}-${j}`}
                    src={img.src}
                    alt={`Partner logo ${j}`}
                    className={styles.logoImage}
                    draggable={false}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/fallback-logo.png";
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
