// app/cartas-mensais/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cartas Mensais | 3V Capital - Relatórios Financeiros',
  description: 'Acesse todo o histórico de cartas mensais da 3V Capital. Análises de mercado, insights exclusivos e relatórios financeiros detalhados desde 2021.',
  keywords: [
    'cartas mensais', 
    'relatórios financeiros', 
    '3V Capital', 
    'análise econômica', 
    'mercado financeiro',
    'investimentos',
    'relatórios mensais'
  ],
  openGraph: {
    title: 'Cartas Mensais | 3V Capital',
    description: 'Relatórios financeiros mensais completos com análises de mercado',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://3vcapital.com.br/cartas-mensais',
    siteName: '3V Capital',
    images: [
      {
        url: '/og-cartas-mensais.jpg',
        width: 1200,
        height: 630,
        alt: '3V Capital - Cartas Mensais',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cartas Mensais | 3V Capital',
    description: 'Relatórios financeiros mensais completos',
    images: ['/twitter-cartas-mensais.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://3vcapital.com.br/cartas-mensais',
  },
};

export default function CartasMensaisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}