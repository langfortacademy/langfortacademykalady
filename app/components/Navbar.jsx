'use client';

import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Programs', href: '#programs' },
    { label: 'Overseas', href: '#contact' },
    { label: 'Videos', href: '#videos' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`} id="navbar">
      <div className={styles.navInner}>
        {/* Logo (Left) */}
        <a href="#hero" className={styles.logo}>
          <img 
            src="/logo white.png" 
            alt="Langfort International Academy Logo" 
            className={styles.logoIcon} 
          />
        </a>

        {/* Desktop Links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className={styles.navActions}>
          <a href="#" className={`btn ${styles.navLoginBtn}`}>
            Student Login
          </a>
          <a href="#contact" className={`btn ${styles.navCta}`}>
            Enroll Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-menu-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileLinks}>
          {navLinks.map((link, i) => (
            <li key={link.label} style={{ animationDelay: `${i * 0.06}s` }}>
              <a
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ animationDelay: `${navLinks.length * 0.06}s`, display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', marginTop: '1rem' }}>
            <a
              href="#"
              className={`btn btn-secondary ${styles.mobileCta}`}
              onClick={() => setMobileOpen(false)}
            >
              Student Login
            </a>
            <a
              href="#contact"
              className={`btn btn-primary ${styles.mobileCta}`}
              onClick={() => setMobileOpen(false)}
            >
              Enroll Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
