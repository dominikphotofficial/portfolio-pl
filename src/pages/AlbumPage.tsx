import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ALBUMS_BY_SLUG, type AlbumData } from '../data/albums';
import { SITE_DOMAIN } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { LazyImage } from '../components/LazyImage';
import { Lightbox } from '../components/Lightbox';
import { SeoHead } from '../components/SeoHead';

interface AlbumPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export function AlbumPage({ slug, onNavigate }: AlbumPageProps) {
  const album: AlbumData | undefined = ALBUMS_BY_SLUG[slug];
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useReveal(`album-${slug}`);

  if (!album) {
    return (
      <section className="container page-section">
        <div className="page-header-block">
          <span className="feature-kicker">404</span>
          <h1>Nie znaleziono albumu</h1>
          <div className="divider" />
          <p className="page-lead">
            Wybrana seria fotograficzna nie istnieje lub została przeniesiona.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
            >
              Powrót do albumów
            </a>
          </div>
        </div>
      </section>
    );
  }

  const nextAlbum = ALBUMS_BY_SLUG[album.nextSlug] || ALBUMS_BY_SLUG['wania-honcharuk'];
  const canonicalPath = `/albums/${album.slug}.html`;
  const fullUrl = `${SITE_DOMAIN}${canonicalPath}`;

