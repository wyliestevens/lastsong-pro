"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/ministry", label: "Ministry" },
  { href: "/schedule", label: "Schedule" },
  { href: "/listen", label: "Listen" },
  { href: "/support", label: "Support" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? "12px 0" : "20px 0",
          background: scrolled
            ? "rgba(15, 13, 10, 0.95)"
            : "rgba(15, 13, 10, 0.7)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgba(212, 160, 65, 0.12)"
            : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                fontWeight: 600,
                color: "var(--color-amber)",
                letterSpacing: "2px",
              }}
            >
              LAST SONG
            </span>
          </Link>

          <div className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div style={{ width: "24px", height: "18px", position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "var(--color-amber)",
                  transition: "all 0.3s ease",
                  top: isOpen ? "8px" : "0",
                  transform: isOpen ? "rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: "8px",
                  width: "100%",
                  height: "2px",
                  backgroundColor: "var(--color-amber)",
                  transition: "all 0.3s ease",
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "var(--color-amber)",
                  transition: "all 0.3s ease",
                  top: isOpen ? "8px" : "16px",
                  transform: isOpen ? "rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>

        {isOpen && (
          <div className="mobile-menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-link ${pathname === link.href ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <style jsx>{`
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 32px;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .mobile-menu {
          display: none;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            padding: 32px 24px;
            background: rgba(15, 13, 10, 0.98);
            border-top: 1px solid var(--color-divider);
          }
        }
      `}</style>

      <style jsx global>{`
        .nav-link {
          text-decoration: none;
          color: var(--color-cream-muted);
          font-family: 'Quicksand', sans-serif;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: color 0.3s ease;
          padding-bottom: 4px;
          border-bottom: 1px solid transparent;
        }
        .nav-link:hover {
          color: var(--color-amber-light);
        }
        .nav-link.active {
          color: var(--color-amber);
          border-bottom: 1px solid var(--color-amber);
        }
        .mobile-link {
          text-decoration: none;
          color: var(--color-cream-muted);
          font-family: 'Quicksand', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .mobile-link.active {
          color: var(--color-amber);
        }
      `}</style>
    </>
  );
}
