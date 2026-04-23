'use client';

import { useFadeInStagger } from '@/hooks/useFadeInStagger';
// Importando os mesmos ícones da home
import { 
  FaPuzzlePiece,      // Para fa-puzzle
  FaChartPie,         // Para fa-piechart  
  FaChessKnight,       // Para fa-strategy (aproximação)
  FaChartLine         // Para fa-linegraph
} from 'react-icons/fa';
import styles from './SolutionList.module.css';

interface Solution {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface SolutionListProps {
  solutions: Solution[];
}

export default function SolutionList({ solutions }: SolutionListProps) {
  const gridRef = useFadeInStagger({
    delay: 0.2,
    stagger: 0.1,
    y: 20
  });

  // Função para renderizar o ícone baseado no tipo
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'puzzle':
        return <FaPuzzlePiece />;
      case 'piechart':
        return <FaChartPie />;
      case 'strategy':
        return <FaChessKnight />;
      case 'linegraph':
        return <FaChartLine />;
      default:
        return <FaPuzzlePiece />;
    }
  };

  return (
      <div ref={gridRef as React.RefObject<HTMLDivElement>} className={styles.solutionsGrid}>      {solutions.map((solution) => (
        <div key={solution.id} className={styles.solutionCard}>
          <div className={styles.iconContainer}>
            {renderIcon(solution.icon)}
          </div>
          <h3 className={styles.cardTitle}>{solution.title}</h3>
          <p className={styles.cardDescription}>{solution.description}</p>
        </div>
      ))}
    </div>
  );
}