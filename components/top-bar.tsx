"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ContactButton from "./contact-button";
import { XIcon } from "./icons";

const navigationItems = [
  {
    href: "/",
    label: "Screens",
    badge: "8",
  },
  {
    href: "/request-app",
    label: "Request App",
    badge: "New",
    badgeVariant: "blue",
  },
  // {
  //   href: "/mini-apps",
  //   label: "Mini Apps",
  //   badge: "New",
  //   badgeVariant: "blue",
  // },
  {
    href: "/animations",
    label: "Animations",
    badge: "12",
  },
];

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md border-b border-white/30 transition-transform duration-300 max-w-screen-xl mx-auto ${
          isVisible ? "translate-y-0" : "-translate-y-full bg-white/80 "
        }`}
        style={{
          zIndex: 1000,
        }}
      >
        <div className="flex items-center justify-between w-full lg:px-2 py-2 px-4">
          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle mobile menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="w-5 h-0.5 bg-stone-900"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="w-5 h-0.5 bg-stone-900"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="w-5 h-0.5 bg-stone-900"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </motion.button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4">
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

          {/* Logo - Centered on mobile, left on desktop */}
          <div className="flex items-center justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
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
          <div className="flex items-center gap-3 lg:gap-6">
            <Link
              href="https://x.com/getswiftviews"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              aria-label="Follow us on X (Twitter)"
            >
              <XIcon
                color={isVisible && lastScrollY < 100 ? "#000000" : "#FFFFFF"}
                className="hover:opacity-80 transition-opacity duration-200 w-5 h-5 hidden lg:block"
              />
              <XIcon
                color="#000000"
                className="hover:opacity-80 transition-opacity duration-200 w-5 h-5 block lg:hidden"
              />
            </Link>
            <div className="hidden sm:block">
              <ContactButton />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/20 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute top-16 left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/30 rounded-lg shadow-lg p-4"
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.95,
                backdropFilter: "blur(0px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                backdropFilter: "blur(20px)",
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.95,
                backdropFilter: "blur(0px)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <nav className="flex flex-col gap-4">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-base font-medium text-stone-900 hover:text-stone-700 transition-colors duration-200 flex items-center justify-between py-2"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <motion.span
                          className={`text-xs font-medium px-2 py-1 rounded ${
                            item.badgeVariant === "blue"
                              ? "bg-blue-500 text-white"
                              : "bg-stone-100 text-stone-600"
                          }`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.2,
                            delay: index * 0.1 + 0.2,
                            ease: "easeOut",
                          }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  className="pt-4 border-t border-stone-200 sm:hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: navigationItems.length * 0.1 + 0.1,
                    ease: "easeOut",
                  }}
                >
                  <ContactButton />
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
