import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from 'next/font/google';
import "./globals.css";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
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
  title: "3V Capital",
  description: "3V Capital - Gestor de Patrimônio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.className} ${playfairDisplay.variable}`}>
      <body>
        <LanguageProvider>
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