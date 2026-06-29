"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Portfolio",
      href: "#portfolio",
    },
    {
      name: "About",
      href: "#about",
    },
    {
      name: "Contact",
      href: "#contact",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 lg:px-10 py-5">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Phani Studio
            <span className="text-gray-500">.</span>
          </h1>
        </Link>

        {/* Desktop Menu - Changed from lg:flex to md:flex */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm text-white/80">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="relative hover:text-white transition group"
            >
              {item.name}

              {/* Underline */}
              <span className="absolute left-0 -bottom-2 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Desktop Button */}
          {/* <a
            href="#contact"
            className="px-5 py-2.5 lg:px-6 lg:py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black transition duration-300"
          >
            <span className="text-sm font-medium">Book Now</span>
          </a> */}
        </div>

        {/* Hamburger Menu - Changed from lg:hidden to md:hidden */}
        <div className="hidden flex items-center">
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="text-white text-3xl focus:outline-none"
          >
            {mobileMenu ? "×" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Menu - Changed from lg:hidden to md:hidden */}
      {mobileMenu && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10">
          <div className="px-6 py-6 flex flex-col gap-6 text-white">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="text-lg text-white/80 hover:text-white transition"
              >
                {item.name}
              </a>
            ))}

            {/* Mobile Button */}
            <Link
              href="#contact"
              className="mt-2 w-full py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition block text-center"
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
