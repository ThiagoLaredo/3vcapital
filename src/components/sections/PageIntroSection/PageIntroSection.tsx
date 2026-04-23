'use client';

import { useRef, useState, useEffect } from 'react';
import AnimatedPhrase from '@/components/ui/AnimatedPhrase/AnimatedPhrase';
import { useFadeIn } from '@/hooks/useFadeIn';
import styles from './PageIntroSection.module.css';

interface PageIntroSectionProps {
  title: string;
  fullText: string;
  phraseToAnimate?: string;
  className?: string;
}

export default function PageIntroSection({
  title,
  fullText,
  phraseToAnimate = '',
  className = '',
}: PageIntroSectionProps) {
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useFadeIn<HTMLDivElement>({ delay: 0.3, y: 30 });

  useEffect(() => {
    setAnimationKey((k) => k + 1);
  }, [title, fullText, phraseToAnimate]);

  const idx = phraseToAnimate ? fullText.indexOf(phraseToAnimate) : -1;
  const textBefore = idx >= 0 ? fullText.slice(0, idx) : fullText;
  const textAfter = idx >= 0 ? fullText.slice(idx + phraseToAnimate.length) : '';

  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')} ref={sectionRef}>
      <div className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          <h1 className={styles.label}>{title}</h1>
          <p className={styles.statement}>
            {textBefore}
            {phraseToAnimate ? (
              <AnimatedPhrase
                phrase={phraseToAnimate}
                triggerRef={sectionRef}
                className={styles.animatedPhrase}
                triggerStart="top 25%"
                animationKey={animationKey}
                finalColor="var(--primary-color-dark)"
              />
            ) : null}
            {textAfter}
          </p>
        </div>
      </div>
    </section>
  );
}
