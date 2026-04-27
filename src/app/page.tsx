"use client";
import HeroSection from '../components/sections/HeroSection/HeroSection';
import { useResetScrollOnNav } from '../hooks/useResetScrollOnNav';
import Experience from '../components/sections/Experience/Experience';
import Solutions from '../components/sections/Diferenciais/Diferenciais';
import NossosServicos from '../components/sections/NossosServicos/NossosServicos';
import CartaDoMes from '../components/sections/CartaDoMes/CartaDoMes';
import HomeLatestNews from '../components/sections/news/HomeLatestNews';

export default function Home() {
  useResetScrollOnNav();

  return (
    <>
      <HeroSection />
      <Experience />
      <NossosServicos />
      <Solutions />
      <CartaDoMes />
      <HomeLatestNews />
    </>
  );
}