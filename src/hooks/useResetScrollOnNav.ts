"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook para resetar a posição de scroll e recalcular layouts ao navegar para uma página
 * Necessário para garantir que as animações funcionem corretamente com ScrollTrigger
 */
export function useResetScrollOnNav() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll para o topo quando a rota mudar
    window.scrollTo(0, 0);

    // Força recalcular do position após um delay para garantir que layout está estável
    const timer1 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    const timer2 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);
}
