// app/cartas-mensais/page.tsx - VERSÃO ATUALIZADA
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import { lettersData, getAvailableYearsFrom2023 } from '@/lib/letters';
import { useState, useEffect, useMemo } from 'react';
import PDFPreviewModal from '@/components/letters/PDFPreviewModal/PDFPreviewModal'; // Adicione ao import
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import { useFadeIn } from '@/hooks/useFadeIn';
import CalendarGridView from '@/components/letters/CalendarGridView/CalendarGridView';
import YearSelector from '@/components/letters/YearSelector/YearSelector';
import MonthSelector from '@/components/letters/MonthSelector/MonthSelector';
import TimelineView from '@/components/letters/TimelineView/TimelineView';
import Image from 'next/image';
import styles from './CartasPage.module.css';
import PDFButton from '@/components/buttons/PDFButton/PDFButton'; // Importe o botão
import { getPdfUrl } from '@/lib/pdfUtils';
import { MonthlyLetter } from '@/types/letter';
import { getLocalizedTitle, getLocalizedDescription } from '@/lib/letterUtils';

type ViewMode = 'timeline' | 'calendar';

// Função para formatar o mês em abreviação (JAN, FEV, etc.)
const formatMonthAbbreviation = (monthNumber: number, language: 'pt' | 'en') => {
  const months = {
    pt: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
    en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  };
  return months[language][monthNumber - 1];
};

