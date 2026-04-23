import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInOptions {
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
}

export function useFadeIn<T extends HTMLElement = HTMLDivElement>(options: FadeInOptions = {}) {
  const elementRef = useRef<T | null>(null);

  const {
    delay = 0,
    duration = 0.8,
    y = 20,
    x = 0,
    once = true
  } = options;

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const rafId = requestAnimationFrame(() => {
      const element = elementRef.current;
      if (!element || !element.isConnected) return;

      try {
        ctx = gsap.context(() => {
          gsap.fromTo(element,
            { opacity: 0, y, x },
            {
              opacity: 1,
              y: 0,
              x: 0,
              duration,
              delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: once ? "play none none none" : "play none none reverse"
              }
            }
          );
        }, element);
      } catch {
        // Ignora SecurityError ao acessar frame cross-origin (ex.: página com iframe)
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [delay, duration, y, x, once]);

  return elementRef;
}
