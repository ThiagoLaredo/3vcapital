import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from 'next/font/google';
import "./globals.css";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import ScrollToTop from "../components/ui/ScrollToTop/ScrollToTop";
import { LanguageProvider } from "../contexts/LanguageContext";

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: {
    default: '3V Capital | Gestão de Patrimônio e Investimentos',
    template: '%s | 3V Capital',
  },
  description:
    'A 3V Capital é uma gestora independente especializada em alocação de patrimônio, estratégias de investimento e soluções financeiras personalizadas para investidores qualificados.',
  metadataBase: new URL('https://3vcapital.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: '3V Capital',
    title: '3V Capital | Gestão de Patrimônio e Investimentos',
    description:
      'A 3V Capital é uma gestora independente especializada em alocação de patrimônio, estratégias de investimento e soluções financeiras personalizadas para investidores qualificados.',
    url: 'https://3vcapital.com.br',
    images: [
      {
        url: '/3v-capital.jpg',
        width: 1200,
        height: 630,
        alt: '3V Capital',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://3vcapital.com.br',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.className} ${playfairDisplay.variable}`}>
      <body suppressHydrationWarning>
        <LanguageProvider>
          <ScrollToTop />
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}