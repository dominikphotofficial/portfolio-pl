import { ABOUT_CONTENT } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { LazyImage } from '../components/LazyImage';
import { SeoHead } from '../components/SeoHead';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  useReveal('about');

  return (
    <>
      <SeoHead
        title="O nas | DP.PORTFOLIO"
        description="Wizja i estetyka DP.PORTFOLIO oraz DP Corporation — fotografia dokumentalna, portretowa, motoryzacja i międzynarodowe kolaboracje."
        keywords="DP.PORTFOLIO o nas, DP Corporation, Dominik Šuškevič, wizja i estetyka"
        canonicalPath="/about.html"
        ogType="website"
        ogImage={ABOUT_CONTENT.image}
      />

      <section className="page-section">
        <div className="container">
          <div className="page-header-block fade-in-up">
            <span className="feature-kicker">{ABOUT_CONTENT.kicker}</span>
            <h1>{ABOUT_CONTENT.title}</h1>
            <div className="divider" />
            <p className="page-lead">{ABOUT_CONTENT.lead}</p>
          </div>

          <div className="feature-board fade-in-up">
            <div className="feature-board-media">
              <LazyImage src={ABOUT_CONTENT.image} alt={ABOUT_CONTENT.imageAlt} eager />
            </div>
            <div className="promo-content">
              <span className="promo-badge">Manifest</span>
              <h2>{ABOUT_CONTENT.corpTitle}</h2>
              <p>{ABOUT_CONTENT.corpText}</p>
              <div className="board-actions">
                <a
                  href="/albums/wania-honcharuk.html"
                  className="btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/albums/wania-honcharuk.html');
                  }}
                >
                  Kolaboracja: Warszawa
                </a>
                <a
                  href="/contacts.html"
                  className="btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contacts.html');
                  }}
                >
                  Kontakt
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ABOUT_CONTENT.pillars.map((pillar) => (
              <article key={pillar.num} className="card-surface fade-in-up">
                <span className="bio-chapter-num">{pillar.num}</span>
                <h2 className="text-xl mt-2 mb-3">{pillar.title}</h2>
                <p className="text-sm text-[var(--text-muted)] m-0">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
