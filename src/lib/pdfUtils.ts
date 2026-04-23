// lib/pdfUtils.ts
import { MonthlyLetter } from '@/types/letter';

export function getPdfUrl(letter: MonthlyLetter, language: 'pt' | 'en'): string {
  // Português: sempre o pdfUrl original
  if (language === 'pt') {
    return letter.pdfUrl;
  }

  // Se tiver URL customizada em inglês, usa ela
  if (letter.pdfUrlEn) {
    return letter.pdfUrlEn;
  }

  // A partir de 2026: gera URL padrão (PDFs/en/ANO-MES.pdf)
  if (letter.year >= 2026) {
    const monthStr = String(letter.month).padStart(2, '0');
    return `/PDFs/en/${letter.year}-${monthStr}.pdf`;
  }

  // Antes de 2026: fallback para português
  return letter.pdfUrl;
}