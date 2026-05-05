import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nossa Equipe',
  description:
    'Conheça a equipe de profissionais experientes da 3V Capital, dedicados a oferecer soluções financeiras personalizadas e estratégias de investimento de alta qualidade.',
  openGraph: {
    title: 'Nossa Equipe | 3V Capital',
    description:
      'Conheça a equipe de profissionais experientes da 3V Capital, dedicados a oferecer soluções financeiras personalizadas e estratégias de investimento de alta qualidade.',
    url: 'https://3vcapital.com.br/equipe',
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3vcapital.com.br/equipe' },
};

export default function EquipeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
