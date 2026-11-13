import { MAIN_LT_DOMAIN } from '../data/site';
import { SeoHead } from '../components/SeoHead';

interface RedirectNoticePageProps {
  target: 'services' | 'tfp-booking' | 'review';
  onNavigate: (path: string) => void;
}

export function RedirectNoticePage({ target, onNavigate }: RedirectNoticePageProps) {
  const copyMap = {
    services: {
      title: 'Usługi fotograficzne i wideo',
      description:
        'Pakiety sesji fotograficznych, kalendarz terminów oraz zamówienia usług znajdują się na głównej platformie DP.PORTFOLIO.',
      externalUrl: `${MAIN_LT_DOMAIN}/services.html`,
      cta: 'Przejdź do pakietów usług',
    },
    'tfp-booking': {
      title: 'Rejestracja TFP',
      description:
        'Formularz zgłoszeniowy na bezpłatne sesje twórcze TFP znajduje się na głównej platformie DP.PORTFOLIO.',
      externalUrl: `${MAIN_LT_DOMAIN}/tfp-booking.html`,
      cta: 'Przejdź do rejestracji TFP',
    },
    review: {
      title: 'Opinie klientów',
      description:
        'Zweryfikowane opinie oraz formularz dodawania recenzji dostępne są na głównej platformie DP.PORTFOLIO.',
      externalUrl: `${MAIN_LT_DOMAIN}/review.html`,
      cta: 'Zobacz opinie klientów',
    },
  };

  const info = copyMap[target];

  return (
    <>
      <SeoHead
        title={`${info.title} | DP.PORTFOLIO`}
        description={info.description}
        canonicalPath={`/${target}.html`}
        robots="noindex, follow"
        includeHreflang={false}
        ogImage="https://i.postimg.cc/Jnv9KRSs/IMG-7441.jpg"
      />

      <section className="page-section">
        <div className="container">
          <div className="page-header-block">
            <span className="feature-kicker">Przekierowanie platformy</span>
            <h1>{info.title}</h1>
            <div className="divider" />
            <p className="page-lead">{info.description}</p>
            <div className="board-actions mt-8">
              <a href={info.externalUrl} className="btn-primary">
                {info.cta}
              </a>
              <a
                href="/"
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/');
                }}
              >
                Wróć do albumów
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
