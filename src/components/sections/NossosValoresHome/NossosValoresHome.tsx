'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import { useFadeIn } from '../../../hooks/useFadeIn';
import { useFadeInStagger } from '../../../hooks/useFadeInStagger';
import AnimatedPhrase from '../../ui/AnimatedPhrase/AnimatedPhrase';
import styles from './NossosValoresHome.module.css';

const IMAGE_SIZES = '(max-width: 768px) 100vw, 46vw';

const TEXTS = {
  pt: {
    label: 'Nossos valores',
    before: 'Nossos valores refletem ',
    phrase: 'nosso compromisso com a excelência, a transparência e o relacionamento de longo prazo',
    after: ' com clientes e parceiros.',
  },
  en: {
    label: 'Our values',
    before: 'Our values reflect ',
    phrase: 'our commitment to excellence, transparency and long-term relationships',
    after: ' with clients and partners.',
  },
};

export default function NossosValoresHome() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.OurValuesPage;
  const values = dict?.values || [];

  const sectionRef = useRef<HTMLElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  const headerRef = useFadeIn<HTMLElement>({ delay: 0.2, y: 30 });
  const cardsRef = useFadeInStagger({ stagger: 0.18, y: 50, duration: 0.85 });

  useEffect(() => {
    setAnimationKey(k => k + 1);
  }, [language]);

  const t = TEXTS[language as keyof typeof TEXTS] ?? TEXTS.pt;

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <header ref={headerRef as React.RefObject<HTMLElement>} className={styles.header}>
          <span className={styles.sectionLabel}>{t.label}</span>
          <h2 className={styles.sectionTitle}>
            {t.before}
            <AnimatedPhrase
              phrase={t.phrase}
              triggerRef={sectionRef}
              className={styles.animatedPhrase}
              triggerStart="top 70%"
              animationKey={animationKey}
              finalColor="var(--primary-color)"
            />
            {t.after}
          </h2>
        </header>

        <div ref={cardsRef as React.RefObject<HTMLDivElement>} className={styles.cardsList}>
          {values.map((value, index) => (
            <article key={value.title} className={styles.valueCard}>
              <div
                className={`${styles.titlePanel} ${
                  index % 3 === 0
                    ? styles.titleToneLight
                    : index % 3 === 1
                      ? styles.titleToneMid
                      : styles.titleToneDark
                }`}
              >
                <h3 className={styles.valueTitle}>{value.title}</h3>
              </div>

              <div className={styles.imagePanel}>
                <Image
                  src={`/images/valores/${value.image}`}
                  alt={value.title}
                  fill
                  sizes={IMAGE_SIZES}
                  quality={95}
                  className={styles.valueImage}
                />
                <div className={styles.imageTint} />
                <div className={styles.descriptionOverlay}>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
