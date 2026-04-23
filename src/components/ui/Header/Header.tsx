'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import styles from './Header.module.css';

const EMAIL = 'contato@3vcapital.com.br';
const PHONE_LABEL = '+55 11 98547-9699';
const PHONE_LINK = 'tel:+5511985479699';
const LINKEDIN_URL = 'https://br.linkedin.com/company/3vcapital';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  
  const translations = language === 'pt' ? pt : en;

  const setScrollLock = (isLocked: boolean) => {
    const overflowValue = isLocked ? 'hidden' : '';
    document.documentElement.style.overflow = overflowValue;
    document.body.style.overflow = overflowValue;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fechar menu ao mudar de rota
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    return () => {
      setScrollLock(false);
    };
  }, []);

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
        setScrollLock(false);
      }, 300);
    }
  };

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setScrollLock(true);
    } else {
      closeMenu();
    }
  };

  // Função para verificar se o path atual corresponde ao link
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navItems = [
    { href: '/o-que-fazemos', label: translations.Navigation.whatWeDo },
    { href: '/sobre-nos', label: translations.Navigation.aboutUs },
    { href: '/equipe', label: translations.Navigation.team },
    { href: '/nossos-valores', label: translations.Navigation.ourValues },
    { href: '/compliance', label: translations.Navigation.compliance },
    { href: '/cartas-mensais', label: translations.Navigation.monthlyLetters },
    { href: '/noticias', label: translations.Navigation.media },
    { href: '/contato', label: translations.Navigation.contact },
  ];

  const handleLanguageChange = (lang: 'pt' | 'en') => {
    setLanguage(lang);
  };

  const isHome = pathname === '/';

  const isNavItemActive = (href: string) => {
    return isActive(href);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''} ${!isHome ? styles.internal : ''} ${isMenuOpen ? styles.menuOpen : ''} ${isAnimating ? styles.menuClosing : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoFullMark}>
              <img
                src="/logo-3v-capital-branco.png"
                alt="3V Capital"
              />
            </span>
            <span className={styles.logoIconBadge}>
              <img
                src="/icon.png"
                alt="3V Capital"
              />
            </span>
          </Link>
          <div className={styles.headerActions}>
            <div className={styles.headerLanguageSelector}>
              <button
                className={`${styles.mobileLangBtn} ${language === 'pt' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('pt')}
                aria-label="Português"
              >
                PT
              </button>
              <button
                className={`${styles.mobileLangBtn} ${language === 'en' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('en')}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <button
              className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay do Menu Mobile */}
      <div 
        className={`${styles.mobileOverlay} ${isMenuOpen ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
        onClick={closeMenu}
      />

      <div 
        id="site-menu"
        ref={menuRef}
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''} ${isAnimating ? styles.closing : ''}`}
      >
        <div className={styles.mobileMenuInner}>
          <nav className={styles.mobileNav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.mobileNavLink} ${isNavItemActive(item.href) ? styles.active : ''}`}
                onClick={closeMenu}
              >
                <span className={styles.navText}>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.mobileContactBlock}>
            <a href={PHONE_LINK} className={styles.mobileContactLink} aria-label={PHONE_LABEL}>
              <FaPhone className={styles.mobileContactIcon} />
              <span className={styles.mobileContactText}>{PHONE_LABEL}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className={styles.mobileContactLink} aria-label={EMAIL}>
              <FaEnvelope className={styles.mobileContactIcon} />
              <span className={styles.mobileContactText}>{EMAIL}</span>
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mobileContactLink}
              aria-label="LinkedIn"
            >
              <FaLinkedin className={styles.mobileContactIcon} />
              <span className={styles.mobileContactText}>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;