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
    icon: '/logolangfort.png',
    shortcut: '/logolangfort.png',
    apple: '/logolangfort.png',
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
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0f2b5b" />
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
