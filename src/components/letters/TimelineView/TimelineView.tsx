// components/letters/TimelineView/TimelineView.tsx
'use client';

import { MonthlyLetter } from '@/types/letter';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPdfUrl } from '@/lib/pdfUtils'; // <-- Import da função utilitária
import { pt, en } from '@/lib/translations';
import PDFButton from '@/components/buttons/PDFButton/PDFButton';
import styles from './TimelineView.module.css';
import { getLocalizedTitle, getLocalizedDescription } from '@/lib/letterUtils';

interface TimelineViewProps {
  letters: MonthlyLetter[];
  onOpenPreview: (pdfUrl: string, title: string) => void;
}

export default function TimelineView({ letters, onOpenPreview }: TimelineViewProps) {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.CartasMensaisPage || {};

  // Agrupar por ano
  const lettersByYear = letters.reduce((acc: Record<number, MonthlyLetter[]>, letter) => {
    if (!acc[letter.year]) {
      acc[letter.year] = [];
    }
    acc[letter.year].push(letter);
    return acc;
  }, {});

  const years = Object.keys(lettersByYear).map(Number).sort((a, b) => b - a);

  // Função para formatar data
  const formatDate = (letter: MonthlyLetter) => {
    const months = language === 'pt' 
      ? ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[letter.month - 1]} ${letter.year}`;
  };

  // 🔥 NOVA FUNÇÃO: Gera a URL correta com base no idioma e chama o preview
  const handleOpenPdf = (letter: MonthlyLetter) => {
    const url = getPdfUrl(letter, language);
    onOpenPreview(url, letter.title);
  };

  return (
    <div className={styles.timelineView}>
      {years.map(year => (
        <div key={year} className={styles.yearSection}>
          <h2 className={styles.yearTitle}>{year}</h2>
          <div className={styles.timeline}>
            {lettersByYear[year].map(letter => (
              <div key={letter.id} className={styles.timelineItem}>
                {/* Marcador da timeline - sem o círculo verde */}
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDate}>{formatDate(letter)}</div>
                </div>
                
                <div className={styles.timelineContent}>
                  <div className={styles.timelineCard}>
                    {/* Cabeçalho do card */}
                    <div className={styles.cardHeader}>
                      <h3 className={styles.letterTitle}>{getLocalizedTitle(letter, language)}</h3>
                      <div 
                        className={styles.fileIndicator}
                        onClick={() => handleOpenPdf(letter)} // ✅ USANDO handleOpenPdf
                        style={{ cursor: 'pointer' }}
                        title={language === 'pt' ? "Abrir PDF" : "Open PDF"}
                      >
                        <span className={styles.fileIcon}>📄</span>
                      </div>
                    </div>

                    <p className={styles.letterDescription}>{getLocalizedDescription(letter, language)}</p>

                    {/* Rodapé do card - usando handleOpenPdf no PDFButton */}
                    <div className={styles.cardFooter}>
                      <PDFButton 
                        onClick={() => handleOpenPdf(letter)} // ✅ USANDO handleOpenPdf
                        variant="ghost"
                        size="small"
                        showArrow={true}
                      />
                      <span className={styles.fileSize}>
                        PDF • {letter.fileSize}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}