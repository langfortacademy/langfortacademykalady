'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: 'IELTS Coaching',
    website: '', // Honeypot field
  });
  const [submitted, setSubmitted] = useState(false);

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Honeypot check: If the hidden field is filled, it's a bot
    if (formData.website) {
      console.warn('Bot detected');
      setSubmitted(true); // Simulate success to the bot
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Send data to Google Sheets
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbzBVqUSb-pMkM06ZBK7GKqYdSsvPvJyOfudTL8tfo5L70lK9OpQ_DL6iYZjsprPv45pyg/exec';
      
      // We use a clean form data object to ensure compatibility with Apps Script
      const formDataToSubmit = new URLSearchParams();
      formDataToSubmit.append('First Name', formData.firstName);
      formDataToSubmit.append('Last Name', formData.lastName);
      formDataToSubmit.append('Email', formData.email);
      formDataToSubmit.append('Phone', formData.phone);
      formDataToSubmit.append('Course', formData.course);
      formDataToSubmit.append('Date', new Date().toLocaleString());

      // Fire and forget (or wait briefly) to ensure the sheet is updated
      fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Essential for Google Apps Script redirects
        body: formDataToSubmit,
      }).catch(err => console.error('Sheet Sync Error:', err));

      // 2. Prepare and trigger WhatsApp message
      const waNumber = '919383448172';
      const waMessage = `Hello LangFort Academy!%0A%0AI would like to start my journey. Here are my details:%0A%0A*Name:* ${formData.firstName} ${formData.lastName}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Interested Course:* ${formData.course}`;
      const waLink = `https://wa.me/${waNumber}?text=${waMessage}`;

      // Open WhatsApp in a new tab
      window.open(waLink, '_blank');

      // 3. Update local state
      setSubmitted(true);
      setFormData({ firstName: '', lastName: '', email: '', phone: '', course: 'IELTS Coaching', website: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your details. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className={styles.bgDecor1}></div>
      <div className={styles.bgDecor2}></div>

      <div className="container">
        <div className="reveal reveal-up">
          <p className={styles.sectionLabel}>Get In Touch</p>
          <h2 className="section-title">
            Start Your Journey Today
          </h2>
          <p className="section-subtitle">
            Fill out the form below and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Form */}
          <div className={`${styles.formCard} reveal reveal-left`}>
            {submitted ? (
              <div className={styles.successMsg}>
                <div className={styles.successIcon}>✓</div>
                <h3>Thank you!</h3>
                <p>We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className={styles.input}
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className={styles.input}
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className={styles.input}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="course" className={styles.label}>Interested Course</label>
                  <select
                    id="course"
                    className={styles.input}
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    required
                  >
                    <option value="IELTS Coaching">IELTS Coaching</option>
                    <option value="OET Training">OET Training</option>
                    <option value="PTE Preparation">PTE Preparation</option>
                    <option value="German Language">German Language</option>
                    <option value="Spoken English">Spoken English</option>
                  </select>
                </div>

                {/* Honeypot field (hidden from users) */}
                <div className={styles.hp} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex="-1"
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary btn-lg ${styles.submitBtn}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className={`${styles.infoCard} reveal reveal-right`} style={{ transitionDelay: '0.15s' }}>
            <h3 className={styles.infoTitle}>Contact Information</h3>
            <p className={styles.infoSubtitle}>
              Reach out to us through any of the following channels.
            </p>

            <div className={styles.infoItems}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoLabel}>Address</h4>
                  <p className={styles.infoText}>
                    LangFort Global Education Pvt. Ltd., Above Bank of Baroda, SNDP Building, Near Kalady Panchayat, MC Road, Kalady, Kerala, India.
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoLabel}>Phone</h4>
                  <p className={styles.infoText}>
                    <a href="tel:+919383448172">+91 9383448172</a>
                    <br />
                    <a href="tel:+917736036076">+91 7736036076</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoLabel}>Email</h4>
                  <p className={styles.infoText}>
                    <a href="mailto:langfortacademy@gmail.com">langfortacademy@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.infoLabel}>Hours</h4>
                  <p className={styles.infoText}>Open today 09:00 am – 05:00 pm</p>
                </div>
              </div>
            </div>

            {/* Social / Quick links */}
            <div className={styles.socialRow}>
              <a href="https://wa.me/919383448172" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@LangfortInternationalAcademy" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="mailto:langfortacademy@gmail.com" className={styles.socialLink} aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className={`${styles.mapContainer} reveal`} style={{ transitionDelay: '0.3s' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8448542037754!2d76.4350407!3d10.167864400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08074a08c7ea6f%3A0x7b280d4ac877707!2sLangFort%20Global%20Education%20Pvt.%20Ltd.!5e1!3m2!1sen!2sin!4v1778011051061!5m2!1sen!2sin" 
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Langfort Academy Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
