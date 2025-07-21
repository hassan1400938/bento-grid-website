"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import logo from "../public/assets/logo.svg"; // Adjust the path as needed

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const coverRef = useRef(null);
  const overlayRef = useRef(null);
  const menuRef = useRef(null);
  const linkRefs = useRef([]);
  const boxRefs = useRef([]);
  const contactItemRefs = useRef([]); // 🆕 New ref array for email & phone

const links = [
  { label: "Start", href: "#start" },
  { label: "Upcoming Sessions", href: "#sessions" },
  { label: "Clinics & Team Building", href: "/clinics", external: true },
  { label: "Memberships", href: "#memberships" },
  { label: "Youth", href: "/youth", external: true },
  { label: "Locations", href: "#locations", hidden: true }, // will be hidden
  { label: "Funds & Accessibility", href: "#funds" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

  const svgIcons = [
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12 4.15c-1.191 0-2.58.028-3.934.066l-.055.002c-1.378.039-2.49.07-3.366.215c-.913.151-1.671.44-2.277 1.063c-.608.625-.873 1.398-.998 2.323c-.12.89-.12 2.018-.12 3.42v1.524c0 1.4 0 2.528.12 3.419c.124.925.39 1.698.998 2.323c.606.624 1.364.912 2.277 1.063c.876.145 1.988.176 3.366.215l.055.002c1.355.038 2.743.066 3.934.066s2.58-.028 3.934-.066l.055-.002c1.378-.039 2.49-.07 3.366-.215c.913-.151 1.671-.44 2.277-1.063c.608-.625.874-1.398.998-2.323c.12-.89.12-2.018.12-3.42v-1.524c0-1.401 0-2.529-.12-3.419c-.124-.925-.39-1.698-.998-2.323c-.606-.624-1.364-.912-2.277-1.063c-.876-.145-1.988-.176-3.367-.215l-.054-.002A145 145 0 0 0 12 4.15m-1.128 10.501A.75.75 0 0 1 9.75 14v-4a.75.75 0 0 1 1.122-.651l3.5 2a.75.75 0 0 1 0 1.302z"
        clipRule="evenodd"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M20.47 2H3.53a1.45 1.45 0 0 0-1.47 1.43v17.14A1.45 1.45 0 0 0 3.53 22h16.94a1.45 1.45 0 0 0 1.47-1.43V3.43A1.45 1.45 0 0 0 20.47 2M8.09 18.74h-3v-9h3ZM6.59 8.48a1.56 1.56 0 1 1 0-3.12a1.57 1.57 0 1 1 0 3.12m12.32 10.26h-3v-4.83c0-1.21-.43-2-1.52-2A1.65 1.65 0 0 0 12.85 13a2 2 0 0 0-.1.73v5h-3v-9h3V11a3 3 0 0 1 2.71-1.5c2 0 3.45 1.29 3.45 4.06Z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.001 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6m0-2a5 5 0 1 1 0 10a5 5 0 0 1 0-10m6.5-.25a1.25 1.25 0 0 1-2.5 0a1.25 1.25 0 0 1 2.5 0M12.001 4c-2.474 0-2.878.007-4.029.058c-.784.037-1.31.142-1.798.332a2.9 2.9 0 0 0-1.08.703a2.9 2.9 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.007 9.075 4 9.461 4 12c0 2.475.007 2.878.058 4.029c.037.783.142 1.31.331 1.797c.17.435.37.748.702 1.08c.337.336.65.537 1.08.703c.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.475 0 2.878-.007 4.029-.058c.782-.037 1.308-.142 1.797-.331a2.9 2.9 0 0 0 1.08-.703c.337-.336.538-.649.704-1.08c.19-.492.296-1.018.332-1.8c.052-1.103.058-1.49.058-4.028c0-2.474-.007-2.878-.058-4.029c-.037-.782-.143-1.31-.332-1.798a2.9 2.9 0 0 0-.703-1.08a2.9 2.9 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.926 4.006 14.54 4 12 4m0-2c2.717 0 3.056.01 4.123.06c1.064.05 1.79.217 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.047 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122s-.218 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465c-1.067.047-1.406.06-4.123.06s-3.056-.01-4.123-.06c-1.064-.05-1.789-.218-2.427-.465a4.9 4.9 0 0 1-1.772-1.153a4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.012 15.056 2 14.717 2 12s.01-3.056.06-4.122s.217-1.79.465-2.428a4.9 4.9 0 0 1 1.153-1.772A4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.362-.415 2.427-.465C8.945 2.013 9.284 2 12.001 2"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M15.725 22v-7.745h2.6l.389-3.018h-2.99V9.31c0-.874.243-1.47 1.497-1.47h1.598v-2.7a21 21 0 0 0-2.33-.12c-2.304 0-3.881 1.407-3.881 3.99v2.227H10v3.018h2.607V22H3.104C2.494 22 2 21.506 2 20.896V3.104C2 2.494 2.494 2 3.104 2h17.792C21.506 2 22 2.494 22 3.104v17.792c0 .61-.494 1.104-1.104 1.104z"
      />
    </svg>,
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
    >
      <g fill="none">
        <g clipPath="url(#a)">
          <path
            fill="currentColor"
            d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M0 0h14v14H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>,
  ];

  const openMenu = () => {
    setMenuOpen(true);

    gsap.killTweensOf(linkRefs.current);
    gsap.set(linkRefs.current, { yPercent: 100, opacity: 1 });
    gsap.set(contactItemRefs.current, { opacity: 0, y: 30 });
    gsap.set(menuRef.current, { y: "100%" });
    gsap.set(overlayRef.current, { opacity: 0 });
    gsap.set(coverRef.current, { y: "100%", display: "block" });

    const tl = gsap.timeline();

    tl.fromTo(
      coverRef.current,
      { y: "100%" },
      { y: "0%", duration: 0.6, ease: "power2.out" }
    )
      .to(
        coverRef.current,
        { y: "-100%", duration: 0.6, ease: "power2.inOut" },
        "+=0.1"
      )
      .set(coverRef.current, { display: "none" })

      .set(overlayRef.current, { display: "block" })
      .to(overlayRef.current, { opacity: 1, duration: 0.3 }, "-=0.4")

      .to(
        menuRef.current,
        { y: "0%", duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )

      // Links
      .to(
        linkRefs.current,
        {
          yPercent: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.2"
      )

      // Contact items (staggered)
      .to(
        contactItemRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
        },
        "-=0.3"
      );
  };

  const closeMenu = () => {
    const tl = gsap.timeline();

    // Contact (staggered out)
    tl.to(contactItemRefs.current.slice().reverse(), {
      y: 50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      stagger: 0.1,
    })

      // Links
      .to(
        linkRefs.current.slice().reverse(),
        {
          yPercent: 100,
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          stagger: 0.08,
        },
        "-=0.3"
      )
      .to(
        menuRef.current,
        {
          y: "100%",
          duration: 0.5,
          ease: "power3.in",
        },
        "-=0.3"
      )

      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "-=0.4"
      )
      .set(overlayRef.current, { display: "none" })

      .set(coverRef.current, { display: "block" })
      .fromTo(
        coverRef.current,
        { y: "-100%" },
        { y: "0%", duration: 0.5, ease: "power2.out" },
        "+=0.1"
      )
      .to(
        coverRef.current,
        { y: "100%", duration: 0.6, ease: "power2.inOut" },
        "+=0.1"
      )
      .set(coverRef.current, { display: "none" })

      .add(() => {
        setMenuOpen(false);
        linkRefs.current.reverse(); // restore link order
      });
  };

  const handleMouseEnter = (index) => {
    gsap.killTweensOf([boxRefs.current[index], linkRefs.current[index]]);
    gsap.set(boxRefs.current[index], { x: "-100%" });

    const tl = gsap.timeline();

    tl.to(linkRefs.current[index], {
      paddingLeft: "1.5rem",
      duration: 0.3,
      ease: "power2.inOut",
    });

    tl.to(
      boxRefs.current[index],
      { x: "0%", duration: 0.3, ease: "power2.out" },
      "-=0.2"
    );

    tl.to(
      boxRefs.current[index],
      { x: "100%", duration: 0.3, ease: "power2.in" },
      "+=0.1"
    );

    tl.to(
      linkRefs.current[index],
      { paddingLeft: "0rem", duration: 0.3, ease: "power2.inOut" },
      "-=0.2"
    );
  };

  return (
    <>
      {/* Trigger */}
      <div className="flex max-w-[655px] w-full px-4 xl:mb-0 mb-10 mx-auto mt-4 relative z-50 items-center justify-between gap-3">
        <Link href="/">
          <img src={logo.src} className="w-12 h-12" alt="" />
        </Link>

        <div
          className="flex cursor-pointer items-center  gap-1"
          onClick={openMenu}
        >
          Menu
          <div className="w-6 h-6 bg-white/30 flex items-center justify-center rounded-full">
            <svg className="w-4 h-4" viewBox="0 0 32 32">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h22M5 16h22M5 24h22"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Sliding Cover */}
      <div
        ref={coverRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#161616] z-[60] hidden"
        style={{ transform: "translateY(100%)" }}
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-[#161616] z-40 hidden"
        style={{ opacity: 0 }}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 w-full h-screen bg-[#F1EEE7] z-[99999999999999999999999] overflow-y-auto"
        style={{ transform: "translateY(100%)" }}
      >
        {/* Close Button */}
        <div
          className="absolute top-4 right-4 z-50 cursor-pointer sm:top-5 sm:right-5"
          onClick={closeMenu}
        >
          <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 16 16">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m11.25 4.75-6.5 6.5m0-6.5 6.5 6.5"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8  flex flex-col md:flex-row md:min-h-[90vh] md:items-end justify-between py-10 gap-6 sm:gap-12 md:gap-0">
          {/* Menu Links */}
          <div className="flex flex-col justify-center gap-6 flex-1">
           {links.map((link, index) => (
  <div key={index} className={`overflow-hidden h-fit w-fit ${link.hidden ? 'hidden' : ''}`}>
    <div
      className="relative w-fit group cursor-pointer flex items-start gap-2"
      onMouseEnter={() => handleMouseEnter(index)}
    >
    

      {link.external ? (
        <a
          href={link.href}
          ref={(el) => (linkRefs.current[index] = el)}
          className="text-xl leading-none sm:text-[5vh] font-semibold block w-fit"
        >
          {link.label}
          <div
            ref={(el) => (boxRefs.current[index] = el)}
            className="absolute top-0 left-0 h-full bg-black/30 z-0"
            style={{
              width: "100%",
              transform: "translateX(-100%)",
            }}
          />
        </a>
      ) : (
        <a
          href={link.href}
          ref={(el) => (linkRefs.current[index] = el)}
          onClick={(e) => {
            e.preventDefault();
            const target = document.querySelector(link.href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            setTimeout(() => {
              closeMenu();
            }, 600);
          }}
          className="text-xl leading-none sm:text-[5vh] font-semibold block w-fit"
        >
          {link.label}
          <div
            ref={(el) => (boxRefs.current[index] = el)}
            className="absolute top-0 left-0 h-full bg-black/30 z-0"
            style={{
              width: "100%",
              transform: "translateX(-100%)",
            }}
          />
        </a>
      )}
    </div>
  </div>
))}

          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-start md:items-end gap-4 flex-1">
            <a
              href="mailto:hello@hello.com"
              ref={(el) => (contactItemRefs.current[0] = el)}
              className="text-base sm:text-lg md:text-xl text-gray-700 hover:pr-4 transition-all duration-300 uppercase font-semibold hover:scale-105 hover:text-black"
            >
              hello@hello.com
            </a>
            <a
              href="tel:+1 234 5678 910"
              ref={(el) => (contactItemRefs.current[1] = el)}
              className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 hover:opacity-70 hover:pr-4 transition-all duration-300 hover:scale-105 hover:text-black"
            >
             +1 234 5678 910
            </a>
            <div className="flex items-center gap-3 mt-5">
              {svgIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="bg-black/20 rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer hover:bg-black/40 transition duration-300"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
