'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import styles from './QuemSomosPage.module.css';

export default function QuemSomosPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.QuemSomosPage;
  const subtitleText = dict?.intro?.subtitle ?? '';
  const subtitlePhrase =
    language === 'pt'
      ? 'gestora de patrimônio independente'
      : 'independent wealth management firm';
  const animatedSubtitlePhrase = subtitleText.includes(subtitlePhrase) ? subtitlePhrase : '';
  const intro = dict?.intro;
  const paragraphs: string[] =
    intro && 'paragraphs' in intro && Array.isArray(intro.paragraphs) && intro.paragraphs.length > 0
      ? intro.paragraphs
      : intro?.fullText
        ? [intro.fullText]
        : [];
  const highlightedPhrase =
    language === 'pt'
      ? 'cada patrimônio é único e deve ser gerido de forma personalizada, disciplinada e alinhada aos objetivos de longo prazo de cada cliente'
      : 'each wealth portfolio is unique and should be managed in a personalized and disciplined way, aligned with each client\'s long-term goals';

  const renderParagraph = (paragraph: string) => {
    if (!paragraph.includes(highlightedPhrase)) {
      return paragraph;
    }

    const [before, after] = paragraph.split(highlightedPhrase);
    return (
      <>
        {before}
        <strong className={styles.highlight}>{highlightedPhrase}</strong>
        {after}
      </>
    );
  };

  return (
    <div className={styles.page}>
      <PageIntroSection
        title={dict?.hero?.title ?? translations.Navigation.aboutUs}
        fullText={subtitleText}
        phraseToAnimate={animatedSubtitlePhrase}
      />

      <section className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutBlock}>
            <div className={styles.aboutText}>
              {paragraphs.map((paragraph, index) => (
                <p key={`quem-somos-paragraph-${index}`}>{renderParagraph(paragraph)}</p>
              ))}
            </div>

            <div className={styles.aboutMedia}>
              <Image
                src="/images/sobre/sobre-3v-capital.webp"
                alt={dict?.imageAlt ?? '3V Capital'}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
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
