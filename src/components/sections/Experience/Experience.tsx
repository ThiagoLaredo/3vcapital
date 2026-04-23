'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import AnimatedPhrase from '@/components/ui/AnimatedPhrase/AnimatedPhrase';
import styles from './Experience.module.css';
import { useScrollTriggerReset } from '../../../hooks/useScrollTriggerReset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const decorativeCurveRef = useRef<HTMLDivElement>(null);
  const translations = language === 'pt' ? pt : en;
  const animationKey = language === 'pt' ? 0 : 1;

  // Hook para resetar ScrollTrigger ao navegar e ao mudar de idioma
  useScrollTriggerReset(language);

  useEffect(() => {
    const section = sectionRef.current;
    const decorativeCurve = decorativeCurveRef.current;

    if (!section || !decorativeCurve) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const paths = decorativeCurve.querySelectorAll('path');
    if (paths.length === 0) return;

    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0.15,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          toggleActions: 'play none none reverse',
        },
      });

      timeline
        .fromTo(
          decorativeCurve,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 0.9,
            duration: 0.8,
            ease: 'power2.out',
          }
        )
        .to(
          paths,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.2,
            ease: 'power2.out',
          },
          '-=0.45'
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [animationKey]);

  const animatedPhrases = {
    pt: ['proteger,', 'desenvolver e', 'preservar', 'o patrimônio'],
    en: ['protect,', 'develop, ', 'and preserve', 'our clients assets'],
  };

  const renderTextWithHighlights = (text: string) => {
    const phrases = animatedPhrases[language as keyof typeof animatedPhrases];
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    phrases.forEach((phrase, phraseIndex) => {
      const idx = text.indexOf(phrase, lastIndex);
      if (idx !== -1) {
        if (idx > lastIndex) result.push(text.slice(lastIndex, idx));
        result.push(
          <AnimatedPhrase
            key={`phrase-${phraseIndex}`}
            phrase={phrase}
            triggerRef={sectionRef}
            className={styles.animatedText}
            triggerStart="top 70%"
            finalColor="var(--primary-color-dark)"
            phraseStagger={phraseIndex * 0.4}
            animationKey={animationKey}
          />
        );
        lastIndex = idx + phrase.length;
      }
    });
    if (lastIndex < text.length) result.push(text.slice(lastIndex));
    return result;
  };

  return (
    <section id="experience" ref={sectionRef} className={styles.experience} key={animationKey}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div ref={decorativeCurveRef} className={styles.decorativeCurve} aria-hidden="true">
            <svg viewBox="0 0 420 220" preserveAspectRatio="none" className={styles.decorativeCurveSvg}>
              <path
                d="M18 182C76 88 134 24 222 26C301 28 350 90 402 146"
                className={styles.decorativeCurvePrimary}
              />
              <path
                d="M2 205C58 132 126 86 193 92C280 100 335 166 418 172"
                className={styles.decorativeCurveSecondary}
              />
            </svg>
          </div>
          <span className={styles.title}>{translations.Home.experience.title}</span>
          <div className={styles.text}>
            <h2 className={styles.mainStatement}>
              {renderTextWithHighlights(translations.Home.experience.paragraphs[0])}
            </h2>
            {/* <p className={styles.additionalText}>
              {additionalText[language as keyof typeof additionalText]}
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
