'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { pt, en } from '@/lib/translations';
import { FaPhone, FaEnvelope, FaLinkedin, FaMobileAlt } from 'react-icons/fa';
import styles from './ContatoPage.module.css';

const EMAIL = 'contato@3vcapital.com.br';
const WHATSAPP_NUMBER = '5511985479699';
const LANDLINE_NUMBER = '551135132176';
const LINKEDIN_URL = 'https://br.linkedin.com/company/3vcapital';

export default function ContatoPage() {
  const { language } = useLanguage();
  const translations = language === 'pt' ? pt : en;
  const dict = translations.ContactPage || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setStatusMessage(language === 'pt' ? 'Por favor, preencha nome, e-mail e mensagem.' : 'Please fill in name, email and message.');
      return;
    }

    setStatus('loading');
    setStatusMessage(language === 'pt' ? 'Enviando...' : 'Sending...');

    try {
      const response = await fetch('https://formsubmit.co/ajax/' + EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Nome: formData.name,
          Email: formData.email,
          Telefone: formData.phone || '—',
          Empresa: formData.company || '—',
          Mensagem: formData.message,
          _subject: `3V Capital - ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setStatusMessage(dict.form?.successMessage || (language === 'pt' ? 'Mensagem enviada! Em breve retornaremos.' : 'Message sent! We will get back to you soon.'));
        setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        setTimeout(() => { setStatus('idle'); setStatusMessage(''); }, 5000);
      } else {
        setStatus('error');
        setStatusMessage(dict.form?.errorMessage || (language === 'pt' ? 'Erro ao enviar. Tente novamente.' : 'Error sending. Please try again.'));
      }
    } catch {
      setStatus('error');
      setStatusMessage(dict.form?.errorMessage || (language === 'pt' ? 'Erro de conexão. Tente novamente.' : 'Connection error. Please try again.'));
    }
  };

  return (
    <div className={styles.contatoPage}>
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            {/* Coluna esquerda: foto do escritório */}
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
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

            {/* Coluna direita: informações + formulário */}
            <div className={styles.rightContent}>
              <div className={styles.introContainer}>
                <h2 className={styles.introTitle}>
                  {dict.intro?.title || (language === 'pt' ? 'Entre em contato' : 'Get in touch')}
                </h2>
                <address className={styles.addressBlock}>
                  <p className={styles.addressLine}>Rua Padre João Manuel, nº 1212, conjuntos 92 e 93</p>
                  <p className={styles.addressLine}>Cerqueira César, CEP 01411-000</p>
                </address>
                <ul className={styles.contactList}>
                  <li>
                    <a href={`mailto:${EMAIL}`} className={styles.contactLink}>
                      <FaEnvelope className={styles.contactIcon} />
                      {EMAIL}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      <FaMobileAlt className={styles.contactIcon} />
                      +55 11 98547-9699
                    </a>
                  </li>
                  <li>
                    <a href={`tel:+${LANDLINE_NUMBER}`} className={styles.contactLink}>
                      <FaPhone className={styles.contactIcon} />
                      +55 11 3513-2176
                    </a>
                  </li>
                  <li>
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.contactLink}
                    >
                      <FaLinkedin className={styles.contactIcon} />
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.formContainer}>
                <h3 className={styles.formTitle}>
                  {dict.form?.title || (language === 'pt' ? 'Envie sua mensagem' : 'Send your message')}
                </h3>
                <p className={styles.formDescription}>
                  {dict.form?.description || (language === 'pt' ? 'Preencha o formulário. Em breve retornaremos.' : 'Fill out the form. We will get back to you soon.')}
                </p>

                <form onSubmit={handleSubmit} className={styles.contactForm}>
                  <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${styles.half}`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder={dict.form?.namePlaceholder || 'Nome'}
                        required
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.half}`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder={dict.form?.emailPlaceholder || 'E-mail'}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={`${styles.formGroup} ${styles.half}`}>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder={dict.form?.phonePlaceholder || 'Telefone'}
                      />
                    </div>
                    <div className={`${styles.formGroup} ${styles.half}`}>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={styles.formInput}
                        placeholder={dict.form?.companyPlaceholder || 'Empresa'}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={styles.formTextarea}
                      placeholder={dict.form?.messagePlaceholder || 'Mensagem'}
                      required
                    />
                  </div>

                  {statusMessage && (
                    <div
                      className={`${styles.statusMessage} ${status === 'success' ? styles.success : styles.error}`}
                    >
                      {statusMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (dict.form?.sending || 'Enviando...') : (dict.form?.submit || 'Enviar mensagem')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
