import { LANGS, LOGO_URL, MAIN_LT_DOMAIN } from '../data/site';

interface FooterProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Footer({ currentPath, onNavigate }: FooterProps) {
  const cleanSubdomainPath = currentPath === '/index.html' ? '/' : currentPath;

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="footer-minimal">
      <div className="container">
        <div className="footer-editorial-grid">
          <div>
            <a
              href="/"
              className="logo"
              aria-label="DP.PORTFOLIO"
              onClick={(e) => handleNav(e, '/')}
            >
              <span className="logo-mark">
                <img src={LOGO_URL} alt="DP.PORTFOLIO" className="logo-img" />
              </span>
              <span className="logo-sub">Portfolio</span>
            </a>
            <p className="footer-tagline">
              Autorska fotografia artystyczna, motoryzacja, portrety i kino krótkometrażowe. Przestrzeń · Światło · Emocja.
            </p>
            <a href="mailto:info@dominikphotofficial.lt" className="footer-email">
              info@dominikphotofficial.lt
            </a>
          </div>

          <div>
            <h3 className="footer-col-title">Nawigacja</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="/" onClick={(e) => handleNav(e, '/')}>
                  Albumy i Prace
                </a>
              </li>
              <li>
                <a href="/albums/wania-honcharuk.html" onClick={(e) => handleNav(e, '/albums/wania-honcharuk.html')}>
                  Wania Honcharuk | Warszawa
                </a>
              </li>
              <li>
                <a href="/frozen-time.html" onClick={(e) => handleNav(e, '/frozen-time.html')}>
                  Frozen Time: What If
                </a>
              </li>
              <li>
                <a href="/about.html" onClick={(e) => handleNav(e, '/about.html')}>
                  O nas
                </a>
              </li>
              <li>
                <a href="/biography.html" onClick={(e) => handleNav(e, '/biography.html')}>
                  Biografia
                </a>
              </li>
              <li>
                <a href="/contacts.html" onClick={(e) => handleNav(e, '/contacts.html')}>
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="footer-col-title">Informacje</h3>
            <ul className="footer-nav-list">
              <li>
                <a href={`${MAIN_LT_DOMAIN}/services.html`}>Usługi (DP LT)</a>
              </li>
              <li>
                <a href={`${MAIN_LT_DOMAIN}/tfp-booking.html`}>Rezerwacja TFP</a>
              </li>
              <li>
                <a href={`${MAIN_LT_DOMAIN}/review.html`}>Opinie klientów</a>
              </li>
              <li>
                <a href="/privacy-policy.html" onClick={(e) => handleNav(e, '/privacy-policy.html')}>
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a href="/terms-of-service.html" onClick={(e) => handleNav(e, '/terms-of-service.html')}>
                  Regulamin
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-min-bottom">
          <span>© 2026 DP.PORTFOLIO · Dominik Šuškevič. Wszelkie prawa zastrzeżone.</span>
          <div className="footer-min-langs" aria-label="Wersje językowe">
            {LANGS.map((lang) => (
              <a
                key={lang.code}
                href={`${lang.origin}${cleanSubdomainPath}`}
                className={lang.active ? 'active-lang' : ''}
              >
                {lang.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
