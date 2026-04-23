// components/buttons/PDFButton/PDFButton.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import styles from './PDFButton.module.css';

interface PDFButtonProps {
  onClick: () => void;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'ghost';
  showIcon?: boolean; // Se quiser ainda ter a opção de mostrar ícone
  label?: string;
  showArrow?: boolean; // Controla se mostra a seta (→)
  className?: string;
}

export default function PDFButton({ 
  onClick, 
  size = 'medium', 
  variant = 'primary',
  showIcon = false, // Padrão false para não mostrar ícone
  label,
  showArrow = true, // Padrão true para mostrar seta
  className = ''
}: PDFButtonProps) {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  
  // Use a label fornecida ou a tradução padrão
  const buttonLabel = label || translations.CartasMensaisPage?.featured?.openPdf || "Visualizar PDF";

  return (
    <button
      className={`${styles.pdfButton} ${styles[size]} ${styles[variant]} ${className}`.trim()}
      onClick={onClick}
    >
      {/* Removemos o ícone de PDF */}
      <span className={styles.buttonText}>{buttonLabel}</span>
      {showArrow && <span className={styles.arrowIcon}>→</span>}
    </button>
  );
}