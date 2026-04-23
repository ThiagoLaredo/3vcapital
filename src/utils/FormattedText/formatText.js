// src/utils/FormattedText/formatText.js - VERSÃO COMPLETA
export function formatText(text, options = {}) {
  const {
    type = 'simple', // 'simple', 'markdown', 'inline'
    wrapInParagraph = false
  } = options;
  
  if (!text) return '';
  
  const trimmedText = text.trim();
  
  // Se já é HTML
  if (trimmedText.includes('<') && trimmedText.includes('>')) {
    return trimmedText;
  }
  
  let formatted = trimmedText;
  
  // Aplica markdown se necessário
  if (type === 'markdown' || type === 'inline') {
    formatted = formatted
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }
  
  // Para conteúdo inline, só converte quebras
  if (type === 'inline') {
    return formatted.replace(/\n/g, '<br />');
  }
  
  // Para conteúdo de bloco
  if (wrapInParagraph || type === 'simple' || type === 'markdown') {
    const paragraphs = formatted.split(/\n\s*\n/);
    formatted = paragraphs
      .map(p => {
        const trimmed = p.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('<p>')) return trimmed;
        
        const lines = trimmed.split('\n');
        if (lines.length > 1) {
          return `<p>${lines.map(l => l.trim()).join('<br />')}</p>`;
        }
        return `<p>${trimmed}</p>`;
      })
      .join('');
  }
  
  return formatted;
}

// Exportações auxiliares
export const formatInlineContent = (text) => formatText(text, { type: 'inline' });
export const formatMarkdownText = (text) => formatText(text, { type: 'markdown' });
export const formatNewsText = (text) => formatText(text, { type: 'simple' });