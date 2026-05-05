'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ImageGallery.module.css';

// Replace these with your actual images by saving them in the `public` folder
const galleryImages = [
  { id: 1, src: '/gallery-1.jpg', alt: 'Langfort Campus 1' },
  { id: 2, src: '/gallery-2.jpg', alt: 'Langfort Campus 2' },
  { id: 3, src: '/gallery-3.jpg', alt: 'Langfort Campus 3' },
  { id: 4, src: '/gallery-4.jpg', alt: 'Langfort Campus 4' },
  { id: 5, src: '/gallery-5.jpg', alt: 'Langfort Campus 5' },
  { id: 6, src: '/gallery-6.jpg', alt: 'Langfort Campus 6' },
];

export default function ImageGallery() {
  const sectionRef = useRef(null);
  const [selectedImg, setSelectedImg] = useState(null);

  useEffect(() => {
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

    const els = sectionRef.current?.querySelectorAll(`.${styles.animItem}`);
    els?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const marqueeItems = [...galleryImages, ...galleryImages];

  return (
    <section className={styles.section} id="gallery" ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} ${styles.animItem}`}>
          <p className={styles.sectionLabel}>Life at Langfort</p>
          <h2 className="section-title">Campus Gallery</h2>
          <p className="section-subtitle">
            Take a glimpse into our vibrant campus, interactive classrooms, and the success stories of our students.
          </p>
        </div>
      </div>

      <div className={styles.marqueeWrapper}>
        <div className={styles.marqueeTrack}>
          {marqueeItems.map((img, i) => (
            <div 
              key={`${img.id}-${i}`} 
              className={styles.imageCard}
            >
              <img src={img.src} alt={img.alt} className={styles.image} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
