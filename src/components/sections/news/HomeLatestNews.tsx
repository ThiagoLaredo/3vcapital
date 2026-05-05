'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import { getNews } from '@/lib/news-data';
import styles from './HomeLatestNews.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeLatestNews() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const latestNews = getNews().slice(0, 3);
  const dict = translations.Home?.mediaLatest;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>('article');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, grid);

    return () => ctx.revert();
  }, []);

  if (latestNews.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <span className={styles.sectionLabel}>
              {dict?.label || (language === 'pt' ? 'Na Mídia' : 'In the Media')}
            </span>
            <h2 className={styles.sectionTitle}>
              {dict?.title || (language === 'pt' ? 'Últimas publicações' : 'Latest publications')}
            </h2>
          </div>
          <Link href="/noticias" className={styles.viewAllLink}>
            {dict?.viewAll || (language === 'pt' ? 'Ver todas' : 'View all')}
          </Link>
        </header>

        <div ref={gridRef} className={styles.grid}>
          {latestNews.map((item) => (
            <article key={item.id} className={styles.card}>
              <Link href={`/noticias/${item.slug}`} className={styles.cardLink}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={90}
                    sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1024px) calc(52vw - 2rem), 190px"
                    className={styles.image}
                  />
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <Link href="/noticias" className={`${styles.viewAllLink} ${styles.viewAllLinkMobile}`}>
          {dict?.viewAll || (language === 'pt' ? 'Ver todas' : 'View all')}
        </Link>
      </div>
    </section>
  );
}