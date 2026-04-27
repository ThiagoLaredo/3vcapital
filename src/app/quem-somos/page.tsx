'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import styles from '../sobre-nos/SobreNosPage.module.css';

export default function QuemSomosPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.QuemSomosPage;

  return (
    <div className={styles.page}>
      <PageIntroSection
        title={dict?.hero?.title ?? translations.Navigation.aboutUs}
        fullText={dict?.intro?.fullText ?? ''}
        phraseToAnimate={dict?.intro?.phraseToAnimate ?? ''}
      />

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutBlock}>
            <div className={styles.aboutMedia}>
              <Image
                src="/images/sobre/sobre-3v-capital.webp"
                alt={dict?.imageAlt ?? '3V Capital'}
                fill
                sizes="(max-width: 768px) 100vw, 1000px"
                className={styles.image}
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
