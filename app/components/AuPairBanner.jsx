'use client';

import { useEffect, useRef } from 'react';
import styles from './AuPairBanner.module.css';

const features = [
  { icon: '🇩🇪', text: 'Genuine Host Family Matching' },
  { icon: '👩‍👧', text: 'Profile Registration & Screening' },
  { icon: '🎥', text: 'Host Family Interview Coordination' },
  { icon: '📄', text: 'Contract & Documentation Support' },
  { icon: '🛂', text: 'Visa Guidance' },
  { icon: '✈️', text: 'Travel & Departure Assistance' },
  { icon: '🗣️', text: 'Language & Cultural Preparation' },
  { icon: '🏡', text: 'Arrival & Accommodation Support' },
  { icon: '🤝', text: 'Ongoing Au Pair & Host Family Support' },
  { icon: '🔄', text: 'Rematch & Extension Assistance' },
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
            Our Au Pair Services
          </p>

          {/* Heading */}
          <h2 className={styles.heading}>
            Planning to Work as an{' '}
            <span className={styles.headingHighlight}>Au Pair</span> in Germany?
          </h2>

          {/* Description */}
          <p className={styles.desc}>
            At LangFort Global Education LLP, we help aspiring Au Pairs take their first step towards an exciting cultural exchange experience in Germany. Our Au Pair programme offers young individuals the opportunity to live with a host family, support them in childcare, improve their German language skills, and experience German culture and everyday life.
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
        </div>
      </div>
    </section>
  );
}
