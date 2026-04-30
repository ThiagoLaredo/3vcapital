'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import AnimatedPhrase from '@/components/ui/AnimatedPhrase/AnimatedPhrase';
import Link from 'next/link';
import styles from './Experience.module.css';
import { useScrollTriggerReset } from '../../../hooks/useScrollTriggerReset';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Experience() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const mainStatementRef = useRef<HTMLHeadingElement>(null);
  const decorativeCurveRef = useRef<HTMLDivElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const translations = language === 'pt' ? pt : en;
  const [animationKey, setAnimationKey] = useState(0);

  // Hook para resetar ScrollTrigger ao navegar e ao mudar de idioma
  useScrollTriggerReset(language);

  useEffect(() => {
    setAnimationKey((k) => k + 1);
  }, [language]);

  useEffect(() => {
    const section = sectionRef.current;
    const mainStatement = mainStatementRef.current;
    const decorativeCurve = decorativeCurveRef.current;
    const ctaButton = ctaButtonRef.current;

    if (!section || !mainStatement || !decorativeCurve || !ctaButton) return;
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
          trigger: mainStatement,
          start: 'top 70%',
          toggleActions: 'play none play reverse',
        },
      });

      timeline
        .to({}, { duration: 1.35 })
        .fromTo(
          decorativeCurve,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 0.9,
            duration: 0.72,
            ease: 'power2.out',
          }
        )
        .to(
          paths,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: 'power2.out',
          },
          '-=0.35'
        )
        .fromTo(
          ctaButton,
          { y: 14, opacity: 0, scale: 0.98 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.48,
            ease: 'power2.out',
          },
          '+=0.04'
        );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [animationKey]);

  const animatedPhrases = {
    pt: ['gestora de patrimônio independente,', 'decisões patrimoniais com assertividade,', 'método,', 'visão de longo prazo.'],
    en: ['independent asset management firm,', 'asset decisions with assertiveness,', 'method,', 'long-term vision.' ],
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
            key={`${animationKey}-phrase-${phraseIndex}`}
            phrase={phrase}
            triggerRef={mainStatementRef}
            className={styles.animatedText}
            triggerStart="top 70%"
            toggleActions="play none play reverse"
            finalColor="var(--primary-color)"
            baseColor="#dddddd"
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
    <section id="experience" ref={sectionRef} className={styles.experience}>
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
            <h2 ref={mainStatementRef} className={styles.mainStatement}>
              {renderTextWithHighlights(translations.Home.experience.paragraphs[0])}
            </h2>
            <Link ref={ctaButtonRef} href="/quem-somos" className={styles.ctaButton}>
              {translations.Home.experience?.cta ?? (language === 'pt' ? 'Saiba mais' : 'Learn more')}
            </Link>
            {/* <p className={styles.additionalText}>
              {additionalText[language as keyof typeof additionalText]}
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
