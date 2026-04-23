import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FadeInStaggerOptions {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  once?: boolean;
  childSelector?: string;
}

export function useFadeInStagger(options: FadeInStaggerOptions = {}) {
  const containerRef = useRef<HTMLElement | null>(null);

  const {
    delay = 0,
    duration = 0.8,
    y = 20,
    stagger = 0.15,
    once = true,
    childSelector
  } = options;

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const rafId = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container || !container.isConnected) return;

      const elements = childSelector
        ? container.querySelectorAll(childSelector)
        : container.children;
      if (elements.length === 0) return;

      try {
        ctx = gsap.context(() => {
          gsap.fromTo(elements,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger,
              ease: "power2.out",
              scrollTrigger: {
                trigger: container,
                start: "top 85%",
                end: "bottom 20%",
                toggleActions: once ? "play none none none" : "play none none reverse"
              }
            }
          );
        }, container);
      } catch {
        // Ignora SecurityError ao acessar frame cross-origin (ex.: página com iframe)
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx?.revert();
    };
  }, [delay, duration, y, stagger, once, childSelector]);

  return containerRef;
}
