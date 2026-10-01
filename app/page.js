import Hero from './components/Hero';
import CourseGrid from './components/CourseGrid';
import AuPairBanner from './components/AuPairBanner';
import VideoLibrary from './components/VideoLibrary';
import Testimonials from './components/Testimonials';
import ImageGallery from './components/ImageGallery';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <CourseGrid />
      <AuPairBanner />
      <VideoLibrary />
      <Testimonials />
      <ImageGallery />
      <Contact />
    </main>
  );
}
