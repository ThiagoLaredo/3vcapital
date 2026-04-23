// src/app/noticias/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import NewsCard from '@/components/sections/news/NewsCard';
import { getNews } from '@/lib/news-data';
import styles from './page.module.css';

export default function NoticiasPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.NewsPage;
  
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const newsData = getNews();
      
      if (!Array.isArray(newsData)) {
        console.error('getNews() não retornou um array:', newsData);
        setError('Erro ao carregar notícias');
        setNews([]);
      } else {
        setNews(newsData);
        setError(null);
      }
    } catch (err) {
      console.error('Erro ao carregar notícias:', err);
      setError('Erro ao carregar notícias');
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loader}>Carregando notícias...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Erro</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.noticiasPage}>
      <PageIntroSection
        title={dict?.intro?.title ?? "Na Mídia"}
        fullText={dict?.intro?.subtitle ?? "Acompanhe as publicações e participações da 3V Capital na mídia."}
      />

      {/* Lista de Notícias */}
      <section className={styles.newsSection}>
        <div className={styles.container}>
          {news.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nenhuma notícia publicada no momento.</p>
            </div>
          ) : (
            <div className={styles.newsList}>
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}