import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Programs', href: '#programs' },
    { label: 'Overseas', href: '#contact' },
    { label: 'Videos', href: '#videos' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const programs = [
    { label: 'IELTS Coaching', href: '#programs' },
    { label: 'OET Training', href: '#programs' },
    { label: 'PTE Preparation', href: '#programs' },
    { label: 'German Language', href: '#programs' },
    { label: 'Spoken English', href: '#programs' },
  ];

  return (
    <footer className={styles.footer} id="footer">
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Brand */}
          <div className={styles.footerBrand}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <img src="/logolangfort.png" alt="Langfort International Academy Logo" className={styles.logoImg} />
              </div>
              <div>
                <div className={styles.logoName}>Langfort</div>
                <div className={styles.logoTag}>International Academy</div>
              </div>
            </div>
            <p className={styles.brandDesc}>
              Kerala&apos;s premier language academy offering world-class coaching for IELTS, OET, PTE, and German language programs.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Programs</h4>
            <ul className={styles.linkList}>
              {programs.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.footerLink}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerCol}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>LangFort Global Education Pvt. Ltd.</p>
              <p>Above Bank of Baroda, SNDP Building</p>
              <p>Near Kalady Panchayat, MC Road</p>
              <p>Kalady, Kerala, India</p>
              <br />
              <p><a href="tel:+919383448172">+91 9383448172</a></p>
              <p><a href="tel:+919048692086">+91 9048692086</a></p>
              <p><a href="mailto:langfortacademy@gmail.com">langfortacademy@gmail.com</a></p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottomBar}>
          <p>&copy; {currentYear} Langfort International Academy. All rights reserved.</p>
          <p className={styles.madeWith}>
            <a href="https://wa.me/+919188840291/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
              Made with CREON
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
