import { FROZEN_TIME_CONTENT, SITE_DOMAIN } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { LazyImage } from '../components/LazyImage';
import { SeoHead } from '../components/SeoHead';

interface FrozenTimePageProps {
  onNavigate: (path: string) => void;
}

const MOVIE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Frozen Time: What If',
  url: `${SITE_DOMAIN}/frozen-time.html`,
  image: FROZEN_TIME_CONTENT.poster,
  director: {
    '@type': 'Person',
    name: 'Dominik Šuškevič',
  },
  productionCompany: {
    '@type': 'Organization',
    name: 'DP Corporation',
  },
  inLanguage: 'pl',
};

export function FrozenTimePage({ onNavigate }: FrozenTimePageProps) {
  useReveal('frozen-time');

  return (
    <>
      <SeoHead
        title="Frozen Time: What If | DP.PORTFOLIO"
        description="Frozen Time: What If — autorski film krótkometrażowy w reżyserii Dominika Šuškeviča (DP Corporation). Zarys fabuły, obsada i informacje produkcyjne."
        keywords="Frozen Time What If, film krótkometrażowy, Dominik Šuškevič, DP Corporation"
        canonicalPath="/frozen-time.html"
        ogType="article"
        ogImage={FROZEN_TIME_CONTENT.poster}
        schema={MOVIE_SCHEMA}
      />

      <section className="page-section">
        <div className="container">
          <div className="page-header-block fade-in-up">
            <span className="feature-kicker">{FROZEN_TIME_CONTENT.kicker}</span>
            <h1>{FROZEN_TIME_CONTENT.title}</h1>
            <div className="divider" />
            <p className="page-lead">{FROZEN_TIME_CONTENT.lead}</p>
          </div>

          <div className="film-promo-board fade-in-up">
            <div className="promo-bg">
              <LazyImage
                src={FROZEN_TIME_CONTENT.poster}
                alt={FROZEN_TIME_CONTENT.posterAlt}
                eager
              />
            </div>
            <div className="promo-content">
              <span className="promo-badge">{FROZEN_TIME_CONTENT.synopsisTitle}</span>
              <h2>Kino zatrzymanej chwili</h2>
              {FROZEN_TIME_CONTENT.synopsis.map((para, i) => (
                <p key={i}>{para}</p>
              ))}

              <div className="album-intro-meta mt-2 mb-6">
                {FROZEN_TIME_CONTENT.specs.map((spec) => (
                  <div key={spec.label} className="album-intro-meta-row">
                    <span className="album-intro-meta-label">{spec.label}</span>
                    <span className="album-intro-meta-val">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="board-actions">
                <a
                  href="/contacts.html"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contacts.html');
                  }}
                >
                  Zapytania festiwalowe
                </a>
                <a
                  href="/biography.html"
                  className="btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/biography.html');
                  }}
                >
                  Biografia reżysera
                </a>
              </div>
            </div>
          </div>

          <div className="zeimenos-feature-board fade-in-up">
            <div className="zeimenos-feature-img">
              <LazyImage
                src={FROZEN_TIME_CONTENT.authorImage}
                alt={FROZEN_TIME_CONTENT.authorAlt}
              />
            </div>
            <div className="zeimenos-feature-content">
              <span className="zeimenos-badge">Za kamerą</span>
              <h2>Dominik Šuškevič</h2>
              <p>
                Każde ujęcie w „Frozen Time: What If” powstało z myślą o tym, by przypominało pojedynczą fotografię w ruchu. Projekt stanowi pomost między galerią zdjęć a narracją filmową.
              </p>
              <div className="board-actions">
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
        </div>
      </section>
    </>
  );
}
