'use client';

import { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';
import { useAutoScroll } from '../hooks/useAutoScroll';

const testimonials = [
  {
    name: 'Arya Haridas',
    role: 'IELTS Student',
    text: 'I am extremely grateful to LangFort Global Education Pvt. Ltd. for their excellent guidance and support throughout my IELTS preparation journey. The training was well-structured, focused, and truly effective.',
    rating: 5,
  },
  {
    name: 'Ahmad Yaseen',
    role: 'IELTS Student',
    text: 'Hands-down the best IELTS prep experience at Langfort Institute! Expert trainers, comprehensive study materials, and a supportive community helped me achieve my desired score. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Benjamin David',
    role: 'OET Student',
    text: "I had a wonderful learning experience. Both Johnson sir and Ann ma'am gave the best tips and guidance necessary to perform for OET (medicine). Even within 15 days, they were able to give me an idea of what to expect and how to answer the questions.",
    rating: 4.5,
  },
  {
    name: 'Remya Cherian',
    role: 'OET Student',
    text: 'LangFort International Academy truly stands out as a premier OET coaching center. With exceptional mentors, up-to-date study materials, personalized speaking and writing sessions, they provide a good learning experience.',
    rating: 4,
  },
  {
    name: 'Anish Puthan',
    role: 'German Language Student',
    text: 'I visited Lang Fort, the German Language Study Centre, and it was an exceptional experience. The instructors were highly knowledgeable and passionate about teaching, making lessons both engaging and informative.',
    rating: 4.5,
  },
  {
    name: 'Bindu Joy',
    role: 'OET Student',
    text: 'Langfort International is an exceptional OET teaching center that exceeded my expectations. The instructors are highly knowledgeable and create a supportive learning environment.',
    rating: 5,
  },
  {
    name: 'Prince Devassy',
    role: 'IELTS Student',
    text: 'Excellent IELTS coaching with great guidance and support. LIA provided a friendly environment and individual training. My heartfelt gratitude to all LIA tutors and coordinators for making me a UKVI IELTS winner within 2 weeks.',
    rating: 4.5,
  },
  {
    name: 'Stephen',
    role: 'Student',
    text: 'What truly sets Langfort apart is their commitment to individual progress. The instructors go above and beyond to provide feedback and guidance tailored to each student’s needs, ensuring steady improvement.',
    rating: 4,
  },
];

export default function Testimonials() {
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

  const { scrollRef, handlers } = useAutoScroll(1, 'left');

  return (
    <section className={styles.section} id="testimonials" ref={sectionRef}>
      <div className="container">
        {/* Quote block */}
        <div className={`${styles.quoteBlock} reveal reveal-zoom`}>
          <div className={styles.quoteIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#quoteGrad)" strokeWidth="1.5">
              <defs>
                <linearGradient id="quoteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
                <linearGradient id="halfStarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#e5e7eb" />
                </linearGradient>
              </defs>
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>
          <blockquote className={styles.quote}>
            &ldquo;Opportunities are like sunrises. If you wait too long, you miss them.&rdquo;
          </blockquote>
          <cite className={styles.quoteAuthor}>— William Arthur Ward</cite>
        </div>

        {/* Section header */}
        <div className="reveal reveal-up" style={{ marginTop: 'var(--space-20)' }}>
          <p className={styles.sectionLabel}>What Our Students Say</p>
          <h2 className="section-title">Student Testimonials</h2>
          <p className="section-subtitle">
            Join thousands of successful students who achieved their dreams with Langfort.
          </p>
        </div>
      </div>

      {/* Auto Scroll Marquee */}
      <div className={styles.marqueeWrapper}>
        <div 
          className={styles.marqueeTrack}
          ref={scrollRef}
          {...handlers}
        >
          <div className={styles.marqueeGroup}>
            {testimonials.map((t, i) => (
              <div key={`group1-${t.name}-${i}`} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    let fill = '#e5e7eb'; // Empty star color
                    if (t.rating >= starIndex) {
                      fill = '#f59e0b'; // Full star color
                    } else if (t.rating >= starIndex - 0.5) {
                      fill = 'url(#halfStarGrad)'; // Half star gradient
                    }
                    return (
                      <svg key={starIndex} width="16" height="16" viewBox="0 0 24 24" fill={fill} stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    );
                  })}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.avatar}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.marqueeGroup} aria-hidden="true">
            {testimonials.map((t, i) => (
              <div key={`group2-${t.name}-${i}`} className={styles.testimonialCard}>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((starIndex) => {
                    let fill = '#e5e7eb'; // Empty star color
                    if (t.rating >= starIndex) {
                      fill = '#f59e0b'; // Full star color
                    } else if (t.rating >= starIndex - 0.5) {
                      fill = 'url(#halfStarGrad)'; // Half star gradient
                    }
                    return (
                      <svg key={starIndex} width="16" height="16" viewBox="0 0 24 24" fill={fill} stroke="none">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    );
                  })}
                </div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.avatar}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className={styles.authorName}>{t.name}</div>
                    <div className={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
