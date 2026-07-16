// lib/letters.ts - VERSÃO FINAL
import { MonthlyLetter } from '@/types/letter';

// Mapeamento de meses abreviados para números
const monthMap: Record<string, number> = {
  'jan': 1, 'fev': 2, 'mar': 3, 'abr': 4, 'mai': 5, 'jun': 6,
  'jul': 7, 'ago': 8, 'set': 9, 'out': 10, 'nov': 11, 'dez': 12
};

// Nomes completos dos meses em português
const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Função para gerar URL do PDF baseado no ano e mês
function getPdfUrl(year: number, month: number): string {
  const monthAbbr = Object.keys(monthMap).find(key => monthMap[key] === month);
  if (!monthAbbr) return '';
  
  const monthCapitalized = monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1);
  const yearShort = year.toString().slice(-2);
  return `/pdfs/cartas/${year}/Carta-Econômica-${monthCapitalized}.${yearShort}.pdf`;
}

// Dados das cartas mensais (APENAS DE 2023 PARA FRENTE)
export const lettersData: MonthlyLetter[] = [

    {
    id: '2026-06',
    year: 2026,
    month: 6,
    monthName: 'Junho',
    pdfUrl: '/pdfs/pt/2026-06.pdf', 
    pdfUrlEn: '/pdfs/en/2026-06.pdf', 
    publishedDate: '2026-07-02',
    fileSize: '710 KB',
  },
    {
    id: '2026-05',
    year: 2026,
    month: 5,
    monthName: 'Maio',
    pdfUrl: '/pdfs/pt/2026-05.pdf', 
    pdfUrlEn: '/pdfs/en/2026-05.pdf', 
    publishedDate: '2026-06-02',
    fileSize: '710 KB',
  },
    {
    id: '2026-04',
    year: 2026,
    month: 4,
    monthName: 'Abril',
    pdfUrl: '/pdfs/pt/2026-04.pdf', 
    pdfUrlEn: '/pdfs/en/2026-04.pdf', 
    publishedDate: '2026-05-02',
    fileSize: '310 KB',
  },
    {
    id: '2026-03',
    year: 2026,
    month: 3,
    monthName: 'Março',
    pdfUrl: '/pdfs/pt/2026-03.pdf', 
    pdfUrlEn: '/pdfs/en/2026-03.pdf', 
    publishedDate: '2026-04-02',
    fileSize: '277 KB',
  },

    {
    id: '2026-02',
    year: 2026,
    month: 2,
    monthName: 'Fevereiro',
    pdfUrl: '/pdfs/pt/2026-02.pdf', 
    pdfUrlEn: '/pdfs/en/2026-02.pdf', 
    publishedDate: '2026-03-02',
    fileSize: '309 KB',
  },
  {
    id: '2026-01',
    year: 2026,
    month: 1,
    monthName: 'Janeiro',
    pdfUrl: '/pdfs/pt/2026-01.pdf', 
    pdfUrlEn: '/pdfs/en/2026-01.pdf', 
    publishedDate: '2026-02-02',
    fileSize: '290 KB',
  },
    {
    id: '2025-12',
    year: 2025,
    month: 12,
    monthName: 'Dezembro',
    pdfUrl: '/pdfs/pt/2025-12.pdf',
    publishedDate: '2025-12-02',
    fileSize: '1.2 MB'
  },
  {
    id: '2025-11',
    year: 2025,
    month: 11,
    monthName: 'Novembro',
    pdfUrl: '/pdfs/pt/2025-11.pdf',
    publishedDate: '2025-11-02',
    fileSize: '246 KB'
  },
  {
    id: '2025-10',
    year: 2025,
    month: 10,
    monthName: 'Outubro',
    pdfUrl: '/pdfs/pt/2025-10.pdf',
    publishedDate: '2025-10-02',
    fileSize: '327 KB'
  },
    {
    id: '2025-09',
    year: 2025,
    month: 9,
    monthName: 'Setembro',
    pdfUrl: '/pdfs/pt/2025-09.pdf',
    publishedDate: '2025-09-02',
    fileSize: '352 KB'
  },
  {
    id: '2025-08',
    year: 2025,
    month: 8,
    monthName: 'Agosto',
    pdfUrl: '/pdfs/pt/2025-08.pdf',
    publishedDate: '2025-08-02',
    fileSize: '340 KB'
  },
    {
    id: '2025-07',
    year: 2025,
    month: 7,
    monthName: 'Julho',
    pdfUrl: '/pdfs/pt/2025-07.pdf',
    publishedDate: '2025-07-02',
    fileSize: '310 KB'
  },
  {
    id: '2025-06',
    year: 2025,
    month: 6,
    monthName: 'Junho',
    pdfUrl: '/pdfs/pt/2025-06.pdf',
    publishedDate: '2025-06-02',
    fileSize: '1.2 MB'
  },

  {
    id: '2025-05',
    year: 2025,
    month: 5,
    monthName: 'Maio',
    pdfUrl: '/pdfs/pt/2025-05.pdf',
    publishedDate: '2025-05-02',
    fileSize: '370 KB'
  },

  {
    id: '2025-04',
    year: 2025,
    month: 4,
    monthName: 'Abril',
    pdfUrl: '/pdfs/pt/2025-04.pdf',
    publishedDate: '2025-04-02',
    fileSize: '296 KB'
  },

  {
    id: '2025-03',
    year: 2025,
    month: 3,
    monthName: 'Março',
    pdfUrl: '/pdfs/pt/2025-03.pdf',
    publishedDate: '2025-03-02',
    fileSize: '299 KB'
  },

    {
    id: '2025-02',
    year: 2025,
    month: 2,
    monthName: 'Fevereiro',
    pdfUrl: '/pdfs/pt/2025-02.pdf',
    publishedDate: '2025-02-02',
    fileSize: '334 KB'
  },

  {
    id: '2025-01',
    year: 2025,
    month: 1,
    monthName: 'Janeiro',
    pdfUrl: '/pdfs/pt/2025-01.pdf',
    publishedDate: '2025-01-02',
    fileSize: '327 KB'
  },

  {
    id: '2024-01',
    year: 2024,
    month: 1,
    monthName: 'Janeiro',
    pdfUrl: '/pdfs/pt/2024-01.pdf',
    publishedDate: '2024-01-02',
    fileSize: '1.2 MB'
  },
  {
    id: '2024-02',
    year: 2024,
    month: 2,
    monthName: 'Fevereiro',
    pdfUrl: getPdfUrl(2024, 2),
    publishedDate: '2024-03-01',
    fileSize: '1.2 MB'

  },
  {
    id: '2024-03',
    year: 2024,
    month: 3,
    monthName: 'Março',
    pdfUrl: '/pdfs/pt/2024-03.pdf',
    publishedDate: '2024-04-05',
    fileSize: '1.2 MB'

  },
  {
    id: '2024-04',
    year: 2024,
    month: 4,
    monthName: 'Abril',
    pdfUrl: '/pdfs/pt/2024-04.pdf',
    publishedDate: '2024-05-03',
    fileSize: '1.2 MB'
  },
  {
    id: '2024-05',
    year: 2024,
    month: 5,
    monthName: 'Maio',
    pdfUrl: '/pdfs/pt/2024-05.pdf',
    publishedDate: '2024-06-07',
    fileSize: '1.2 MB'
  },
  {
    id: '2024-06',
    year: 2024,
    month: 6,
    monthName: 'Junho',
    pdfUrl: '/pdfs/pt/2024-06.pdf',
    publishedDate: '2024-07-05',
    fileSize: '1.2 MB'
  },
  // Adicione mais meses de 2024 conforme tiver...

];

// Função para obter anos disponíveis (apenas 2023 para frente)
export function getAvailableYearsFrom2023(): number[] {
  const years = new Set(lettersData.map(letter => letter.year));
  const filteredYears = Array.from(years)
    .filter(year => year >= 2023)
    .sort((a, b) => b - a); // Decrescente
  
  return filteredYears;
}
