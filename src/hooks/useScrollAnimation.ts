import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook customizado para gerenciar animações com ScrollTrigger
 * Resolve problemas de animações travadas ao navegar entre páginas
 */
export function useScrollAnimation() {
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Função para limpar animações e triggers
  const cleanup = () => {
    // Reverte o context GSAP
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    // Kill triggers específicos criados por este hook
    triggersRef.current.forEach(trigger => {
      try {
        trigger.kill();
      } catch (e) {
        // Ignora erros ao matar triggers
      }
    });
    triggersRef.current = [];
  };

  // Limpar ao desmontar
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  // Função para criar animação com ScrollTrigger
  const createAnimation = (
    element: HTMLElement | string,
    fromProps: gsap.TweenVars,
    toProps: gsap.TweenVars,
    scope?: Element
  ) => {
    try {
      if (!ctxRef.current && scope) {
        ctxRef.current = gsap.context(() => {}, scope);
      }

      const timeline = gsap.fromTo(element, fromProps, toProps);
      return timeline;
    } catch (err) {
      console.warn('Erro ao criar animação:', err);
      return null;
    }
  };

  // Função para criar ScrollTrigger
  const createScrollTrigger = (config: ScrollTrigger.Vars): ScrollTrigger | null => {
    try {
      const trigger = ScrollTrigger.create({
        ...config,
        invalidateOnRefresh: true,
      });
      triggersRef.current.push(trigger);
      return trigger;
    } catch (err) {
      console.warn('Erro ao criar ScrollTrigger:', err);
      return null;
    }
  };

  // Função para fazer refresh do ScrollTrigger
  const refreshScrollTrigger = (delay: number = 0) => {
    if (delay > 0) {
      setTimeout(() => {
        try {
          ScrollTrigger.refresh();
        } catch (e) {
          // Ignora erros
        }
      }, delay);
    } else {
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // Ignora erros
      }
    }
  };

  return {
    createAnimation,
    createScrollTrigger,
    refreshScrollTrigger,
    cleanup,
  };
}
