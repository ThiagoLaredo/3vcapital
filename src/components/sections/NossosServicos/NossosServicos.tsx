'use client';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import { useFadeInStagger } from '../../../hooks/useFadeInStagger';
import Image from 'next/image';
import styles from './NossosServicos.module.css';

const IMAGE_SRC = '/images/servicos/servicos-3v-capital.webp';
const IMAGE_SIZES = '(max-width: 1024px) 100vw, 50vw';

export default function NossosServicos() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const t = translations.Home.nossosServicos;

  const contentRef = useFadeInStagger({ y: 0, stagger: 0.18, duration: 0.9, delay: 0.1 });

  const highlightedPhrases =
    language === 'pt'
      ? ['Gestão de Portfólios onshore e offshore', 'Gerimos o patrimônio de nossos clientes']
      : ['onshore and offshore portfolios', "We manage our clients' wealth"];

  const renderParagraph = (paragraph: string) => {
    const phrase = highlightedPhrases.find((candidate) => paragraph.includes(candidate));

    if (!phrase) {
      return paragraph;
    }

    const [before, ...rest] = paragraph.split(phrase);
    const after = rest.join(phrase);

    return (
      <>
        {before}
        <span className={styles.highlight}>{phrase}</span>
        {after}
      </>
    );
  };

  return (
    <section id="nossos-servicos" className={styles.section}>
      <svg className={styles.maskDefs} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="servicesMaskCurved" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H0.9 C0.82,0.22 0.46,1.05 0,0.75 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.splitLayout}>
        {/* Esquerda - Imagem com máscara diagonal */}
        <div className={styles.imageColumn}>
          <div className={styles.imageCanvas}>
            <Image
              src={IMAGE_SRC}
              alt={t.label}
              fill
              sizes={IMAGE_SIZES}
              quality={90}
              className={styles.image}
            />
            <div className={styles.imageTint} />
          </div>
        </div>

        {/* Direita - Texto */}
        <div className={styles.textColumn}>
          <div ref={contentRef as React.RefObject<HTMLDivElement>} className={styles.content}>
            <span className={styles.sectionLabel}>{t.label}</span>
            {t.paragraphs.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {renderParagraph(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
