import { useCallback, useEffect, useState } from 'react';
import { ALBUMS_BY_SLUG } from './data/albums';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AlbumPage } from './pages/AlbumPage';
import { AboutPage } from './pages/AboutPage';
import { BiographyPage } from './pages/BiographyPage';
import { FrozenTimePage } from './pages/FrozenTimePage';
import { ContactsPage } from './pages/ContactsPage';
import { LegalPage } from './pages/LegalPage';
import { RedirectNoticePage } from './pages/RedirectNoticePage';

function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/index.html') return '/';
  return pathname;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    const onPageShow = () => {
      document.body.classList.remove('page-leaving');
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('pageshow', onPageShow);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('pageshow', onPageShow);
    };
  }, []);

  // Apply body classes (`has-hero` & per-series `.series-*`) matching the DP.PORTFOLIO Design System
  useEffect(() => {
    document.body.classList.remove(
      'has-hero',
      'series-horses',
      'series-portraits',
      'series-nature',
      'series-urban'
    );

    if (currentPath === '/') {
      document.body.classList.add('has-hero');
    } else if (currentPath.startsWith('/albums/')) {
      const slug = currentPath.replace('/albums/', '').replace(/\.html$/, '');
      const album = ALBUMS_BY_SLUG[slug];
      if (album) {
        document.body.classList.add('has-hero', album.series);
      }
    }
  }, [currentPath]);

  const navigate = useCallback(
    (targetPath: string) => {
      const normalized = normalizePath(targetPath);
      if (normalized === currentPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        window.history.pushState({}, '', normalized);
        setCurrentPath(normalized);
        window.scrollTo(0, 0);
        return;
      }

      document.body.classList.add('page-leaving');
      window.setTimeout(() => {
        window.history.pushState({}, '', normalized);
        setCurrentPath(normalized);
        window.scrollTo(0, 0);
        document.body.classList.remove('page-leaving');
      }, 200);
    },
    [currentPath]
  );

  const renderRoute = () => {
    if (currentPath === '/') {
      return <HomePage onNavigate={navigate} />;
    }
    if (currentPath === '/about.html' || currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentPath === '/biography.html' || currentPath === '/biography') {
      return <BiographyPage onNavigate={navigate} />;
    }
    if (currentPath === '/frozen-time.html' || currentPath === '/frozen-time') {
      return <FrozenTimePage onNavigate={navigate} />;
    }
    if (currentPath === '/contacts.html' || currentPath === '/contacts') {
      return <ContactsPage />;
    }
    if (currentPath === '/privacy-policy.html' || currentPath === '/privacy-policy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms-of-service.html' || currentPath === '/terms-of-service') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    if (currentPath === '/services.html' || currentPath === '/services') {
      return <RedirectNoticePage target="services" onNavigate={navigate} />;
    }
    if (currentPath === '/tfp-booking.html' || currentPath === '/tfp-booking') {
      return <RedirectNoticePage target="tfp-booking" onNavigate={navigate} />;
    }
    if (currentPath === '/review.html' || currentPath === '/review') {
      return <RedirectNoticePage target="review" onNavigate={navigate} />;
    }
    if (currentPath.startsWith('/albums/')) {
      const slug = currentPath.replace('/albums/', '').replace(/\.html$/, '');
      return <AlbumPage slug={slug} onNavigate={navigate} />;
    }

    return <HomePage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main className="flex-1">{renderRoute()}</main>
      <Footer currentPath={currentPath} onNavigate={navigate} />
    </div>
  );
}
