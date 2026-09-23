// src/lib/news-data.ts
import newsData from './news.json';
import { NewsItem } from '@/types/news';

export type NewsLanguage = 'pt' | 'en';

export function getLocalizedNews(news: NewsItem, language: NewsLanguage): NewsItem {
  if (language !== 'en') return news;

  return {
    ...news,
    title: news.titleEn || news.title,
    excerpt: news.excerptEn || news.excerpt,
    content: news.contentEn || news.content,
  };
}

export function getNews(): NewsItem[] {
  // Garante que sempre retorna um array
  if (!newsData || !Array.isArray(newsData)) {
    console.error('newsData não é um array válido:', newsData);
    return [];
  }
  
  // Ordena por data (mais recente primeiro)
  return [...newsData].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  if (!newsData || !Array.isArray(newsData)) {
    console.error('newsData não é um array válido:', newsData);
    return undefined;
  }
  
  return newsData.find(item => item.slug === slug);
}