// components/letters/CalendarGridView/CalendarGridView.tsx
'use client';

import { MonthlyLetter } from '@/types/letter';
import { useLanguage } from '@/contexts/LanguageContext';
import { getPdfUrl } from '@/lib/pdfUtils'; // <-- Import da função utilitária
import { pt, en } from '@/lib/translations';
import styles from './CalendarGridView.module.css';
import PDFButton from '@/components/buttons/PDFButton/PDFButton';
import { getLocalizedTitle, getLocalizedDescription } from '@/lib/letterUtils';

interface CalendarGridViewProps {
  letters: MonthlyLetter[];
  selectedYear: number | 'all';
  onYearChange: (year: number | 'all') => void;
  onOpenPreview: (pdfUrl: string, title: string) => void;
}

export default function CalendarGridView({ 
  letters, 
  selectedYear, 
  onYearChange,
  onOpenPreview
}: CalendarGridViewProps) {
  // quando não há cartas, o componente não exibe nada; o estado vazio é tratado pelo pai
  if (letters.length === 0) return null;

  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.CartasMensaisPage || {};

  // Meses em português e inglês
  const monthsPT = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthsEN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const months = language === 'pt' ? monthsPT : monthsEN;

  // Agrupar cartas por ano
  const lettersByYear = letters.reduce((acc: Record<number, MonthlyLetter[]>, letter) => {
    if (!acc[letter.year]) {
      acc[letter.year] = [];
    }
    acc[letter.year].push(letter);
    return acc;
  }, {});

  const availableYears = Object.keys(lettersByYear).map(Number).sort((a, b) => b - a);
  const yearsToShow = selectedYear === 'all' ? availableYears : [selectedYear];

  const getLetterForMonth = (year: number, month: number): MonthlyLetter | undefined => {
    return lettersByYear[year]?.find(letter => letter.month === month);
  };

  // 🔥 NOVA FUNÇÃO: Gera a URL correta e chama o preview
  const handleOpenPdf = (letter: MonthlyLetter) => {
    const url = getPdfUrl(letter, language);
    onOpenPreview(url, letter.title);
  };

  return (
    <div className={styles.calendarGridView}>
      {yearsToShow.map(year => {
        const yearLetters = lettersByYear[year] || [];
        const hasLettersForYear = yearLetters.length > 0;

        return (
          <div key={year} className={styles.yearSection}>
            <h3 className={styles.yearTitle}>{year}</h3>
            
            {!hasLettersForYear ? (
              <div className={styles.noLetters}>
                {dict?.calendar?.noLetters || "Nenhuma carta disponível para este ano."}
              </div>
            ) : (
              <div className={styles.calendarGrid}>
                {months.map((month, index) => {
                  const monthNumber = index + 1;
                  const letter = getLetterForMonth(year, monthNumber);
                  const hasLetter = !!letter;

                  // Mostrar apenas meses que têm cartas disponíveis
                  if (!hasLetter) return null;

                  return (
                    <div
                      key={`${year}-${monthNumber}`}
                      className={`${styles.monthCard} ${styles.hasLetter}`}
                    >
                      {/* Cabeçalho do Mês */}
                      <div className={styles.monthHeader}>
                        <div className={styles.monthInfo}>
                          <span className={styles.monthName}>
                            {language === 'pt' ? month.substring(0, 3) : month.substring(0, 3)}
                          </span>
                          <span className={styles.monthNumber}>
                            {monthNumber.toString().padStart(2, '0')}
                          </span>
                        </div>
                        <div 
                          className={styles.fileIndicator}
                          onClick={() => handleOpenPdf(letter)} // ✅ USANDO handleOpenPdf
                          style={{ cursor: 'pointer' }}
                          title={language === 'pt' ? "Abrir PDF" : "Open PDF"}
                        >
                          <span className={styles.fileIcon}>📄</span>
                        </div>
                      </div>

                      {/* Conteúdo do Mês */}
                      <div className={styles.monthContent}>
                        <h4 className={styles.letterTitle}>{getLocalizedTitle(letter, language)}</h4>
                        <p className={styles.letterDescription}>
                          {getLocalizedDescription(letter, language).length > 100 
                            ? `${getLocalizedDescription(letter, language).substring(0, 100)}...` 
                            : getLocalizedDescription(letter, language)}
                        </p>

                        {/* Botão de ação - também usando handleOpenPdf */}
                        <PDFButton 
                          onClick={() => handleOpenPdf(letter)}
                          variant="secondary"
                          size="small"
                          showArrow={true}
                        />
                        <span className={styles.fileSize}>
                          {dict?.calendar?.fileSize || "PDF •"} {letter.fileSize}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}