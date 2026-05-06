'use client';

import { useEffect, useState } from 'react';

export default function ScrollEffects() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 1. Scroll Progress Logic
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };

    // 2. Global Reveal Observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Once visible, we can stop observing if we don't need to re-animate
            // revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before it enters fully
      }
    );

    // 3. Parallax Effect for specific elements
    const handleParallax = () => {
      const parallaxEls = document.querySelectorAll('.parallax');
      parallaxEls.forEach((el) => {
        const speed = el.dataset.speed || 0.5;
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * speed;
        el.style.transform = `translateY(${offset * 0.1}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleParallax, { passive: true });

    // Initial observation
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach((el) => revealObserver.observe(el));

    // Mutation Observer to watch for dynamically added reveal elements (Next.js client-side navigation)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            if (node.classList?.contains('reveal')) {
              revealObserver.observe(node);
            }
            const childReveals = node.querySelectorAll?.('.reveal');
            childReveals?.forEach((el) => revealObserver.observe(el));
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleParallax);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="scrollProgress" style={{ width: `${progress}%` }} aria-hidden="true" />
  );
}
