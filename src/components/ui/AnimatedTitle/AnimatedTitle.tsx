'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AnimatedTitle.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedTitleProps {
  text: string;
  className?: string;
  finalColor?: string;
  baseColor?: string;
  accentColor?: string;
  letterDuration?: number;
  scrollSensitivity?: number;
}

export default function AnimatedTitle({ 
  text, 
  className = '',
  finalColor = '#05213a',
  baseColor = '#dddddd',
  accentColor = '#d0ab76',
  letterDuration = 0.3,
  scrollSensitivity = 0.5 // Quanto menor, mais sensível
}: AnimatedTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady || !containerRef.current) return;

    const letters = lettersRef.current.filter(Boolean);
    if (letters.length === 0) return;

    // Configurar estado inicial
    gsap.set(letters, { color: baseColor });

    // Criar timeline mestre com scrub mais sensível
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%', // Ajustado para melhor sincronização com parágrafo
        end: 'top 20%',   // Ajustado para melhor sincronização com parágrafo
        scrub: scrollSensitivity, // Quanto menor, mais sensível
        toggleActions: "play none reverse none",
      }
    });

    // Animação letra a letra com transição rápida
    letters.forEach((letter, index) => {
      const letterTl = gsap.timeline();
      
      // Animação individual muito rápida com pico no dourado
      letterTl
        // Transição muito rápida para o dourado
        .to(letter, {
          color: accentColor,
          duration: letterDuration * 0.2, // 20% do tempo no dourado
          ease: "power1.inOut"
        })
        // Transição rápida para a cor final
        .to(letter, {
          color: finalColor,
          duration: letterDuration * 0.8, // 80% do tempo na transição final
          ease: "power1.out"
        });

      // Adicionar à timeline principal com delay progressivo
      // Quanto menor o multiplier, mais próximas as animações
      masterTl.add(letterTl, index * (letterDuration * 0.8));
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, isReady, finalColor, baseColor, accentColor, letterDuration, scrollSensitivity]);

  const addLetterRef = (el: HTMLSpanElement | null, index: number) => {
    lettersRef.current[index] = el;
  };

  return (
    <div 
      ref={containerRef} 
      className={`${styles.titleContainer} ${className}`}
    >
      <h2 className={styles.title}>
        {text.split('').map((letter, index) => (
          <span
            key={index}
            ref={el => addLetterRef(el, index)}
            className={styles.letter}
            style={{ color: baseColor }}
          > 
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h2>
    </div>
  );
}