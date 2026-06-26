// app/compliance/page.tsx
'use client';

import { Fragment } from 'react';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import PDFPreviewModal from '@/components/letters/PDFPreviewModal/PDFPreviewModal';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import { useFadeIn } from '@/hooks/useFadeIn';
import styles from './CompliancePage.module.css';

// Definição dos documentos (apenas nomes e tamanhos, sempre em pt)
const documents = [
  {
    id: 'codigo-etica',
    namePt: 'Código de Ética',
    nameEn: 'Code of Ethics',
    fileName: '3V-Capital_Codigo-de-Etica.pdf',
    fileSize: '70 KB'
  },
  {
    id: 'manual-perfil',
    namePt: 'Manual de Análise de Perfil do Investidor',
    nameEn: 'Investor Profile Analysis Manual',
    fileName: '3V-Capital-I-Manual-de-Analise-de-Perfil-do-Investidor.pdf',
    fileSize: '137 KB'
  },
  {
    id: 'politica-investimentos-pessoais',
    namePt: 'Política de Investimentos Pessoais',
    nameEn: 'Personal Investments Policy',
    fileName: '3V-Capital_Politica-de-Investimentos-Pessoais.pdf',
    fileSize: '69 KB'
  },
  {
    id: 'politica-rateio',
    namePt: 'Política de Rateio e Divisão de Ordens',
    nameEn: 'Order Allocation and Sharing Policy',
    fileName: '3V-Capital_Politica-de-Rateio-e-Divisao-de-Ordens.pdf',
    fileSize: '81 KB'
  },
  {
    id: 'politica-voto',
    namePt: 'Política de Exercício de Direito de Voto',
    nameEn: 'Voting Rights Policy',
    fileName: 'politica-voto.pdf',
    fileSize: '432 KB'
  },
  {
    id: 'politica-gestao-risco',
    namePt: 'Política de Gestão de Risco',
    nameEn: 'Risk Management Policy',
    fileName: 'politica-gestao-risco.pdf',
    fileSize: '1.1 MB'
  },
  {
    id: 'formulario-referencia',
    namePt: 'Formulário de Referência',
    nameEn: 'Reference Form',
    fileName: 'formulario-referencia.pdf',
    fileSize: '3.4 MB'
  },
  {
    id: 'politica-selecao-alocacao',
    namePt: 'Política de Seleção e Alocação de Investimentos',
    nameEn: 'Investment Selection and Allocation Policy',
    fileName: '3V-Capital-I-Politica-de-Selecao-e-Alocacao-de-Investimentos.pdf',
    fileSize: '57 KB'
  },
  {
    id: 'plano-contingencia',
    namePt: 'Plano de Contingência e Continuidade de Negócios',
    nameEn: 'Contingency and Business Continuity Plan',
    fileName: '3V-Capital-I-Plano-de-Contingencia-e-Continuidade-de-Negocio.pdf',
    fileSize: '90 KB'
  },
  {
    id: 'manual-regras',
    namePt: 'Manual de Regras, Procedimentos e Controles Internos',
    nameEn: 'Internal Rules, Procedures and Controls Manual',
    fileName: 'manual-3V-Capital-I-Manual-de-Regras-Procedimentos-e-Controles-Internos.pdf',
    fileSize: '247 KB'
  },
  {
    id: 'politica-pldft',
    namePt: 'Política de PLDFT, Cadastro e Conheça seu Cliente (KYC)',
    nameEn: 'AML/CFT, Registration and KYC Policy',
    fileName: '3V-Capital-I-Politica-de-PLDFT-Cadastro-e-Conheca-seu-Cliente-KYC.pdf',
    fileSize: '254 KB'
  },
  {
    id: 'politica-privacidade',
    namePt: 'Política de Privacidade',
    nameEn: 'Privacy Policy',
    fileName: 'politica-privacidade.pdf',
    fileSize: '412 KB'
  },
  {
    id: 'manual-precificacao',
    namePt: 'Manuais de Precificação de Ativos',
    nameEn: 'Asset Pricing Manuals',
    fileName: 'manual-precificacao.pdf',
    fileSize: '1.8 MB'
  }
];

// Função auxiliar para obter o nome do documento conforme idioma
const getDocumentName = (doc: typeof documents[0], language: 'pt' | 'en') => {
  return language === 'pt' ? doc.namePt : doc.nameEn;
};

// Função para obter URL do PDF
const getPdfUrl = (fileName: string) => {
  return `/images/compliance/${fileName}`;
};

export default function CompliancePage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.CompliancePage || {};
  const cyber = dict?.cybersecurity || {};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
  const [selectedPdfTitle, setSelectedPdfTitle] = useState('');

  const gridRef = useFadeIn({ delay: 0.4, y: 30 });

  const openPreviewModal = (pdfUrl: string, title: string) => {
    setSelectedPdfUrl(pdfUrl);
    setSelectedPdfTitle(title);
    setIsModalOpen(true);
  };

  const renderBrandHighlight = (text: string) => {
    const brandParts = text.split('3V Capital');

    if (brandParts.length === 1) {
      return text;
    }

    return brandParts.map((part, index) => (
      <Fragment key={`brand-part-${index}`}>
        {index > 0 && <strong className={styles.brandHighlight}>3V Capital</strong>}
        {part}
      </Fragment>
    ));
  };

  return (
    <div className={styles.compliancePage}>
      <PDFPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pdfUrl={selectedPdfUrl}
        title={selectedPdfTitle}
        fileName={selectedPdfUrl.split('/').pop() || 'documento.pdf'}
      />

      {/* PageHeaderSection removed per request */}

      <PageIntroSection
        title={dict?.introTitle || "Documentos Regulatórios"}
        fullText=""
      />

      <section className={styles.cyberSection} aria-labelledby="cybersecurity-title">
        <div className={styles.container}>
          <div className={styles.cyberCard}>
            <h2 id="cybersecurity-title" className={styles.srOnly}>
              {cyber?.label || 'Cybersecurity'}
            </h2>

            <p className={styles.cyberText}>
              {renderBrandHighlight(
                cyber?.quote ||
                  'Na 3V Capital, a protecao das informacoes de nossos clientes e parte essencial da nossa estrutura de governanca e compliance.'
              )}
            </p>

            <div className={styles.cyberTextBlock}>
              <p className={styles.cyberText}>
                {cyber?.paragraphOne || 'Adotamos praticas e controles voltados a seguranca da informacao e a continuidade operacional, com o objetivo de mitigar riscos ciberneticos e reforcar a resiliencia dos nossos processos.'}
              </p>
              <p className={styles.cyberText}>
                {cyber?.paragraphTwo || 'Entendemos que confianca tambem se constroi pela forma como protegemos dados, processos e relacionamentos.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.documentsSection}>
        <div className={styles.container}>
          <p className={styles.documentsIntro}>
            {dict?.introSubtitle || "Acesse nossos documentos de compliance, políticas internas e manuais."}
          </p>
          <div ref={gridRef} className={styles.documentsGrid}>
            {documents.map((doc) => {
              const docName = getDocumentName(doc, language);
              const pdfUrl = getPdfUrl(doc.fileName);

              return (
                <div key={doc.id} className={styles.documentCard}>
                  <div className={styles.cardIcon}>
                    <span className={styles.pdfIcon}>📄</span>
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.documentTitle}>{docName}</h3>
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.viewButton}
                      onClick={() => openPreviewModal(pdfUrl, docName)}
                    >
                      {dict?.view || "Abrir PDF"} <span className={styles.arrow}>→</span>
                    </button>
                    <span className={styles.fileSize}>PDF • {doc.fileSize}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}