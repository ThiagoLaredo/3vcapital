'use client';

import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import { FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import LeafletMap from '../Map/LeafletMap';
import styles from './Footer.module.css';

const LINKEDIN_URL = 'https://br.linkedin.com/company/3vcapital';
const EMAIL = 'contato@3vcapital.com.br';
const WHATSAPP_NUMBER = '5511985479699';
const ADDRESS = 'R. Padre João Manuel, 923 – Conj. 92\nSão Paulo – SP – 01411-901';

export default function Footer() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Linha principal: Logo | Contato | Mapa */}
        <div className={styles.mainRow}>
          <div className={styles.blockLogo}>
            <Image
              src="/logo-3v-Capital-branco.png"
              alt="3V Capital"
              width={140}
              height={56}
              className={styles.logo}
            />
            <p className={styles.tagline}>
              {language === 'pt'
                ? 'Gestão de patrimônio independente'
                : 'Independent wealth management'}
            </p>
          </div>

          <div className={styles.blockContact}>
            <h3 className={styles.blockTitle}>{translations.Footer.contact}</h3>
            <a href={`mailto:${EMAIL}`} className={styles.link}>
              {EMAIL}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              +55 11 98547-9699
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedin}
            >
              <FaLinkedin className={styles.linkedinIcon} />
              LinkedIn
            </a>
          </div>

          <div className={styles.blockMap}>
            <h3 className={styles.blockTitle}>{translations.Footer.address}</h3>
            <p className={styles.addressText}>{ADDRESS.replace('\n', ' · ')}</p>
            <div className={styles.mapWrap}>
              <LeafletMap />
            </div>
          </div>
        </div>

        {/* Selos */}
        <div className={styles.selos}>
          <Image
            src="/images/selos/gestao-de-recursos.svg"
            alt="Gestão de Recursos"
            width={160}
            height={100}
            className={styles.selo}
          />
          <Image
            src="/images/selos/gestao-de-patrimonio.svg"
            alt="Gestão de Patrimônio"
            width={160}
            height={100}
            className={styles.selo}
          />
        </div>

        {/* Copyright */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} {translations.Footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
