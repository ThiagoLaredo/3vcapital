// lib/pdfParser.ts

/**
 * Utilitário para gerenciar os arquivos PDF das cartas mensais
 * 
 * Estrutura recomendada:
 * public/pdfs/cartas/
 * ├── 2021/
 * │   ├── Carta-Econômica-Set.21.pdf
 * │   ├── Carta-Econômica-Out.21.pdf
 * │   └── ...
 * └── 2022/
 *     ├── Carta-Econômica-Jan.22.pdf
 *     └── ...
 */

export interface PdfFileInfo {
  filename: string;
  year: number;
  month: number;
  monthName: string;
  fullPath: string;
  size?: number;
}

const monthAbbrToNumber: Record<string, number> = {
  'jan': 1, 'fev': 2, 'mar': 3, 'abr': 4, 'mai': 5, 'jun': 6,
  'jul': 7, 'ago': 8, 'set': 9, 'out': 10, 'nov': 11, 'dez': 12
};

const monthNumberToName: Record<number, string> = {
  1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 
  5: 'Maio', 6: 'Junho', 7: 'Julho', 8: 'Agosto', 
  9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
};

/**
 * Parseia um nome de arquivo PDF no formato "Carta-Econômica-Dez.21.pdf"
 */
export function parsePdfFilename(filename: string): {
  year: number;
  month: number;
  monthName: string;
  isValid: boolean;
} {
  try {
    // Remove extensão .pdf
    const baseName = filename.replace(/\.pdf$/i, '');
    
    // Encontra a parte do mês/ano (última parte após hífen)
    const parts = baseName.split('-');
    const monthYearPart = parts[parts.length - 1];
    
    // Divide por ponto: "Dez.21" -> ["Dez", "21"]
    const [monthAbbr, yearShort] = monthYearPart.split('.');
    
    if (!monthAbbr || !yearShort) {
      throw new Error('Formato inválido');
    }
    
    const monthAbbrLower = monthAbbr.toLowerCase();
    const month = monthAbbrToNumber[monthAbbrLower];
    
    if (!month) {
      throw new Error(`Mês não reconhecido: ${monthAbbr}`);
    }
    
    // Converte ano de 2 para 4 dígitos
    const yearShortNum = parseInt(yearShort);
    const year = yearShortNum < 100 ? 2000 + yearShortNum : yearShortNum;
    
    if (isNaN(year) || year < 2000 || year > 2100) {
      throw new Error(`Ano inválido: ${yearShort}`);
    }
    
    return {
      year,
      month,
      monthName: monthNumberToName[month],
      isValid: true
    };
  } catch (error) {
    console.error(`Erro ao parsear arquivo ${filename}:`, error);
    return {
      year: 0,
      month: 0,
      monthName: '',
      isValid: false
    };
  }
}

/**
 * Gera a URL pública para um PDF baseado no ano e mês
 */
export function generatePdfUrl(year: number, month: number): string {
  const monthAbbr = Object.keys(monthAbbrToNumber).find(
    key => monthAbbrToNumber[key] === month
  );
  
  if (!monthAbbr) {
    throw new Error(`Mês inválido: ${month}`);
  }
  
  const yearShort = year.toString().slice(-2);
  const filename = `Carta-Econômica-${monthAbbr.charAt(0).toUpperCase() + monthAbbr.slice(1)}.${yearShort}.pdf`;
  
  return `/pdfs/cartas/${year}/${filename}`;
}

/**
 * Escaneia uma lista de arquivos e retorna informações organizadas
 */
export function scanPdfFiles(filenames: string[]): PdfFileInfo[] {
  const validFiles: PdfFileInfo[] = [];
  
  for (const filename of filenames) {
    const info = parsePdfFilename(filename);
    
    if (info.isValid) {
      validFiles.push({
        filename,
        year: info.year,
        month: info.month,
        monthName: info.monthName,
        fullPath: generatePdfUrl(info.year, info.month)
      });
    }
  }
  
  // Ordenar por ano e mês (mais recente primeiro)
  return validFiles.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year;
    }
    return b.month - a.month;
  });
}

/**
 * Gera um script de migração para organizar seus PDFs
 */
export function generateOrganizationScript(files: string[]): string {
  const organized = scanPdfFiles(files);
  const byYear: Record<number, string[]> = {};
  
  organized.forEach(file => {
    if (!byYear[file.year]) {
      byYear[file.year] = [];
    }
    byYear[file.year].push(file.filename);
  });
  
  let script = '#!/bin/bash\n';
  script += '# Script para organizar os PDFs na estrutura correta\n\n';
  
  Object.keys(byYear).sort().reverse().forEach(year => {
    const yearNum = parseInt(year);
    script += `# Criar pasta do ano ${yearNum}\n`;
    script += `mkdir -p "public/pdfs/cartas/${yearNum}"\n\n`;
    
    const yearFiles = byYear[yearNum];
    yearFiles.forEach(filename => {
      script += `# Mover ${filename} para ${yearNum}/\n`;
      script += `mv "${filename}" "public/pdfs/cartas/${yearNum}/${filename}"\n`;
    });
    
    script += '\n';
  });
  
  return script;
}

// Lista de exemplo dos seus arquivos - atualize com seus nomes reais
export const exampleFiles = [
  'Carta-Econômica-Dez.21.pdf',
  'Carta-Econômica-Nov.21.pdf',
  'Carta-Econômica-Out.21.pdf',
  'Carta-Econômica-Set.21.pdf',
  'Carta-Econômica-Jan.22.pdf',
  'Carta-Econômica-Fev.22.pdf',
  'Carta-Econômica-Mar.22.pdf',
  'Carta-Econômica-Abr.22.pdf',
  'Carta-Econômica-Mai.22.pdf',
  'Carta-Econômica-Jun.22.pdf',
  'Carta-Econômica-Jul.22.pdf',
  'Carta-Econômica-Ago.22.pdf',
  'Carta-Econômica-Set.22.pdf',
  'Carta-Econômica-Out.22.pdf',
  'Carta-Econômica-Nov.22.pdf',
  'Carta-Econômica-Dez.22.pdf',
  // Continue com 2023, 2024...
];