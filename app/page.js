import Hero from './components/Hero';
import CourseGrid from './components/CourseGrid';
import VideoLibrary from './components/VideoLibrary';
import Testimonials from './components/Testimonials';
import ImageGallery from './components/ImageGallery';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <CourseGrid />
      <VideoLibrary />
      <Testimonials />
      <ImageGallery />
      <Contact />
    </main>
  );
}