  const schema =
    album.schemaType === 'LocalBusiness'
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: album.title,
          description: album.seoDescription,
          url: fullUrl,
          image: album.ogImage || album.cover,
          address: {
            '@type': 'PostalAddress',
            addressLocality: album.location,
            addressCountry: 'LT',
          },
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'ImageGallery',
          name: album.title,
          description: album.seoDescription,
          url: fullUrl,
          inLanguage: 'pl',
          datePublished: album.year,
          author: {
            '@type': 'Person',
            name: album.author,
          },
          provider: {
            '@type': 'Organization',
            name: 'DP Corporation',
          },
        };

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setLightboxIdx(null);
    onNavigate(path);
  };

  return (
    <>
      <SeoHead
        title={`${album.title} | DP.PORTFOLIO`}
        description={album.seoDescription}
        keywords={album.seoKeywords}
        author={album.author}
        canonicalPath={canonicalPath}
        ogType="article"
        ogImage={album.ogImage || album.cover}
        schema={schema}
      />

      {/* Album Hero */}
      <section className="album-hero">
        <img
          src={album.cover}
          alt={album.title}
          referrerPolicy="no-referrer"
          className="album-hero-img"
        />
        <div className="album-hero-scrim" aria-hidden="true" />
        <div className="album-hero-inner">
          <a
            href="/"
            className="album-back-link"
            onClick={(e) => handleNav(e, '/')}
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            <span>Albumy</span>
          </a>
          <p className="album-hero-sub">
            {album.category} · {album.countLabel} · {album.year}
          </p>
          <h1 className="album-hero-title">{album.title}</h1>
        </div>
      </section>

      {/* Album Intro & Metadata */}
      <section className="album-intro">
        <div className="container">
          <div className="album-intro-grid fade-in-up">
            <div className="album-intro-copy">
              <span className="feature-kicker">Opis serii</span>
              <div className="divider" />
              {album.introParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="album-intro-meta">
              <div className="album-intro-meta-row">
                <span className="album-intro-meta-label">Zakres</span>
                <span className="album-intro-meta-val">{album.countLabel}</span>
              </div>
              <div className="album-intro-meta-row">
                <span className="album-intro-meta-label">Miejsce</span>
                <span className="album-intro-meta-val">{album.location}</span>
              </div>
              <div className="album-intro-meta-row">
                <span className="album-intro-meta-label">Autor</span>
                <span className="album-intro-meta-val">{album.author}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-albums Selector (e.g. winter / car-meet-kaunas) OR Masonry Photo Wall */}
      <section className="gallery-section">
        <div className="container">
          {album.subAlbums && album.subAlbums.length > 0 ? (
            <div className="album-grid-columns">
              {album.subAlbums.map((sub) => (
                <a
                  key={sub.slug}
                  href={`/albums/${sub.slug}.html`}
                  className="album-card fade-in-up"
                  onClick={(e) => handleNav(e, `/albums/${sub.slug}.html`)}
                >
                  <div className="album-card-media">
                    <LazyImage src={sub.cover} alt={sub.title} />
                  </div>
                  <div className="album-card-body">
                    <h2 className="album-card-title">{sub.title}</h2>
                    <p className="album-card-meta">
                      {sub.category} · {sub.countLabel} · {sub.year}
                    </p>
                    <span className="album-card-action">Zobacz album →</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="gallery-grid">
              {album.photos.map((photo, idx) => (
                <div
                  key={`${photo.src}-${idx}`}
                  className="gallery-item fade-in-up"
                  role="button"
                  tabIndex={0}
                  aria-label={`Powiększ zdjęcie ${idx + 1} z ${album.photos.length}`}
                  onClick={() => setLightboxIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setLightboxIdx(idx);
                    }
                  }}
                >
                  <LazyImage
                    src={photo.src}
                    fallbackSrc={photo.fallbackSrc}
                    alt={photo.alt}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Album Info Band or Partner Contact Card */}
      <section className="album-info-section">
        <div className="container">
          {album.isPartnerZeimenos ? (
            <div className="album-contact-card fade-in-up">
              {album.partnerLogo && (
                <img
                  src={album.partnerLogo}
                  alt="Logo Žeimenos Žirgai"
                  referrerPolicy="no-referrer"
                  className="album-partner-logo"
                />
              )}
              <div>
                <span className="album-info-label">Partner serii</span>
                <p className="album-info-text">
                  Projekt zrealizowany we współpracy ze stajnią Žeimenos Žirgai w dolinie rzeki Żejmiany. W sprawie wspólnych sesji plenerowych i reportaży skontaktuj się przez{' '}
                  <a
                    href="/contacts.html"
                    className="album-info-link"
                    onClick={(e) => handleNav(e, '/contacts.html')}
                  >
                    formularz kontaktowy
                  </a>
                  .
                </p>
              </div>
            </div>
          ) : (
            <div className="album-info-band fade-in-up">
              <div>
                <span className="album-info-label">Estetyka serii</span>
                <p className="album-info-text">
                  Naturalne światło, zachowanie oryginalnych proporcji kadru oraz autorska korekcja barwna DP.PORTFOLIO.
                </p>
              </div>
              <div>
                <span className="album-info-label">Lokalizacja i rok</span>
                <p className="album-info-text">
                  {album.location} · {album.year}. Kolekcja przygotowana dla polskiej edycji pl.dominikphotofficial.lt.
                </p>
              </div>
              <div>
                <span className="album-info-label">Współpraca i prawa</span>
                <p className="album-info-text">
                  Autor: {album.author}. Pytania o kolaboracje i publikacje kieruj na{' '}
                  <a href="mailto:info@dominikphotofficial.lt" className="album-info-link">
                    info@dominikphotofficial.lt
                  </a>
                  .
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Next Album Strip */}
      <a
        href={`/albums/${nextAlbum.slug}.html`}
        className="next-album-strip"
        style={
          {
            '--next-tint': nextAlbum.seriesTint,
            '--next-accent': nextAlbum.seriesAccent,
          } as React.CSSProperties
        }
        onClick={(e) => handleNav(e, `/albums/${nextAlbum.slug}.html`)}
      >
        <div className="next-album-inner">
          <div>
            <span className="next-album-kicker">Następny album</span>
            <h2 className="next-album-title">{nextAlbum.title}</h2>
          </div>
          <span className="next-album-arrow" aria-hidden="true">
            <ArrowRight size={26} strokeWidth={1.5} />
          </span>
        </div>
      </a>

      <Lightbox
        photos={album.photos}
        currentIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={(idx) => setLightboxIdx(idx)}
      />
    </>
  );
}
