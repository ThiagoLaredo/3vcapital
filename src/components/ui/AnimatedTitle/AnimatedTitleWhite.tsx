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
}

export default function AnimatedTitleWhite({  
    text, 
  className = '',
  finalColor = '#fff'
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
    gsap.set(letters, { color: '#ffffff0d' });

    // Criar timeline mestre
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'top 15%',
        scrub: true,
        toggleActions: "play none reverse none",
      }
    });

    // Adicionar animações sequenciais
    letters.forEach((letter, index) => {
      const letterTl = gsap.timeline();
      
      // Animação individual da letra
      letterTl
        .to(letter, {
          color: '#d0ab76',
          duration: 0.9,
          ease: "power1.in"
        })
        .to(letter, {
          color: finalColor,
          duration: 0.5,
          ease: "power2.out"
        });

      // Adicionar à timeline mestre de forma sequencial
      masterTl.add(letterTl, index === 0 ? 0 : '>'); // '>' significa após o término do anterior
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [text, isReady, finalColor]);

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
            style={{ color: '#000' }}
          > 
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </h2>
    </div>
  );
}