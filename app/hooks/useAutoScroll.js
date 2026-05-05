'use client';

import { useEffect, useRef, useState } from 'react';

export function useAutoScroll(speed = 1, direction = 'left') {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const accumulatedScroll = useRef(0); // Used for fractional speed precision

  useEffect(() => {
    let animationId;
    const container = scrollRef.current;
    if (!container) return;

    // Hide scrollbar but keep it scrollable
    container.style.overflowX = 'auto';
    container.style.scrollbarWidth = 'none'; // Firefox
    container.style.msOverflowStyle = 'none'; // IE/Edge

    // Helper to get exact group width
    const getGroupWidth = () => {
      const firstChild = container.children[0];
      if (!firstChild) return 0;
      const gap = parseFloat(getComputedStyle(container).gap) || 0;
      return firstChild.offsetWidth + gap;
    };

    // Initialize right-to-left starting position
    if (direction === 'right' && container.scrollLeft === 0) {
      container.scrollLeft = getGroupWidth();
    }

    const scroll = () => {
      if (!isHovered && !isDragging) {
        const groupWidth = getGroupWidth();
        if (groupWidth > 0) {
          accumulatedScroll.current += speed;
          
          if (accumulatedScroll.current >= 1) {
            const pixelsToMove = Math.floor(accumulatedScroll.current);
            accumulatedScroll.current -= pixelsToMove;

            if (direction === 'left') {
              container.scrollLeft += pixelsToMove;
              if (container.scrollLeft >= groupWidth) {
                container.scrollLeft -= groupWidth;
              }
            } else {
              container.scrollLeft -= pixelsToMove;
              if (container.scrollLeft <= 0) {
                container.scrollLeft += groupWidth;
              }
            }
          }
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered, isDragging, speed, direction]);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => {
    setIsHovered(false);
    setIsDragging(false);
  };
  const onTouchStart = () => setIsHovered(true);
  const onTouchEnd = () => setIsHovered(false);

  const onMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };
  
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    
    let newScrollLeft = scrollLeftStart.current - walk;
    const container = scrollRef.current;
    
    const firstChild = container.children[0];
    if (firstChild) {
        const gap = parseFloat(getComputedStyle(container).gap) || 0;
        const groupWidth = firstChild.offsetWidth + gap;
        
        // Endless drag loop logic
        if (direction === 'left' && newScrollLeft >= groupWidth) {
            scrollLeftStart.current -= groupWidth;
            newScrollLeft -= groupWidth;
        } else if (direction === 'right' && newScrollLeft <= 0) {
            scrollLeftStart.current += groupWidth;
            newScrollLeft += groupWidth;
        }
        // Handle backward drag for 'left'
        else if (direction === 'left' && newScrollLeft <= 0) {
            scrollLeftStart.current += groupWidth;
            newScrollLeft += groupWidth;
        }
        // Handle forward drag for 'right'
        else if (direction === 'right' && newScrollLeft >= groupWidth) {
            scrollLeftStart.current -= groupWidth;
            newScrollLeft -= groupWidth;
        }
    }
    
    container.scrollLeft = newScrollLeft;
  };
  
  const onMouseUp = () => setIsDragging(false);

  return {
    scrollRef,
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onTouchEnd,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      style: { cursor: isDragging ? 'grabbing' : 'grab' }
    }
  };
}
