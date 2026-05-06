'use client';

import { useEffect, useRef } from 'react';
import styles from './CourseGrid.module.css';

const courses = [
  {
    icon: '🇩🇪',
    title: 'German Language',
    subtitle: 'From A1 to Advanced Levels',
    description:
      'Best language institute with periodic classes from Fr. Joseph Puthussery from Germany and qualified trainers. From A1 beginners to advanced levels.',
    features: ['A1 to C2 Levels', 'Native Trainers', 'Goethe Exam Prep', 'Cultural Immersion'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '🌍',
    title: 'IELTS',
    subtitle: 'International English Language Testing System',
    description:
      'The International English Language Testing System designed to assess language proficiency for study or work. Comprehensive coaching with mock tests and personalized feedback.',
    features: ['Academic & General Training', 'Band 7+ Strategy', 'Mock Tests Included', 'Flexible Batches'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '💻',
    title: 'PTE',
    subtitle: 'Pearson Test of English',
    description:
      'Fast, computer-based English tests trusted globally. Get results in just 2 days with our proven preparation methodology and advanced AI-powered practice tools.',
    features: ['Computer-Based Practice', '2-Day Results', 'AI Scoring Practice', 'Score Guarantee'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '🩺',
    title: 'OET',
    subtitle: 'Virtual Classroom & Packages',
    description:
      'Specialized training for healthcare professionals. Choose from tailored pathways for Beginners and Repeaters, and explore our tiered packages (Ruby to Premium) offering mock tests, live sessions, and expert doctor trainers.',
    features: ['Beginner & Repeater Paths', 'Ruby to Platinum Packs', 'Expert Doctor Trainers', 'Score Guarantee'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '🗣️',
    title: 'Spoken English',
    subtitle: 'Fluency & Confidence Building',
    description:
      'Master the art of confident communication. Tailored modules for beginners to advanced learners to improve vocabulary, pronunciation, and public speaking skills.',
    features: ['Interactive Sessions', 'Accent Neutralization', 'Grammar Fundamentals', 'Group Discussions'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '🦉',
    title: 'Duolingo',
    subtitle: 'Modern English Proficiency Test',
    description:
      'A fast, convenient, and cost-effective English test accepted by thousands of institutions globally. Get your results in just 48 hours with our specialized prep classes.',
    features: ['Results in 48 Hours', 'Take Anywhere', 'Worldwide Acceptance', 'Mock Interviews'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '🇨🇦',
    title: 'CELPIP',
    subtitle: 'Canadian English Proficiency Index',
    description:
      'The essential test for Canadian permanent residency and citizenship. Our training focuses on the Canadian context and computer-based test formats.',
    features: ['IRCC Approved', 'Canadian Accent Prep', 'Computer-Based Labs', 'Express Entry Path'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
  {
    icon: '🎓',
    title: 'TOEFL',
    subtitle: 'Test of English as a Foreign Language',
    description:
      'The most widely respected academic English-language test globally. Master the iBT format with our comprehensive training and expert strategies.',
    features: ['Academic English', 'iBT Preparation', 'University Pathways', 'Expert Feedback'],
    color: '#0f2b5b',
    gradient: 'linear-gradient(135deg, #0f2b5b, #2563eb)',
  },
];

export default function CourseGrid() {
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
    <section className={styles.section} id="programs" ref={sectionRef}>
      <div className="container">
        <div className="reveal reveal-up">
          <p className={styles.sectionLabel}>Our Core Programs</p>
          <h2 className="section-title">Master the Language, Unlock the World</h2>
          <p className="section-subtitle">
            Choose from our comprehensive suite of internationally recognized language programs, tailored to your career and academic goals.
          </p>
        </div>

        <div className={styles.grid}>
          {courses.map((course, i) => (
            <div
              key={course.title}
              className={`${styles.card} reveal ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}
              style={{ 
                transitionDelay: `${i * 0.1}s`,
                '--theme-color': course.color,
                '--theme-gradient': course.gradient
              }}
            >
              {/* Accent border top */}
              <div className={styles.cardAccent} style={{ background: course.gradient }}></div>

              <div className={styles.cardInner}>
                {/* Icon */}
                <div className={styles.iconWrap} style={{ background: `${course.color}15` }}>
                  <span className={styles.icon}>{course.icon}</span>
                </div>

                {/* Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{course.title}</h3>
                  <p className={styles.cardSubtitle}>{course.subtitle}</p>
                  <p className={styles.cardDesc}>{course.description}</p>
                </div>

                {/* Features */}
                <ul className={styles.features}>
                  {course.features.map((f) => (
                    <li key={f} className={styles.feature}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={course.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className={styles.cardBtn}
                  style={{ color: course.color, borderColor: `${course.color}30` }}
                >
                  <span>Learn More</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
