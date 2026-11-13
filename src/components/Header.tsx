import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LANGS, LOGO_URL, PRIMARY_NAV, SECONDARY_NAV } from '../data/site';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function Header({ currentPath, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [currentPath]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleInternalClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  const isNavActive = (href: string) => {
    if (href === '/' && (currentPath === '/' || currentPath === '/index.html')) return true;
    return currentPath === href;
  };

  const cleanSubdomainPath = currentPath === '/index.html' ? '/' : currentPath;

  return (
    <>
      <header id="main-header" className={scrolled ? 'scrolled' : ''}>
        <div className="header-container">
          <a
            href="/"
            className="logo"
            aria-label="DP.PORTFOLIO — Strona główna"
            onClick={(e) => handleInternalClick(e, '/')}
          >
            <span className="logo-mark">
              <img src={LOGO_URL} alt="DP.PORTFOLIO" className="logo-img" />
            </span>
            <span className="logo-sub">Portfolio</span>
          </a>

          <div className="header-right">
            <nav className="header-langs" aria-label="Język">
              {LANGS.map((lang) => (
                <a
                  key={lang.code}
                  href={`${lang.origin}${cleanSubdomainPath}`}
                  className={lang.active ? 'active-lang' : ''}
                  aria-current={lang.active ? 'page' : undefined}
                >
                  {lang.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className={`burger ${menuOpen ? 'active' : ''}`}
              id="burger-menu"
              aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              aria-expanded={menuOpen}
              aria-controls="nav-overlay"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`nav-overlay ${menuOpen ? 'open' : ''}`}
        id="nav-overlay"
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) setMenuOpen(false);
        }}
      >
        <aside className="nav-panel" aria-label="Menu główne">
          <div>
            <div className="nav-panel-top">
              <span className="nav-panel-kicker">Nawigacja</span>
              <button
                type="button"
                className="nav-close"
                aria-label="Zamknij menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="mobile-nav">
              {PRIMARY_NAV.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="nav-num">{item.num}</span>
                    <span className="nav-label-text">{item.label}</span>
                  </a>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`nav-link ${isNavActive(item.href) ? 'active' : ''}`}
                    onClick={(e) => handleInternalClick(e, item.href)}
                  >
                    <span className="nav-num">{item.num}</span>
                    <span className="nav-label-text">{item.label}</span>
                  </a>
                )
              )}

              <div className="nav-secondary-group">
                {SECONDARY_NAV.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`nav-link nav-secondary ${isNavActive(item.href) ? 'active' : ''}`}
                    onClick={(e) => handleInternalClick(e, item.href)}
                  >
                    <span className="nav-label-text">{item.label}</span>
                  </a>
                ))}
              </div>
            </nav>
          </div>

          <div className="nav-panel-footer">
            <div className="nav-panel-langs" aria-label="Wybór języka">
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
            <div className="nav-panel-contacts">
              <a href="mailto:info@dominikphotofficial.lt">info@dominikphotofficial.lt</a>
              <a
                href="https://www.instagram.com/dominikphotofficial/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @dominikphotofficial
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
