import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compliance',
  description:
    'Acesse os documentos de compliance, políticas e regulamentos da 3V Capital. Transparência e ética como pilares fundamentais da nossa atuação.',
  openGraph: {
    title: 'Compliance | 3V Capital',
    description:
      'Acesse os documentos de compliance, políticas e regulamentos da 3V Capital. Transparência e ética como pilares fundamentais da nossa atuação.',
    url: 'https://3vcapital.com.br/compliance',
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://3vcapital.com.br/compliance' },
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
