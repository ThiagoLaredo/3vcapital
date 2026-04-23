'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import { lettersData } from '@/lib/letters';
import { getLocalizedTitle, getLocalizedDescription } from '@/lib/letterUtils';
import { getPdfUrl } from '@/lib/pdfUtils';
import { MonthlyLetter } from '@/types/letter';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PDFButton from '@/components/buttons/PDFButton/PDFButton';
import PDFPreviewModal from '@/components/letters/PDFPreviewModal/PDFPreviewModal';
import styles from './CartaDoMes.module.css';

const formatMonthAbbreviation = (monthNumber: number, language: 'pt' | 'en') => {
  const months = {
    pt: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
    en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };
  return months[language][monthNumber - 1];
};

export default function CartaDoMes() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [selectedPdfTitle, setSelectedPdfTitle] = useState('');

  const lettersFrom2023 = useMemo(() => {
    return lettersData.filter(letter => letter.year >= 2023);
  }, []);

  const featuredLetter = useMemo((): MonthlyLetter | null => {
    const sorted = [...lettersFrom2023].sort((a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
    return sorted[0] || null;
  }, [lettersFrom2023]);

  const formattedDate = featuredLetter
    ? `${formatMonthAbbreviation(featuredLetter.month, language)} ${featuredLetter.year}`
    : '';

  const openLetterPreview = (letter: MonthlyLetter) => {
    const pdfUrl = getPdfUrl(letter, language);
    setSelectedPdfUrl(pdfUrl);
    setSelectedPdfTitle(getLocalizedTitle(letter, language));
    setIsPreviewModalOpen(true);
  };

  const dict = translations.Home?.cartaDoMes;

  if (!featuredLetter) return null;

  return (
    <>
      <PDFPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        pdfUrl={selectedPdfUrl}
        title={selectedPdfTitle}
        fileName={selectedPdfUrl.split('/').pop() || 'documento.pdf'}
      />

      <section className={styles.cartaDoMes}>
        <div className={styles.container}>
          <header className={styles.header}>
            <span className={styles.sectionLabel}>
              {dict?.label || (language === 'pt' ? 'Publicações' : 'Publications')}
            </span>
            <h2 className={styles.sectionTitle}>
              {dict?.title || (language === 'pt' ? 'Carta do Mês' : 'Letter of the Month')}
            </h2>
          </header>

          <div className={styles.card}>
            <div className={styles.contentColumn}>
              <div className={styles.cardContent}>
                <div className={styles.cardMeta}>
                  <span className={styles.date}>{formattedDate}</span>
                  <span className={styles.badge}>
                    {dict?.badge || (language === 'pt' ? 'Carta Econômica' : 'Economic Letter')}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>
                  {getLocalizedTitle(featuredLetter, language)}
                </h3>
                <p className={styles.cardDescription}>
                  {getLocalizedDescription(featuredLetter, language)}
                </p>
                <div className={styles.cardActions}>
                  <PDFButton
                    onClick={() => openLetterPreview(featuredLetter)}
                    variant="primary"
                    size="medium"
                    showArrow={true}
                    className={styles.homePdfButton}
                  />
                  <span className={styles.fileSize}>PDF • {featuredLetter.fileSize}</span>
                </div>
              </div>
              <div className={styles.cardLink}>
                <Link href="/cartas-mensais" className={styles.viewAllLink}>
                  {dict?.viewAll || (language === 'pt' ? 'Ver todas as cartas' : 'View all letters')}
                  <span className={styles.arrow}>→</span>
                </Link>
              </div>
            </div>
            <div className={styles.cardMedia}>
              <Image
                src="/images/carta/carta-economica.webp"
                alt={language === 'pt' ? 'Imagem de acompanhamento da carta do mês' : 'Follow-up image for the letter of the month'}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.cardImage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
