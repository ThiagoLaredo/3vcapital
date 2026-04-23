'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaLinkedin, FaEnvelope, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styles from './TeamCard.module.css';

interface TeamCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    photo: string;
    companies: string[];
    shortBio: string;
    fullBio: string;
    linkedin?: string;
    email?: string;
  };
  translations: {
    knowMore: string;
    showLess: string;
  };
}

export default function TeamCard({ member, translations }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imgError, setImgError] = useState(false); // Adicionado para fallback

  const toggleBio = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.teamCard}>
      {/* Container da imagem */}
      <div className={styles.cardImage}>
        <Image
          src={imgError ? '/images/team-placeholder.jpg' : member.photo}
          alt={member.name}
          width={960}
          height={960}
          className={styles.photo}
          priority={member.id === 'murilo'} // Mantenha isso
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          quality={85}
          loading={member.id === 'murilo' ? 'eager' : 'lazy'}
          onError={() => setImgError(true)} // Fallback se imagem falhar
        />
      </div>

      {/* Resto do seu código EXATAMENTE como estava */}
      <div className={styles.cardContent}>
        <h3 className={styles.memberName}>{member.name}</h3>
        <p className={styles.memberRole}>{member.role}</p>
        
        {member.companies && member.companies.length > 0 && (
          <div className={styles.companies}>
            {member.companies.slice(0, 3).map((company, index) => (
              <div key={index} className={styles.companyLogo}>
                <Image
                  src={company}
                  alt={`Empresa ${index + 1}`}
                  width={40}
                  height={20}
                  className={styles.companyImage}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <div className={styles.bio}>
          <p className={styles.shortBio}>{member.shortBio}</p>
          {isExpanded && (
            <div className={styles.fullBio}>
              {member.fullBio.split('\n').map((paragraph, index) => (
                <p key={index} className={styles.bioParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>

        {(member.linkedin || member.email) && (
          <div className={styles.contactIcons}>
            {member.linkedin && (
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={`LinkedIn de ${member.name}`}
              >
                <FaLinkedin className={styles.icon} />
              </a>
            )}
            {member.email && (
              <a 
                href={`mailto:${member.email}`}
                className={styles.iconLink}
                aria-label={`Enviar email para ${member.name}`}
              >
                <FaEnvelope className={styles.icon} />
              </a>
            )}
          </div>
        )}

        <button 
          className={styles.expandButton} 
          onClick={toggleBio}
          aria-expanded={isExpanded}
        >
          {isExpanded ? translations.showLess : translations.knowMore}
          {isExpanded ? (
            <FaChevronUp className={styles.buttonIcon} />
          ) : (
            <FaChevronDown className={styles.buttonIcon} />
          )}
        </button>
      </div>
    </div>
  );
}