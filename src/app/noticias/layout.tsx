// src/app/noticias/layout.tsx
import './layout.module.css';

export const metadata = {
  title: 'Notícias | 3V Capital',
  description: 'Acompanhe as últimas notícias e comunicados da 3V Capital.',
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Apenas retorna os children, sem wrapper extra
}