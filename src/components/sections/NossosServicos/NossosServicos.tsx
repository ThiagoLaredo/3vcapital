'use client';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import Image from 'next/image';
import styles from './NossosServicos.module.css';

const IMAGE_SRC = '/images/servicos/servicos-3v-capital.webp';
const IMAGE_SIZES = '(max-width: 1024px) 100vw, 50vw';

export default function NossosServicos() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const t = translations.Home.nossosServicos;

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
    <section className={styles.section}>
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
          <div className={styles.content}>
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
