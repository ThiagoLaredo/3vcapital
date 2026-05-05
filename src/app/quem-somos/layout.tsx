import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quem Somos',
  description:
    'Conheça a história, os valores e a filosofia da 3V Capital, gestora independente comprometida com a excelência, transparência e o relacionamento de longo prazo com clientes e parceiros.',
  openGraph: {
    title: 'Quem Somos | 3V Capital',
    description:
      'Conheça a história, os valores e a filosofia da 3V Capital, gestora independente comprometida com a excelência, transparência e o relacionamento de longo prazo.',
    url: 'https://3vcapital.com.br/quem-somos',
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3vcapital.com.br/quem-somos' },
};

export default function QuemSomosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
