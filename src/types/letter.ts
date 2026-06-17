// types/letter.ts
export interface MonthlyLetter {
  id: string;
  year: number;
  month: number;
  monthName: string;
  pdfUrl: string;
  pdfUrlEn?: string;
  publishedDate: string;
  fileSize: string;
}