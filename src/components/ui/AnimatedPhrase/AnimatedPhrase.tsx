'use client';

import { useRef, useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedPhraseProps {
  phrase: string;
  triggerRef: RefObject<HTMLElement | null>;
  className?: string;
  triggerStart?: string;
  toggleActions?: string;
  finalColor?: string;
  baseColor?: string;
  letterStagger?: number;
  phraseStagger?: number;
  animationKey?: number;
}

export default function AnimatedPhrase({
  phrase,
  triggerRef,
  className = '',
  triggerStart = 'top 70%',
  toggleActions = 'play none none none',
  finalColor = '#0e9899',
  baseColor = '#dddddd',
  letterStagger = 0.03,
  phraseStagger = 0,
  animationKey = 0,
}: AnimatedPhraseProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx: ReturnType<typeof gsap.context> | null = null;
    const rafId = requestAnimationFrame(() => {
      const trigger = triggerRef.current;
      const element = spanRef.current;
      if (!trigger || !trigger.isConnected || !element || !element.isConnected) return;
      try {
        ctx = gsap.context(() => {
          const originalText = element.textContent || '';
          if (!originalText.trim()) return;
          element.innerHTML = '';
          const letters: HTMLSpanElement[] = [];
          const words = originalText.split(/(\s+)/);
          words.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            for (let i = 0; i < word.length; i++) {
              const char = word[i];
              const letterSpan = document.createElement('span');
              letterSpan.textContent = char;
              letterSpan.style.display = 'inline-block';
              letterSpan.style.color = baseColor;
              if (char === ' ') {
                letterSpan.style.width = '0.3em';
                letterSpan.innerHTML = '&nbsp;';
              }
              letters.push(letterSpan);
              wordSpan.appendChild(letterSpan);
            }
            element.appendChild(wordSpan);
          });
          const masterTimeline = gsap.timeline({
            scrollTrigger: {
              trigger,
              start: triggerStart,
              toggleActions,
              invalidateOnRefresh: true,
            },
          });
          letters.forEach((letter, letterIndex) => {
            masterTimeline.to(
              letter,
              { color: finalColor, duration: 0.3, ease: 'power1.out' },
              phraseStagger + letterIndex * letterStagger
            );
          });
          ScrollTrigger.refresh();
        }, trigger);
      } catch {
        // Ignora SecurityError com iframe cross-origin
      }
    });
    return () => {
      cancelAnimationFrame(rafId);
      if (ctx) {
        ctx.revert();
      }
    };
  }, [animationKey, phrase, triggerRef, triggerStart, toggleActions, finalColor, baseColor, letterStagger, phraseStagger]);

  return (
    <span ref={spanRef} className={className} style={{ color: baseColor }}>
      {phrase}
    </span>
  );
}
