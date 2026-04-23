// src/app/equipe/page.tsx
'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import { teamMembers } from '@/lib/team-data';
import PageIntroSection from '@/components/sections/PageIntroSection/PageIntroSection';
import TeamCard from '@/components/sections/TeamCard/TeamCard';
import { useFadeIn } from '@/hooks/useFadeIn';
import styles from './EquipePage.module.css';

function parseSubtitleWithStrong(subtitle: string): { fullText: string; phraseToAnimate: string } {
  const match = subtitle.match(/\*\*(.+?)\*\*/);
  if (!match || !match[1]) return { fullText: subtitle.replace(/\*\*/g, ''), phraseToAnimate: '' };
  return { fullText: subtitle.replace(/\*\*/g, ''), phraseToAnimate: match[1] };
}

export default function EquipePage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.TeamPage;

  const gridRef = useFadeIn<HTMLDivElement>({ delay: 0.5, y: 30 });
  const { fullText, phraseToAnimate } = parseSubtitleWithStrong(dict.intro.subtitle);

  // Função para obter o membro na língua correta
  const getTranslatedMember = (member: typeof teamMembers[0]) => {
    return {
      id: member.id,
      name: member.name[language],
      role: member.role[language],
      photo: member.photo,
      companies: member.companies,
      shortBio: member.shortBio[language],
      fullBio: member.fullBio[language],
      linkedin: member.linkedin,
      email: member.email
    };
  };

  return (
    <div className={styles.equipePage}>
      <PageIntroSection
        title={dict.intro.title}
        fullText={fullText}
        phraseToAnimate={phraseToAnimate}
      />

      {/* Team Grid */}
      <section className={styles.equipeGrid}>
        <div className={styles.container}>
          <div ref={gridRef} className={styles.grid}>
            {teamMembers.map((member) => (
              <TeamCard
                key={member.id}
                member={getTranslatedMember(member)}
                translations={dict.teamCard}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}