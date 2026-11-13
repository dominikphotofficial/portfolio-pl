import { useEffect } from 'react';

export function useReveal(depKey: string) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('.fade-in-up, .reveal')
    );

    if (prefersReduced || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const stagger = target.dataset.stagger;
            if (stagger) {
              target.style.transitionDelay = `${stagger}ms`;
            }
            target.classList.add('visible');
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -24px 0px',
      }
    );

    elements.forEach((el, idx) => {
      if (el.classList.contains('album-card')) {
        el.dataset.stagger = String((idx % 2) * 80);
      }
      observer.observe(el);
    });

    // Fallback reveal so above-the-fold or edge elements never remain invisible
    const fallbackTimer = window.setTimeout(() => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 120) {
          el.classList.add('visible');
        }
      });
    }, 450);

    return () => {
      window.clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [depKey]);
}
