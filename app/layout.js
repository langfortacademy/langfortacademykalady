import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import InteractiveBackground from './components/InteractiveBackground';
import ScrollEffects from './components/ScrollEffects';

export const metadata = {
  title: 'Langfort International Academy | Your Passport to Global Opportunities',
  description:
    'Langfort International Academy, located at Kalady, Ernakulam, is one of the leading institutes in India offering IELTS, OET, PTE, and German Language courses for study, work, and migration.',
  keywords: 'IELTS, OET, PTE, German Language, English Courses, Study Abroad, Langfort Academy, Kalady, Kerala',
  authors: [{ name: 'Langfort International Academy' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Langfort Academy',
    statusBarStyle: 'default',
    capable: true,
  },
  openGraph: {
    title: 'Langfort International Academy',
    description: 'One-stop solution for all your international study needs.',
    url: 'https://langfortacademy.online/',
    siteName: 'Langfort International Academy',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Langfort International Academy',
    description: 'Your passport to the world of opportunities.',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Langfort International Academy",
    "url": "https://langfortacademy.online/",
    "logo": "https://langfortacademy.online/favicon.png",
    "description": "Kerala's premier language academy offering world-class coaching for IELTS, OET, PTE, and German language programs.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Above Bank of Baroda, SNDP Building, Near Kalady Panchayat, MC Road",
      "addressLocality": "Kalady",
      "addressRegion": "Kerala",
      "postalCode": "683574",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9383448172",
      "contactType": "admissions",
      "areaServed": "IN",
      "availableLanguage": ["English", "Malayalam", "German"]
    },
    "sameAs": [
      "https://www.youtube.com/@LangfortInternationalAcademy",
      "https://wa.me/919383448172"
    ]
  };

  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="canonical" href="https://langfortacademy.online/" />
        <meta name="theme-color" content="#0f2b5b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ScrollEffects />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
        <InteractiveBackground />
      </body>
    </html>
  );
}
