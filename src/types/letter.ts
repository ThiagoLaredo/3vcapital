// types/letter.ts
export interface MonthlyLetter {
  id: string;
  year: number;
  month: number;
  monthName: string;
  title: string;          // Título em português (obrigatório)
  titleEn?: string;       // Título em inglês (opcional)
  description: string;    // Descrição em português (obrigatório)
  descriptionEn?: string; // Descrição em inglês (opcional)
  pdfUrl: string;
  pdfUrlEn?: string;
  publishedDate: string;
  fileSize: string;
}