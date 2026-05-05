// src/app/noticias/layout.tsx
import './layout.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notícias e Mídia',
  description:
    'Acompanhe as últimas notícias, artigos e publicações da 3V Capital na mídia especializada em finanças e investimentos.',
  openGraph: {
    title: 'Notícias e Mídia | 3V Capital',
    description:
      'Acompanhe as últimas notícias, artigos e publicações da 3V Capital na mídia especializada em finanças e investimentos.',
    url: 'https://3vcapital.com.br/noticias',
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3vcapital.com.br/noticias' },
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Apenas retorna os children, sem wrapper extra
}