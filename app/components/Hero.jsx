'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e) => {
      // Normalize from -1 to 1 based on window center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = heroRef.current?.querySelectorAll(`.${styles.animItem}`);
    els?.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className={styles.hero} id="hero" ref={heroRef}>
        {/* Animated background */}
        <div className={styles.bgGradient}></div>
        <div className={styles.bgOrbs}>
          <div className={`${styles.cloud} ${styles.cloud1}`} style={{ transform: `translate(${mousePos.x * -80}px, ${scrollY * 0.1 + mousePos.y * -80}px)` }}></div>
          <div className={`${styles.cloud} ${styles.cloud2}`} style={{ transform: `translate(${mousePos.x * 120}px, ${scrollY * 0.2 + mousePos.y * 120}px)` }}></div>
          <div className={`${styles.cloud} ${styles.cloud3}`} style={{ transform: `translate(${mousePos.x * -160}px, ${scrollY * 0.3 + mousePos.y * -160}px)` }}></div>
        </div>
        <div className={styles.bgGrid} style={{ transform: `translateY(${scrollY * 0.2}px)` }}></div>

        {/* Content */}
        <div 
          className={`container ${styles.heroContainer}`}
          style={{ transform: `translateY(${scrollY * 0.4}px)`, opacity: 1 - scrollY / 600 }}
        >
          <div className={styles.heroText}>
            <div className={`${styles.badge} ${styles.animItem}`}>
              <span className={styles.badgeDot}></span>
              <span>GLOBAL EDUCATION</span>
            </div>

            <h1 className={`${styles.headline} ${styles.animItem}`}>
              Empower Your <br />
              <span className={styles.headlineHighlight}>Future</span> <br />
              With Langfort.
            </h1>

            <p className={`${styles.subheadline} ${styles.animItem}`}>
              Your premium passport to global excellence and international opportunities.
            </p>

            <div className={`${styles.ctaGroup} ${styles.animItem}`}>
              <a href="#programs" className="btn btn-primary btn-lg">
                <span>EXPLORE COURSES</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <button
                className={`btn btn-secondary btn-lg ${styles.videoBtn}`}
                onClick={() => setIsVideoModalOpen(true)}
                id="watch-video-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <div className={styles.playIconWrap}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span>Watch Orientation Video</span>
              </button>
            </div>

            {/* Stats */}
            <div className={`${styles.stats} ${styles.animItem}`}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5000+</span>
                <span className={styles.statLabel}>Students Trained</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>15+</span>
                <span className={styles.statLabel}>Expert Trainers</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>95%</span>
                <span className={styles.statLabel}>Success Rate</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10+</span>
                <span className={styles.statLabel}>Years of Excellence</span>
              </div>
            </div>
          </div>
          
          <div className={`${styles.heroImageWrap} ${styles.animItem}`}>
            <img src="/hero-student.png" alt="Student" className={styles.heroImage} />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}>
            <div className={styles.scrollDot}></div>
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className={styles.videoModal} onClick={() => setIsVideoModalOpen(false)} id="video-modal">
          <div className={styles.videoModalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.videoModalClose}
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Close video"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className={styles.videoWrapper}>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Langfort Orientation Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
