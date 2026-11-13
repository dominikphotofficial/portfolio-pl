import { BIOGRAPHY_CONTENT, SITE_DOMAIN } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { LazyImage } from '../components/LazyImage';
import { SeoHead } from '../components/SeoHead';

interface BiographyPageProps {
  onNavigate: (path: string) => void;
}

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Dominik Šuškevič',
  jobTitle: 'Fotograf i Reżyser',
  url: `${SITE_DOMAIN}/biography.html`,
  image: BIOGRAPHY_CONTENT.portrait,
  worksFor: {
    '@type': 'Organization',
    name: 'DP Corporation',
  },
};

export function BiographyPage({ onNavigate }: BiographyPageProps) {
  useReveal('biography');

  return (
    <>
      <SeoHead
        title="Biografia | DP.PORTFOLIO"
        description="Biografia Dominika Šuškeviča — fotografa i reżysera stojącego za projektem DP.PORTFOLIO oraz filmem Frozen Time: What If."
        keywords="Dominik Šuškevič biografia, fotograf Litwa Polska, Frozen Time, DP.PORTFOLIO"
        canonicalPath="/biography.html"
        ogType="profile"
        ogImage={BIOGRAPHY_CONTENT.portrait}
        schema={PERSON_SCHEMA}
      />

      <section className="page-section">
        <div className="container">
          <div className="page-header-block fade-in-up">
            <span className="feature-kicker">{BIOGRAPHY_CONTENT.kicker}</span>
            <h1>{BIOGRAPHY_CONTENT.title}</h1>
            <div className="divider" />
            <p className="page-lead">{BIOGRAPHY_CONTENT.lead}</p>
          </div>

          <div className="feature-board fade-in-up">
            <div className="feature-board-media">
              <LazyImage
                src={BIOGRAPHY_CONTENT.portrait}
                alt={BIOGRAPHY_CONTENT.portraitAlt}
                eager
              />
            </div>
            <div className="promo-content">
              <span className="promo-badge">Twórca i reżyser</span>
              <h2>Fotografia jako zapis czasu</h2>
              <p>
                Od pierwszych serii przyrodniczych w Kownie po międzynarodowe kolaboracje w Warszawie i produkcję kina autorskiego. Każdy cykl w archiwum DP.PORTFOLIO ma własne tempo, tonację i dokumentalny charakter.
              </p>
              <div className="board-actions">
                <a
                  href="/"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                >
                  Przeglądaj albumy
                </a>
                <a
                  href="/contacts.html"
                  className="btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contacts.html');
                  }}
                >
                  Napisz do autora
                </a>
              </div>
            </div>
          </div>

          <div className="bio-chapters my-14">
            {BIOGRAPHY_CONTENT.chapters.map((chapter) => (
              <div key={chapter.num} className="bio-chapter fade-in-up">
                <div className="bio-chapter-num">ROZDZIAŁ {chapter.num}</div>
                <div>
                  <h2 className="text-xl mb-2">{chapter.title}</h2>
                  <p className="text-[var(--text-muted)] m-0 max-w-[65ch]">{chapter.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="film-promo-board fade-in-up">
            <div className="promo-bg">
              <LazyImage
                src={BIOGRAPHY_CONTENT.filmSpotlight.poster}
                alt={BIOGRAPHY_CONTENT.filmSpotlight.posterAlt}
              />
            </div>
            <div className="promo-content">
              <span className="promo-badge">{BIOGRAPHY_CONTENT.filmSpotlight.kicker}</span>
              <h2>{BIOGRAPHY_CONTENT.filmSpotlight.title}</h2>
              <p>{BIOGRAPHY_CONTENT.filmSpotlight.text}</p>
              <div className="board-actions">
                <a
                  href={BIOGRAPHY_CONTENT.filmSpotlight.ctaHref}
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(BIOGRAPHY_CONTENT.filmSpotlight.ctaHref);
                  }}
                >
                  {BIOGRAPHY_CONTENT.filmSpotlight.ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
