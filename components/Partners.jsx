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
        {  y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
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
    d="
      M0,7
      C10,4 20,10 30,7
      C40,5 50,9 60,7
      C70,6 80,8 90,7
      C100,5 110,9 120,7
      C130,6 140,8 150,7
      C160,4 170,10 180,7
      C190,6 200,8 210,7
      C220,5 230,9 240,7
      C250,6 260,8 270,7
      C280,4 290,10 300,7
      C310,5 320,9 330,7
      C340,6 350,8 360,7
      C370,5 380,9 390,7
      C400,6 410,8 420,7
      C430,4 440,10 450,7
      C460,5 470,9 480,7
      C490,6 500,8 510,7
      C520,5 530,9 540,7
      C550,6 560,8 570,7
      C580,4 590,10 600,7
      C610,6 620,8 630,7
      C640,5 650,9 660,7
      C670,6 680,8 690,7
      C700,4 710,10 720,7
      C730,5 740,9 750,7
      C760,6 770,8 780,7
      C790,5 800,9 810,7
      C820,6 830,8 840,7
      C850,4 860,10 870,7
      C880,5 890,9 900,7
      C910,6 920,8 930,7
      C940,5 950,9 960,7
      C970,6 980,8 990,7
      C1000,4 1010,10 1020,7
      C1030,5 1040,9 1050,7
      C1060,6 1070,8 1080,7
      C1090,5 1100,9 1110,7
      C1120,6 1130,8 1140,7
      C1150,4 1160,10 1170,7
      C1180,5 1190,9 1200,7
      C1210,6 1220,8 1230,7
      C1240,5 1250,9 1260,7
      C1270,6 1280,8 1290,7
      C1300,4 1310,10 1320,7
      C1330,5 1340,9 1350,7
      C1360,6 1370,8 1380,7
      C1390,5 1400,9 1410,7
      C1420,6 1430,8 1440,7
      C1420,6 1430,8 1440,7
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
