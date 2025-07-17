"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
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
import Link from "next/link";

export default function HomePage() {
  const [visibleCount, setVisibleCount] = useState(6);
  const loadMoreRef = useRef(null);
  const tileRefs = useRef([]);

  useEffect(() => {
    const el = tileRefs.current[visibleCount - 1];
    if (el) {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }
  }, [visibleCount]);

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

  return (
    <main className="flex flex-col w-full min-h-screen bg-[#f5e2cf] text-black">
      <div className="flex gap-3 mt-4 justify-center">
        <Link href="/">Home</Link>
        <Link href="/clinics">Clinics</Link>
        <Link href="/youth">Youth</Link>
        <Link href="/code-of-conduct">Code of Conduct</Link>
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      <div className="grid grid-cols-12 gap-4 grid-flow-dense auto-rows-[72px] mx-auto md:mt-40 mb-40 max-w-[336px] md:max-w-[688px]">
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
      <Partners />
      <About />
      <UpcomingSessions />
      <PricingPlans />
      <FundsAccessibility />
      <Sponsors />
      <Locations />
      <Reviews />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
