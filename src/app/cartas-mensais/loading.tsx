// app/cartas-mensais/loading.tsx
import styles from './CartasMensaisPage.module.css';

export default function Loading() {
  return (
    <div className={styles.cartasMensaisPage}>
      {/* Skeleton para o PageHeader */}
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonBreadcrumb}></div>
        <div className={styles.skeletonTitle}></div>
      </div>

      {/* Skeleton para Introduction */}
      <section className={styles.introduction}>
        <div className={styles.container}>
          <div className={styles.introContent}>
            <div className={styles.skeletonIntroTitle}></div>
            <div className={styles.skeletonIntroSubtitle}></div>
            
            {/* Skeleton Stats */}
            <div className={styles.statsGrid}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.statItem}>
                  <div className={styles.skeletonStatNumber}></div>
                  <div className={styles.skeletonStatLabel}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skeleton para Filtros */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersGrid}>
            <div className={styles.skeletonSearch}></div>
            <div className={styles.skeletonYearSelect}></div>
            <div className={styles.skeletonViewToggle}>
              <div className={styles.skeletonViewButton}></div>
              <div className={styles.skeletonViewButton}></div>
              <div className={styles.skeletonViewButton}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skeleton para Cartas */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <div className={styles.skeletonResultsHeader}></div>
          
          <div className={styles.lettersGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.skeletonLetterCard}>
                <div className={styles.skeletonCardHeader}>
                  <div className={styles.skeletonCardMonth}></div>
                  <div className={styles.skeletonMilestone}></div>
                </div>
                <div className={styles.skeletonCardTitle}></div>
                <div className={styles.skeletonCardDescription}></div>
                <div className={styles.skeletonHighlights}>
                  <div className={styles.skeletonHighlight}></div>
                  <div className={styles.skeletonHighlight}></div>
                </div>
                <div className={styles.skeletonTags}></div>
                <div className={styles.skeletonActions}></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}