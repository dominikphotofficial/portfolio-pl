import { useEffect } from 'react';
import { LANGS, SITE_DOMAIN } from '../data/site';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  canonicalPath: string;
  ogType?: 'website' | 'article' | 'profile';
  ogImage: string;
  robots?: string;
  includeHreflang?: boolean;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

function setMetaTag(selector: string, attrName: string, attrVal: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead({
  title,
  description,
  keywords,
  author = 'DP.PORTFOLIO, Dominik Šuškevič',
  canonicalPath,
  ogType = 'website',
  ogImage,
  robots = 'index, follow, max-image-preview:large, max-video-preview:-1',
  includeHreflang = true,
  schema,
}: SeoConfig) {
  useEffect(() => {
    document.documentElement.lang = 'pl';
    document.title = title;

    const cleanPath = canonicalPath === '/' ? '/' : canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = `${SITE_DOMAIN}${cleanPath}`;

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    if (keywords) {
      setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords);
    }
    setMetaTag('meta[name="author"]', 'name', 'author', author);
    setMetaTag('meta[name="robots"]', 'name', 'robots', robots);

    // Canonical
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // OpenGraph
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'pl_PL');
    setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'DP.PORTFOLIO');
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[property="og:image:width"]', 'property', 'og:image:width', '1200');
    setMetaTag('meta[property="og:image:height"]', 'property', 'og:image:height', '800');

    // Twitter Cards
    setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // hreflang links
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((node) => node.remove());

    if (includeHreflang) {
      LANGS.forEach((lang) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang.hreflang;
        link.href = `${lang.origin}${cleanPath}`;
        document.head.appendChild(link);
      });
      const xDefault = document.createElement('link');
      xDefault.rel = 'alternate';
      xDefault.hreflang = 'x-default';
      xDefault.href = `https://portfolio.dominikphotofficial.lt${cleanPath}`;
      document.head.appendChild(xDefault);
    }

    // Schema.org JSON-LD
    document.head
      .querySelectorAll('script[data-dp-schema="true"]')
      .forEach((node) => node.remove());

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.dpSchema = 'true';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [
    title,
    description,
    keywords,
    author,
    canonicalPath,
    ogType,
    ogImage,
    robots,
    includeHreflang,
    schema,
  ]);

  return null;
}
