'use client';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import { SOLUTION_STEP_IMAGES } from '../../../lib/solutionImages';
import { useEffect, useRef, useState } from 'react';
import { useFadeIn } from '../../../hooks/useFadeIn';
import Image from 'next/image';
import styles from './Diferenciais.module.css';

const SOLUTION_MEDIA_RATIO = 3 / 2;
const SOLUTION_IMAGE_SIZES = '(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 50vw';

export default function Solutions() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const solutions = translations.Home.solutions.items;
  const totalSteps = Math.max(solutions.length, 1);
  const solutionImages = solutions.map((_, index) =>
    SOLUTION_STEP_IMAGES[index % SOLUTION_STEP_IMAGES.length]
  );
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyBottom, setStickyBottom] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);
  const [fixedPosition, setFixedPosition] = useState({ top: 0, width: 0, height: 0, visible: false });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const labelRef = useFadeIn<HTMLSpanElement>({ y: 16, duration: 0.7, delay: 0.1 });
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stepsColumnRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const stickyColumnRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname(); // <-- obtenha o pathname aqui

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !animationRef.current || !stickyColumnRef.current || !stepsColumnRef.current) return;

      const section = sectionRef.current;
      const stickyColumn = stickyColumnRef.current;
      const stepsColumn = stepsColumnRef.current;
      const animation = animationRef.current;
      const sectionRect = section.getBoundingClientRect();
      const columnRect = stickyColumn.getBoundingClientRect();
      const stepsRect = stepsColumn.getBoundingClientRect();
      const wrapperRect = animation.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;
      const desktopEntryOffset = 100;
      const entryOffset = isMobile ? 140 : desktopEntryOffset;

      setIsMobileLayout(isMobile);

      const carouselWidth = isMobile
        ? Math.max(Math.min(columnRect.width || 500, 500), 280)
        : Math.max(
            Math.min(
              columnRect.width || window.innerWidth * 0.35,
              window.innerWidth * 0.35,
              600
            ),
            320
          );
      const carouselHeight = carouselWidth / SOLUTION_MEDIA_RATIO;
      const top = isMobile ? 100 : 0;

      // Section considered started - mobile uses wrapper position, desktop uses steps position
      const sectionStarted = isMobile ? wrapperRect.top < windowHeight : stepsRect.top < windowHeight;
      const sectionAtTop = sectionRect.top <= entryOffset && sectionRect.bottom > entryOffset;

      // Atualiza o step ativo (quando centro do step cruza 50% da viewport)
      let newActiveStep = 0;
      const triggerLine = windowHeight * 0.8;
      solutions.forEach((_, index) => {
        const step = stepsRef.current[index];
        if (step) {
          const stepRect = step.getBoundingClientRect();
          const stepCenter = stepRect.top + stepRect.height / 2;
          if (stepCenter < triggerLine) {
            newActiveStep = index;
          }
        }
      });
      setActiveStep(sectionStarted ? Math.min(newActiveStep, totalSteps - 1) : -1);

      // Progresso: 0% antes da section e distribuição proporcional pelo total de steps.
      const scrollProgress = sectionStarted ? (newActiveStep + 1) / totalSteps : 0;
      setProgress(scrollProgress);

      // Solta apenas quando a própria section estiver chegando ao fim.
      const desktopReleaseOffset = -50;
      const releaseOffset = isMobile ? 190 : desktopReleaseOffset;
      const shouldRelease = sectionRect.bottom <= windowHeight - releaseOffset;

      setIsSticky(sectionAtTop && !shouldRelease);
      setStickyBottom(sectionAtTop && shouldRelease);

      // Trigger the block entrance when the sticky area itself starts showing on screen.
      const visible = sectionAtTop && (isMobile ? !shouldRelease : sectionRect.bottom > 0);

      setFixedPosition({
        top,
        width: carouselWidth,
        height: carouselHeight,
        visible
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    // Recalcula após navegação client-side (layout pode não estar estável no mount)
    const t1 = setTimeout(handleScroll, 100);
    const t2 = setTimeout(handleScroll, 400);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, totalSteps, solutions]);
  const galleryMotionClass = isMobileLayout
    ? (stickyBottom ? styles.motionExiting : styles.motionVisible)
    : !fixedPosition.visible
      ? styles.motionHidden
      : stickyBottom
        ? styles.motionExiting
        : styles.motionVisible;

  return (
    <section id="nossos-diferenciais" ref={sectionRef} className={styles.solutions}>
      <svg className={styles.maskDefs} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="diferenciaisMask" clipPathUnits="objectBoundingBox">
            <path d="M0.7,0 H1 V1 H0.1 C-0.1,0.7 0.35,0.15 0.7,0 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className={styles.container}>
        <header ref={headerRef} className={styles.header}>
          <span ref={labelRef} className={styles.sectionLabel}>
            {language === 'pt' ? 'Nossos Diferenciais' : 'Our Differentiators'}
          </span>
          {/* <h2 className={styles.sectionTitle}>
            {language === 'pt' ? 'Como trabalhamos' : 'How we work'}
          </h2> */}
        </header>

        {/* Mobile: animation wrapper in flow */}
        {isMobileLayout && (
          <div
            ref={animationRef}
            className={`${styles.animationWrapper} ${styles.mobileInFlow}`}
          >
            <div className={`${styles.animationMotion} ${galleryMotionClass}`}>
              <div className={styles.animationContainer}>
                <div className={styles.animationCanvas}>
                  {solutionImages.map((src, index) => (
                    <div
                      key={index}
                      className={`${styles.stepImageWrapper} ${activeStep === index ? styles.stepImageActive : ''}`}
                    >
                      <Image
                        src={src}
                        alt={solutions[index]?.title || ''}
                        fill
                        sizes={SOLUTION_IMAGE_SIZES}
                        quality={100}
                        className={styles.stepImage}
                      />
                    </div>
                  ))}

                  <div className={styles.progressRing}>
                    <svg viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" className={styles.ringBg} />
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        className={styles.ringProgress}
                        style={{ strokeDasharray: `${progress * 339} 339` }}
                      />
                    </svg>
                    <div className={styles.progressText}>
                      <span className={styles.progressNumber}>{Math.round(progress * 100)}</span>
                      <span className={styles.progressPercent}>%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.splitLayout}>
          {/* Left Side - Steps Content */}
          <div ref={stepsColumnRef} className={styles.stepsColumn}>
            <div className={styles.stepsWrapper}>
              <div className={styles.progressTrack}>
                <div
                  className={styles.progressLine}
                  style={{ height: `${Math.min(progress * 100, 100)}%` }}
                />
              </div>

              <div className={styles.stepsContainer}>
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    ref={(el) => { stepsRef.current[index] = el; }}
                    className={`${styles.step} ${activeStep >= index ? styles.active : ''}`}
                  >
                    <div className={styles.stepIndicator}>
                      <div className={styles.stepNumber}>
                        <span className={styles.numberText}>{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <div className={`${styles.stepDot} ${activeStep >= index ? styles.activeDot : ''}`} />
                    </div>

                    <div className={styles.stepContent}>
                      <h3 className={styles.stepTitle}>{solution.title}</h3>
                      <p className={styles.stepDescription}>{solution.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Spacer + Carrossel fixo (desktop only) */}
          <div ref={stickyColumnRef} className={styles.stickyColumn}>
            <div className={styles.carouselSpacer} aria-hidden />
            {!isMobileLayout && (
              <div
                ref={animationRef}
                className={`${styles.animationWrapper} ${stickyBottom ? styles.bottom : ''} ${isSticky ? styles.sticking : ''}`}
                style={{
                  width: fixedPosition.width,
                  height: fixedPosition.height,
                  ...(stickyBottom ? {} : isSticky ? { bottom: 0 } : {}),
                }}
              >
                <div className={`${styles.animationMotion} ${galleryMotionClass}`}>
                  <div className={styles.animationContainer}>
                    <div className={styles.animationCanvas}>
                      {solutionImages.map((src, index) => (
                        <div
                          key={index}
                          className={`${styles.stepImageWrapper} ${activeStep === index ? styles.stepImageActive : ''}`}
                        >
                          <Image
                            src={src}
                            alt={solutions[index]?.title || ''}
                            fill
                            sizes={SOLUTION_IMAGE_SIZES}
                            quality={100}
                            className={styles.stepImage}
                          />
                        </div>
                      ))}

                      <div className={styles.progressRing}>
                        <svg viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="54" className={styles.ringBg} />
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            className={styles.ringProgress}
                            style={{ strokeDasharray: `${progress * 339} 339` }}
                          />
                        </svg>
                        <div className={styles.progressText}>
                          <span className={styles.progressNumber}>{Math.round(progress * 100)}</span>
                          <span className={styles.progressPercent}>%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
