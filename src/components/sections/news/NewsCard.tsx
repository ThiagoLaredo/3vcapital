// src/components/sections/news/NewsCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { NewsItem } from '@/types/news';
import styles from './NewsCard.module.css';

interface NewsCardProps {
  news: NewsItem;
}

export default function NewsCard({ news }: NewsCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <article className={styles.newsCard}>
      <Link href={`/noticias/${news.slug}`} className={styles.cardLink}>
        {/* Container principal horizontal */}
        <div className={styles.cardContainer}>
          {/* Imagem à esquerda - 100% da altura */}
          <div className={styles.cardImageContainer}>
            {news.image && !imageError ? (
              <Image
                src={news.image}
                alt={news.title}
                fill
                className={styles.image}
                quality={80}
                sizes="(max-width: 768px) 100vw, 360px"
                onError={() => setImageError(true)}
                priority={news.featured}
              />
            ) : (
              <div className={styles.imageFallback}>
                <ImageIcon size={48} />
                <span>Imagem da notícia</span>
              </div>
            )}
          </div>

          {/* Conteúdo à direita */}
          <div className={styles.cardContent}>
            {/* Data e Autor */}
            <div className={styles.cardMeta}>
              <Calendar size={14} />
              <time dateTime={news.date} className={styles.cardDate}>
                {formatDate(news.date)}
              </time>
              {news.author && (
                <>
                  <span className={styles.metaSeparator}>•</span>
                  <User size={14} />
                  <span className={styles.cardAuthor}>{news.author}</span>
                </>
              )}
            </div>

            {/* Título */}
            <h3 className={styles.cardTitle}>{news.title}</h3>

            {/* Descrição breve */}
            <p className={styles.cardExcerpt}>{news.excerpt}</p>

            {/* Botão Leia Mais */}
            <div className={styles.cardAction}>
              <span className={styles.readMore}>
                Leia mais
                <ArrowRight size={16} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}