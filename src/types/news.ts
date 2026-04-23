// types/news.ts
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string; // formato YYYY-MM-DD
  author?: string;
  featured?: boolean;
}