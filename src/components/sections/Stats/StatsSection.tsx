'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './StatsSection.module.css';

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

interface StatsItem {
  value: string;
  label: string;
}

interface StatsSectionProps {
  stats: {
    projects: string;
    projectsLabel: string;
    funding: string;
    fundingLabel: string;
    satisfaction: string;
    satisfactionLabel: string;
    sectors: string;
    sectorsLabel: string;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasAnimatedRef = useRef<boolean[]>([]);

  // Reset do controle de animação quando os stats mudarem
  useEffect(() => {
    hasAnimatedRef.current = [];
  }, [stats]);

  // Animação de entrada da seção e título
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        }
      );

      // Animação dos cards
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
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animação automática dos números
  useEffect(() => {
    const statsItems: StatsItem[] = [
      { value: stats.projects, label: stats.projectsLabel },
      { value: stats.funding, label: stats.fundingLabel },
      { value: stats.satisfaction, label: stats.satisfactionLabel },
      { value: stats.sectors, label: stats.sectorsLabel }
    ];

    const finalValues = statsItems.map(item => {
      const processedValue = item.value;
      const parsed = parseAnimatedValue(processedValue);
      return { processedValue, parsed };
    });
    
    if (hasAnimatedRef.current.length === 0) {
      hasAnimatedRef.current = new Array(finalValues.length).fill(false);
    }
    
    numberRefs.current.forEach((element, index) => {
      if (!element) return;

      const { processedValue, parsed } = finalValues[index];
      
      if (parsed.number > 0) {
        element.innerText = parsed.prefix + '0' + parsed.suffix;

        ScrollTrigger.create({
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
          onEnterBack: () => {
            // Não faz nada no scroll up
          },
          onLeave: () => {
            hasAnimatedRef.current[index] = false;
          },
          onLeaveBack: () => {
            hasAnimatedRef.current[index] = false;
          }
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [stats]);

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    numberRefs.current[index] = el;
  };

  const statsItems: StatsItem[] = [
    { value: stats.projects, label: stats.projectsLabel },
    { value: stats.funding, label: stats.fundingLabel },
    { value: stats.satisfaction, label: stats.satisfactionLabel },
    { value: stats.sectors, label: stats.sectorsLabel }
  ];

  return (
    <section ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        <h2 ref={titleRef} className={styles.title}>
          Nossos Números
        </h2>
        <div className={styles.cards}>
          {statsItems.map((item, index) => (
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