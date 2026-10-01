'use client';

import { useEffect, useRef } from 'react';
import styles from './AuPairBanner.module.css';

const features = [
  { icon: '🌍', text: 'Work & Live in Germany' },
  { icon: '👨‍👩‍👧', text: 'Host Family Matching' },
  { icon: '🗣️', text: 'German Language Ready' },
  { icon: '📋', text: 'Visa Guidance Included' },
];

export default function AuPairBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="aupair" ref={sectionRef}>
      {/* Decorative orbs */}
      <div className={styles.bgOrbs}>
        <div className={`${styles.orb} ${styles.orb1}`} />
        <div className={`${styles.orb} ${styles.orb2}`} />
      </div>

      <div className="container">
        <div className={`${styles.card} reveal reveal-up`}>
          {/* Top accent stripe */}
          <div className={styles.cardAccent} />

          {/* Label */}
          <p className={styles.label}>
            <span className={styles.labelDot} />
            Au Pair Services
          </p>

          {/* Heading */}
          <h2 className={styles.heading}>
            Planning to Work as an{' '}
            <span className={styles.headingHighlight}>Au Pair</span> in Germany?
          </h2>

          {/* Description */}
          <p className={styles.desc}>
            LangFort Academy partners with <strong>AuPair.com</strong> to help aspiring au pairs
            prepare with the right German language skills, documentation guidance, and cultural
            readiness. Take the first step towards your international journey today.
          </p>

          {/* Feature pills */}
          <ul className={styles.pills}>
            {features.map((f) => (
              <li key={f.text} className={styles.pill}>
                <span>{f.icon}</span>
                <span>{f.text}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className={styles.ctaWrap}>
            <a
              href="https://www.aupair.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
              id="aupair-com-link"
              aria-label="Visit AuPair.com — official au pair placement platform"
            >
              <span>Visit AuPair.com</span>
              <svg
                className={styles.ctaArrow}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
