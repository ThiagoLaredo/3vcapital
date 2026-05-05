import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nossos Valores',
  description:
    'Conheça os valores que guiam a 3V Capital: excelência, transparência e o compromisso com o relacionamento de longo prazo com clientes e parceiros.',
  openGraph: {
    title: 'Nossos Valores | 3V Capital',
    description:
      'Conheça os valores que guiam a 3V Capital: excelência, transparência e o compromisso com o relacionamento de longo prazo com clientes e parceiros.',
    url: 'https://3vcapital.com.br/nossos-valores',
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3vcapital.com.br/nossos-valores' },
};

export default function NossosValoresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
