'use client';

import { FormEvent, useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { pt, en } from '../../../lib/translations';
import { FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import LeafletMap from '../Map/LeafletMap';
import styles from './Footer.module.css';

const LINKEDIN_URL = 'https://br.linkedin.com/company/3vcapital';
const EMAIL = 'contato@3vcapital.com.br';
const WHATSAPP_NUMBER = '5511985479699';
const ADDRESS = 'Rua Padre João Manuel, nº 1212, conjuntos 92 e 93\nCerqueira César, CEP 01411-000';
const NEWSLETTER_FORM_NAME = 'newsletter-footer';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

function encodeFormData(data: Record<string, string>) {
  return new URLSearchParams(data).toString();
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

function formatBrazilianPhone(localDigits: string) {
  if (!localDigits) return '';

  const area = localDigits.slice(0, 2);
  const body = localDigits.slice(2);

  if (localDigits.length <= 2) return `(${area}`;
  if (localDigits.length <= 6) return `(${area}) ${body}`;
  if (localDigits.length <= 10) return `(${area}) ${body.slice(0, 4)}-${body.slice(4)}`;
  return `(${area}) ${body.slice(0, 5)}-${body.slice(5, 9)}`;
}

function formatWhatsappInput(rawValue: string, isPt: boolean) {
  const digits = onlyDigits(rawValue).slice(0, 13);
  const hasCountryCode = digits.startsWith('55') && digits.length > 11;
  const localDigits = (hasCountryCode ? digits.slice(2) : digits).slice(0, 11);
  const formattedLocal = formatBrazilianPhone(localDigits);

  if (isPt) {
    return { formatted: formattedLocal, digits };
  }

  return {
    formatted: localDigits ? `+55 ${formattedLocal}` : '',
    digits: hasCountryCode ? digits : `55${localDigits}`,
  };
}

export default function Footer() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
  const [whatsappInput, setWhatsappInput] = useState('');

  const isPt = language === 'pt';

  const statusMessage =
    submitStatus === 'success'
      ? isPt
        ? 'Cadastro realizado com sucesso! Você receberá nossas novidades e cartas mensais.'
        : 'Subscription successful! You will receive our updates and monthly letters.'
      : submitStatus === 'error'
        ? isPt
          ? 'Não foi possível enviar no momento. Tente novamente em instantes.'
          : 'We could not submit your request right now. Please try again shortly.'
        : '';

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const whatsappRaw = String(formData.get('whatsapp') || '').trim();
    const whatsappDigits = onlyDigits(whatsappRaw);
    const localWhatsappDigits = whatsappDigits.startsWith('55')
      ? whatsappDigits.slice(2)
      : whatsappDigits;

    if (!name || !email || !whatsappRaw || localWhatsappDigits.length < 10) {
      setSubmitStatus('error');
      return;
    }

    setSubmitStatus('loading');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeFormData({
          'form-name': NEWSLETTER_FORM_NAME,
          'bot-field': String(formData.get('bot-field') || ''),
          name,
          email,
          whatsapp: whatsappDigits,
        }),
      });

      if (!response.ok) {
        throw new Error('Newsletter submit failed');
      }

      setSubmitStatus('success');
      form.reset();
      setWhatsappInput('');
    } catch {
      setSubmitStatus('error');
    }
  }

  function handleWhatsappChange(value: string) {
    const { formatted } = formatWhatsappInput(value, isPt);
    setWhatsappInput(formatted);

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.newsletterCard}>
          <div className={styles.newsletterHeader}>
            <p className={styles.newsletterEyebrow}>
              {language === 'pt' ? 'Newsletter 3V Capital' : '3V Capital Newsletter'}
            </p>
            <h3 className={styles.newsletterTitle}>
              {language === 'pt'
                ? 'Receba insights exclusivos e nossas cartas mensais'
                : 'Get exclusive insights and our monthly letters'}
            </h3>
            <p className={styles.newsletterSubtitle}>
              {language === 'pt'
                ? 'Cadastre-se e receba conteúdos relevantes no seu e-mail e WhatsApp.'
                : 'Sign up to receive relevant content by email and WhatsApp.'}
            </p>
          </div>

          <form
            name={NEWSLETTER_FORM_NAME}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className={styles.newsletterForm}
            onSubmit={handleNewsletterSubmit}
          >
            <input type="hidden" name="form-name" value={NEWSLETTER_FORM_NAME} />
            <p className={styles.hiddenField}>
              <label>
                Do not fill this field if you are human: <input name="bot-field" />
              </label>
            </p>

            <label className={styles.field}>
              <span>{language === 'pt' ? 'Nome' : 'Name'}</span>
              <input
                type="text"
                name="name"
                required
                placeholder={language === 'pt' ? 'Seu nome' : 'Your name'}
              />
            </label>

            <label className={styles.field}>
              <span>E-mail</span>
              <input
                type="email"
                name="email"
                required
                placeholder={language === 'pt' ? 'voce@exemplo.com' : 'you@example.com'}
              />
            </label>

            <label className={styles.field}>
              <span>WhatsApp</span>
              <input
                type="tel"
                name="whatsapp"
                required
                inputMode="tel"
                autoComplete="tel"
                value={whatsappInput}
                onChange={(event) => handleWhatsappChange(event.target.value)}
                placeholder={language === 'pt' ? '(11) 99999-9999' : '+55 11 99999-9999'}
              />
            </label>

            <button
              type="submit"
              className={styles.newsletterButton}
              disabled={submitStatus === 'loading'}
            >
              {submitStatus === 'loading'
                ? isPt
                  ? 'Enviando...'
                  : 'Sending...'
                : language === 'pt'
                  ? 'Quero receber'
                  : 'Subscribe'}
            </button>
          </form>
        </div>

        {submitStatus !== 'idle' && (
          <p
            className={`${styles.newsletterStatus} ${
              submitStatus === 'success' ? styles.statusSuccess : styles.statusError
            }`}
            role="status"
            aria-live="polite"
          >
            {statusMessage}
          </p>
        )}

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
              <LeafletMap zoom={17} />
            </div>
            <div className={styles.officeImageWrap}>
              <Image
                src="/fachada-escritorio.jpg"
                alt={language === 'pt' ? 'Escritório 3V Capital - São Paulo' : '3V Capital office - São Paulo'}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.officeImage}
                priority
              />
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.selos}>
            <Image
              src="/images/selos/Selo-Anbima-Gestao-de-Recursos.svg"
              alt="Selo Anbima Gestão de Recursos"
              width={160}
              height={100}
              className={styles.selo}
            />
            <Image
              src="/images/selos/Selo-Anbima-Gestao-de-Patrimonios.svg"
              alt="Selo Anbima Gestão de Patrimônios"
              width={160}
              height={100}
              className={styles.selo}
            />
          </div>

          <p className={styles.copyright}>
            © {new Date().getFullYear()} {translations.Footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