export default function CartasMensaisPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.CartasMensaisPage || {};

  const [viewMode, setViewMode] = useState<ViewMode>('calendar');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>(2026);
  const [selectedMonth, setSelectedMonth] = useState<number | 'all'>('all');
  const [filteredLetters, setFilteredLetters] = useState(lettersData);
  // Estados para o modal de pré-visualização
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [selectedPdfTitle, setSelectedPdfTitle] = useState('');

    // ========== NOVAS FUNÇÕES PARA PDF BILÍNGUE ==========
  const handleOpenPreview = (pdfUrl: string, title: string) => {
    setSelectedPdfUrl(pdfUrl);
    setSelectedPdfTitle(title);
    setIsPreviewModalOpen(true);
  };

  const openLetterPreview = (letter: MonthlyLetter) => {
    const pdfUrl = getPdfUrl(letter, language);
    handleOpenPreview(pdfUrl, letter.title);
  };
  // =====================================================

  // Referências para animação
  const introRef = useFadeIn({ delay: 0.3, y: 30 });
  const featuredRef = useFadeIn({ delay: 0.4, y: 30 });
  const filtersRef = useFadeIn({ delay: 0.5, y: 30 });
  const gridRef = useFadeIn({ delay: 0.6, y: 30 });

  // Obter anos disponíveis (apenas de 2023 para frente)
  const availableYears = getAvailableYearsFrom2023();

  // Filtrar cartas apenas de 2023 para frente
  const lettersFrom2023 = useMemo(() => {
    return lettersData.filter(letter => letter.year >= 2023);
  }, []);

  // Obter a carta mais recente (última postada)
  const featuredLetter = useMemo(() => {
    const sorted = [...lettersFrom2023].sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );
    return sorted[0];
  }, [lettersFrom2023]);

  // Formatar data da carta em destaque
  const formattedFeaturedDate = featuredLetter 
    ? `${formatMonthAbbreviation(featuredLetter.month, language)} ${featuredLetter.year}`
    : '';

  // Efeitos de filtro
  useEffect(() => {
    let result = lettersFrom2023;

    // Filtro por ano
    if (selectedYear !== 'all') {
      result = result.filter(letter => letter.year === selectedYear);
    }

    // Filtro por mês
    if (selectedMonth !== 'all') {
      result = result.filter(letter => letter.month === selectedMonth);
    }

    // Ordenar por data (mais recente primeiro)
    result.sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    setFilteredLetters(result);
  }, [selectedYear, selectedMonth, lettersFrom2023]);

  // Estatísticas (apenas de 2023 para frente)
  const stats = useMemo(() => {
    const totalLetters = lettersFrom2023.length;
    const totalYears = new Set(lettersFrom2023.map(l => l.year)).size;
    
    return { totalLetters, totalYears };
  }, [lettersFrom2023]);

  // Função para limpar filtros
  const clearFilters = () => {
    setSelectedYear('all');
    setSelectedMonth('all');
  };

  // Verificar se há filtros ativos
  const hasActiveFilters = selectedYear !== 'all' || selectedMonth !== 'all';

  // Função para abrir PDF
  const openPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  // Função para abrir modal de pré-visualização
  const openPreviewModal = (pdfUrl: string, title: string) => {
    setSelectedPdfUrl(pdfUrl);
    setSelectedPdfTitle(title);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className={styles.cartasMensaisPage}>
      {/* Modal de Pré-visualização de PDF */}
      <PDFPreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        pdfUrl={selectedPdfUrl}
        title={selectedPdfTitle}
        fileName={selectedPdfUrl.split('/').pop() || 'documento.pdf'} // Melhor: extrai nome do arquivo da URL
      />
      <PageIntroSection
        title={dict?.intro?.title || "Histórico Completo"}
        fullText={dict?.intro?.subtitle || "Acesse todo o histórico de cartas mensais da 3V Capital desde 2023."}
      />

      {/* Carta em Destaque (Carta do Mês) */}
      {featuredLetter && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <div ref={featuredRef} className={styles.featuredWrapper}>
              <div className={styles.featuredCard}>
                <div className={styles.featuredCardHeader}>
                  {/* Badge "Carta do Mês" dentro do card */}
                  <div className={styles.featuredBadge}>
                    {dict?.featured?.badge || "Carta do Mês"}
                  </div>
                  
                  {/* Ícone PDF no canto superior direito */}
                  <div 
                    className={styles.fileIndicator} 
                    title="Documento PDF"
                    onClick={() => openLetterPreview(featuredLetter)} // <-- ALTERADO
                    style={{ cursor: 'pointer' }}
                  >
                    <span className={styles.fileIcon}>📄</span>
                  </div>
                </div>  

                <div className={styles.featuredCardBody}>
                  <div className={styles.featuredCardContent}>
                    <div className={styles.featuredDate}>
                      {formattedFeaturedDate}
                    </div>

                    <h2 className={styles.featuredTitle}>
                      {getLocalizedTitle(featuredLetter, language)}
                    </h2>

                    <p className={styles.featuredDescription}>
                      {getLocalizedDescription(featuredLetter, language)}
                    </p>

                    <div className={styles.cardActions}>
                      <PDFButton 
                        onClick={() => openLetterPreview(featuredLetter)} // <-- ALTERADO
                        variant="primary"
                        size="medium"
                        showArrow={true}
                        className={styles.featuredPdfButton}
                      />
                      
                      <div className={styles.fileSize}>
                        {"PDF • "} {featuredLetter.fileSize}
                      </div>
                    </div>
                  </div>

                  <div className={styles.featuredCardMedia}>
                    <Image
                      src="/images/carta/carta-economica.webp"
                      alt={language === 'pt' ? 'Imagem da carta econômica em destaque' : 'Featured economic letter image'}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={styles.featuredCardImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filtros */}
      <section ref={filtersRef} className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersHeader}>
            <h3 className={styles.filtersTitle}>
              {dict?.filters?.title || "Filtrar Cartas"}
            </h3>
          </div>
          
          <div className={styles.filtersGrid}>
            {/* Filtro por Ano */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                {dict?.filters?.yearLabel || "Ano"}
              </label>
              <YearSelector
                years={availableYears}
                selectedYear={selectedYear}
                onChange={setSelectedYear}
              />
            </div>

            {/* Filtro por Mês */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>
                {dict?.filters?.monthLabel || "Mês"}
              </label>
              <MonthSelector
                selectedMonth={selectedMonth}
                onChange={setSelectedMonth}
              />
            </div>

            {/* Botão de Limpar Filtros */}
            {hasActiveFilters && (
              <div className={styles.clearFilterGroup}>
                <button 
                  onClick={clearFilters}
                  className={styles.clearButton}
                >
                  {dict?.filters?.clearFilters || "Limpar Filtros"}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className={`${styles.contentSection} ${styles.da0RVW__container}`}>
        <div className={styles.container}>
          <div className={styles.contentHeader}>
            {/* Título dos resultados */}
            <div className={styles.resultsHeader}>
              <h3 className={styles.resultsTitle}>
                {filteredLetters.length} {dict?.filters?.lettersFound || "cartas encontradas"}
              </h3>
            </div>

            {/* Botões de Modo de Visualização - Posicionados no topo à direita */}
            <div className={styles.viewModeContainer}>
              <div className={styles.viewModeSelector}>
                <button
                  className={`${styles.viewModeButton} ${viewMode === 'calendar' ? styles.active : ''}`}
                  onClick={() => setViewMode('calendar')}
                >
                  {dict?.viewMode?.calendar || 'Calendário'}
                </button>
                <button
                  className={`${styles.viewModeButton} ${viewMode === 'timeline' ? styles.active : ''}`}
                  onClick={() => setViewMode('timeline')}
                >
                  {dict?.viewMode?.timeline || 'Timeline'}
                </button>
              </div>
            </div>
          </div>

          {/* Renderização da Visualização */}
          <div ref={gridRef}>
            {viewMode === 'timeline' ? (
              <TimelineView 
                letters={filteredLetters}
                onOpenPreview={handleOpenPreview} // <-- Passamos handleOpenPreview, não openLetterPreview
              />
            ) : (
              <CalendarGridView
                letters={filteredLetters}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                onOpenPreview={handleOpenPreview} // <-- Passamos handleOpenPreview, não openLetterPreview
              />
            )}

            {/* Estado vazio */}
            {filteredLetters.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📄</div>
                <h4 className={styles.emptyTitle}>
                  Nenhuma carta encontrada
                </h4>
                <p className={styles.emptyText}>
                  Tente ajustar seus filtros.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}