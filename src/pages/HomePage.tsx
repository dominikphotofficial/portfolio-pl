import { useEffect, useState } from 'react';
import { ALBUMS } from '../data/albums';
import { HERO_SLIDES, HOME_CONTENT, LOGO_URL, SITE_DOMAIN } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { LazyImage } from '../components/LazyImage';
import { SeoHead } from '../components/SeoHead';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

const HOME_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'DP.PORTFOLIO',
      url: `${SITE_DOMAIN}/`,
      inLanguage: 'pl',
      description:
        'Autorskie portfolio fotografii i filmu Dominika Šuškeviča w języku polskim. Kolaboracja Warszawa, motoryzacja, dziedzictwo oraz natura.',
      publisher: {
        '@type': 'Organization',
        name: 'DP Corporation',
      },
      author: {
        '@type': 'Person',
        name: 'Dominik Šuškevič',
      },
    },
    {
      '@type': 'Organization',
      name: 'DP Corporation',
      url: `${SITE_DOMAIN}/`,
      logo: LOGO_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@dominikphotofficial.lt',
        contactType: 'customer service',
        url: `${SITE_DOMAIN}/contacts.html`,
      },
    },
  ],
};

export function HomePage({ onNavigate }: HomePageProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hideScrollCue, setHideScrollCue] = useState(false);
  const [resetTick, setResetTick] = useState(0);

  useReveal('home');

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [resetTick]);

  useEffect(() => {
    const onScroll = () => setHideScrollCue(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const featuredAlbums = ALBUMS.filter((a) => a.featuredOnHome);

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <>
      <SeoHead
        title="DP.PORTFOLIO"
        description="DP.PORTFOLIO — polska edycja autorskiego portfolio fotografii i filmu Dominika Šuškeviča. Przestrzeń, światło, emocja oraz kolaboracja Warszawa."
        keywords="DP.PORTFOLIO, Dominik Šuškevič, Wania Honcharuk Warszawa, fotografia artystyczna, portfolio pl"
        canonicalPath="/"
        ogType="website"
        ogImage="https://i.postimg.cc/65bZ2sxk/Frozen-time.png"
        schema={HOME_SCHEMA}
      />

      {/* Hero Slideshow */}
      <section className="hero" aria-label="Prezentacja portfolio">
        <div className="hero-slides">
          {HERO_SLIDES.map((slide, idx) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              referrerPolicy="no-referrer"
              className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
            />
          ))}
        </div>
        <div className="hero-scrim" aria-hidden="true" />

        <div className="hero-content">
          <h1 className="hero-title">{HOME_CONTENT.heroTitle}</h1>
          <p className="hero-descriptors">{HOME_CONTENT.heroDescriptors}</p>
        </div>

        <a
          href="#albums"
          className={`hero-scroll ${hideScrollCue ? 'hidden' : ''}`}
          aria-label="Przewiń do albumów"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('albums')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>{HOME_CONTENT.scrollCue}</span>
          <span className="hero-scroll-line" aria-hidden="true" />
        </a>

        <div
          className={`hero-progress ${hideScrollCue ? 'hidden' : ''}`}
          aria-label="Nawigacja slajdów"
        >
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.src}
              type="button"
              className={`hero-progress-line ${idx === activeSlide ? 'active' : ''}`}
              aria-label={`Slajd ${idx + 1}`}
              onClick={() => {
                setActiveSlide(idx);
                setResetTick((t) => t + 1);
              }}
            />
          ))}
        </div>
      </section>

      {/* TFP Booking Block */}
      <section className="booking-block fade-in-up">
        <span className="feature-kicker">{HOME_CONTENT.tfp.kicker}</span>
        <h2>{HOME_CONTENT.tfp.title}</h2>
        <div className="divider divider-center" />
        <p>{HOME_CONTENT.tfp.description}</p>
        <a href={HOME_CONTENT.tfp.ctaHref} className="btn-primary">
          {HOME_CONTENT.tfp.ctaLabel}
        </a>
      </section>

      <div className="container">
        {/* Services Feature Board */}
        <section className="film-promo-board fade-in-up" aria-label="Usługi fotograficzne i wideo">
          <div className="promo-bg">
            <LazyImage
              src={HOME_CONTENT.servicesBoard.image}
              alt={HOME_CONTENT.servicesBoard.imageAlt}
            />
          </div>
          <div className="promo-content">
            <span className="promo-badge">{HOME_CONTENT.servicesBoard.kicker}</span>
            <h2>{HOME_CONTENT.servicesBoard.title}</h2>
            <p>{HOME_CONTENT.servicesBoard.description}</p>
            <ul className="feature-list">
              {HOME_CONTENT.servicesBoard.features.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="board-actions">
              <a href={HOME_CONTENT.servicesBoard.ctaHref} className="btn-primary">
                {HOME_CONTENT.servicesBoard.ctaLabel}
              </a>
            </div>
          </div>
        </section>

        {/* Žeimenos Žirgai Feature Board */}
        <section className="zeimenos-feature-board fade-in-up" aria-label="Žeimenos Žirgai">
          <div className="zeimenos-feature-img">
            <LazyImage
              src={HOME_CONTENT.zeimenosBoard.image}
              alt={HOME_CONTENT.zeimenosBoard.imageAlt}
            />
          </div>
          <div className="zeimenos-feature-content">
            <span className="zeimenos-badge">{HOME_CONTENT.zeimenosBoard.kicker}</span>
            <h2>{HOME_CONTENT.zeimenosBoard.title}</h2>
            <p>{HOME_CONTENT.zeimenosBoard.description}</p>
            <p className="zeimenos-tag-pills">{HOME_CONTENT.zeimenosBoard.tags}</p>
            <div className="board-actions">
              <a
                href={HOME_CONTENT.zeimenosBoard.ctaHref}
                className="btn-primary"
                onClick={(e) => handleLink(e, HOME_CONTENT.zeimenosBoard.ctaHref)}
              >
                {HOME_CONTENT.zeimenosBoard.ctaLabel}
              </a>
              <a
                href={HOME_CONTENT.zeimenosBoard.secondaryHref}
                className="zeimenos-phone-link"
                onClick={(e) => handleLink(e, HOME_CONTENT.zeimenosBoard.secondaryHref)}
              >
                {HOME_CONTENT.zeimenosBoard.secondaryLabel} →
              </a>
            </div>
          </div>
        </section>

        {/* Editorial Albums Showcase */}
        <section id="albums" className="albums-section" aria-label="Albumy fotograficzne">
          <div className="section-header-editorial fade-in-up">
            <span className="section-label-caps">{HOME_CONTENT.albumsHeader.label}</span>
            <span className="section-count-muted">{featuredAlbums.length} serii</span>
          </div>

          <div className="album-grid-columns">
            {featuredAlbums.map((album) => (
              <a
                key={album.slug}
                href={`/albums/${album.slug}.html`}
                className="album-card fade-in-up"
                onClick={(e) => handleLink(e, `/albums/${album.slug}.html`)}
              >
                <div className="album-card-media">
                  <LazyImage src={album.cover} alt={album.title} />
                </div>
                <div className="album-card-body">
                  <h3 className="album-card-title">{album.title}</h3>
                  <p className="album-card-meta">{album.subtitle}</p>
                  <span className="album-card-action">Zobacz album →</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
