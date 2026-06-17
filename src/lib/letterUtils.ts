import { MonthlyLetter } from '@/types/letter';

const monthAbbr = {
  pt: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
  en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
};

export function getLocalizedTitle(letter: MonthlyLetter, language: 'pt' | 'en'): string {
  if ('titleEn' in letter && language === 'en' && typeof letter.titleEn === 'string') {
    return letter.titleEn;
  }
  if ('title' in letter && typeof letter.title === 'string') {
    return letter.title;
  }

  return `${monthAbbr[language][letter.month - 1]} ${letter.year}`;
}

export function getLocalizedDescription(letter: MonthlyLetter, language: 'pt' | 'en'): string {
  if ('descriptionEn' in letter && language === 'en' && typeof letter.descriptionEn === 'string') {
    return letter.descriptionEn;
  }
  if ('description' in letter && typeof letter.description === 'string') {
    return letter.description;
  }

  return language === 'pt'
    ? 'Carta mensal da 3V Capital.'
    : '3V Capital monthly letter.';
}