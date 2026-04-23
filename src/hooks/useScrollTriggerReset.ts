"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook para resetar e reinicializar ScrollTriggers quando a página/aba volta a ter foco
 * ou quando a navegação muda. Resolve o problema de animações travadas ao navegar entre páginas.
 */
export function useScrollTriggerReset(...extraDeps: any[]) {
  const pathname = usePathname();

  // Reset quando a página volta para foco (aba/janela) ou quando pathname/extra deps mudam
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Página voltou para foco
        requestAnimationFrame(() => {
          try {
            ScrollTrigger.refresh();
          } catch (e) {
            // Ignora erros
          }
        });
      }
    };

    // Reset quando pathname muda (navegação) ou dependências extras mudam
    const handleRouteChange = () => {
      requestAnimationFrame(() => {
        try {
          // Pequeno delay para garantir que a página está renderizada
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 50);
        } catch (e) {
          // Ignora erros
        }
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Trigger inicial e sempre que deps mudarem
    handleRouteChange();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [pathname, ...extraDeps]);
}
