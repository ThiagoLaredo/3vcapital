// src/hooks/useSimpleFadeIn.ts
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseSimpleFadeInProps {
  delay?: number;
  y?: number;
  duration?: number;
}

export const useSimpleFadeIn = ({
  delay = 0,
  y = 20,
  duration = 1
}: UseSimpleFadeInProps = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    const run = () => {
      const element = elementRef.current;
      if (!element || !element.isConnected) return;

      try {
        gsap.fromTo(element,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
          }
        );
      } catch {
        // Ignora SecurityError ao acessar frame cross-origin
      }
    };

    rafId = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafId);
  }, [delay, y, duration]);

  return elementRef;
};
