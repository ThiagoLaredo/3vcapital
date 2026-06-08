'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language } = useLanguage();
  
  const translations = language === 'pt' ? pt : en;
  const hero = translations.Home.hero;

  // Define o vídeo APENAS no cliente (após hydration)
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    setVideoSrc(isMobile 
      ? '/video-background-mobile.mp4'
      : '/video-background-desktop.mp4'
    );
  }, []);

  // Fallback para o original
  const fallbackSrc = '/video-background-goldencapitalpartners.mp4';

  useEffect(() => {
    if (isVideoLoaded) {
      setTimeout(() => setShowContent(true), 300);
    }
  }, [isVideoLoaded]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
    if (videoRef.current) {
      videoRef.current.classList.add(styles.loaded);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleVideoError = () => {
    if (videoRef.current && videoSrc !== fallbackSrc) {
      const source = videoRef.current.querySelector('source');
      if (source) {
        source.src = fallbackSrc;
        videoRef.current.load();
      }
    }
  };

  // Carrega o vídeo quando a fonte estiver definida
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.videoContainer}>
        {/* Renderiza o vídeo apenas quando temos a fonte */}
        {videoSrc && (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoaded}
            onCanPlay={handleVideoLoaded}
            onError={handleVideoError}
            className={styles.video}
            preload="auto"
            aria-label="Vídeo de fundo da seção principal"
          >
            <source 
              src={videoSrc} 
              type="video/mp4" 
            />
            Seu navegador não suporta vídeos HTML5.
          </video>
        )}

        {/* Filtro de cor primária sobre o vídeo */}
        <div className={styles.videoColorFilter}></div>

        {/* Placeholder */}
        {(!videoSrc || !isVideoLoaded) && (
          <div 
            className={styles.videoPlaceholder}
            role="status"
            aria-label="Carregando vídeo..."
          >
            <div className={styles.loadingSpinner}></div>
          </div>
        )}

        <div className={styles.overlay}></div>
      </div>

      <div className={`${styles.contentContainer} ${showContent ? styles.show : ''}`}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{hero.title}</h1>
          <Link href="#experience" className={styles.ctaButton}>
            Conheça a 3V Capital
          </Link>
          {/* <p className={styles.paragraph}>{hero.paragraph}</p> */}
        </div>
      </div>

      <div 
        className={`${styles.scrollIndicator} ${showContent ? styles.show : ''}`}
        role="presentation"
        aria-hidden="true"
      >
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  );
}