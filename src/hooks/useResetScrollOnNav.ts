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
    const getHeaderOffset = () => {
      const cssValue = getComputedStyle(document.documentElement)
        .getPropertyValue('--header-height')
        .trim();
      const parsed = Number.parseFloat(cssValue);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 96;
    };

    const scrollToHashTarget = () => {
      const hash = window.location.hash;
      if (!hash) return false;

      const targetId = decodeURIComponent(hash.replace('#', ''));
      if (!targetId) return false;

      const target = document.getElementById(targetId);
      if (!target) return false;

      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top: Math.max(0, top), behavior: 'auto' });
      return true;
    };

    // Se existir hash, prioriza a âncora; se não, reseta para o topo.
    if (!scrollToHashTarget()) {
      window.scrollTo(0, 0);
    }

    // Reaplica após pequenos delays para casos de layout assíncrono/hidratação.
    const timer1 = setTimeout(() => {
      if (!scrollToHashTarget()) {
        window.scrollTo(0, 0);
      }
    }, 0);

    const timer2 = setTimeout(() => {
      if (!scrollToHashTarget()) {
        window.scrollTo(0, 0);
      }
    }, 140);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);
}
