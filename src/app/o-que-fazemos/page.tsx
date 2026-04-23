'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import { SOLUTION_STEP_IMAGES } from '@/lib/solutionImages';
import Image from 'next/image';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import styles from './OQueFazemosPage.module.css';

export default function OQueFazemosPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.OQueFazemosPage;
  const items = translations.Home.solutions.items;
  const fullText = dict?.intro?.fullText ?? '';
  const phraseToAnimate = dict?.intro?.phraseToAnimate ?? '';

  const blocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blocks = blocksRef.current;
    if (!blocks?.children.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.blockInView);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );

    Array.from(blocks.children).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      <PageIntroSection
        title={dict?.hero?.title ?? translations.Navigation.whatWeDo}
        fullText={fullText}
        phraseToAnimate={phraseToAnimate}
      />

      <section className={styles.blocks}>
        <div className={styles.container} ref={blocksRef}>
          {items.map((item, index) => {
            const imageSrc = SOLUTION_STEP_IMAGES[index] ?? SOLUTION_STEP_IMAGES[0];
            return (
            <div
              key={index}
              className={`${styles.block} ${index % 2 === 1 ? styles.blockReverse : ''}`}
            >
              <div className={styles.blockImage}>
                {imageSrc && (
                <Image
                  src={imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className={styles.image}
                />
                )}
              </div>
              <div className={styles.blockContent}>
                <span className={styles.blockNumberWrapper}>
                  <svg className={styles.numberCircle} viewBox="0 0 40 40" aria-hidden>
                    <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="113" />
                  </svg>
                  <span className={styles.blockNumber}>{String(index + 1).padStart(2, '0')}</span>
                </span>
                <h2 className={styles.blockTitle}>{item.title}</h2>
                <p className={styles.blockDescription}>{item.description}</p>
              </div>
            </div>
          );})}
        </div>
      </section>
    </div>
  );
}
