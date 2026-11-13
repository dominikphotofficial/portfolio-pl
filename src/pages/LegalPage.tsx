import { useReveal } from '../hooks/useReveal';
import { SeoHead } from '../components/SeoHead';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export function LegalPage({ type, onNavigate }: LegalPageProps) {
  useReveal(`legal-${type}`);

  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Polityka prywatności' : 'Regulamin świadczenia usług';
  const canonicalPath = isPrivacy ? '/privacy-policy.html' : '/terms-of-service.html';
  const description = isPrivacy
    ? 'Polityka prywatności i ochrony danych osobowych polskiej wersji serwisu DP.PORTFOLIO (pl.dominikphotofficial.lt).'
    : 'Regulamin korzystania z serwisu oraz zasady praw autorskich DP.PORTFOLIO (pl.dominikphotofficial.lt).';

  const sections = isPrivacy
    ? [
        {
          heading: '01. Administrator danych',
          body: 'Administratorem danych osobowych przekazywanych dobrowolnie za pośrednictwem formularza kontaktowego lub poczty elektronicznej (info@dominikphotofficial.lt) jest DP.PORTFOLIO / Dominik Šuškevič (DP Corporation).',
        },
        {
          heading: '02. Zakres i cel przetwarzania',
          body: 'Dane kontaktowe (imię, adres e-mail, treść korespondencji) przetwarzane są wyłącznie w celu udzielenia odpowiedzi na zapytanie, organizacji sesji zdjęciowych lub realizacji wspólnych projektów twórczych.',
        },
        {
          heading: '03. Pliki cookies i usługi zewnętrzne',
          body: 'Serwis korzysta z zewnętrznego hostingu fotografii oraz czcionek Google Fonts (Montserrat). Na polskiej subdomenie nie gromadzimy danych płatniczych ani profili reklamowych.',
        },
        {
          heading: '04. Prawa użytkownika (RODO)',
          body: 'Masz prawo dostępu do swoich danych, ich sprostowania, usunięcia lub ograniczenia przetwarzania. W każdej chwili możesz wysłać stosowne żądanie na adres info@dominikphotofficial.lt.',
        },
      ]
    : [
        {
          heading: '01. Postanowienia ogólne',
          body: 'Serwis pl.dominikphotofficial.lt stanowi oficjalną polską edycję portfolio fotograficznego i filmowego DP.PORTFOLIO, prezentującą serie autorskie oraz projekty partnerskie i kolaboracje.',
        },
        {
          heading: '02. Prawa autorskie do fotografii i materiałów wideo',
          body: 'Wszelkie fotografie, teksty oraz materiały audiowizualne zamieszczone w serwisie są chronione prawem autorskim. W przypadku projektów kolaboracyjnych (m.in. album „Wania Honcharuk | Warszawa”) prawa autorskie przysługują odpowiednim twórcom wskazanym przy serii.',
        },
        {
          heading: '03. Zasady korzystania z galerii',
          body: 'Kopiowanie, modyfikowanie lub komercyjne rozpowszechnianie zdjęć bez uprzedniej pisemnej zgody autorów jest zabronione. Udostępnianie odnośników do galerii w mediach społecznościowych ze wskazaniem źródła jest mile widziane.',
        },
        {
          heading: '04. Rezerwacje sesji i usługi',
          body: 'Szczegółowe pakiety usług fotograficznych oraz formularze rejestracji TFP obsługiwane są na stronie głównej portfolio.dominikphotofficial.lt.',
        },
      ];

  return (
    <>
      <SeoHead
        title={`${title} | DP.PORTFOLIO`}
        description={description}
        canonicalPath={canonicalPath}
        ogType="article"
        ogImage="https://i.postimg.cc/65bZ2sxk/Frozen-time.png"
      />

      <section className="page-section">
        <div className="container">
          <div className="page-header-block fade-in-up">
            <span className="feature-kicker">Informacje prawne</span>
            <h1>{title}</h1>
            <div className="divider" />
            <p className="page-lead">
              Dokument obowiązujący dla polskiej subdomeny pl.dominikphotofficial.lt (aktualizacja: 2026).
            </p>
          </div>

          <div className="bio-chapters">
            {sections.map((sec) => (
              <div key={sec.heading} className="bio-chapter fade-in-up">
                <div className="bio-chapter-num">{sec.heading.slice(0, 2)}</div>
                <div>
                  <h2 className="text-xl mb-2">{sec.heading.slice(4)}</h2>
                  <p className="text-[var(--text-muted)] m-0 max-w-[68ch]">{sec.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 fade-in-up">
            <a
              href="/"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
            >
              Powrót do strony głównej
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
