'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import { useFadeIn } from '@/hooks/useFadeIn';
import styles from './NossosValoresPage.module.css';

export default function NossosValoresPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.OurValuesPage;

  const gridRef = useFadeIn<HTMLDivElement>({ delay: 0.5, y: 30 });

  if (!dict) return null;

  const values = dict.values || [];

  return (
    <div className={styles.page}>
      <PageIntroSection
        title={dict.intro.title}
        fullText={dict.intro.subtitle}
        phraseToAnimate={dict.intro.phraseToAnimate ?? ''}
      />

      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <div ref={gridRef} className={styles.valuesGrid}>
            {values.map((value, index) => (
              <div key={index} className={styles.valueCard}>
                {value.image && (
                  <div className={styles.valueImageWrapper}>
                    <img
                      src={`/images/valores/${value.image}`}
                      alt={value.title}
                    />
                    <div className={styles.valueImageTint} />
                  </div>
                )}
                <div className={styles.valueTextContent}>
                  <div className={styles.valueTitleContainer}>
                    <h3 className={styles.valueTitle}>{value.title}</h3>
                  </div>
                  <p className={styles.valueDescription}>{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
