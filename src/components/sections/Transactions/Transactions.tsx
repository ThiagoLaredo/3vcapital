'use client';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import { useScrollTriggerReset } from '../../../hooks/useScrollTriggerReset';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Transactions.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Função auxiliar para parse de números
const parseAnimatedValue = (value: string) => {
  const match = value.match(/(\d+)/);
  if (match) {
    return {
      prefix: value.split(match[0])[0],
      number: parseInt(match[0]),
      suffix: value.split(match[0])[1] || ''
    };
  }
  
  return {
    prefix: value,
    number: 0,
    suffix: ''
  };
};

export default function Transactions() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimatedRef = useRef<boolean[]>([]); // Para controlar quais já animaram
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Hook para resetar ScrollTrigger ao navegar e ao mudar de idioma
  useScrollTriggerReset(language);

  // Reset do controle de animação quando a linguagem mudar
  useEffect(() => {
    hasAnimatedRef.current = [];
  }, [language]);

  // Cleanup: reverte contextos e mata triggers
  const cleanupAnimations = () => {
    if (ctxRef.current) {
      ctxRef.current.revert();
      ctxRef.current = null;
    }
    triggersRef.current.forEach(trigger => {
      try {
        trigger.kill();
      } catch (e) {
        // Ignora erros
      }
    });
    triggersRef.current = [];
  };
  // Animação de entrada da seção e título (defer no rAF para evitar SecurityError com iframes cross-origin)
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout> | undefined;
    let t2: ReturnType<typeof setTimeout> | undefined;
    const rafId = requestAnimationFrame(() => {
      const scope = sectionRef.current;
      const titleEl = titleRef.current;
      if (!scope || !titleEl || !scope.isConnected) return;

      try {
        ctxRef.current = gsap.context(() => {
          gsap.fromTo(titleEl,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: titleEl,
                start: "top 80%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
          gsap.fromTo(`.${styles.card}`,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              scrollTrigger: {
                trigger: `.${styles.cards}`,
                start: "top 70%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
        }, scope);
        // Recalcula posições após navegação client-side (layout pode não estar estável no mount)
        t1 = setTimeout(() => { 
          try { 
            ScrollTrigger.refresh(); 
          } catch {} 
        }, 100);
        t2 = setTimeout(() => { 
          try { 
            ScrollTrigger.refresh(); 
          } catch {} 
        }, 400);
      } catch {
        // Ignora SecurityError ao acessar frame cross-origin (ex.: página com iframe de mapa)
      }
    });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      // Não reverte aqui, o cleanup será feito ao desmontar
    };
  }, [pathname]);

  // Animação automática dos números (rAF + try/catch para evitar SecurityError com iframe cross-origin)
  useEffect(() => {
    const finalValues = translations.Home.transactions.items.map(item => {
      const processedValue = item.value.replace('Mais de', '+').replace('More than', '+');
      const parsed = parseAnimatedValue(processedValue);
      return { processedValue, parsed };
    });

    if (hasAnimatedRef.current.length === 0) {
      hasAnimatedRef.current = new Array(finalValues.length).fill(false);
    }

    let rafId: number;
    rafId = requestAnimationFrame(() => {
      try {
        numberRefs.current.forEach((element, index) => {
          if (!element || !element.isConnected) return;
          const { processedValue, parsed } = finalValues[index];
          if (parsed.number <= 0) return;
          element.innerText = parsed.prefix + '0' + parsed.suffix;
            const trigger = ScrollTrigger.create({
            trigger: element,
            start: "top 90%",
            end: "bottom 60%",
            onEnter: () => {
              if (!hasAnimatedRef.current[index]) {
                gsap.fromTo(element,
                  { innerText: 0 },
                  {
                    innerText: parsed.number,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function() {
                      const currentValue = Math.floor(this.targets()[0].innerText);
                      element.innerText = parsed.prefix + currentValue.toLocaleString() + parsed.suffix;
                    },
                    onComplete: function() {
                      element.innerText = processedValue;
                      hasAnimatedRef.current[index] = true;
                    }
                  }
                );
              }
            },
            onEnterBack: () => {},
            onLeave: () => {
              hasAnimatedRef.current[index] = false;
            },
            onLeaveBack: () => {
              hasAnimatedRef.current[index] = false;
              }
            });
            if (trigger) {
              triggersRef.current.push(trigger);
            }
        });
      } catch (err) {
      }
    });

      return () => {
        cancelAnimationFrame(rafId);
        // Triggers serão limpados em cleanupAnimations()
      };
  }, [language, translations]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      cleanupAnimations();
    };
  }, []);
  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    numberRefs.current[index] = el;
  };

  const processedItems = translations.Home.transactions.items.map(item => ({
    ...item,
    value: item.value.replace('Mais de', '+').replace('More than', '+')
  }));

  return (
    <section ref={sectionRef} className={styles.transactions}>
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.title}>
          {translations.Home.transactions.title}
        </h2>
        <div className={styles.cards}>
          {processedItems.map((item, index) => (
            <div key={index} className={styles.card}>
              <div 
                ref={el => addToRefs(el, index)}
                className={styles.value}
              >
                {item.value}
              </div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}