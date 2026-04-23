import { MonthlyLetter } from '@/types/letter';

export function getLocalizedTitle(letter: MonthlyLetter, language: 'pt' | 'en'): string {
  if (language === 'en' && letter.titleEn) {
    return letter.titleEn;
  }
  return letter.title;
}

export function getLocalizedDescription(letter: MonthlyLetter, language: 'pt' | 'en'): string {
  if (language === 'en' && letter.descriptionEn) {
    return letter.descriptionEn;
  }
  return letter.description;
}