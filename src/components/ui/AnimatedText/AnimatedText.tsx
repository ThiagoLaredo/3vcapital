'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedText.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  finalColor?: string;
  baseColor?: string;
  accentColor?: string;
  scrollSensitivity?: number;
  startDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  letterDelay?: number;
  // Novas props para controle mobile
  mobileStart?: string;
  mobileEnd?: string;
  mobileSensitivity?: number;
}

export default function AnimatedText({ 
  text, 
  className = '',
  finalColor = '#1a335f',
  baseColor = '#dddddd',
  accentColor = '#d0ab76',
  scrollSensitivity = 1.5,
  startDelay = 0,
  as = 'span',
  letterDelay = 0.03,
  // Valores padrão otimizados para mobile
  mobileStart = 'top 80%', // No mobile começa mais cedo (80% vs 90%)
  mobileEnd = 'bottom 60%', // No mobile termina mais tarde
  mobileSensitivity = 1.8 // No mobile mais sensível
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const letterSpansRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    setIsReady(true);
    
    // Detectar se é mobile
    const checkIsMobile = () => window.innerWidth <= 768;
    setIsMobile(checkIsMobile());
    
    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    // Limpar animação anterior
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill();
    }

    // Limpar conteúdo anterior
    containerRef.current.innerHTML = '';
    letterSpansRef.current = [];

    // Dividir o texto em palavras e espaços
    const segments = text.split(/(\s+)/);
    
    segments.forEach((segment, segmentIndex) => {
      if (segment === '') return;
      
      if (segment.match(/\s+/)) {
        // Se for espaço, usar um span normal
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = segment;
        spaceSpan.className = styles.space;
        containerRef.current?.appendChild(spaceSpan);
      } else {
        // Se for palavra, criar um wrapper especial que não quebra
        const wordWrapper = document.createElement('span');
        wordWrapper.className = styles.wordWrapper;
        
        // Adicionar cada letra dentro do wrapper
        for (let i = 0; i < segment.length; i++) {
          const letterSpan = document.createElement('span');
          letterSpan.textContent = segment[i];
          letterSpan.className = styles.letter;
          letterSpan.style.color = baseColor;
          letterSpan.style.transition = 'color 0.1s linear';
          
          wordWrapper.appendChild(letterSpan);
          letterSpansRef.current.push(letterSpan);
        }
        
        // Adicionar um espaço invisível após cada palavra para ajudar na quebra
        if (segmentIndex < segments.length - 1) {
          const breakHelper = document.createElement('wbr');
          wordWrapper.appendChild(breakHelper);
        }
        
        containerRef.current?.appendChild(wordWrapper);
      }
    });

    // Funções para manipulação de cores
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const mixColors = (color1: string, color2: string, weight: number): string => {
      const c1 = hexToRgb(color1);
      const c2 = hexToRgb(color2);
      
      const w = Math.max(0, Math.min(1, weight));
      
      const r = Math.round(c1.r * (1 - w) + c2.r * w);
      const g = Math.round(c1.g * (1 - w) + c2.g * w);
      const b = Math.round(c1.b * (1 - w) + c2.b * w);
      
      return `rgb(${r}, ${g}, ${b})`;
    };

    const getColorForProgress = (progress: number) => {
      if (progress <= 0) return baseColor;
      if (progress >= 1) return finalColor;
      
      if (progress <= 0.3) {
        const mix = progress / 0.3;
        return mixColors(baseColor, accentColor, mix);
      } else {
        const mix = (progress - 0.3) / 0.7;
        return mixColors(accentColor, finalColor, mix);
      }
    };

    // Configurações diferentes para mobile vs desktop
    const startPoint = isMobile ? mobileStart : 'top 90%';
    const endPoint = isMobile ? mobileEnd : 'bottom 40%';
    const sensitivity = isMobile ? mobileSensitivity : scrollSensitivity;
    
    console.log(`📱 AnimatedText config: ${isMobile ? 'Mobile' : 'Desktop'}`);
    console.log(`   Start: ${startPoint}, End: ${endPoint}, Sensitivity: ${sensitivity}`);

    // Criar ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: containerRef.current,
      start: startPoint,
      end: endPoint,
      scrub: sensitivity,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalLetters = letterSpansRef.current.length;
        
        // Ajuste crítico: garantir que todas as letras sejam animadas
        const totalAnimationDuration = 1 + (totalLetters - 1) * letterDelay;
        
        letterSpansRef.current.forEach((span, index) => {
          // Calcular progresso individual baseado no índice
          const letterStart = (index * letterDelay) / totalAnimationDuration;
          
          // Progresso da letra individual (0 a 1) baseado no scroll progress
          let letterProgress = 0;
          if (progress >= letterStart) {
            // A letra começa a animar
            letterProgress = (progress - letterStart) / (1 / totalAnimationDuration);
            letterProgress = Math.min(1, letterProgress);
          }
          
          span.style.color = getColorForProgress(letterProgress);
        });
      },
      onRefresh: () => {
        // Resetar cores
        letterSpansRef.current.forEach(span => {
          span.style.color = baseColor;
        });
      },
      onScrubComplete: () => {
        // Garantir que todas as letras terminem na cor final
        letterSpansRef.current.forEach(span => {
          span.style.color = finalColor;
        });
      }
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, [text, isReady, finalColor, baseColor, accentColor, scrollSensitivity, startDelay, letterDelay, isMobile, mobileStart, mobileEnd, mobileSensitivity]);

  const TextElement = as;

  return (
    <TextElement 
      ref={containerRef} 
      className={`${styles.animatedText} ${className}`}
    />
  );
}