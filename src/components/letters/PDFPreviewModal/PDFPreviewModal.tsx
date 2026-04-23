// components/letters/PDFPreviewModal/PDFPreviewModal.tsx - VERSÃO COM SPINNER VISÍVEL
'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Download, Printer, Maximize2, Minimize2, FileText } from 'lucide-react';
import styles from './PDFPreviewModal.module.css';

interface PDFPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title?: string;
  fileName?: string;
}

export default function PDFPreviewModal({
  isOpen,
  onClose,
  pdfUrl,
  title = 'Visualizar PDF',
  fileName = 'documento.pdf'
}: PDFPreviewModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevenir scroll do body quando modal estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      setError(null);
      setShowFallback(false);
      
      // Timeout para mostrar fallback se o PDF demorar muito
      const timeoutId = setTimeout(() => {
        if (isLoading) {
          setShowFallback(true);
        }
      }, 3000);

      return () => clearTimeout(timeoutId);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fechar modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setShowFallback(false);
  };

  const handleError = () => {
    setError('Não foi possível carregar o PDF. Por favor, tente novamente.');
    setIsLoading(false);
    setShowFallback(true);
  };

  // Função para fechar o fallback manualmente
  const handleCloseFallback = () => {
    setShowFallback(false);
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div 
        ref={modalRef}
        className={`${styles.modal} ${isFullscreen ? styles.fullscreenModal : ''}`}
      >
        {/* Header do Modal */}
        <div className={styles.modalHeader}>
          <div className={styles.titleSection}>
            <FileText size={20} />
            <div>
              <h3 className={styles.modalTitle}>{title}</h3>
              <p className={styles.fileName}>{fileName}</p>
            </div>
          </div>
          
          <div className={styles.actions}>
            <button
              className={styles.iconButton}
              onClick={toggleFullscreen}
              title={isFullscreen ? "Sair do modo tela cheia" : "Tela cheia"}
            >
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            
            <button
              className={styles.iconButton}
              onClick={handleDownload}
              title="Baixar PDF"
            >
              <Download size={20} />
            </button>
            
            <button
              className={styles.iconButton}
              onClick={handlePrint}
              title="Imprimir"
            >
              <Printer size={20} />
            </button>
            
            <button
              className={`${styles.iconButton} ${styles.closeButton}`}
              onClick={onClose}
              title="Fechar"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Conteúdo do Modal */}
        <div className={styles.modalContent}>
          {isLoading && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Carregando PDF...</p>
            </div>
          )}

          {error ? (
            <div className={styles.error}>
              <div className={styles.errorIcon}>❌</div>
              <h4>Erro ao carregar o PDF</h4>
              <p>{error}</p>
              <div className={styles.errorActions}>
                <button 
                  className={styles.retryButton}
                  onClick={() => window.location.reload()}
                >
                  Tentar novamente
                </button>
                <button 
                  className={styles.closeErrorButton}
                  onClick={() => setShowFallback(true)}
                >
                  Ver alternativas
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.pdfContainer}>
              <iframe
                ref={iframeRef}
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF Preview"
                className={styles.pdfIframe}
                onLoad={handleLoad}
                onError={handleError}
                style={{ opacity: isLoading ? 0 : 1 }}
              />
              
              {/* Fallback com botão de fechar */}
              {showFallback && (
                <div className={styles.pdfFallback}>
                  <button 
                    className={styles.closeFallbackButton}
                    onClick={handleCloseFallback}
                    title="Fechar"
                  >
                    <X size={16} />
                  </button>
                  <p>Se o PDF não carregar automaticamente, você pode:</p>
                  <div className={styles.fallbackActions}>
                    <a 
                      href={pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.fallbackButton}
                    >
                      Abrir em nova aba
                    </a>
                    <button 
                      onClick={handleDownload}
                      className={styles.fallbackButton}
                    >
                      Baixar PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className={styles.modalFooter}>
          <div className={styles.footerInfo}>
            <span className={styles.pageInfo}>
              Página: <strong>1</strong> de <strong>1</strong>
            </span>
            <span className={styles.zoomInfo}>
              Zoom: <strong>100%</strong>
            </span>
          </div>
          
          <div className={styles.viewerInfo}>
            <span className={styles.viewerHint}>
              Use Ctrl + Scroll para zoom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}