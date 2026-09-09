'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import styles from './EventPopup.module.css';

const content = {
  pt: {
    badge: 'Evento',
    title: 'Luciane Ribeiro no Private Wealth Brazil Retreat 2026',
    text: 'A fundadora da 3V Capital, Luciane Ribeiro, será palestrante no Private Wealth Brazil Retreat: Global Investment Experience — um retiro de alto nível reunindo gestores globais e alocadores sênior de family offices e private banking em um ambiente exclusivo e colaborativo.',
    date: '16 a 18 de Setembro de 2026',
    location: 'Clara Ibiúna Resort, São Paulo',
    button: 'Saiba Mais',
    close: 'Fechar',
  },
  en: {
    badge: 'Event',
    title: 'Luciane Ribeiro at Private Wealth Brazil Retreat 2026',
    text: '3V Capital founder Luciane Ribeiro will be a speaker at the Private Wealth Brazil Retreat: Global Investment Experience — a high-level retreat bringing together leading global asset managers and senior allocators from family offices and private banking in an exclusive, collaborative setting.',
    date: 'September 16–18, 2026',
    location: 'Clara Ibiúna Resort, São Paulo',
    button: 'Learn More',
    close: 'Close',
  },
};

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = content[language];

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.badge}>{t.badge}</span>
          <button className={styles.closeButton} onClick={() => setIsOpen(false)} aria-label={t.close}>
            <X size={20} />
          </button>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src="/images/popup/popup.jpg"
            alt={t.title}
            fill
            className={styles.image}
            sizes="480px"
          />
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{t.title}</h2>

          <p className={styles.text}>{t.text}</p>

          <div className={styles.details}>
            <span>📅 {t.date}</span>
            <span>📍 {t.location}</span>
          </div>

          <a
            href="https://www.linkedin.com/posts/how-long-term-capital-survives-in-a-fragmented-share-7492912794426851330-S59D?utm_medium=ios_app&rcm=ACoAAAx9NcIBdYEdpW5yZJZHl0VksrDX1Xp6boo&utm_source=social_share_send&utm_campaign=whatsapp"
            className={styles.button}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.button}
          </a>
        </div>
      </div>
    </div>
  );
}
