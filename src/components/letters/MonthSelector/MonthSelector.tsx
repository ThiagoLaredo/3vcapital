// components/letters/MonthSelector/MonthSelector.tsx - VERSÃO BOTÕES
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import styles from './MonthSelector.module.css';

interface MonthSelectorProps {
  selectedMonth: number | 'all';
  onChange: (month: number | 'all') => void;
}

export default function MonthSelector({ selectedMonth, onChange }: MonthSelectorProps) {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.CartasMensaisPage || {};

  // Meses abreviados em português e inglês
  const monthsPT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const monthsEN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const months = language === 'pt' ? monthsPT : monthsEN;

  return (
    <div className={styles.monthSelector}>
      {/* Botão "Todos" */}
      <button
        className={`${styles.monthButton} ${selectedMonth === 'all' ? styles.active : ''}`}
        onClick={() => onChange('all')}
      >
        {dict?.filters?.allMonths || 'Todos'}
      </button>

      {/* Botões dos meses */}
      {months.map((monthAbbr, index) => {
        const monthNumber = index + 1;
        const fullMonthName = language === 'pt' 
          ? [
              'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
            ][index]
          : [
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ][index];

        return (
          <button
            key={monthNumber}
            className={`${styles.monthButton} ${selectedMonth === monthNumber ? styles.active : ''}`}
            onClick={() => onChange(monthNumber)}
            title={fullMonthName} // Tooltip com nome completo
          >
            {monthAbbr}
          </button>
        );
      })}
    </div>
  );
}