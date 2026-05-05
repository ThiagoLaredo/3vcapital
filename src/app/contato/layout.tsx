import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com a 3V Capital. Estamos prontos para entender suas necessidades e apresentar as melhores soluções em gestão de patrimônio e investimentos.',
  openGraph: {
    title: 'Contato | 3V Capital',
    description:
      'Entre em contato com a 3V Capital. Estamos prontos para entender suas necessidades e apresentar as melhores soluções em gestão de patrimônio e investimentos.',
    url: 'https://3vcapital.com.br/contato',
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3vcapital.com.br/contato' },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
