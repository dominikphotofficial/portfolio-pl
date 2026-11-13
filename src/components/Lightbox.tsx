import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { AlbumPhoto } from '../data/albums';

interface LightboxProps {
  photos: AlbumPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function Lightbox({
  photos,
  currentIndex,
  onClose,
  onChangeIndex,
}: LightboxProps) {
  const [switching, setSwitching] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const isOpen = currentIndex !== null && photos.length > 0;
  const activePhoto = isOpen ? photos[currentIndex] : null;
  const [displaySrc, setDisplaySrc] = useState('');

  useEffect(() => {
    if (!activePhoto) return;
    setDisplaySrc(activePhoto.src);
  }, [activePhoto]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || currentIndex === null) return;
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    const nextIdx = (currentIndex + 1) % photos.length;
    [photos[prevIdx], photos[nextIdx]].forEach((p) => {
      if (p) {
        const img = new Image();
        img.src = p.src;
      }
    });
  }, [isOpen, currentIndex, photos]);

  const stepTo = (newIdx: number) => {
    setSwitching(true);
    window.setTimeout(() => {
      onChangeIndex(newIdx);
      setSwitching(false);
    }, 140);
  };

  const handlePrev = () => {
    if (currentIndex === null) return;
    stepTo((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    if (currentIndex === null) return;
    stepTo((currentIndex + 1) % photos.length);
  };

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  if (!isOpen || currentIndex === null || !activePhoto) {
    return <div id="lightbox" aria-hidden="true" />;
  }

  const counterText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(
    photos.length
  ).padStart(2, '0')}`;
  const progressPct = ((currentIndex + 1) / photos.length) * 100;

  return (
    <div
      id="lightbox"
      className="active"
      role="dialog"
      aria-modal="true"
      aria-label="Podgląd zdjęcia"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0) handlePrev();
          else handleNext();
        }
        touchStartX.current = null;
      }}
    >
      <div className="lightbox-top">
        <span id="lightbox-counter">{counterText}</span>
        <button
          type="button"
          className="lightbox-close"
          aria-label="Zamknij podgląd"
          onClick={onClose}
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {photos.length > 1 && (
        <button
          type="button"
          className="lightbox-prev"
          aria-label="Poprzednie zdjęcie"
          onClick={handlePrev}
        >
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
      )}

      <div className={`lightbox-image-wrapper ${switching ? 'switching' : ''}`}>
        <img
          src={displaySrc}
          alt={activePhoto.alt}
          referrerPolicy="no-referrer"
          onError={() => {
            if (activePhoto.fallbackSrc && displaySrc !== activePhoto.fallbackSrc) {
              setDisplaySrc(activePhoto.fallbackSrc);
            }
          }}
        />
        {activePhoto.caption && (
          <p className="lightbox-caption">{activePhoto.caption}</p>
        )}
      </div>

      {photos.length > 1 && (
        <button
          type="button"
          className="lightbox-next"
          aria-label="Następne zdjęcie"
          onClick={handleNext}
        >
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      )}

      <div className="lightbox-progress" aria-hidden="true">
        <div
          className="lightbox-progress-bar"
          style={{ width: `${progressPct}%` }}
        />
      </div>
    </div>
  );
}
