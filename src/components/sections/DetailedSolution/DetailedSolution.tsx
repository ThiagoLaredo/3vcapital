'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useFadeIn } from '@/hooks/useFadeIn';
import styles from './DetailedSolution.module.css';

interface Solution {
  id: number;
  title: string;
  items: string[];
}

interface DetailedSolutionProps {
  solution: Solution;
  index: number;
  reverse?: boolean;
  image?: string;
}

export default function DetailedSolution({ 
  solution, 
  index, 
  reverse = false,
  image = '/images/solucoes/default.jpg'
}: DetailedSolutionProps) {
  const sectionRef = useRef(null);
  const animationRef = useFadeIn({ delay: 0.2, y: 30 });

  // Formata o número para ter dois dígitos (01, 02, etc.)
  const formattedNumber = index.toString().padStart(2, '0');

  return (
    <div 
      ref={sectionRef} 
      className={`${styles.solutionSection} ${reverse ? styles.reverse : ''}`}
    >
      {/* Coluna da Imagem */}
      <div ref={animationRef} className={styles.imageColumn}>
        <div className={styles.imageContainer}>
          {/* Removido o numberBadge daqui */}
          <div className={styles.imageWrapper}>
            <Image
              src={image}
              alt={solution.title}
              width={600}
              height={400}
              className={styles.image}
              priority={index === 1}
            />
          </div>
        </div>
      </div>

      {/* Coluna do Conteúdo */}
      <div className={styles.contentColumn}>
        {/* Número no formato .01 acima do título */}
        <div className={styles.solutionNumber}>.{formattedNumber}</div>
        
        <h3 className={styles.solutionTitle}>{solution.title}</h3>
        
        {solution.items && solution.items.length > 0 && (
          <ul className={styles.solutionList}>
            {solution.items.map((item, itemIndex) => (
              <li key={itemIndex} className={styles.solutionItem}>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}