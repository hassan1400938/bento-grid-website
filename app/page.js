"use client";

import { useEffect, useRef, useState } from "react";

import Widget from "../components/Widget";
import { widgets } from "./widgets";

import Partners from "@/components/Partners";
import About from "@/components/About";
import UpcomingSessions from "@/components/UpcommingSessions";
import PricingPlans from "@/components/PricingPlans";
import FundsAccessibility from "@/components/FundsAccessibility";
import Sponsors from "@/components/Sponsors";
import Locations from "@/components/Locations";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Preloader from "./loader";

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [showCanvas, setShowCanvas] = useState(false);
  const loadMoreRef = useRef(null);
  const tileRefs = useRef([]);
  const sectionRefs = useRef([]);
  const canvasRef = useRef(null);

  const heroRef = useRef(null); // <-- hero section ref

  // Add sections refs
  const addToSectionRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Insert heroRef at start of sectionRefs on mount
  useEffect(() => {
    if (heroRef.current && !sectionRefs.current.includes(heroRef.current)) {
      sectionRefs.current = [heroRef.current, ...sectionRefs.current];
    }
  }, []);

  // Canvas animation setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener("resize", setSize);

    let animationFrame;
    let lastDraw = 0;
    const fps = 12;
    const interval = 1000 / fps;
    let isAnimating = false;
    let inactivityTimeout;

    const drawNoise = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const dotCount = 1000;
      for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 0.5 + 0.5;
        const alpha = Math.random() * 0.2 + 0.1;

        // Randomly pick black or orange
        const isOrange = Math.random() < 0.5; // 50% chance
        let r, g, b;

        if (isOrange) {
          r = 255;
          g = 165;
          b = 0;
        } else {
          r = 0;
          g = 0;
          b = 0;
        }

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    };

    const loop = (now) => {
      if (now - lastDraw > interval) {
        drawNoise();
        lastDraw = now;
      }
      animationFrame = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (!isAnimating) {
        isAnimating = true;
        setShowCanvas(true);
        animationFrame = requestAnimationFrame(loop);
      }
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(stopAnimation, 30); // stop if no activity for 800ms
    };

    const stopAnimation = () => {
      if (isAnimating) {
        cancelAnimationFrame(animationFrame);
        isAnimating = false;
      }
    };

    // Events that trigger animation
    const handleUserActivity = () => {
      startAnimation();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("wheel", handleUserActivity);

    // Draw one static frame at start
    drawNoise();

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(inactivityTimeout);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("scroll", handleUserActivity);
      window.removeEventListener("wheel", handleUserActivity);
    };
  }, []);

  // Load more widgets on intersection
  useEffect(() => {
    if (!loadMoreRef.current || visibleCount >= widgets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 1, widgets.length));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleCount]);

  // Custom smooth scroll snap on wheel
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      if (delta === 0) return;

      isScrolling = true;
      e.preventDefault();

      let currentIndex = sectionRefs.current.findIndex((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= -50 && rect.top <= 50;
      });

      if (currentIndex === -1) {
        currentIndex =
          sectionRefs.current.findIndex((section) => {
            const rect = section.getBoundingClientRect();
            return rect.top > 0;
          }) - 1;
        if (currentIndex < 0) currentIndex = 0;
      }

      let nextIndex;
      if (delta > 0) {
        nextIndex = Math.min(currentIndex + 1, sectionRefs.current.length - 1);
      } else {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== currentIndex) {
        sectionRefs.current[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const loader = document.getElementById("loader");
    const onAnimEnd = (e) => {
      if (e.animationName === "slideUp") loader.remove();
    };
    loader?.addEventListener("animationend", onAnimEnd);
    return () => loader?.removeEventListener("animationend", onAnimEnd);
  }, []);

  return (
    <>
      {/* <Preloader /> */}

      <main className="flex flex-col w-full min-h-screen overflow-hidden relative text-black">
        <canvas
          ref={canvasRef}
          className={`fixed top-0 left-0 w-full h-full z-40 pointer-events-none transition-opacity duration-700 ease-in-out ${
            showCanvas ? "opacity-100" : "opacity-0"
          }`}
          style={{ mixBlendMode: "multiply" }}
        />

        {/* hero section */}
        <div ref={heroRef} className="">
          <NavBar />

          {/* Updated Widget Grid */}
          <div className="grid grid-cols-20 relative z-50 gap-4 grid-flow-dense auto-rows-[72px] mx-auto md:mt-40 mb-40 max-w-[336px] md:max-w-[864px]">
            {widgets.slice(0, visibleCount).map((w, i) => (
              <Widget
                key={w.id}
                col={w.col}
                row={w.row}
                innerRef={(el) => (tileRefs.current[i] = el)}
              >
                {w.component}
              </Widget>
            ))}
            {visibleCount < widgets.length && (
              <div ref={loadMoreRef} className="col-span-12 h-1" />
            )}
          </div>
        </div>

        {/* Content Sections with refs */}
        <div className="relative">
          <div id="partner" className="min-h-[100vh]" ref={addToSectionRefs}>
            <Partners />
          </div>
          <div id="about" ref={addToSectionRefs}>
            <About />
          </div>
          <div id="sessions" ref={addToSectionRefs}>
            <UpcomingSessions />
          </div>
          <div id="memberships" ref={addToSectionRefs}>
            <PricingPlans />
          </div>
          <div id="funds" ref={addToSectionRefs}>
            <FundsAccessibility />
          </div>
          {/* <div
              id="sponsors"
              className="min-h-screen flex items-center justify-center"
              ref={addToSectionRefs}
            >
              <Sponsors />
            </div> */}
          {/* <div
              id="locations"
              className="bg-[#f1eee7] min-h-[100vh]"
              ref={addToSectionRefs}
            >
              <Locations />
            </div> */}
          <div id="reviews" ref={addToSectionRefs}>
            <Reviews />
          </div>
          <div id="faq" ref={addToSectionRefs}>
            <FAQ />
          </div>
          <div id="contact" ref={addToSectionRefs}>
            <ContactForm />
          </div>
          <div id="footer" ref={addToSectionRefs}>
            <Footer />
          </div>
        </div>
      </main>
    </>
  );
}
