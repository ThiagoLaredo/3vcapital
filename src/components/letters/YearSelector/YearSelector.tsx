// components/letters/YearSelector.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import styles from './YearSelector.module.css';

interface YearSelectorProps {
  years: number[];
  selectedYear: number | 'all';
  onChange: (year: number | 'all') => void;
}

export default function YearSelector({ years, selectedYear, onChange }: YearSelectorProps) {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.CartasMensaisPage;

  return (
    <div className={styles.yearSelector}>
      <div className={styles.buttonsContainer}>
        <button
          className={`${styles.yearButton} ${selectedYear === 'all' ? styles.active : ''}`}
          onClick={() => onChange('all')}
        >
          {dict?.filters?.allYears || 'Todos'}
        </button>
        {years.map((year) => (
          <button
            key={year}
            className={`${styles.yearButton} ${selectedYear === year ? styles.active : ''}`}
            onClick={() => onChange(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}