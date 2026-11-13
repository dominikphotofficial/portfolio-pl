import { useState } from 'react';
import { CONTACTS_CONTENT, MAIN_LT_DOMAIN } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { SeoHead } from '../components/SeoHead';

export function ContactsPage() {
  useReveal('contacts');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const mailtoUrl = `mailto:${CONTACTS_CONTENT.email}?subject=${encodeURIComponent(
    subject || `Zapytanie z pl.dominikphotofficial.lt — ${name}`
  )}&body=${encodeURIComponent(`Od: ${name} (${email})\n\n${message}`)}`;

  return (
    <>
      <SeoHead
        title="Kontakt | DP.PORTFOLIO"
        description="Skontaktuj się z DP.PORTFOLIO — zapytania o współpracę fotograficzną, kolaboracje w Polsce i na Litwie oraz projekty wideo."
        keywords="kontakt DP.PORTFOLIO, info@dominikphotofficial.lt, fotografia Warszawa Kowno Wilno"
        canonicalPath="/contacts.html"
        ogType="website"
        ogImage="https://i.postimg.cc/Jnv9KRSs/IMG-7441.jpg"
      />

      <section className="page-section">
        <div className="container">
          <div className="page-header-block fade-in-up">
            <span className="feature-kicker">{CONTACTS_CONTENT.kicker}</span>
            <h1>{CONTACTS_CONTENT.title}</h1>
            <div className="divider" />
            <p className="page-lead">{CONTACTS_CONTENT.lead}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 card-surface fade-in-up">
              <span className="feature-kicker">Dane bezpośrednie</span>
              <h2 className="text-xl mb-4">Kanały kontaktu</h2>

              <div className="album-intro-meta">
                <div className="album-intro-meta-row">
                  <span className="album-intro-meta-label">E-mail</span>
                  <a
                    href={`mailto:${CONTACTS_CONTENT.email}`}
                    className="album-intro-meta-val text-[var(--accent)] underline underline-offset-4"
                  >
                    {CONTACTS_CONTENT.email}
                  </a>
                </div>
                <div className="album-intro-meta-row">
                  <span className="album-intro-meta-label">Instagram</span>
                  <a
                    href={CONTACTS_CONTENT.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="album-intro-meta-val text-[var(--accent)] underline underline-offset-4"
                  >
                    {CONTACTS_CONTENT.instagramHandle}
                  </a>
                </div>
                <div className="album-intro-meta-row">
                  <span className="album-intro-meta-label">Obszar działań</span>
                  <span className="album-intro-meta-val">{CONTACTS_CONTENT.locations}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <p className="text-sm text-[var(--text-muted)] mb-4">
                  Rezerwacja płatnych sesji oraz otwartych terminów TFP odbywa się na głównej platformie DP.PORTFOLIO:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={`${MAIN_LT_DOMAIN}/services.html`} className="btn-secondary">
                    Usługi
                  </a>
                  <a href={`${MAIN_LT_DOMAIN}/tfp-booking.html`} className="btn-secondary">
                    Rezerwacja TFP
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 card-surface fade-in-up">
              <span className="feature-kicker">Formularz</span>
              <h2 className="text-xl mb-6">Wyślij zapytanie</h2>

              {submitted ? (
                <div className="py-4">
                  <p className="text-[var(--text)] mb-4">{CONTACTS_CONTENT.formLabels.success}</p>
                  <div className="flex flex-wrap gap-3">
                    <a href={mailtoUrl} className="btn-primary">
                      Otwórz w programie pocztowym
                    </a>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                    >
                      Nowa wiadomość
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                        {CONTACTS_CONTENT.formLabels.name}
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        className="dp-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jan Kowalski"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                        {CONTACTS_CONTENT.formLabels.email}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        className="dp-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jan@example.pl"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                      {CONTACTS_CONTENT.formLabels.subject}
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      className="dp-input"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Kolaboracja / Sesja w Warszawie"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs uppercase tracking-[0.14em] text-[var(--text-muted)] mb-2">
                      {CONTACTS_CONTENT.formLabels.message}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      className="dp-textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Opisz swój pomysł, termin lub lokalizację..."
                    />
                  </div>

                  <div>
                    <button type="submit" className="submit-btn">
                      {CONTACTS_CONTENT.formLabels.submit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
