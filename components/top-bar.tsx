"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import ContactButton from "./contact-button";

const navigationItems = [
  {
    href: "/screens",
    label: "Screens",
    badge: "8",
  },
  {
    href: "/request-app",
    label: "Request App",
  },
  {
    href: "/mini-apps",
    label: "Mini Apps",
    badge: "New",
    badgeVariant: "blue",
  },
  {
    href: "/animations",
    label: "Animations",
    badge: "12",
  },
];

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        // Hide navbar when scrolling down
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/30 transition-transform duration-300 max-w-screen-xl mx-auto ${
        isVisible ? "translate-y-0" : "-translate-y-full bg-white/80 "
      }`}
      style={{
        zIndex: 1000,
      }}
    >
      <div className="grid grid-cols-3 items-center w-full lg:px-2 py-2 px-4">
        {/* Navigation Links */}
        <nav className="flex items-center gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-tight text-stone-900/80 hover:text-stone-900 transition-colors duration-200 flex items-center gap-1"
            >
              {item.label}
              {item.badge && (
                <span
                  className={`text-[10px] font-medium tracking-tighter -mt-2 block px-1 py-0.5 rounded text-center ${
                    item.badgeVariant === "blue"
                      ? "bg-blue-500 text-white"
                      : "text-stone-900/50"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logo - Centered */}
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-stone-900 border border-stone-900/20 rounded-sm flex items-center justify-center shadow-sm">
            <Image
              src="/swift.png"
              alt="SwiftView Logo"
              width={24}
              height={24}
            />
          </div>
        </div>

        {/* Social & Contact */}
        <div className="flex items-center justify-end gap-6">
          <Link
            href="https://x.com/swiftview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            aria-label="Follow us on X (Twitter)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </Link>
          <ContactButton />
        </div>
      </div>
    </header>
  );
}
