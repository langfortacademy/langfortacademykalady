'use client';

import { useEffect, useState } from 'react';

export default function ScrollEffects() {
  useEffect(() => {
    // 1. Global Reveal Observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // 2. Parallax Effect for specific elements
    const handleParallax = () => {
      const parallaxEls = document.querySelectorAll('.parallax');
      parallaxEls.forEach((el) => {
        const speed = el.dataset.speed || 0.5;
        const rect = el.getBoundingClientRect();
        const offset = (window.innerHeight - rect.top) * speed;
        el.style.transform = `translateY(${offset * 0.1}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax, { passive: true });

    // Initial observation
    const revealEls = document.querySelectorAll('.reveal');
    revealEls.forEach((el) => revealObserver.observe(el));

    // Mutation Observer to watch for dynamically added reveal elements
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { 
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
      window.removeEventListener('scroll', handleParallax);
      revealObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
